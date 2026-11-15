(() => {
  const app = window.GI_APP = window.GI_APP || {};
  function aeratorSvg(running) {
    const water = running ? "#8BD8D0" : "#C7D3D8";
    const metal = running ? "#078D87" : "#9AAAB2";
    return `<svg viewBox="0 0 150 90" role="img" aria-label="${running ? "Simulated running" : "Simulated stopped"} paddle wheel aerator">
      <defs><linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${water}" stop-opacity=".16"/><stop offset="1" stop-color="${water}" stop-opacity=".65"/></linearGradient></defs>
      <path d="M8 68 Q28 62 48 68 T88 68 T128 68 T150 68 L150 88 L8 88Z" fill="url(#waterGrad)"/>
      <g class="water-ripple" fill="none" stroke="${water}" stroke-width="2" stroke-linecap="round"><path d="M17 76q9-5 18 0t18 0"/><path d="M92 79q8-4 16 0t16 0"/></g>
      <path d="M36 61 L114 61" stroke="#78909C" stroke-width="3" stroke-linecap="round"/>
      <path d="M48 60 L56 39 M102 60 L94 39" stroke="#78909C" stroke-width="3" stroke-linecap="round"/>
      <g class="paddle-wheel" style="transform-origin:75px 38px;animation:${running ? "wheelSpin 2.8s linear infinite" : "none"}">
        <circle cx="75" cy="38" r="7" fill="${metal}"/>
        <circle cx="75" cy="38" r="3" fill="#fff"/>
        ${Array.from({length:8},(_,i)=>`<g transform="rotate(${i*45} 75 38)"><path d="M72 30 L70 12 Q75 8 80 12 L78 30Z" fill="${metal}" stroke="#fff" stroke-width=".8"/></g>`).join("")}
        <circle cx="75" cy="38" r="5" fill="${metal}"/>
      </g>
      <path d="M52 62 Q75 57 98 62" stroke="${metal}" stroke-width="2" fill="none" opacity=".6"/>
      ${running ? `<g fill="none" stroke="${water}" stroke-width="2" stroke-linecap="round"><path d="M27 52q-4-5 0-9"/><path d="M119 49q4-5 0-9"/></g>` : ""}
    </svg>`;
  }
  function card(item) {
    const running = item.running;
    return `<article class="aerator-card ${running ? "running" : "stopped"}" data-aerator="${item.id}">
      <div class="aerator-head"><strong class="aerator-name">Aerator ${String(item.id).padStart(2,"0")}</strong><span class="status-badge ${running ? "running" : "stopped"}"><i class="status-dot ${running ? "green-bg" : "grey-bg"}"></i>${running ? "Running" : "Stopped"}</span></div>
      <div class="aerator-visual">${aeratorSvg(running)}</div>
      <div class="aerator-meta"><span>Runtime today</span><strong>${item.runtime.toFixed(1)} hrs</strong></div>
    </article>`;
  }
  app.renderAerators = function() {
    const data = window.GI_DEMO.aerators;
    const dashboard = document.getElementById("dashboardAerators");
    const all = document.getElementById("allAerators");
    if (dashboard) dashboard.innerHTML = data.map(card).join("");
    if (all) {
      const filter = document.getElementById("aeratorFilter")?.value || "all";
      all.innerHTML = data.filter(item => filter === "all" || (filter === "running" ? item.running : !item.running)).map(card).join("") || '<div class="empty-state">No aerators match this filter.</div>';
    }
    const running = data.filter(item => item.running).length;
    document.getElementById("runningCount").textContent = String(running).padStart(2,"0");
    document.getElementById("runningCaption").textContent = `${running} running`;
    document.getElementById("aeroRunningSummary").textContent = running;
    document.getElementById("aeroStoppedSummary").textContent = data.length - running;
    document.getElementById("activeChannels").textContent = running;
  };
  app.toggleAerator = function(id) {
    const item = window.GI_DEMO.aerators.find(a => a.id === id);
    if (!item) return;
    item.running = !item.running;
    item.since = item.running ? "Just switched ON (demo)" : "Just switched OFF (demo)";
    const now = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    window.GI_DEMO.events.unshift({ time: now, channel: `Aerator ${String(id).padStart(2,"0")}`, event: `Starter feedback ${item.running ? "ON" : "OFF"}`, status: item.running ? "ON" : "OFF", kind: item.running ? "on" : "off" });
    app.renderAll();
    app.toast(`Aerator ${String(id).padStart(2,"0")} demo status changed to ${item.running ? "RUNNING" : "STOPPED"}`);
  };
})();
