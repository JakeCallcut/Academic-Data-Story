
export default class Heatmap {
	constructor(container, width, height, margin, onCellClick = null) {
		this.container = container;
		this.width = width;
		this.height = height;
		this.margin = { top: margin[0], right: margin[1], bottom: margin[2], left: margin[3] };
		this.xLabels = [1, 0]; // 1 for male, 0 for female
		this.yLabels = ["Graduate", "Dropout"];
		this.colorScale = d3.scaleLinear()
			.domain([0, 1])
			.range(["#E7ECEF", "#274C77"]);
		// Initial SVG creation
		this.svg = null;
		this.chart = null;
		this.selectedCell = null; // Track selected cell
		this.onCellClick = onCellClick; // Callback for cell click
	}

	update(data) {
		// console.log(data);
		// Remove previous SVG if exists
		d3.select(this.container).selectAll("svg").remove();
		this.svg = d3.select(this.container)
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height)
			.attr("class", "heatmap-svg");
		this.chart = this.svg.append("g")
			.attr("transform", `translate(${this.margin.left},${this.margin.top})`);
		// Count for each cell
		const counts = {
			1: { "Graduate": 0, "Dropout": 0 },
			0: { "Graduate": 0, "Dropout": 0 }
		};
		let maxCount = 0;
		data.forEach(d => {
			let gender = d.student_gender;
			const status = d.student_status;
			if (counts[gender] && counts[gender][status] !== undefined) {
				counts[gender][status]++;
				if (counts[gender][status] > maxCount) maxCount = counts[gender][status];
			}
		});

		// Prepare data for heatmap
		const heatmapData = [];
		this.xLabels.forEach((x, i) => {
			this.yLabels.forEach((y, j) => {
				heatmapData.push({
					x,
					y,
					value: counts[x][y]
				});
			});
		});

		// Update colour scale domain
		this.colorScale.domain([0, maxCount || 1]);

		// Draw axes
		const cellSize = (this.width - this.margin.left - this.margin.right) / 2;
        
		this.chart.selectAll(".x-label").data(this.xLabels)
			.join("text")
			.attr("class", "x-label")
			.attr("x", (d, i) => i * cellSize + cellSize / 2)
			.attr("y", (this.yLabels.length) * cellSize + 28)
			.attr("text-anchor", "middle")
			.style("font-size", "14px")
			.text(d => d === 1 ? "Male" : "Female");

		this.chart.selectAll(".y-label").data(this.yLabels)
			.join("text")
			.attr("class", "y-label")
			.attr("x", -12)
			.attr("y", (d, i) => i * cellSize + cellSize / 2)
			.attr("text-anchor", "end")
			.attr("alignment-baseline", "middle")
			.style("font-size", "14px")
			.text(d => d);

		// Draw cells
		const self = this;
		this.chart.selectAll("rect.heat-cell").data(heatmapData)
			.join("rect")
			.attr("class", "heat-cell")
			.attr("x", d => this.xLabels.indexOf(d.x) * cellSize)
			.attr("y", d => this.yLabels.indexOf(d.y) * cellSize)
			.attr("width", cellSize)
			.attr("height", cellSize)
			.attr("fill", d => this.colorScale(d.value))
			.attr("stroke", d => {
				if (self.selectedCell && self.selectedCell.x === d.x && self.selectedCell.y === d.y) {
					return "#36810F";
				}
				return "none";
			})
			.attr("stroke-width", d => {
				if (self.selectedCell && self.selectedCell.x === d.x && self.selectedCell.y === d.y) {
					return 4;
				}
				return 0;
			})
			.style("cursor", "pointer")
			.on("click", function(event, d) {
				// Toggle selection
				if (self.selectedCell && self.selectedCell.x === d.x && self.selectedCell.y === d.y) {
					self.selectedCell = null;
				} else {
					self.selectedCell = { x: d.x, y: d.y };
				}
				self.update(data); // Redraw to update outline
				if (self.onCellClick) {
					// Pass null if deselected, or the selected cell info
					self.onCellClick(self.selectedCell ? { x: d.x, y: d.y } : null);
				}
			});

		// Draw values
		this.chart.selectAll("text.heat-value").data(heatmapData)
			.join("text")
			.attr("class", "heat-value")
			.attr("x", d => this.xLabels.indexOf(d.x) * cellSize + cellSize / 2)
			.attr("y", d => this.yLabels.indexOf(d.y) * cellSize + cellSize / 2)
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "middle")
			.attr("fill", d => d.value > maxCount / 2 ? "#fff" : "#222")
			.style("pointer-events", "all")
			.style("cursor", "pointer")
			.text(d => d.value)
			.on("click", function(event, d) {
				// Forward click to the underlying rect
				const rect = self.chart.selectAll("rect.heat-cell").filter(r => r.x === d.x && r.y === d.y).node();
				if (rect) rect.dispatchEvent(new PointerEvent('click', {bubbles: true}));
			});
	}
}