import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Charts({ history }) {
  const phishing = history.filter((item) => item.prediction === "Phishing").length;
  const legitimate = history.length - phishing;
  const categories = history.reduce((acc, item) => {
    acc[item.threat_category] = (acc[item.threat_category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-4 font-extrabold">Risk Distribution</h3>
        <Doughnut
          data={{
            labels: ["Phishing", "Legitimate"],
            datasets: [{ data: [phishing, legitimate], backgroundColor: ["#ef4444", "#22c55e"] }],
          }}
        />
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-4 font-extrabold">Threat Categories</h3>
        <Bar
          data={{
            labels: Object.keys(categories),
            datasets: [{ label: "Analyses", data: Object.values(categories), backgroundColor: "#22d3ee" }],
          }}
        />
      </div>
    </div>
  );
}

