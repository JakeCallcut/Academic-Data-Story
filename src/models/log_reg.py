import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

def run_higher_model():
    #config vars
    MOD_TABLE_PATH = '../../data/processed/higher_ed.csv'
    OUT_PATH = '../../data/results/higher_ed_scored.csv'

    #create modelling table dataframe
    model_df = pd.read_csv(MOD_TABLE_PATH)

    #define which columns are categorical for the preprocessor to encode
    cat_features = [
        "marital_status",
        "course",
        "daytime/evening_attendance",
        "previous_qualification",
        "nacionality",
        "mother's_qualification",
        "father's_qualification",
        "mother's_occupation",
        "father's_occupation",
        "displaced",
        "educational_special_needs",
        "debtor",
        "tuition_fees_up_to_date",
        "gender",
        "scholarship_holder",
        "international"
    ]

    #define external features (fathers occupation etc.) for model selection
    external_features = [
        "marital_status",
        "daytime/evening_attendance",
        "previous_qualification",
        "nacionality",
        "mother's_qualification",
        "father's_qualification",
        "mother's_occupation",
        "father's_occupation",
        "displaced",
        "educational_special_needs",
        "debtor",
        "tuition_fees_up_to_date",
        "gender",
        "scholarship_holder",
        "age_at_enrollment",
        "international",
        "unemployment_rate",
        "inflation_rate",
        "gdp"
    ]

    #define performance features (1st year grade etc.) for model selection
    performance_features = [
        "course",
        "curricular_units_1st_sem_(enrolled)",
        "curricular_units_1st_sem_(evaluations)",
        "curricular_units_1st_sem_(approved)",
        "curricular_units_1st_sem_(grade)",
        "curricular_units_1st_sem_(without_evaluations)",
        "curricular_units_2nd_sem_(enrolled)",
        "curricular_units_2nd_sem_(evaluations)",
        "curricular_units_2nd_sem_(approved)",
        "curricular_units_2nd_sem_(grade)",
        "curricular_units_2nd_sem_(without_evaluations)"
    ]

    #ensure that the categorical columms are categorical (avoid encoding something numerical)
    for col in cat_features:
        model_df[col] = model_df[col].astype("category")

    #create dataframes of the right features for each model
    X = model_df.drop(columns=["target"])
    X_ext = model_df[external_features]
    X_perf = model_df[performance_features]

    #create target dataframe with binning (dropout vs non-dropout) to make it binary
    y_bin = (model_df["target"] == "Dropout").astype(int)

    #build logistic regression model for external risk
    #build preprocessor to encode categorical columns, allow numerical
    model_ext = Pipeline(
        [
            ("preprocess", ColumnTransformer(
                [
                    ("cat", OneHotEncoder(handle_unknown="ignore"),
                    X_ext.select_dtypes(include=["object", "category"]).columns),
                    ("num", "passthrough",
                    X_ext.select_dtypes(exclude=["object", "category"]).columns),
                ]
            )),
            ("model", LogisticRegression(max_iter=1000))
        ]
    )

    #build logistic regression model for performance risk
    #build preprocessor to allow everything since all grades are numerical
    model_perf = Pipeline(
        [
            ("preprocess", "passthrough"),
            ("model", LogisticRegression(max_iter=1000))
        ]
    )

    #build logistic regression model for overallrisk
    #build preprocessor to encode categorical columns, allow numerical
    model = Pipeline(
        [
            ("preprocess", ColumnTransformer(
                [
                    ("cat", OneHotEncoder(handle_unknown="ignore"), 
                    X.select_dtypes(include=["object", "category"]).columns),
                    ("num", "passthrough", 
                    X.select_dtypes(exclude=["object", "category"]).columns),
                ]
            )),
            ("model", LogisticRegression(max_iter=1000)),
        ]
    )

    #train models
    model_ext.fit(X_ext, y_bin)
    model_perf.fit(X_perf, y_bin)
    model.fit(X, y_bin)

    #write probabilities to dataframe
    model_df["dropout_risk(all)"] = (model.predict_proba(X)[:, 1] * 100).round(2)
    model_df["dropout_risk(external)"] = (model_ext.predict_proba(X_ext)[:, 1] * 100).round(2)
    model_df["dropout_risk(performance)"] = (model_perf.predict_proba(X_perf)[:, 1] * 100).round(2)

    #write to csv
    model_df.to_csv(OUT_PATH, index=False)
    print(model_df)

def run_lower_model():
    #config vars
    MOD_TABLE_PATH = '../../data/processed/lower_ed.csv'
    OUT_PATH = '../../data/results/lower_ed_scored.csv'

    #create modelling table dataframe
    model_df = pd.read_csv(MOD_TABLE_PATH)

    #define which columns are categorical for the preprocessor to encode
    cat_features = [
        "sex", "address", "famsize", "pstatus",
        "mjob", "fjob", "reason", "guardian",
        "schoolsup", "famsup", "paid", "activities",
        "nursery", "higher", "internet", "romantic"
    ]

    num_features = [
        "age", "medu", "fedu", "traveltime", "studytime",
        "failures", "famrel", "freetime", "goout",
        "dalc", "walc", "health", "absences"
    ]

    #ensure that the categorical columms are categorical (avoid encoding something numerical)
    for col in cat_features:
        model_df[col] = model_df[col].astype("category")

    #create dataframe without target for x
    X = model_df.drop(columns=["target"])

    #create target dataframe
    Y = (model_df["target"] == "fail").astype(int)

    #build logistic regression model
    #build preprocessor to encode categorical columns, allow numerical
    model = Pipeline(
        [
            ("preprocess", ColumnTransformer(
                [
                    ("cat", OneHotEncoder(handle_unknown="ignore", drop="first"), 
                    X.select_dtypes(include=["object", "category"]).columns),
                    ("num", "passthrough", 
                    X.select_dtypes(exclude=["object", "category"]).columns),
                ]
            )),
            ("model", LogisticRegression(max_iter=1000)),
        ]
    )

    #train model
    model.fit(X, Y)

    pre = model.named_steps["preprocess"]
    clf = model.named_steps["model"]

    feature_names = pre.get_feature_names_out()

    # get coefficients
    coefs = clf.coef_[0]

    # build dataframe of key features
    feature_importance = pd.DataFrame({
        "feature": feature_names,
        "coefficient": coefs,
        "abs_coefficient": np.abs(coefs)
    }).sort_values("abs_coefficient", ascending=False)

    # view top features
    print(feature_importance.head(20))

    #write probability to dataframe
    model_df["fail_risk"] = (model.predict_proba(X)[:, 1] * 100).round(2)

    #write to csv
    model_df.to_csv(OUT_PATH, index=False)
    print(model_df)

    print("Most likely student to fail:")
    print(model_df.loc[model_df["fail_risk"].idxmax()])

    print("Most likely student to fail:")
    print(model_df.loc[model_df["fail_risk"].idxmax()])

run_higher_model()
#run_lower_model()