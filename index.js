function updateBatteryIndicator(battery) {
    const batteryIndicator = document.getElementById('battery-indicator');
    const batteryPercentage = document.getElementById('battery-percentage');
    const batteryLevel = battery.level * 100; // Battery level in percentage

    // Update battery indicator width or height based on screen size
    if (window.innerWidth > 375) {
        batteryIndicator.style.setProperty('--battery-width', `${batteryLevel}%`);
        batteryIndicator.classList.add('horizontal');
        batteryIndicator.classList.remove('vertical');
    } else {
        batteryIndicator.style.setProperty('--battery-height', `${batteryLevel}%`);
        batteryIndicator.classList.add('vertical');
        batteryIndicator.classList.remove('horizontal');
    }

    // Update the text displaying the battery percentage
    batteryPercentage.textContent = `${Math.round(batteryLevel)}%`;
}

async function initializeBatteryStatus() {
    try {
        const battery = await navigator.getBattery();
        updateBatteryIndicator(battery);

        battery.addEventListener('levelchange', () => updateBatteryIndicator(battery));
        battery.addEventListener('chargingchange', () => updateBatteryIndicator(battery));
        battery.addEventListener('chargingtimechange', () => updateBatteryIndicator(battery));
        battery.addEventListener('dischargingtimechange', () => updateBatteryIndicator(battery));
    } catch (error) {
        console.error('Failed to get battery status:', error);
    }
}

// Initialize battery status when the page loads
document.addEventListener('DOMContentLoaded', initializeBatteryStatus);

// Update layout on resize
window.addEventListener('resize', () => {
    const batteryIndicator = document.getElementById('battery-indicator');
    if (window.innerWidth <= 375) {
        batteryIndicator.classList.add('vertical');
        batteryIndicator.classList.remove('horizontal');
    } else {
        batteryIndicator.classList.add('horizontal');
        batteryIndicator.classList.remove('vertical');
    }
});