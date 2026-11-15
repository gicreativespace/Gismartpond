(() => {
  const app = window.GI_APP = window.GI_APP || {};
  app.renderFarmLabels = function() {
    document.getElementById("sidebarFarmName").textContent=window.GI_DEMO.farmName;
    document.getElementById("sidebarPondId").textContent=`Pond ID: ${window.GI_DEMO.pondId}`;
    document.getElementById("welcomeFarmName").textContent=window.GI_DEMO.farmName;
    document.getElementById("welcomePondId").innerHTML=`Pond ID: ${window.GI_DEMO.pondId} <span class="dot-separator">•</span> 10 Aerators`;
  };
  app.renderDashboard = function() {
    app.renderFarmLabels();
    const total=window.GI_DEMO.aerators.reduce((sum,item)=>sum+item.runtime,0);
    document.getElementById("totalRuntime").textContent=total.toFixed(1);
    app.renderAerators();
    app.renderPower();
  };
})();
