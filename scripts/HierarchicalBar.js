const MOTHER_OCCUPATIONS = {
    "0": "Student", "1": "Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers", "2": "Specialists in Intellectual and Scientific Activities", "3": "Intermediate Level Technicians and Professions", "4": "Administrative staff", "5": "Personal Services, Security and Safety Workers and Sellers", "6": "Farmers and Skilled Workers in Agriculture, Fisheries and Forestry", "7": "Skilled Workers in Industry, Construction and Craftsmen", "8": "Installation and Machine Operators and Assembly Workers", "9": "Unskilled Workers", "10": "Armed Forces Professions", "90": "Other Situation", "99": "(blank)", "122": "Health professionals", "123": "Teachers", "125": "Specialists in information and communication technologies (ICT)", "131": "Intermediate level science and engineering technicians and professions", "132": "Technicians and professionals, of intermediate level of health", "134": "Intermediate level technicians from legal, social, sports, cultural and similar services", "141": "Office workers, secretaries in general and data processing operators", "143": "Data, accounting, statistical, financial services and registry-related operators", "144": "Other administrative support staff", "151": "Personal service workers", "152": "Sellers", "153": "Personal care workers and the like", "171": "Skilled construction workers and the like, except electricians", "173": "Skilled workers in printing, precision instrument manufacturing, jewelers, artisans and the like", "175": "Workers in food processing, woodworking, clothing and other industries and crafts", "191": "Cleaning workers", "192": "Unskilled workers in agriculture, animal production, fisheries and forestry", "193": "Unskilled workers in extractive industry, construction, manufacturing and transport", "194": "Meal preparation assistants"
};

const FATHER_OCCUPATIONS = {
    "0": "Student", "1": "Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers", "2": "Specialists in Intellectual and Scientific Activities", "3": "Intermediate Level Technicians and Professions", "4": "Administrative staff", "5": "Personal Services, Security and Safety Workers and Sellers", "6": "Farmers and Skilled Workers in Agriculture, Fisheries and Forestry", "7": "Skilled Workers in Industry, Construction and Craftsmen", "8": "Installation and Machine Operators and Assembly Workers", "9": "Unskilled Workers", "10": "Armed Forces Professions", "90": "Other Situation", "99": "(blank)", "101": "Armed Forces Officers", "102": "Armed Forces Sergeants", "103": "Other Armed Forces personnel", "112": "Directors of administrative and commercial services", "114": "Hotel, catering, trade and other services directors", "121": "Specialists in the physical sciences, mathematics, engineering and related techniques", "122": "Health professionals", "123": "Teachers", "124": "Specialists in finance, accounting, administrative organization, public and commercial relations", "131": "Intermediate level science and engineering technicians and professions", "132": "Technicians and professionals, of intermediate level of health", "134": "Intermediate level technicians from legal, social, sports, cultural and similar services", "135": "Information and communication technology technicians", "141": "Office workers, secretaries in general and data processing operators", "143": "Data, accounting, statistical, financial services and registry-related operators", "144": "Other administrative support staff", "151": "Personal service workers", "152": "Sellers", "153": "Personal care workers and the like", "154": "Protection and security services personnel", "161": "Market-oriented farmers and skilled agricultural and animal production workers", "163": "Farmers, livestock keepers, fishermen, hunters and gatherers, subsistence", "171": "Skilled construction workers and the like, except electricians", "172": "Skilled workers in metallurgy, metalworking and similar", "174": "Skilled workers in electricity and electronics", "175": "Workers in food processing, woodworking, clothing and other industries and crafts", "181": "Fixed plant and machine operators", "182": "Assembly workers", "183": "Vehicle drivers and mobile equipment operators", "192": "Unskilled workers in agriculture, animal production, fisheries and forestry", "193": "Unskilled workers in extractive industry, construction, manufacturing and transport", "194": "Meal preparation assistants", "195": "Street vendors (except food) and street service providers"
};

const MOTHER_EDUCATION = {
    "1": "Secondary Education - 12th Year of Schooling or Eq.", "2": "Higher Education - Bachelor's Degree", "3": "Higher Education - Degree", "4": "Higher Education - Master's", "5": "Higher Education - Doctorate", "6": "Frequency of Higher Education", "9": "12th Year of Schooling - Not Completed", "10": "11th Year of Schooling - Not Completed", "11": "7th Year (Old)", "12": "Other - 11th Year of Schooling", "14": "10th Year of Schooling", "18": "General commerce course", "19": "Basic Education 3rd Cycle (9th/10th/11th Year) or Equiv.", "22": "Technical-professional course", "26": "7th year of schooling", "27": "2nd cycle of the general high school course", "29": "9th Year of Schooling - Not Completed", "30": "8th year of schooling", "34": "Unknown", "35": "Can't read or write", "36": "Can read without having a 4th year of schooling", "37": "Basic education 1st cycle (4th/5th year) or equiv.", "38": "Basic Education 2nd Cycle (6th/7th/8th Year) or Equiv.", "39": "Technological specialization course", "40": "Higher education - degree (1st cycle)", "41": "Specialized higher studies course", "42": "Professional higher technical course", "43": "Higher Education - Master (2nd cycle)", "44": "Higher Education - Doctorate (3rd cycle)"
};

const FATHER_EDUCATION = {
    "1": "Secondary Education - 12th Year of Schooling or Eq.", "2": "Higher Education - Bachelor's Degree", "3": "Higher Education - Degree", "4": "Higher Education - Master's", "5": "Higher Education - Doctorate", "6": "Frequency of Higher Education", "9": "12th Year of Schooling - Not Completed", "10": "11th Year of Schooling - Not Completed", "11": "7th Year (Old)", "12": "Other - 11th Year of Schooling", "13": "2nd year complementary high school course", "14": "10th Year of Schooling", "18": "General commerce course", "19": "Basic Education 3rd Cycle (9th/10th/11th Year) or Equiv.", "20": "Complementary High School Course", "22": "Technical-professional course", "25": "Complementary High School Course - not concluded", "26": "7th year of schooling", "27": "2nd cycle of the general high school course", "29": "9th Year of Schooling - Not Completed", "30": "8th year of schooling", "31": "General Course of Administration and Commerce", "33": "Supplementary Accounting and Administration", "34": "Unknown", "35": "Can't read or write", "36": "Can read without having a 4th year of schooling", "37": "Basic education 1st cycle (4th/5th year) or equiv.", "38": "Basic Education 2nd Cycle (6th/7th/8th Year) or Equiv.", "39": "Technological specialization course", "40": "Higher education - degree (1st cycle)", "41": "Specialized higher studies course", "42": "Professional higher technical course", "43": "Higher Education - Master (2nd cycle)", "44": "Higher Education - Doctorate (3rd cycle)"
};

export default class HierarchicalBar {
    constructor(containerSelector) {
        this.container = d3.select(containerSelector);
        this.totalWidth = 860; 
        this.currentHeight = 400; 
        
        this.baseSvg = this.container.append("svg")
            .attr("width", this.totalWidth)
            .attr("height", this.currentHeight + 150); 

        this.titleGroup = this.baseSvg.append("g")
            .attr("transform", `translate(20, 30)`);

        this.chartGroup = this.baseSvg.append("g")
            .attr("transform", `translate(150, 100)`)
            .style("transform-origin", "center");

        this.svgBoundary = this.chartGroup.append("path")
            .style("fill", "none")
            .style("stroke", "#000000")
            .style("stroke-width", "1px")
            .style("shape-rendering", "crispEdges");
            
        this.xScale = d3.scaleLinear();
        this.yScale = d3.scaleBand(); 
        
        this.xAxisG = this.chartGroup.append("g");
        this.yAxisG = this.chartGroup.append("g");
        this.barGroup = this.chartGroup.append("g").attr("class", "bars-container");
        
        this.setupStaticLabels();
    }

    setupStaticLabels() {
        this.breadcrumb = this.titleGroup.append("text")
            .attr("y", -10)
            .style("font-size", "12px")
            .style("fill", "#666")
            .text("Overview");

        this.title = this.titleGroup.append("text")
            .attr("y", 15)
            .style("font-size", "24px")
            .style("font-weight", "bold")
            .text("Parental Influence on Student Outcomes");

        this.subtitle = this.titleGroup.append("text")
            .attr("y", 35)
            .style("font-size", "14px");

        this.xAxisTitle = this.chartGroup.append("text")
            .style("text-anchor", "middle")
            .style("font-size", "13px")
            .style("fill", "#333");

        this.yAxisTitle = this.chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .style("font-size", "13px")
            .style("fill", "#333");
    }

    // Draw bars with rounded right corners
    generateBarPath(width, height, radius) {
        const safeWidth = Math.max(0, width);
        const r = Math.min(radius, safeWidth, height / 2);
        if (safeWidth === 0) return `M 0,0 Z`;
        return `M 0,0 H ${safeWidth - r} A ${r},${r} 0 0,1 ${safeWidth},${r} V ${height - r} A ${r},${r} 0 0,1 ${safeWidth - r},${height} H 0 Z`.replace(/\s+/g, " ").trim();
    }

    // Split long y-axis category text onto multiple lines
    wrapText(textSelection, width) {
        textSelection.each(function() {
            let text = d3.select(this);
            let fullText = text.text();
            text.text(null);
            
            let words = fullText.split(/\s+/).reverse();
            let word;
            let line = [];
            let lineNumber = 0;
            let lineHeight = 1.2; 
            let y = text.attr("y") || 0;
            let dy = parseFloat(text.attr("dy")) || 0.32;
            let tspan = text.append("tspan").attr("x", -10).attr("y", y).attr("dy", dy + "em");
            
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width && line.length > 1) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", -10).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    // Processes CSV into a nested hierarchy based on mother/father
    buildHierarchy(rawData, parentContext) {
        // Determine which columns to use
        const occCol = parentContext === "Mother" ? "mother_occupation" : "father_occupation";
        const eduCol = parentContext === "Mother" ? "mother_qual" : "father_qual";
        const occupationMap = parentContext === "Mother" ? MOTHER_OCCUPATIONS : FATHER_OCCUPATIONS;
        const educationMap = parentContext === "Mother" ? MOTHER_EDUCATION : FATHER_EDUCATION;

        // Filter out enrolled students and blank occupation data
        const filteredData = rawData.filter(d => 
            (d.student_status === "Graduate" || d.student_status === "Dropout") &&
            d[occCol] !== "99"
        );

        // Group data
        const nestedData = d3.rollup(filteredData, 
            v => v.length, 
            d => d.student_status, 
            d => occupationMap[d[occCol]] || `Unknown Occupation (${d[occCol]})`,
            d => educationMap[d[eduCol]] || `Unknown Education (${d[eduCol]})`
        );

        // Convert the map object into a standard nested array structure
        const hierarchyConfig = {
            name: "Root",
            children: Array.from(nestedData, ([outcome, occMapData]) => ({
                name: outcome,
                children: Array.from(occMapData, ([occName, eduMapData]) => ({
                    name: occName,
                    children: Array.from(eduMapData, ([eduName, count]) => ({
                        name: eduName,
                        value: count
                    }))
                }))
            }))
        };

        // Hierarchy, branch sums, and sort nodes
        return d3.hierarchy(hierarchyConfig)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
    }

    // Initial drawing of the chart and state transitions when swapping datasets
    render(rawData, parentContext) {
        // Track the current path to attempt to restore it if the dataset swaps
        let pathNames = [];
        if (this.currentNode) {
            let tempNode = this.currentNode;
            while (tempNode) {
                pathNames.unshift(tempNode.data.name);
                tempNode = tempNode.parent;
            }
        }

        this.currentContext = parentContext;
        this.rootNode = this.buildHierarchy(rawData, parentContext);
        this.currentNode = this.rootNode;
        
        // Navigate the new hierarchy using the saved path
        if (pathNames.length > 1) {
            for (let i = 1; i < pathNames.length; i++) {
                let targetName = pathNames[i];
                let matchedChild = this.currentNode.children && this.currentNode.children.find(c => c.data.name === targetName);
                if (matchedChild) {
                    this.currentNode = matchedChild;
                } else {
                    break;
                }
            }
        }

        // Update the headers based on the node depth
        if (this.currentNode.depth === 0) {
            this.subtitle.text("Showing Total Student Graduation & Dropout Counts");
            this.breadcrumb.text("Overview");
        } else if (this.currentNode.depth === 1) {
            this.subtitle.text(`Breakdown of Occupation for ${this.currentNode.data.name} Students`);
            this.breadcrumb.text(`Overview > ${this.currentNode.data.name}`);
        } else if (this.currentNode.depth === 2) {
            const outcomeName = this.currentNode.parent.data.name;
            const occName = this.currentNode.data.name;
            const truncatedOccupation = occName.length > 35 ? occName.substring(0, 35) + "..." : occName;
            this.subtitle.text("Breakdown of Education Level");
            this.breadcrumb.text(`Overview > ${outcomeName} > ${truncatedOccupation}`);
        }

        // Clear existing bars before a full re-render
        this.barGroup.selectAll(".bar-group").remove();
        this.updateChart(this.currentNode, "none");
    }

    updateChart(node, direction = "none") {
        const data = node.children || [];
        const isTopLevel = node.depth === 0;

        // Toggle back button visibility
        d3.select("#btn-back").style("display", isTopLevel ? "none" : "block");

        // Adjust margins dynamically
        const dynamicMarginLeft = isTopLevel ? 150 : 350;
        const chartWidth = this.totalWidth - dynamicMarginLeft - 50; 
        
        // Calculate canvas height based on the number of bars
        this.currentHeight = Math.max(300, data.length * 60);

        // Pre-set the scale if entering from a zoom transition
        if (direction === "in") {
            this.chartGroup.attr("transform", `translate(${dynamicMarginLeft}, 100) scale(0.95)`).style("opacity", 0);
        } else if (direction === "out") {
            this.chartGroup.attr("transform", `translate(${dynamicMarginLeft}, 100) scale(1.05)`).style("opacity", 0);
        }

        // Transition canvas container dimensions and apply final zoom state
        this.baseSvg.transition().duration(750)
            .attr("height", this.currentHeight + 150);
            
        this.chartGroup.transition().duration(750)
            .attr("transform", `translate(${dynamicMarginLeft}, 100) scale(1)`)
            .style("opacity", 1);

        this.svgBoundary.transition().duration(750)
            .attr("d", `M 0,0 V ${this.currentHeight} H ${chartWidth}`);

        // x Scale
        const maxDataValue = d3.max(data, d => d.value) || 0;
        let xTicks;

        this.xScale.range([0, chartWidth]);

        if (isTopLevel) {
            const maxDomain = Math.ceil(maxDataValue / 400) * 400; 
            this.xScale.domain([0, maxDomain]);
            xTicks = d3.range(0, maxDomain + 1, 400);
        } else {
            this.xScale.domain([0, maxDataValue * 1.1]).nice();
            xTicks = this.xScale.ticks(6); 
        }
        
        // y Scale
        const yRange = isTopLevel ? [70, this.currentHeight - 70] : [10, this.currentHeight - 10];
        this.yScale.range(yRange).padding(0.2).domain(data.map(d => d.data.name));

        const barThickness = Math.min(this.yScale.bandwidth(), 45);
        const yOffset = (this.yScale.bandwidth() - barThickness) / 2;
        
        // x Axis
        this.xAxisG.transition().duration(750)
            .attr("transform", `translate(0,${this.currentHeight})`);

        const ticks = this.xAxisG.selectAll(".tick-group").data(xTicks);
        ticks.exit().remove();
        
        const ticksEnter = ticks.enter().append("g").attr("class", "tick-group");

        ticksEnter.append("line").attr("class", "grid-line")
            .attr("y1", 0).attr("y2", -this.currentHeight) 
            .style("stroke", "#000000").style("stroke-opacity", d => d === 0 ? 0 : 0.15)
            .style("shape-rendering", "crispEdges");

        ticksEnter.append("line").attr("class", "tick-mark")
            .attr("y1", 0).attr("y2", 6)
            .style("stroke", "#000000").style("shape-rendering", "crispEdges");

        ticksEnter.append("text").attr("class", "tick-label")
            .attr("y", 22).style("text-anchor", "middle").style("font-size", "12px").style("fill", "#333");

        const ticksMerge = ticksEnter.merge(ticks);
        ticksMerge.transition().duration(750).attr("transform", d => `translate(${this.xScale(d)}, 0)`);
        
        ticksMerge.select(".grid-line").transition().duration(750).attr("y2", -this.currentHeight);
        ticksMerge.select(".tick-label").text(d => d);

        // Render y Axis, wrap text labels and make them clickable for drill-down.
        const yAxis = d3.axisLeft(this.yScale).tickSize(0);
        this.yAxisG.call(yAxis);
        this.yAxisG.selectAll(".domain").remove();
        
        this.yAxisG.selectAll(".tick text")
            .style("font-size", isTopLevel ? "13px" : "11px")
            .style("fill", "#333")
            .style("cursor", tickName => {
                const matchedNode = data.find(d => d.data.name === tickName);
                return (matchedNode && matchedNode.children) ? "pointer" : "default";
            })
            .on("click", (event, tickName) => {
                const matchedNode = data.find(d => d.data.name === tickName);
                if (matchedNode && matchedNode.children) {
                    this.drillDown(matchedNode);
                }
            })
            .call(this.wrapText.bind(this), dynamicMarginLeft - 30); 

        // Data join
        const barXOffset = 0.6; 
        const bars = this.barGroup.selectAll(".bar-group").data(data, d => d.data.name);
        
        // Remove old bars
        bars.exit().transition().duration(500).style("opacity", 0).remove();

        // Append new bars
        const barsEnter = bars.enter()
            .append("g")
            .attr("class", "bar-group")
            .attr("transform", d => `translate(${barXOffset}, ${this.yScale(d.data.name) + yOffset})`);

        barsEnter.append("path")
            .attr("class", `bar ${this.currentContext === "Mother" ? "bar-mother" : "bar-father"}`)
            .style("cursor", d => d.children ? "pointer" : "default")
            .on("click", (event, d) => {
                if (d.children) this.drillDown(d);
            });

        // Append count labels to the end of each ba
        barsEnter.append("text")
            .attr("class", "value-label")
            .attr("y", barThickness / 2)
            .attr("dy", "0.35em")
            .style("fill", "#000000")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("x", 0)
            .style("pointer-events", "none");

        // Merge and animate enter + update selections
        const barsMerge = barsEnter.merge(bars);
        
        barsMerge.transition().duration(750)
            .attr("transform", d => `translate(${barXOffset}, ${this.yScale(d.data.name) + yOffset})`);
            
        barsMerge.select("path").transition().duration(750)
            .attr("class", `bar ${this.currentContext === "Mother" ? "bar-mother" : "bar-father"}`)
            .attr("d", d => this.generateBarPath(this.xScale(d.value) - barXOffset, barThickness, 10)); // Radius set to 10
            
        barsMerge.select("text").transition().duration(750)
            .attr("x", d => Math.max(this.xScale(d.value) - barXOffset - 10, 20)) 
            .text(d => d.value);
            
        // Transition axis titles
        this.xAxisTitle.transition().duration(750)
            .attr("x", chartWidth / 2)
            .attr("y", this.currentHeight + 45)
            .text("Number of Students");

        let newYAxisTitle = "Student Outcome";
        if (this.currentNode.depth === 1) newYAxisTitle = "Parent Occupation";
        else if (this.currentNode.depth === 2) newYAxisTitle = "Parent Education Level";

        this.yAxisTitle.transition().duration(750)
            .attr("x", -this.currentHeight / 2)
            .attr("y", -dynamicMarginLeft + 20)
            .text(newYAxisTitle);
    }

    // Navigates one level deeper with a zoom transition
    drillDown(d) {
        const isCurrentlyTopLevel = this.currentNode.depth === 0;
        const currentMargin = isCurrentlyTopLevel ? 150 : 350;

        this.currentNode = d;
        
        if (d.depth === 1) {
            this.subtitle.text(`Breakdown of Occupation for ${d.data.name} Students`);
            this.breadcrumb.text(`Overview > ${d.data.name}`); 
        } else if (d.depth === 2) {
            const outcomeName = d.parent.data.name;
            const occName = d.data.name;
            const truncatedOccupation = occName.length > 35 ? occName.substring(0, 35) + "..." : occName;
            this.subtitle.text("Breakdown of Education Level");
            this.breadcrumb.text(`Overview > ${outcomeName} > ${truncatedOccupation}`);
        }
        
        // Scale up and fade out the current chart
        this.chartGroup.transition().duration(400)
            .attr("transform", `translate(${currentMargin}, 100) scale(1.05)`)
            .style("opacity", 0)
            .on("end", () => {
                this.updateChart(this.currentNode, "in");
            });
    }

    // Navigates one level up with a zoom transition
    drillUp() {
        if (this.currentNode.parent) {
            const isCurrentlyTopLevel = this.currentNode.depth === 0;
            const currentMargin = isCurrentlyTopLevel ? 150 : 350;

            this.currentNode = this.currentNode.parent;
            
            if (this.currentNode.depth === 0) {
                this.subtitle.text("Showing Total Student Graduation & Dropout Counts");
                this.breadcrumb.text("Overview");
            } else if (this.currentNode.depth === 1) {
                this.subtitle.text(`Breakdown of Occupation for ${this.currentNode.data.name} Students`);
                this.breadcrumb.text(`Overview > ${this.currentNode.data.name}`);
            }
            
            // Scale down and fade out the current chart
            this.chartGroup.transition().duration(400)
                .attr("transform", `translate(${currentMargin}, 100) scale(0.95)`)
                .style("opacity", 0)
                .on("end", () => {
                    this.updateChart(this.currentNode, "out");
                });
        }
    }
}