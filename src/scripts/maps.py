
#file containing maps for all of the unordered categorical attributes
#some are industry standard (e.g. ISO-3166) others are arbitrary

MARITAL_STATUS = {
    1 : "single", 
    2 : "married", 
    3 : "widower",
    4 : "divorced", 
    5 : "facto union", 
    6 : "legally separated",
}

DAYTIME_ATTENDENCE = {
    1 : "daytime",
    0 : "evening",
}

YES_NO = {
    1 : "yes",
    0 : "no",
}

MALE_FEMALE = {
    1 : "male",
    0 : "female",
}

#ISCO-08
OCCUPATION = {
    0: "student",
    1: "legislative_and_executive_representatives_and_managers",
    2: "specialists_in_intellectual_and_scientific_activities",
    3: "intermediate_level_technicians_and_professions",
    4: "administrative_staff",
    5: "personal_services_security_and_sales_workers",
    6: "farmers_and_skilled_agriculture_fisheries_forestry_workers",
    7: "skilled_industry_construction_and_crafts_workers",
    8: "installation_and_machine_operators_and_assembly_workers",
    9: "unskilled_workers",
    10: "armed_forces_professions",
    90: "other_situation",
    99: "unknown",
    101: "armed_forces_officers",
    102: "armed_forces_sergeants",
    103: "other_armed_forces_personnel",
    112: "administrative_and_commercial_services_directors",
    114: "hospitality_trade_and_services_directors",
    121: "physical_sciences_math_engineering_specialists",
    122: "health_professionals",
    123: "teachers",
    124: "finance_accounting_and_admin_specialists",
    125: "ict_specialists",
    131: "intermediate_science_and_engineering_technicians",
    132: "intermediate_health_technicians",
    134: "intermediate_legal_social_cultural_technicians",
    135: "ict_technicians",
    141: "office_and_data_processing_workers",
    143: "accounting_financial_and_registry_operators",
    144: "other_administrative_support_staff",
    151: "personal_service_workers",
    152: "sellers",
    153: "personal_care_workers",
    154: "protection_and_security_services",
    161: "market_oriented_farmers_and_animal_producers",
    163: "subsistence_farmers_fishers_and_hunters",
    171: "skilled_construction_workers_except_electricians",
    172: "metal_machinery_and_related_trades_workers",
    173: "printing_precision_and_craft_workers",
    174: "electrical_and_electronic_trades_workers",
    175: "food_processing_woodworking_and_craft_workers",
    181: "fixed_plant_and_machine_operators",
    182: "assembly_workers",
    183: "drivers_and_mobile_equipment_operators",
    191: "cleaning_workers",
    192: "unskilled_agriculture_fisheries_forestry_workers",
    193: "unskilled_industry_construction_transport_workers",
    194: "meal_preparation_assistants",
    195: "street_vendors_and_street_service_workers"
}

#ISCED-97 / ISCED-2011
EDUCATION = {
    1: "secondary_education_completed",
    2: "higher_education_bachelor",
    3: "higher_education_degree",
    4: "higher_education_master",
    5: "higher_education_doctorate",
    6: "higher_education_attendance_not_completed",
    9: "secondary_education_not_completed",
    10: "eleventh_year_not_completed",
    11: "seventh_year_old_system",
    12: "other_eleventh_year",
    13: "complementary_high_school_second_year",
    14: "tenth_year_completed",
    18: "general_commerce_course",
    19: "basic_education_third_cycle",
    20: "complementary_high_school_course",
    22: "technical_professional_course",
    25: "complementary_high_school_not_completed",
    26: "seventh_year",
    27: "general_high_school_second_cycle",
    29: "ninth_year_not_completed",
    30: "eighth_year",
    31: "general_administration_and_commerce_course",
    33: "supplementary_accounting_and_administration",
    34: "unknown",
    35: "cannot_read_or_write",
    36: "can_read_without_primary_education",
    37: "basic_education_first_cycle",
    38: "basic_education_second_cycle",
    39: "technological_specialisation_course",
    40: "higher_education_degree_first_cycle",
    41: "specialised_higher_studies",
    42: "professional_higher_technical_course",
    43: "higher_education_master_second_cycle",
    44: "higher_education_doctorate_third_cycle"
}

#ISO 3166
NATIONS = {
    1: "portuguese",
    2: "german",
    6: "spanish",
    11: "italian",
    13: "dutch",
    14: "english",
    17: "lithuanian",
    21: "angolan",
    22: "cape_verdean",
    24: "guinean",
    25: "mozambican",
    26: "santomean",
    32: "turkish",
    41: "brazilian",
    62: "romanian",
    100: "moldovan",
    101: "mexican",
    103: "ukrainian",
    105: "russian",
    108: "cuban",
    109: "colombian"
}

#non-standard order
COURSE = {
    33: "biofuel_production_technologies",
    171: "animation_and_multimedia_design",
    8014: "social_service_evening",
    9003: "agronomy",
    9070: "communication_design",
    9085: "veterinary_nursing",
    9119: "informatics_engineering",
    9130: "equinculture",
    9147: "management",
    9238: "social_service",
    9254: "tourism",
    9500: "nursing",
    9556: "oral_hygiene",
    9670: "advertising_and_marketing_management",
    9773: "journalism_and_communication",
    9853: "basic_education",
    9991: "management_evening"
}