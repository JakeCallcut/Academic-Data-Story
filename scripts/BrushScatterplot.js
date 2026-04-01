
/**
 * Brushable Scatterplot Class
 */

export default class BrushScatterplot{

    width; height; margin;
    svg; chart; dots; axisX; axisY; labelX; labelY; rateContainer; rateValue; rateLabel; // SVG & Chart Related
    scaleX; scaleY; colorScale; // Scale Variables
    data; values; // All data & selected data 

    // margin -> [top, bottom, left, right]
    constructor(container, width, height, margin, rateContainer=null){

        this.width = width;
        this.height = height;
        this.margin = margin;
        this.rateContainer = d3.select(rateContainer);

        this.svg = d3.select(container).append('svg')
            .classed('brush scatter', true) 
            .attr('width', this.width).attr('height', this.height);

        this.chart = this.svg.append('g')
            .attr('transform', `translate(${this.margin[2]}, ${this.margin[0]})`);
               
        this.dots = this.chart.selectAll('circle.dots');

        this.axisX = this.svg.append('g')
            .attr('transform', `translate(${this.margin[2]},${this.height-this.margin[1]})`);
        this.axisY = this.svg.append('g')
            .attr('transform', `translate(${this.margin[2]},${this.margin[0]})`);
        
        this.labelX = this.svg.append('text')
            .attr('transform', `translate(${this.width - this.margin[3]}, ${this.height - 35})`)
            .style('text-anchor', 'end');
        this.labelY = this.svg.append('text')
            .attr('transform', `translate(${this.margin[2]}, ${this.margin[0] + (this.height - this.margin[0] - this.margin[1])/6}) rotate(-90)`)
            .style('text-anchor', 'middle')
            .attr('dy', 15);

        //select two labels in DOM
        this.rateValue = this.rateContainer.select('.rate-value');
        this.rateLabel = this.rateContainer.select('.rate-label');

        // Provides colours for student outcomes in the scatterplot
        this.colorScale = d3.scaleOrdinal()
            .domain(["Dropout", "Graduate"])
            .range(["#e15759", "#4e79a7"])

    }

    #calculateDropoutPercent(dataset){
        //filter by dropouts then find proportion
        if (!dataset || dataset.length === 0) return null;
        const dropoutCount = dataset.filter(d => d.student_status === 'Dropout').length;
        return Math.round((dropoutCount / dataset.length) * 100);
    }

    #updateRate(dataset, isSelection=false){
        //put dropout percent into label
        const dropoutPercent = this.#calculateDropoutPercent(dataset);
        if (dropoutPercent === null) {
            this.rateValue.text('-%');
            this.rateLabel.text('none selected');
        } else {
            this.rateValue.text(`${dropoutPercent}%`);
            this.rateLabel.text(isSelection ? 'Dropped out in selection' : 'Dropped out overall');
        }
    }

    #updateScales(){        
        let chartWidth = this.width-this.margin[2]-this.margin[3], 
            chartHeight = this.height-this.margin[0]-this.margin[1];
        let rangeX = [0, chartWidth], 
            rangeY = [chartHeight, 0];
        let domainX = d3.extent(this.data, d => d.admin_grade),
            domainY = d3.extent(this.data, d => d.units_firstsem);
        this.scaleX = d3.scaleLinear(domainX, rangeX).nice();
        this.scaleY = d3.scaleLinear(domainY, rangeY).nice();
    }

    #updateDots(){
        this.dots = this.chart
            .selectAll('circle')
            .data(this.data)
            .join('circle')
            .attr('cx', d => this.scaleX(d.admin_grade))
            .attr('cy', d => this.scaleY(d.units_firstsem)) 
            .attr('r', 3)
            .attr("fill", d => this.colorScale(d.student_status));
    }

    #updateAxes(){
        let axisGenX = d3.axisBottom(this.scaleX),
            axisGenY = d3.axisLeft(this.scaleY);
        this.axisX.call(axisGenX)
        this.axisY.call(axisGenY)
    }

    #updateBrush() {
        const chartWidth = this.width-this.margin[2]-this.margin[3];
        const chartHeight = this.height-this.margin[0]-this.margin[1];

        const brush = d3.brush()

            // Area where brush can be used
            .extent([[0, 0], [chartWidth, chartHeight]])

            // Start interaction
            .on("start brush end", (event) => {
                const selection = event.selection;

                // If there does not exist a selection, i.e. no dots have been brushed, return chart to original
                // colour state. Needed due to chart not returning to original state after a selection.
                if (!selection) {
                    this.dots.attr("fill", d => this.colorScale(d.student_status));
                    this.#updateRate(this.data, false);
                    return;
                }
                
                // Defines area of selection. [x0, y0] for top left, [x1, y1] for bottom right
                const [[x0, y0], [x1, y1]] = selection;
                
                // Filters data based on if it lies within the selected area by the brush selection
                this.values = this.data.filter(d => {

                    const cx = this.scaleX(d.admin_grade);
                    const cy = this.scaleY(d.units_firstsem);

                    // Returns all values that lie within this area
                    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
                });

                // call update rate label
                this.#updateRate(this.values, true);

                //console.log("Selected data: ");
                //console.log(this.values);

                this.dots.attr("fill", d => {
                    const cx = this.scaleX(d.admin_grade);
                    const cy = this.scaleY(d.units_firstsem);

                    // If dots are currently selected and lie within rectangle, assign status colours
                    // If dots are not selected, turn all unselected dots grey
                    if (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1) {
                        return this.colorScale(d.student_status);
                    } else {
                        return "grey";
                    }
                });
            });
        
        // Ensures that only one selection can exist at any time
        this.chart.selectAll(".brush").remove();
        
        // Allows the brush to be displayed on screen and makes interaction possible
        this.chart.append("g")
            .attr("class", "brush")
            .call(brush);
    }

    // Highlight points by gender and status (for heatmap interaction)
    highlightByGroup(group) {
        const highlightColor = "#6eea6a";
        // group: {x: gender, y: status} or null
        if (!group) {
            // Reset to default coloring
            this.dots.attr("fill", d => this.colorScale(d.student_status));
            return;
        }
        // console.log(group);
        this.dots.attr("fill", d => {
            let genderVal = d.student_gender;
            
            //Convert to number
            genderVal = +genderVal;

            if (genderVal === group.x && d.student_status === group.y) {
                return highlightColor;
            }
            return this.colorScale(d.student_status);
        });
    }

    // Public API 
    render(dataset){ 
        this.data = dataset;
        this.values = dataset;
        this.#updateScales();
        this.#updateDots(); 
        this.#updateAxes();
        this.#updateBrush();
        this.#updateRate(this.data, false);
        return this; 
    } 

    setLabels(labelX='', labelY=''){
        this.labelX.text(labelX);
        this.labelY.text(labelY);
        return this;
    }
}

// Insert below line into html to display
// <div id="scat1"></div>