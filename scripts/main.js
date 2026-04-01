'use strict';

import HierarchicalBar from './HierarchicalBar.js';
import BrushScatterplot from './BrushScatterplot.js';
import TieredPieChart from './TieredPiechart.js';
import Heatmap from './Heatmap.js';

// Loads higher education data into array format
// DO NOT REMOVE OR RENAME ANY VARIABLES WITHOUT ASKING
let higherEd = await d3.csv("../data/higher_ed_scored.csv", (d) => {
    return {
        marriage_status: d.marital_status,
        student_course: d.course,
        attendance_time: d["daytime/evening_attendance"],
        student_prev_qual: d.previous_qualification,
        nationality: d.nacionality,
        mother_qual: d["mother's_qualification"],
        father_qual: d["father's_qualification"],
        mother_occupation: d["mother's_occupation"],
        father_occupation: d["father's_occupation"],
        admis_grade: d.admission_grade,
        was_displaced: d.displaced,
        special_needs: d.educational_special_needs,
        is_debtor: d.debtor,
        tuition_fee_status: d.tuition_fees_up_to_date,
        student_gender: d.gender,
        holds_scholarship: d.scholarship_holder,
        enrollment_age: d.age_at_enrollment,
        is_not_national: d.international,
        country_unemployrate: d.unemployment_rate,
        country_inflationrate: d.inflation_rate,
        country_gdp: d.gdp,
        student_status: d.target
    };
});

console.log(higherEd);

// Scatter Plot Data Functions to get specific fields
let ScatterData = await d3.csv("data/higher_ed_scored.csv", (d) => {
    return {
        student_gender: d.gender,
        admin_grade: +d.admission_grade,
        units_firstsem: +d["curricular_units_1st_sem_(grade)"],
        student_status: d.target
    };
});

// Removes values that are 0 as any curricular unit of 0 is an immediate dropout which does not need analysed
ScatterData = ScatterData.filter(d => d.units_firstsem > 0);

//console.log("Current Scatter Data: ")
//console.log(ScatterData);

// Renders the scatterplot
let scat1 = new BrushScatterplot('div#scat1', 928, 600, [20,30,40,30], 'div#scat1_rate');
scat1.render(ScatterData).setLabels('Admission Grade', 'Curricular Units First Sem');

// create heatmap
let heatmap1 = new Heatmap('.heatmap1', 220, 220, [0, 0, 40, 80], function(group) {
    scat1.highlightByGroup(group);
});

// Button to generate heatmap from current selection
document.querySelector('.gen_heatmap').addEventListener('click', () => {
    // If no selection, use all data
    const dataToUse = (scat1.values && scat1.values.length !== scat1.data.length && scat1.values.length > 0)
        ? scat1.values
        : scat1.data;
    heatmap1.update(dataToUse);
});

// Loads secondary education data into array format
// DO NOT REMOVE OR RENAME ANY VARIABLES WITHOUT ASKING
let lowerEd = await d3.csv("../data/lower_ed_scored.csv", (d) => {
    return {
        gender: d.sex,
        student_age: d.age,
        student_address: d.address,
        family_size: d.famsize,
        parental_status: d.pstatus,
        mother_edu: d.medu,
        father_edu: d.fedu,
        mother_job: d.mjob,
        father_job: d.fjob,
        student_guardian: d.guardian,
        student_traveltime: d.traveltime,
        student_studytime: d.studytime,
        student_freetime: d.freetime,
        student_active: d.activities,
        attend_nursery: d.nursery,
        in_relationship: d.romantic,
        family_relations: d.famrel,
        student_health: d.health,
        student_status: (d.target || "").trim().toLowerCase()  //Target variable for sunburst chart.
    };
});

console.log(lowerEd);

if (document.querySelector(".Sunburst")) {
    const sunburst = new TieredPieChart(".Sunburst");
    sunburst.render(lowerEd);
}

if (document.getElementById("chart-container")) {
    // Initialise the Hierarchical bar chart instance
    const chart = new HierarchicalBar("#chart-container");
    
    // DOM elements for UI controls
    const btnMother = document.getElementById("btn-mother");
    const btnFather = document.getElementById("btn-father");
    const chartControls = document.getElementById("chart-controls");

    function updateTabStyles(activeTab) {
        if (activeTab === "Mother") {
            btnMother.classList.add("active-tab");
            btnFather.classList.remove("active-tab");
            chartControls.style.background = "var(--steel-blue)";
        } else {
            btnFather.classList.add("active-tab");
            btnMother.classList.remove("active-tab");
            chartControls.style.background = "var(--dusk-blue)";
        }
    }

    //Initial state of the chart and UI to mother on page load
    chart.render(higherEd, "Mother");
    updateTabStyles("Mother");

    //Re-render the chart and update styles when the mother tab is clicked
    btnMother.addEventListener("click", () => {
        chart.render(higherEd, "Mother");
        updateTabStyles("Mother");
    });
    
    //Re-render the chart and update styles when the father tab is clicked
    btnFather.addEventListener("click", () => {
        chart.render(higherEd, "Father");
        updateTabStyles("Father");
    });

    //drillUp method to the back button to navigate up the hierarchy
    document.getElementById("btn-back").addEventListener("click", () => {
        chart.drillUp();
    });
}