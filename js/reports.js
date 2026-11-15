(() => {
  const app = window.GI_APP = window.GI_APP || {};
  const periodData = {
    daily: {label:"Today's sample runtime across 10 aerators", values:[8.2,7.8,4.1,7.5,8.0,5.6,7.2,6.9,4.1,7.0]},
    weekly: {label:"Last 7 days · illustrative average per day", values:[43.5,47.2,45.8,49.1,46.4,48.0,47.3]},
    monthly: {label:"This month · illustrative daily average", values:[6.8,7.1,6.5,7.4,7.0,6.9,7.3,6.7,7.2,6.8]}
  };
  app.renderReports = function() {
    const period=document.getElementById("reportPeriod")?.value || "daily";
    const data=periodData[period];
    const total=data.values.reduce((a,b)=>a+b,0);
    const avg=total/data.values.length;
    const sorted=[...data.values].sort((a,b)=>a-b);
    const totalEl=document.getElementById("reportTotal");
    totalEl.innerHTML=`${total.toFixed(1)} <small>${period === "daily" ? "hrs" : "sample hrs"}</small>`;
    document.getElementById("reportCaption").textContent=data.label;
    document.getElementById("averageRuntime").textContent=avg.toFixed(2);
    document.getElementById("highestRuntime").textContent=sorted[sorted.length-1].toFixed(1);
    document.getElementById("lowestRuntime").textContent=sorted[0].toFixed(1);
    const chart=document.getElementById("runtimeChart");
    const max=Math.max(...data.values,1);
    chart.innerHTML=data.values.map((v,i)=>`<div class="bar-item"><strong>${v.toFixed(1)}</strong><div class="bar-track"><div class="bar-fill" style="height:${(v/max*100).toFixed(1)}%"></div></div><small>${period === "daily" ? `A${i+1}` : period === "weekly" ? `D${i+1}` : `W${i+1}`}</small></div>`).join("");
  };
})();
