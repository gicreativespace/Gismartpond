(() => {
  const app = window.GI_APP = window.GI_APP || {};
  function powerEventRows() {
    return [
      {time:"11:30 AM", source:"EB Supply", event:"Voltage available", status:window.GI_DEMO.ebAvailable},
      {time:"08:15 AM", source:"DG Output", event:"Output voltage detected", status:window.GI_DEMO.dgAvailable},
      {time:"06:00 AM", source:"EB Supply", event:"Voltage available", status:window.GI_DEMO.ebAvailable}
    ].map(row => `<tr><td>${row.time}</td><td><strong>${row.source}</strong></td><td>${row.event}</td><td><span class="table-status ${row.status ? "on":"off"}">${row.status ? "AVAILABLE":"NOT AVAILABLE"}</span></td></tr>`).join("");
  }
  app.renderPower = function() {
    const eb = window.GI_DEMO.ebAvailable, dg = window.GI_DEMO.dgAvailable;
    const ebText = eb ? "Available" : "Not Available", dgText = dg ? "Available" : "Not Available";
    const ebClass = eb ? "green-bg" : "grey-bg", dgClass = dg ? "green-bg" : "grey-bg";
    const ebValue = document.getElementById("ebValue"), dgValue = document.getElementById("dgValue");
    if (ebValue) ebValue.innerHTML = `<span class="status-dot ${ebClass}"></span>${ebText}`;
    if (dgValue) dgValue.innerHTML = `<span class="status-dot ${dgClass}"></span>${dgText}`;
    [["ebPanelState",ebText],["dgPanelState",dgText],["ebDetailState",ebText],["dgDetailState",dgText]].forEach(([id,value]) => { const el=document.getElementById(id); if(el) el.textContent=value; });
    const ebPanel=document.getElementById("ebPanelState"), dgPanel=document.getElementById("dgPanelState");
    if(ebPanel) ebPanel.className=`power-state ${eb ? "" : "muted"}`;
    if(dgPanel) dgPanel.className=`power-state ${dg ? "" : "muted"}`;
    const ebFoot=document.querySelector(".eb-detail .state-foot .status-dot"), dgFoot=document.querySelector(".dg-detail .state-foot .status-dot");
    if(ebFoot) ebFoot.className=`status-dot ${ebClass}`;
    if(dgFoot) dgFoot.className=`status-dot ${dgClass}`;
    const table=document.getElementById("powerEventsTable"); if(table) table.innerHTML=powerEventRows();
  };
  app.togglePower = function(source) {
    const key = source === "EB" ? "ebAvailable" : "dgAvailable";
    window.GI_DEMO[key] = !window.GI_DEMO[key];
    const now = new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
    const available = window.GI_DEMO[key];
    window.GI_DEMO.events.unshift({time:now,channel:`${source} Supply`,event:`Voltage ${available ? "available" : "not available"}`,status:available ? "ON":"OFF",kind:"power"});
    app.renderAll();
    app.toast(`${source} demo status: ${available ? "Available" : "Not available"}`);
  };
})();
