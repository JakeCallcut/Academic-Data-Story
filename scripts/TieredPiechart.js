export default class TieredPiechart     //Export the class so it can be imported in main.js.
{
    constructor(container) 
    {
        this.container = container;
        this.width = 900;
        this.height = 900;
        this.radius = Math.min(this.width, this.height) / 2;  //Radius of charts is half the smaller dimension of the svg.
        this.selectedFreetime = null;   //Currently selected freetime slice.
        this.selectedStudytime = null;  //Currently selected studytime slice.
        this.selectedTraveltime = null; //Currently selected traveltime slice.
        this.previousStats = {  //Used to store the previous stats for the animation when the selection changes.
            failed: 0,
            passed: 0,
            total: 0
        };
    }

    render(data)
    {
        d3.select(this.container).selectAll("*").remove();   //Removes old chart before drawing a new one.
        const svg = d3.select(this.container)   //Create svg element inside the container.
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", `0 0 ${this.width} ${this.height}`);

        const chartGroup = svg.append("g")     //Create group to allow for easy translation relative to the centre.
            .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`);

        const legendText = svg.append("text")
            .attr("x", this.width / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "600");

        legendText
            .append("tspan")
            .style("fill", "#4e79a7") // Blue for freetime.
            .text("Freetime (1–5)");

        legendText
            .append("tspan")
            .style("fill", "#555") //Spacer.
            .text("   |   ");

        legendText
            .append("tspan")
            .style("fill", "#e15759") // Red for studytime.
            .text("Studytime (1–4)");

        legendText
            .append("tspan")
            .style("fill", "#555") //Spacer.
            .text("   |   ");

        legendText
            .append("tspan")
            .style("fill", "#6e7f92") // Grey for traveltime.
            .text("Traveltime (1–4)");

        //HOVER ANIMATION

        const highlightRing = (sliceClass, currentElement) => { //Highlight hovered slice and dim the rest in the same circle.
            chartGroup.selectAll(`.${sliceClass}`)
                .attr("opacity", 0.7);

            d3.select(currentElement)
                .attr("opacity", 1)
                .attr("stroke", "#000000")
                .attr("stroke-width", "3px");
        };

        const resetRing = (sliceClass) => { //Reset all slices to default state.
            chartGroup.selectAll(`.${sliceClass}`)
                .attr("opacity", 1)
                .attr("stroke", "#ffffff")
                .attr("stroke-width", "2px");
        };


        //CENTRE STATS

            const statsData = () => {  //Gets data filtered based on the selection, used for stats in centre of chart.
            if (this.selectedFreetime !== null && this.selectedStudytime !== null && this.selectedTraveltime !== null) { //If all three are selected, filter data based on all three.
                return data.filter(d =>
                    +d.student_freetime === this.selectedFreetime &&
                    +d.student_studytime === this.selectedStudytime &&
                    +d.student_traveltime === this.selectedTraveltime
                );
            }

            if (this.selectedFreetime !== null && this.selectedStudytime !== null) { //If freetime and studytime are selected, filter data based on those two.
                return data.filter(d =>
                    +d.student_freetime === this.selectedFreetime &&
                    +d.student_studytime === this.selectedStudytime
                );
            }

            if (this.selectedFreetime !== null) { //If only freetime is selected, filter data based on that.
                return data.filter(d =>
                    +d.student_freetime === this.selectedFreetime
                );
            }

            return data;
        };

        const getSelectionLabel = () => {
            if (this.selectedFreetime !== null && this.selectedStudytime !== null && this.selectedTraveltime !== null) { //Label in centre of chart that shows the current selection, changes based on how many tiers have been selected.
                return `${this.selectedFreetime} → ${this.selectedStudytime} → ${this.selectedTraveltime}`;
            }

            if (this.selectedFreetime !== null && this.selectedStudytime !== null) { //Label for when freetime and studytime are selected.
                return `${this.selectedFreetime} → ${this.selectedStudytime}`;
            }

            if (this.selectedFreetime !== null) { //Label for when only freetime is selected.
                return `${this.selectedFreetime}`;
            }

            return "";
        };

        const getStats = (filteredData) => {
            const total = filteredData.length;  //Calculate total students.
            const failed = filteredData.filter(d => d.student_status === "fail").length; //Calculate number of failed students.
            const passed = filteredData.filter(d => d.student_status === "pass").length; //Calculate number of passed students.
            const failRate = total > 0 ? ((failed / total) * 100) : 0;   //Calculate fail rate, avoid division by zero.

            return { total, failed, passed, failRate };
        };

        const centreData = statsData();
        const centreStats = getStats(centreData);
        const centreLabel = getSelectionLabel();

        const centreGroup = chartGroup.append("g")
            .attr("class", "centre-stats")
            .attr("transform", "translate(0, -15)");

        centreGroup.append("text")
            .attr("class", "centre-title")
            .attr("text-anchor", "middle")
            .attr("y", -42)
            .style("font-size", "24px")
            .style("font-weight", "700")
            .style("fill", "#274C77")
            .text(centreLabel);

        const rateText = centreGroup.append("text")
            .attr("class", "centre-rate")
            .attr("text-anchor", "middle")
            .attr("y", 8)
            .style("font-size", "40px")
            .style("font-weight", "700")
            .style("fill", "#274C77");

        const startRate = Number.isFinite(this.previousFailRate) ? this.previousFailRate : 0; //Use previous fail rate.
        const endRate = Number.isFinite(centreStats.failRate) ? centreStats.failRate : 0; //Use current fail rate.

        rateText        //Animate transition from previous to current failt rate.
            .transition()
            .duration(600)
            .ease(d3.easeCubicOut)
            .tween("text", function () {
                const node = this;
                const i = d3.interpolateNumber(startRate, endRate);
                return function (t) {
                    node.textContent = `${i(t).toFixed(1)}%`;
                };
            });

        this.previousFailRate = endRate; //Update previous fail rate for the next transition.

        centreGroup.append("text")
            .attr("class", "centre-subtitle")
            .attr("text-anchor", "middle")
            .attr("y", 28)
            .style("font-size", "15px")
            .style("fill", "#274C77")
            .text("fail rate");
       
        const countsText = centreGroup.append("text")
            .attr("text-anchor", "middle")
            .attr("y", 65)
            .style("font-size", "15px")
            .style("fill", "#274C77");

        countsText                  //Animate transition from previous to current counts of failed and passed students.
            .transition()
            .duration(600)
            .ease(d3.easeCubicOut)
            .tween("text", () => {
                const node = countsText.node();

                const iFailed = d3.interpolateNumber(this.previousStats.failed, centreStats.failed);    //Interpolate between previous and current failed count.
                const iPassed = d3.interpolateNumber(this.previousStats.passed, centreStats.passed);    //Interpolate between previous and current passed count.

                return function (t) {   //Update text content at each step of the animation.
                    const f = Math.round(iFailed(t));
                    const p = Math.round(iPassed(t));
                    node.textContent = `${f} failed · ${p} passed`;
                };
            });

        const totalText = centreGroup.append("text")
            .attr("text-anchor", "middle")
            .attr("y", 80)
            .style("font-size", "15px")
            .style("fill", "#274C77");

        totalText           //Animate transition from previous to current total count of students.
            .transition()
            .duration(600)
            .ease(d3.easeCubicOut)
            .tween("text", () => {
                const node = totalText.node();

                const iTotal = d3.interpolateNumber(this.previousStats.total, centreStats.total);

                return function (t) {
                    node.textContent = `${Math.round(iTotal(t))} total`;
                };
            })
            .on("end", () => {      //Update only AFTER the animation is finished.
                this.previousStats = {
                    failed: centreStats.failed,
                    passed: centreStats.passed,
                    total: centreStats.total
                };
            });

    //FREETIME PIE CHART

        const freetimeGroup = d3.rollups(data, v => v.length, d => +d.student_freetime).map(([key, value]) => ({category: key, count: value})).sort((a, b) => a.category - b.category); //Group the lower-ed students by freetime and count the number of students in each category then sort by category (1->5)

        const pie = d3.pie()      //Create pie layour generator.
            .value(d => d.count)
            .sort(null);

        const arc = d3.arc()    //Create arc generator for the pie slices.
            .innerRadius(this.radius * 0.3)
            .outerRadius(this.radius * 0.5);

        const colour = d3.scaleOrdinal()
            .domain([1, 2, 3, 4, 5])
            .range(["#739fce", "#638cb8", "#4e79a7", "#3a6ea5", "#1d538d"]); //Blue shades.
    
        const freetimeArcs = pie(freetimeGroup);

        chartGroup.selectAll(".freetime-slice")    //Pie slices.
            .data(freetimeArcs)
            .enter()
            .append("path")
            .attr("class", "freetime-slice")
            .attr("d", arc)
            .attr("fill", d => {
                if (this.selectedFreetime === null) return colour(d.data.category);
                return this.selectedFreetime === d.data.category ? colour(d.data.category) : "#c2c2c2"; //Dimming.
            })
            .attr("stroke", "#ffffff")
            .attr("stroke-width", "2px")
            .style("cursor", "pointer")
            .on("mouseenter", function () { //Highlight on hover & dim rest.
                highlightRing("freetime-slice", this);
            })
            .on("mouseleave", function () { //Reset on hover out.
                resetRing("freetime-slice");
            })
            .on("click", (event, d) => {
                if (this.selectedFreetime === d.data.category) {
                    this.selectedFreetime = null;      //Click again to reset.
                    this.selectedStudytime = null;
                    this.selectedTraveltime = null;
                } else {
                    this.selectedFreetime = d.data.category;
                    this.selectedStudytime = null;     //Reset deeper selection when parent changes.
                    this.selectedTraveltime = null;
                }

                this.render(data);
            });

        chartGroup.selectAll(".freetime-label")    //Labels for the pie slices.
            .data(freetimeArcs)
            .join("text")
            .attr("class", "freetime-label")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "600")
            .style("fill", "#ffffff")
            .text(d => d.data.category);
    
    //STUDYTIME PIE CHART

        const studytimeArc = d3.arc()   //Arc generator for studytime slices, inner radius is same as freetime outer to create tiered effect.
            .innerRadius(this.radius * 0.5)
            .outerRadius(this.radius * 0.7);

        const studytimeColour = d3.scaleOrdinal()
            .domain([1, 2, 3, 4])
            .range(["#e97375", "#e15759", "#d83b3e", "#ac181a"]); //Red shades.

        let studytimeData = [];  //Will hold the data for the studytime pie chart in the same format as the freetime data, it's an empty array since no selection for studytime has been made yet.
    
        if (this.selectedFreetime === null) { //Default state, no freetime slice selected.
            freetimeArcs.forEach(parentArc => {

                const parentValues = data.filter(d => +d.student_freetime === parentArc.data.category); //Filter data for students that match.
                const studytimeGroup = d3.rollups(parentValues, v => v.length, d => +d.student_studytime).map(([key, value]) => ({category: key, count: value})).sort((a, b) => a.category - b.category); //Group the students in the current freetime category by studytime and count the number of students in each category then sort by category (1->4).

                const total = d3.sum(studytimeGroup, d => d.count);    //Total number of students in the current freetime category to calculate the percentage for the labels.

                let studytimeAngle = parentArc.startAngle;    //Starting angle for the first studytime slice.
                const parentAngle = parentArc.endAngle - parentArc.startAngle;  //Total available angle is the max angle for the study slice.

                studytimeGroup.forEach(group => {
                    const angleSize = (group.count / total) * parentAngle;   //Calculate the angle size for current studytime.

                    studytimeData.push({                //Push the data for the current studytime slice to the studytimeData array, this will be used to render the studytime pie chart when a freetime slice is clicked.
                        freetime: parentArc.data.category,
                        studytime: group.category,
                        count: group.count,
                        startAngle: studytimeAngle,
                        endAngle: studytimeAngle + angleSize
                    })

                    studytimeAngle += angleSize;    //Update the starting angle for the next studytime slice.
                });

        });
        } else {    //State when a freetime slice is selected.
                const filteredValues = data.filter(d => +d.student_freetime === this.selectedFreetime); //Filter data for freetime category.

                const studytimeGroup = d3.rollups(filteredValues, v => v.length, d => +d.student_studytime).map(([key, value]) => ({category: key, count: value})).sort((a, b) => a.category - b.category); //Group filtered data and sort.

                const studytimePie = d3.pie().value(d => d.count).sort(null);

                studytimeData = studytimePie(studytimeGroup).map(d => ({ //Map data to same format but with new angles based on filtered data.
                    freetime: this.selectedFreetime,
                    studytime: d.data.category,
                    count: d.data.count,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
            }));
        }

        chartGroup.selectAll(".studytime-slice")  //Studytime slices.
            .data(studytimeData)
            .enter()
            .append("path")
            .attr("class", "studytime-slice")
            .attr("d", d => studytimeArc(d))
            .attr("fill", d => {
                if (this.selectedStudytime === null) return studytimeColour(d.studytime);
                return this.selectedStudytime === d.studytime ? studytimeColour(d.studytime) : "#c2c2c2";   //Dimming.
            })
            .attr("stroke", "#ffffff")
            .style("cursor", "pointer")
            .on("mouseenter", function () { //Highlight on hover & dim rest.
                highlightRing("studytime-slice", this);
            })
            .on("mouseleave", function () { //Reset on hover out.
                resetRing("studytime-slice");
            })
            .on("click", (event, d) => {
                if (this.selectedFreetime === null) return;

                if (this.selectedStudytime === d.studytime) {
                    this.selectedStudytime = null;   //Click again to reset studytime selection.
                    this.selectedTraveltime = null;
                } else {
                    this.selectedStudytime = d.studytime;
                    this.selectedTraveltime = null;
                }

                this.render(data);
            });

        chartGroup.selectAll(".studytime-label")    //Studytime labels, only rendered if the slice is big enough to fit the number.
            .data(studytimeData.filter(d => (d.endAngle - d.startAngle) > 0.15))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${studytimeArc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "600")
            .style("fill", "#FFFFFF")
            .text(d => d.studytime);

    //TRAVELTIME PIE CHART

        let traveltimeData = [];  //Will hold the data for the traveltime pie chart in the same format as the freetime and studytime data.

        if (this.selectedFreetime !== null && this.selectedStudytime !== null) {  //Drill-down state for both freetime AND studytime.
            
            const parentValues = data.filter(d => +d.student_freetime === this.selectedFreetime && +d.student_studytime === this.selectedStudytime); //Filter the data to get the students that match the current freetime and studytime category.
            const traveltimeGroup = d3.rollups(parentValues, v => v.length, d => +d.student_traveltime).map(([key, value]) => ({category: key, count: value})).sort((a, b) => a.category - b.category); //Group the students in the current freetime category by traveltime and count the number of students in each category then sort by category (1->4).

            const traveltimePie = d3.pie().value(d => d.count).sort(null); //Create pie layour for traveltime based on the new filtered data.

            traveltimeData = traveltimePie(traveltimeGroup).map(d => ({ //Map data to same format but with new angles based on filtered data.
                freetime: this.selectedFreetime,
                studytime: this.selectedStudytime,
                traveltime: d.data.category,
                count: d.data.count,
                startAngle: d.startAngle,
                endAngle: d.endAngle
            }));

        } else { //Default state.
            studytimeData.forEach(parentArc => {

            const parentValues = data.filter(d => +d.student_freetime === parentArc.freetime && +d.student_studytime === parentArc.studytime); //Filter the data to get the students that match the current freetime and studytime category.
            const traveltimeGroup = d3.rollups(parentValues, v => v.length, d => +d.student_traveltime).map(([key, value]) => ({category: key, count: value})).sort((a, b) => a.category - b.category); //Group the students in the current freetime category by traveltime and count the number of students in each category then sort by category (1->4).

            const total = d3.sum(traveltimeGroup, d => d.count);    //Total number of students in the current traveltime category to calculate the percentage for the labels.

            let traveltimeAngle = parentArc.startAngle;    //Starting angle for the first traveltime slice.
            const parentAngle = parentArc.endAngle - parentArc.startAngle;  //Total available angle is the max angle for the study slice.

            traveltimeGroup.forEach(group => {
                const angleSize = (group.count / total) * parentAngle;   //Calculate the angle size for current traveltime.

                traveltimeData.push({         //Push the data for the current traveltime slice to the traveltimeData array.
                    freetime: parentArc.freetime,
                    studytime: parentArc.studytime,
                    traveltime: group.category,
                    count: group.count,
                    startAngle: traveltimeAngle,
                    endAngle: traveltimeAngle + angleSize
                })

                traveltimeAngle += angleSize;    //Update the starting angle for the next traveltime slice.
                
                });
            })
        }

        const traveltimeArc = d3.arc()   //Arc generator for traveltime slices, inner radius is same as studytime outer to create tiered effect.
            .innerRadius(this.radius * 0.7)
            .outerRadius(this.radius * 0.9);

        const traveltimeColour = d3.scaleOrdinal()
            .domain([1, 2, 3, 4])
            .range(["#8a9aac", "#6e7f92", "#607083", "#4c5c6e"]); //Silver shades.

        chartGroup.selectAll(".traveltime-slice")  //Traveltime slices.
            .data(traveltimeData)
            .enter()
            .append("path")
            .attr("class", "traveltime-slice")
            .attr("d", d => traveltimeArc(d))
            .attr("fill", d => {
                if (this.selectedTraveltime === null) return traveltimeColour(d.traveltime);
                return this.selectedTraveltime === d.traveltime ? traveltimeColour(d.traveltime) : "#c2c2c2"; //Dimming.
            })
            .attr("stroke", "#ffffff")
            .style("cursor", "pointer")
            .on("mouseenter", function () { //Highlight on hover & dim rest.
                highlightRing("traveltime-slice", this);
            })
            .on("mouseleave", function () { //Reset on hover out.
                resetRing("traveltime-slice");
            })
            .on("click", (event, d) => {
                if (this.selectedFreetime === null || this.selectedStudytime === null) return;

                if (this.selectedTraveltime === d.traveltime) {
                    this.selectedTraveltime = null;   //Click again to reset traveltime selection.
                } else {
                    this.selectedTraveltime = d.traveltime;
                }

                this.render(data);
            });

        chartGroup.selectAll(".traveltime-label")    //Traveltime labels, only rendered if the slice is big enough to fit the number.
            .data(traveltimeData.filter(d => (d.endAngle - d.startAngle) > 0.15))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${traveltimeArc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "600")
            .style("fill", "#FFFFFF")
            .text(d => d.traveltime);
    }
}