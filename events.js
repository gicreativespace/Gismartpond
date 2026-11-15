(() => {
  const app = window.GI_APP = window.GI_APP || {};
  app.renderEvents = function() {
    const events=window.GI_DEMO.events;
    const table=document.getElementById("eventsTable");
    const count=document.getElementById("eventCount");
    if(count) count.textContent=`${events.length} EVENTS`;
    if(table) table.innerHTML=events.length ? events.map(e=>`<tr><td>${e.time}</td><td><strong>${e.channel}</strong></td><td>${e.event}</td><td><span class="table-status ${e.status==="ON"?"on":"off"}">${e.status}</span></td></tr>`).join("") : '<tr><td colspan="4" class="empty-state">No demo events to display.</td></tr>';
    const recent=document.getElementById("recentActivity");
    if(recent) recent.innerHTML=events.slice(0,4).map(e=>`<div class="activity-item"><span class="activity-mark ${e.kind==="power"?"power":e.kind==="on"?"on":"off"}">${e.kind==="power"?"ϟ":e.status==="ON"?"✓":"−"}</span><div class="activity-copy"><strong>${e.channel} · ${e.event}</strong><small>${e.time} · Demo event</small></div></div>`).join("") || '<div class="empty-state">No recent activity.</div>';
  };
  app.resetEvents = function() {
    window.GI_DEMO.reset();
    app.renderAll();
    app.toast("Demo data has been reset");
  };
})();
