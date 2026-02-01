import pandas as pd
import maps

#config vars
HIGHER_ED_RAW = '../../data/raw/higher_ed.csv'
LOWER_ED_RAW = '../../data/raw/lower_ed.csv'
HIGHER_ED_PROC =  '../../data/processed/higher_ed.csv'
LOWER_ED_PROC = '../../data/processed/lower_ed.csv'

#Fucntion to clean and preprocess the higher education dataset
def clean_higher():
    #read the csv file and get rid of whitespace in the headers
    higher_ed_df = pd.read_csv(HIGHER_ED_RAW, sep=";")
    higher_ed_df.columns = higher_ed_df.columns.str.strip()
    
    #comment out features to remove them from the final set
    features = [
        "Marital status",
        # "Application mode",
        # "Application order",
        "Course",
        "Daytime/evening attendance",
        "Previous qualification",
        "Previous qualification (grade)",
        "Nacionality",
        "Mother's qualification",
        "Father's qualification",
        "Mother's occupation",
        "Father's occupation",
        "Admission grade",
        "Displaced",
        "Educational special needs",
        "Debtor",
        "Tuition fees up to date",
        "Gender",
        "Scholarship holder",
        "Age at enrollment",
        "International",
        "Curricular units 1st sem (credited)",
        "Curricular units 1st sem (enrolled)",
        "Curricular units 1st sem (evaluations)",
        "Curricular units 1st sem (approved)",
        "Curricular units 1st sem (grade)",
        "Curricular units 1st sem (without evaluations)",
        "Curricular units 2nd sem (credited)",
        "Curricular units 2nd sem (enrolled)",
        "Curricular units 2nd sem (evaluations)",
        "Curricular units 2nd sem (approved)",
        "Curricular units 2nd sem (grade)",
        "Curricular units 2nd sem (without evaluations)",
        "Unemployment rate",
        "Inflation rate",
        "GDP",
        "Target",
    ]

    #just get the features we want
    higher_ed_df = higher_ed_df[features].copy()

    #remove empty fields
    higher_ed_df = higher_ed_df.dropna().copy()

    #replace spaces with underscores
    higher_ed_df.columns = higher_ed_df.columns.str.replace(" ", "_")
    
    #every header to lowercase
    higher_ed_df.columns = higher_ed_df.columns.str.lower()

    #save to file with proper separator
    higher_ed_df.to_csv(HIGHER_ED_PROC, sep=",", index=False)
    print(higher_ed_df)

def clean_lower():

    #read csv and strip whitespace
    lower_ed_df = pd.read_csv(LOWER_ED_RAW, sep=";")
    lower_ed_df.columns = lower_ed_df.columns.str.strip()

    #comment out features to remove them from the final set
    features = [
        #"school",
        "sex",
        "age",
        "address",
        "famsize",
        "Pstatus",
        "Medu",
        "Fedu",
        "Mjob",
        "Fjob",
        "reason",
        "guardian",
        "traveltime",
        "studytime",
        "failures",
        "schoolsup",
        "famsup",
        "paid",
        "activities",
        "nursery",
        "higher",
        "internet",
        "romantic",
        "famrel",
        "freetime",
        "goout",
        "Dalc",
        "Walc",
        "health",
        "absences",
        #"G1",
        #"G2",
        "G3",
    ]

    #get only the features we want
    lower_ed_df = lower_ed_df[features].copy()
    
    #delete empty rows and turn all headers lowercase
    lower_ed_df = lower_ed_df.dropna().copy()
    lower_ed_df.columns = lower_ed_df.columns.str.lower()

    #use binning to calculate pass/fail from final grade, (portuguese system is generally <10 = fail)
    lower_ed_df["target"] = pd.cut(lower_ed_df["g3"], bins=[0, 10, 20], labels=['fail', 'pass'], include_lowest=True)

    lower_ed_df = lower_ed_df.drop(columns="g3")

    lower_ed_df.to_csv(LOWER_ED_PROC, index=False)
    print(lower_ed_df)


#clean_higher()
#clean_lower()