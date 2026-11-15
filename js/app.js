(() => {
  const app = window.GI_APP = window.GI_APP || {};
  const titles={dashboard:"Dashboard",aerators:"Aerators",power:"Power Monitoring",reports:"Reports",events:"Event History",settings:"Settings"};
  app.toast = function(message) {
    const el=document.getElementById("toast");
    el.textContent=message; el.classList.add("show");
    clearTimeout(app.toastTimer);
    app.toastTimer=setTimeout(()=>el.classList.remove("show"),2400);
  };
  app.showPage = function(page) {
    if(!titles[page]) page="dashboard";
    document.querySelectorAll(".page-view").forEach(el=>el.classList.toggle("active",el.id===`page-${page}`));
    document.querySelectorAll(".nav-link").forEach(el=>el.classList.toggle("active",el.dataset.page===page));
    document.getElementById("pageHeading").textContent=titles[page];
    document.title=`${titles[page]} | GI SMART POND`;
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("mobileOverlay").classList.remove("show");
    if(page==="settings") app.renderSettings();
    if(page==="reports") app.renderReports();
    window.scrollTo({top:0,behavior:"smooth"});
  };
  app.renderAll = function() {
    app.renderDashboard();
    app.renderPower();
    app.renderEvents();
    app.renderReports();
    const current=document.querySelector(".page-view.active")?.id.replace("page-","");
    if(current==="aerators") app.renderAerators();
  };
  document.addEventListener("DOMContentLoaded",()=>{
    const now=new Date();
    document.getElementById("currentDate").textContent=now.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"});
    app.renderAll();
    document.querySelectorAll("[data-page]").forEach(button=>button.addEventListener("click",()=>app.showPage(button.dataset.page)));
    document.querySelectorAll("[data-goto]").forEach(button=>button.addEventListener("click",()=>app.showPage(button.dataset.goto)));
    document.getElementById("menuButton").addEventListener("click",()=>{
      document.getElementById("sidebar").classList.add("open");
      document.getElementById("mobileOverlay").classList.add("show");
    });
    document.getElementById("mobileOverlay").addEventListener("click",()=>{
      document.getElementById("sidebar").classList.remove("open");
      document.getElementById("mobileOverlay").classList.remove("show");
    });
    document.getElementById("aeratorFilter").addEventListener("change",app.renderAerators);
    document.getElementById("toggleEB").addEventListener("click",()=>app.togglePower("EB"));
    document.getElementById("toggleDG").addEventListener("click",()=>app.togglePower("DG"));
    document.getElementById("reportPeriod").addEventListener("change",app.renderReports);
    document.getElementById("farmSettings").addEventListener("submit",app.saveFarmSettings);
    document.getElementById("clearDemoEvents").addEventListener("click",app.resetEvents);
    document.getElementById("notificationButton").addEventListener("click",()=>app.toast("No new demo notifications"));
    document.addEventListener("click",event=>{
      const card=event.target.closest(".aerator-card");
      if(card && card.closest("#allAerators")) app.toggleAerator(Number(card.dataset.aerator));
    });
    if("serviceWorker" in navigator && (location.protocol==="https:" || location.hostname==="localhost")) {
      navigator.serviceWorker.register("./service-worker.js").catch(error=>console.warn("Service worker registration failed:",error));
    }
  });
})();
