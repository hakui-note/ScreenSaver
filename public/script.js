function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById("time").textContent = `${hours}:${minutes}`;
}

async function updateWeather() {
    try {
        const response = await fetch("/weather");
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(`エラー: ${data.cod} - ${data.message}`);
        }

        const icon = data.weather[0].icon;
        const temp = Math.round(data.main.temp);
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById("weather-icon").src = iconUrl;
        document.getElementById("temperature").textContent = `${temp}°C`;
    } catch (error) {
        console.error("天気情報取得エラー:", error);
        document.getElementById("temperature").textContent = "取得失敗";
    }
}

async function updateForecast() {
    try {
        const response = await fetch("/forecast");
        const data = await response.json();

        if (data.cod !== "200") {
            throw new Error(`エラー: ${data.cod} - ${data.message}`);
        }

        const forecastDiv = document.getElementById("forecast");
        forecastDiv.innerHTML = "";

        for (let i = 0; i < 5; i++) {
            const forecast = data.list[i];
            const time = new Date(forecast.dt * 1000);
            const hours = String(time.getHours()).padStart(2, '0');
            const temp = Math.round(forecast.main.temp);
            const icon = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = `
                <span>${hours}:00</span>
                <img src="${iconUrl}" alt="天気アイコン">
                <span>${temp}°C</span>
            `;

            forecastDiv.appendChild(forecastItem);
        }
    } catch (error) {
        console.error("天気予報取得エラー:", error);
        document.getElementById("forecast").textContent = "天気予報取得失敗";
    }
}

// 1秒ごとに時間を更新
setInterval(updateTime, 1000);
updateTime();

// 10分ごとに天気を更新
setInterval(updateWeather, 600000);
updateWeather();
setInterval(updateForecast, 600000);
updateForecast();

// フルスクリーン化
document.addEventListener("click", () => {
    document.documentElement.requestFullscreen();
});
