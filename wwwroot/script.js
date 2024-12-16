function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); 
}

document.addEventListener("DOMContentLoaded", () => {
    const contactButton = document.getElementById("contact-button");
    const popup = document.getElementById("custom-popup");
    const closePopup = document.querySelector(".close");

    const loadGauge4Ctx = document.getElementById("load-gauge-4").getContext("2d");
    const loadGauge24Ctx = document.getElementById("load-gauge-24").getContext("2d");
    /*const loadGauge14Ctx = document.getElementById("load-gauge-14").getContext("2d");
    const loadGauge15Ctx = document.getElementById("load-gauge-15").getContext("2d");
    const loadGauge9Ctx = document.getElementById("load-gauge-9").getContext("2d");*/

    const loadGauge4 = new Chart(loadGauge4Ctx, {
        type: 'doughnut',
        data: {
            labels: ['פנוי', 'תפוס'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    const loadGauge24 = new Chart(loadGauge24Ctx, {
        type: 'doughnut',
        data: {
            labels: ['פנוי', 'תפוס'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

   /* const loadGauge14 = new Chart(loadGauge14Ctx, {
        type: 'doughnut',
        data: {
            labels: ['פנוי', 'תפוס'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    const loadGauge15 = new Chart(loadGauge15Ctx, {
        type: 'doughnut',
        data: {
            labels: ['פנוי', 'תפוס'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    const loadGauge9 = new Chart(loadGauge9Ctx, {
        type: 'doughnut',
        data: {
            labels: ['פנוי', 'תפוס'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });*/

    let isFirstLoad = true; 

    const loadParkingData = async () => {
        try {
            const response = await fetch("https://localhost:7294/api/parking/available-spots");
            const parkingData = await response.json();

            const parkingLot4 = parkingData.find(lot => lot.plCode === 4);
            const parkingLot24 = parkingData.find(lot => lot.plCode === 24);
            //const parkingLot14 = parkingData.find(lot => lot.plCode === 14);
            //const parkingLot15 = parkingData.find(lot => lot.plCode === 15);
            //const parkingLot9 = parkingData.find(lot => lot.plCode === 9);

            if (parkingLot4) {
                const previousAvailableSpots4 = parseInt(document.getElementById("available-spots-4").innerText) || 0;
                document.getElementById("available-spots-4").innerText = parkingLot4.availableSpots;
                const totalCapacity = 270;
                let usedSpots = totalCapacity - parkingLot4.availableSpots;
                if (usedSpots < 0) usedSpots = 0;
                loadGauge4.data.datasets[0].data = [parkingLot4.availableSpots, usedSpots];
                loadGauge4.update();

                if (!isFirstLoad && parkingLot4.availableSpots !== previousAvailableSpots4) {
                    showNotification(`עדכון: עכשיו יש ${parkingLot4.availableSpots} מקומות פנויים בחניון NOVA.`);
                }
            }

            if (parkingLot24) {
                const previousAvailableSpots24 = parseInt(document.getElementById("available-spots-24").innerText) || 0;
                document.getElementById("available-spots-24").innerText = parkingLot24.availableSpots;
                const totalCapacity = 270;
                let usedSpots = totalCapacity - parkingLot24.availableSpots;
                if (usedSpots < 0) usedSpots = 0;
                loadGauge24.data.datasets[0].data = [parkingLot24.availableSpots, usedSpots];
                loadGauge24.update();

                if (!isFirstLoad && parkingLot24.availableSpots !== previousAvailableSpots24) {
                    showNotification(`עדכון: עכשיו יש ${parkingLot24.availableSpots} מקומות פנויים בחניון NOVA כורכר.`);
                }
            }

            /*if (parkingLot14) {
                const previousAvailableSpots14 = parseInt(document.getElementById("available-spots-14").innerText) || 0;
                document.getElementById("available-spots-14").innerText = parkingLot14.availableSpots;
                const totalCapacity = 270;
                let usedSpots = totalCapacity - parkingLot14.availableSpots;
                if (usedSpots < 0) usedSpots = 0;
                loadGauge14.data.datasets[0].data = [parkingLot14.availableSpots, usedSpots];
                loadGauge14.update();

                if (!isFirstLoad && parkingLot14.availableSpots !== previousAvailableSpots14) {
                    showNotification(`עדכון: עכשיו יש ${parkingLot14.availableSpots} מקומות פנויים בחניון סטייק הולדר חניון תת קרקעי.`);
                }
            }

            if (parkingLot15) {
                const previousAvailableSpots15 = parseInt(document.getElementById("available-spots-15").innerText) || 0;
                document.getElementById("available-spots-15").innerText = parkingLot15.availableSpots;
                const totalCapacity = 270;
                let usedSpots = totalCapacity - parkingLot15.availableSpots;
                if (usedSpots < 0) usedSpots = 0;
                loadGauge15.data.datasets[0].data = [parkingLot15.availableSpots, usedSpots];
                loadGauge15.update();

                if (!isFirstLoad && parkingLot15.availableSpots !== previousAvailableSpots15) {
                    showNotification(`עדכון: עכשיו יש ${parkingLot15.availableSpots} מקומות פנויים בחניון סטייק הולדר חניון כורכר.`);
                }
            }

            if (parkingLot9) {
                const previousAvailableSpots9 = parseInt(document.getElementById("available-spots-9").innerText) || 0;
                document.getElementById("available-spots-9").innerText = parkingLot9.availableSpots;
                const totalCapacity = 270;
                let usedSpots = totalCapacity - parkingLot9.availableSpots;
                if (usedSpots < 0) usedSpots = 0;
                loadGauge9.data.datasets[0].data = [parkingLot9.availableSpots, usedSpots];
                loadGauge9.update();

                if (!isFirstLoad && parkingLot9.availableSpots !== previousAvailableSpots9) {
                    showNotification(`עדכון: עכשיו יש ${parkingLot9.availableSpots} מקומות פנויים בחניון פאי קרדיה.`);
                }
            }*/

            // שינוי הערך של isFirstLoad לאחר טעינת הנתונים
            isFirstLoad = false;
        } catch (error) {
            console.error("Error fetching parking data:", error);
        }
    };

    loadParkingData();
    setInterval(loadParkingData, 5000);

    contactButton.addEventListener("click", () => {
        popup.style.display = "block";
    });

    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
