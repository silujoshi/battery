// Pure functions to handle battery updates and UI changes


  const updateBatteryLevel = (battery) => {
    const chargeLevel = document.getElementById('charge-level');
    const charge = document.getElementById('charge');
    const batteryLevel = `${battery.level * 100}%`;
  
    chargeLevel.textContent = batteryLevel;
  
    // Set the height of the charge bar based on the battery level
    charge.style.height = batteryLevel;
  };

const updateChargingStatus = (battery) => {
  const charge = document.getElementById('charge');
  if (battery.charging) {
      charge.classList.add('active');
  } else {
      charge.classList.remove('active');
  }
};

const handleBatteryUpdates = (battery) => {
  updateBatteryLevel(battery);
  updateChargingStatus(battery);

  battery.addEventListener('levelchange', () => updateBatteryLevel(battery));
  battery.addEventListener('chargingchange', () => updateChargingStatus(battery));
};

// Handle media query changes dynamically
const handleMediaQueryChanges = () => {
  const isSmallScreen = window.matchMedia("(max-width: 375px)").matches;
  const icon = document.getElementById('icon');

  if (isSmallScreen) {
      icon.className = 'fas fa-mobile-alt';
  } else {
      icon.className = 'fas fa-laptop';
  }
};

// Monitor screen size changes
window.addEventListener('resize', handleMediaQueryChanges);

// Main function to initialize battery updates and responsive behavior
const initBatteryMonitoring = () => {
  navigator.getBattery().then(battery => {
      handleBatteryUpdates(battery);
      handleMediaQueryChanges();
  });
};

// Event listener for checkbox to enable/disable responsive behavior
document.getElementById('responsive-toggle').addEventListener('change', function () {
  if (this.checked) {
      window.addEventListener('resize', handleMediaQueryChanges);
  } else {
      window.removeEventListener('resize', handleMediaQueryChanges);
  }
});

// Initialize battery monitoring on page load
window.onload = initBatteryMonitoring;
