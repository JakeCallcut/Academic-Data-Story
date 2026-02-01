import matplotlib.pyplot as plt
import pandas as pd

model_df = pd.read_csv("../../data/results/lower_ed_scored.csv")

# split data 
fail_df = model_df.loc[model_df["target"] == "fail", "fail_risk"]
pass_df = model_df.loc[model_df["target"] == "pass", "fail_risk"]

# create figure
fig, ax = plt.subplots(figsize=(12, 8))

ax.boxplot(
    [fail_df, pass_df],
    labels=["fail", "pass"],
    showfliers=True
)

ax.set_xlabel("Outcome")
ax.set_ylabel("Failure risk (%)")
ax.set_title("Predicted failure risk by outcome")

plt.savefig("box_plot.png")
plt.show()