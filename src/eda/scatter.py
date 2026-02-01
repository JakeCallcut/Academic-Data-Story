import pandas as pd
import matplotlib.pyplot as plt

DATA_PATH = "../../data/results/higher_ed_scored.csv"

df = pd.read_csv(DATA_PATH)

#simple and lightweight default scatter plot from ggplot
plt.figure(figsize=(12, 8))
for label in df["target"].unique():
    subset = df[df["target"] == label]
    plt.scatter(
        subset["dropout_risk(external)"],
        subset["dropout_risk(performance)"],
        label=label
    )

#analysing risk on both axis for each student record
plt.xlabel("External risk (%)")
plt.ylabel("Performance risk (%)")
plt.legend()
plt.savefig("risk_plot.png")
plt.show()