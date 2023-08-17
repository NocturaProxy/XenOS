const battery = {
    battery: await navigator.getBattery(),
    batteryElement: document.querySelector("#os-battery-bar"),
    
    calculateBatteryPercentage: function() {
        return Math.floor(this.battery.level * 215) + "px";
    },

    setupListeners() {
        this.battery.addEventListener('chargingchange', () => {
            if (this.battery.charging) {
                this.batteryElement.style.fill = "lime";
            } else {
                if (this.battery.level < 0.1) {
                    this.batteryElement.style.fill = "red";
                } else {
                    this.batteryElement.style.fill = "white";
                }
            }
        });

        this.battery.addEventListener('chargingtimechange', () => {
            console.log('Battery charging time change');
        });

        this.battery.addEventListener('dischargingtimechange', () => {
            console.log('Battery discharging time change');
        });

        this.battery.addEventListener('levelchange', () => {
            this.batteryElement.style.width = this.calculateBatteryPercentage();

            if (this.battery.charging) {
                this.batteryElement.style.fill = "lime";
            } else {
                if (this.battery.level < 0.1) {
                    this.batteryElement.style.fill = "red";
                } else {
                    this.batteryElement.style.fill = "white";
                }
            }
        });
    },

    init: async function() {
        this.setupListeners();

        this.batteryElement.style.width = this.calculateBatteryPercentage();

        if (this.battery.charging) {
            this.batteryElement.style.fill = "lime";
        } else {
            if (this.battery.level < 0.1) {
                this.batteryElement.style.fill = "red";
            } else {
                this.batteryElement.style.fill = "white";
            }
        }
    }
}

export default battery;