const apikey = "0860595967b1a2fbce6ec2c6fb53c6a3";
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;

      const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
        `lon=${lon}&appid=${apikey}`;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log(new Date().getTime());

          var dat = new Date(data.dt * 1000);

          console.log(
            dat.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
          );
          console.log(new Date().getMinutes());
          weatherReport(data);
        });
    });
  }
});

function searchByCity() {
  var place = document.getElementById("input").value;
  var urlsearch =
    `http://api.openweathermap.org/data/2.5/weather?q=${place}&` +
    `appid=${apikey}`;

  fetch(urlsearch)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      weatherReport(data);
    });
  document.getElementById("input").value = "";
}

function weatherReport(data) {
  var urlcast =
    `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` +
    `appid=${apikey}`;

  fetch(urlcast)
    .then((res) => {
      return res.json();
    })
    .then((forecast) => {
      console.log(forecast.city);
      hourForecast(forecast);
      dayForecast(forecast);

      console.log(data);
      document.getElementById("city").innerText =
        data.name + ", " + data.sys.country;
      console.log(data.name, data.sys.country);

      console.log(Math.floor(data.main.temp - 273));
      document.getElementById("temperature").innerText =
        Math.floor(data.main.temp - 273) + " °C";

      document.getElementById("clouds").innerText = data.weather[0].description;
      console.log(data.weather[0].description);

      // Map weather condition to animated GIF
      let weatherCondition = data.weather[0].main.toLowerCase();
      let iconurl;

      switch (weatherCondition) {
        case "clear":
          iconurl = "./animated/clear.gif";
          break;
        case "clouds":
          iconurl = "./animated/cloud.gif";
          break;
        case "rain":
          iconurl = "./animated/rain.gif";
          break;
        case "snow":
          iconurl = "./animated/snow.gif";
          break;
        case "thunderstorm":
          iconurl = "./animated/thunder.gif";
          break;
        case "smoke":
          iconurl = "./animated/fog.gif";
          break;
        case "haze":
          iconurl = "./animated/fog.gif";
          break;
        case "dust":
          iconurl = "./animated-icons/dust.gif";
          break;
        case "fog":
          iconurl = "./animated/fog.gif";
          break;
        case "sand":
          iconurl = "./animated-icons/fog.gif";
          break;
        default:
          iconurl = "./animated/haze.gif";
      }

      console.log(iconurl);
      document.getElementById("img").src = iconurl;
    });
}

function hourForecast(forecast) {
  document.querySelector(".templist").innerHTML = "";
  for (let i = 0; i < 5; i++) {
    var date = new Date(forecast.list[i].dt * 1000);
    console.log(
      date.toLocaleTimeString(undefined, "Asia/Kolkata").replace(":00", "")
    );

    let hourR = document.createElement("div");
    hourR.setAttribute("class", "next");

    let div = document.createElement("div");
    let time = document.createElement("p");
    time.setAttribute("class", "time");
    time.innerText = date
      .toLocaleTimeString(undefined, "Asia/Kolkata")
      .replace(":00", "");

    let temp = document.createElement("p");
    temp.innerText =
      Math.floor(forecast.list[i].main.temp_max - 273) +
      " °C" +
      " / " +
      Math.floor(forecast.list[i].main.temp_min - 273) +
      " °C";

    div.appendChild(time);
    div.appendChild(temp);

    let desc = document.createElement("p");
    desc.setAttribute("class", "desc");
    desc.innerText = forecast.list[i].weather[0].description;

    hourR.appendChild(div);
    hourR.appendChild(desc);
    document.querySelector(".templist").appendChild(hourR);
  }
}

function dayForecast(forecast) {
  document.querySelector(".weekF").innerHTML = "";
  for (let i = 8; i < forecast.list.length; i += 8) {
    console.log(forecast.list[i]);
    let div = document.createElement("div");
    div.setAttribute("class", "dayF");

    let day = document.createElement("p");
    day.setAttribute("class", "date");
    day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(
      undefined,
      "Asia/Kolkata"
    );
    div.appendChild(day);

    let temp = document.createElement("p");
    temp.innerText =
      Math.floor(forecast.list[i].main.temp_max - 273) +
      " °C" +
      " / " +
      Math.floor(forecast.list[i].main.temp_min - 273) +
      " °C";
    div.appendChild(temp);

    let description = document.createElement("p");
    description.setAttribute("class", "desc");
    description.innerText = forecast.list[i].weather[0].description;
    div.appendChild(description);

    document.querySelector(".weekF").appendChild(div);
  }
}
