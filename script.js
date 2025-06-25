const apiKey = "4c1e7ed00399acfd86762a9abdc5fa57"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  result.innerHTML = "";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const iconId = data.weather[0].icon;

    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <canvas id="icon" width="64" height="64"></canvas>
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
    result.innerHTML = html;

    showIcon(data.weather[0].main);
  } catch (err) {
    result.innerHTML = `<p style="color: yellow;">${err.message}</p>`;
  } finally {
    loader.style.display = "none";
  }
}

function showIcon(type) {
  const skycons = new Skycons({ color: "white" });
  const iconMap = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Snow: "SNOW",
    Thunderstorm: "SLEET",
    Drizzle: "SLEET",
    Mist: "FOG",
    Smoke: "FOG",
    Haze: "FOG",
    Dust: "FOG",
    Fog: "FOG"
  };

  const iconType = iconMap[type] || "PARTLY_CLOUDY_DAY";
  skycons.add("icon", Skycons[iconType]);
  skycons.play();
}


function showDateTime() {
  const now = new Date();
  document.getElementById("dateTime").innerText = now.toLocaleString();
}

setInterval(showDateTime, 1000);
