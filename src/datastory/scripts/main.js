'use strict';

// Loads higher education data into array format
// DO NOT REMOVE OR RENAME ANY VARIABLES WITHOUT ASKING
let higherEd = await d3.csv("data/higher_ed_scored.csv", (d) => {
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

// Loads secondary education data into array format
// DO NOT REMOVE OR RENAME ANY VARIABLES WITHOUT ASKING
let lowerEd = await d3.csv("data/lower_ed_scored.csv", (d) => {
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
        student_health: d.health
    };
});

console.log(lowerEd);