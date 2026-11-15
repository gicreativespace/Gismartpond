(() => {
  const app = window.GI_APP = window.GI_APP || {};
  app.renderSettings = function() {
    const farm=document.getElementById("farmNameInput"), pond=document.getElementById("pondIdInput");
    if(farm) farm.value=window.GI_DEMO.farmName;
    if(pond) pond.value=window.GI_DEMO.pondId;
  };
  app.saveFarmSettings = function(event) {
    event.preventDefault();
    const farm=document.getElementById("farmNameInput").value.trim();
    const pond=document.getElementById("pondIdInput").value.trim();
    if(!farm || !pond) return;
    window.GI_DEMO.farmName=farm;
    window.GI_DEMO.pondId=pond;
    app.renderFarmLabels();
    document.getElementById("settingsMessage").textContent="Farm details updated in this demo.";
    app.toast("Farm details saved");
  };
})();
