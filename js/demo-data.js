/* GI SMART POND — local demo data only. No hardware or cloud connection. */
window.GI_DEMO = (() => {
  const initialAerators = [
    { id: 1, running: true, runtime: 8.2, since: "06:15 AM" },
    { id: 2, running: true, runtime: 7.8, since: "06:20 AM" },
    { id: 3, running: false, runtime: 4.1, since: "Stopped 10:42 AM" },
    { id: 4, running: true, runtime: 7.5, since: "06:30 AM" },
    { id: 5, running: true, runtime: 8.0, since: "06:10 AM" },
    { id: 6, running: false, runtime: 5.6, since: "Stopped 11:05 AM" },
    { id: 7, running: true, runtime: 7.2, since: "06:25 AM" },
    { id: 8, running: true, runtime: 6.9, since: "06:35 AM" },
    { id: 9, running: false, runtime: 4.1, since: "Stopped 09:50 AM" },
    { id: 10, running: true, runtime: 7.0, since: "06:40 AM" }
  ];
  return {
    farmName: "Suri Aqua Farm",
    pondId: "GI-POND-001",
    aerators: initialAerators.map(item => ({ ...item })),
    ebAvailable: true,
    dgAvailable: false,
    events: [
      { time: "11:05 AM", channel: "Aerator 06", event: "Starter feedback OFF", status: "OFF", kind: "off" },
      { time: "10:42 AM", channel: "Aerator 03", event: "Starter feedback OFF", status: "OFF", kind: "off" },
      { time: "09:50 AM", channel: "Aerator 09", event: "Starter feedback OFF", status: "OFF", kind: "off" },
      { time: "06:40 AM", channel: "Aerator 10", event: "Starter feedback ON", status: "ON", kind: "on" },
      { time: "06:35 AM", channel: "Aerator 08", event: "Starter feedback ON", status: "ON", kind: "on" },
      { time: "06:30 AM", channel: "Aerator 04", event: "Starter feedback ON", status: "ON", kind: "on" },
      { time: "06:25 AM", channel: "Aerator 07", event: "Starter feedback ON", status: "ON", kind: "on" },
      { time: "06:20 AM", channel: "Aerator 02", event: "Starter feedback ON", status: "ON", kind: "on" },
      { time: "06:15 AM", channel: "Aerator 01", event: "Starter feedback ON", status: "ON", kind: "on" },
      { time: "06:10 AM", channel: "Aerator 05", event: "Starter feedback ON", status: "ON", kind: "on" }
    ],
    reset() {
      this.aerators = initialAerators.map(item => ({ ...item }));
      this.ebAvailable = true;
      this.dgAvailable = false;
      this.events = [
        { time: "11:05 AM", channel: "Aerator 06", event: "Starter feedback OFF", status: "OFF", kind: "off" },
        { time: "10:42 AM", channel: "Aerator 03", event: "Starter feedback OFF", status: "OFF", kind: "off" },
        { time: "09:50 AM", channel: "Aerator 09", event: "Starter feedback OFF", status: "OFF", kind: "off" }
      ];
    }
  };
})();
