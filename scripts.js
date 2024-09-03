const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

window.onload = () => {
  if (!navigator.getBattery) {
    alert("Battery Status API is not supported in your browser.");
    return false;
  }

  navigator.getBattery().then((battery) => {
    function updateAllBatteryInfo() {
      updateChargingInfo();
      updateLevelInfo();
    }

    updateAllBatteryInfo();

    battery.addEventListener("chargingchange", () => {
      updateAllBatteryInfo();
    });

    battery.addEventListener("levelchange", () => {
      updateAllBatteryInfo();
    });

    battery.addEventListener("dischargingtimechange", () => {
      updateAllBatteryInfo();
    });

    function updateChargingInfo() {
      if (battery.charging) {
        charge.classList.add("active");
        chargingTimeRef.innerText = "Charging...";
      } else {
        charge.classList.remove("active");
        if (battery.dischargingTime !== Infinity) {
          let hr = Math.floor(battery.dischargingTime / 3600);
          let min = Math.floor((battery.dischargingTime % 3600) / 60);
          chargingTimeRef.innerText = `${hr}h ${min}min remaining`;
        } else {
          chargingTimeRef.innerText = "Calculating time...";
        }
      }
    }

    function updateLevelInfo() {
      let batteryLevel = `${battery.level * 100}%`;
      chargeLevel.textContent = batteryLevel;

      // Adjust the battery progress bar based on screen width
      const isSmallScreen = window.matchMedia("(max-width: 375px)").matches;

      if (isSmallScreen) {
        charge.style.height = batteryLevel;
        charge.style.width = "20px"; // Fixed width for vertical bar
      } else {
        charge.style.width = batteryLevel;
        charge.style.height = "20px"; // Fixed height for horizontal bar
      }
    }

    // Detect window resize and adjust the battery orientation
    window.addEventListener("resize", updateLevelInfo);
  });
};
