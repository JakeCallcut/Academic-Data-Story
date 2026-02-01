# Academic Social Mobility Data Story

![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-lightblue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2025-yellow)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Framework](https://img.shields.io/badge/Framework-D3.js-orange)

An investigation on data surrounding academic performance of portugese students attending secondary school and university.

## Overview

The goal of this project is to produce a data story commenting on the social mobility among anonymous Portuguese students attending university and secondary school. The project uses two datasets which are cleaned and labelled before a Logistic Regression model is used to estimate the failure/dropout probability for each student. This model is adapted for in-sample scoring rather than prediction, so some minor overfitting may be present and should not be used for prediction.

## Requirements & Usage
Navigate to project root and run:

`pip install -r requirements.txt`

## Project Structure

- `data/raw` - Untouched datasets donwloaded
- `data/processed` - Datasets after cleaning (modelling tables)
- `data/results` - Datasets after running the models (plotting tables)
- `src/scripts` - Cleaning and prep scripts 
- `src/models` - Machine learning and statistical models
- `src/eda` - Exploratory Data Analysis (plots)

## Data

Links to the associated datasets used:

- V. Realinho, M. Vieira Martins, J. Machado, and L. Baptista. "Predict Students' Dropout and Academic Success," UCI Machine Learning Repository, 2021. [Online]. Available: https://doi.org/10.24432/C5MC89.

- P. Cortez. "Student Performance," UCI Machine Learning Repository, 2008. [Online]. Available: https://doi.org/10.24432/C5TG7T.

## Contribution

- Jake Callcut
- Arman Miah
- Grant Paterson
- Alex Ursoi

## Licensing & Legal

All Datasets are Licensed under a <a href="https://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International</a> License

This allows for the sharing and adaptation of the datasets for any purpose, provided that the appropriate credit is given.
