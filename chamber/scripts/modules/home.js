//export function initializeHome() {
    document.addEventListener("DOMContentLoaded", () => {
        const spotlightsMainBox = document.querySelector(".spotlights-main-box");
        spotlightsMainBox.innerHTML = "";
    
        const createSpotCard = (index) => {
            const spotCard = document.createElement("div");
            spotCard.className = `spot-card spot-card-0${index}`;
    
            spotCard.innerHTML = `
                    <div class="title-spot">
                        <h4 id="business-name-0${index}"></h4>
                        <h3 id="tag0${index}"></h3>
                    </div>
                    <div class="spot-img">
                        <img src="" alt="" id="img-0${index}-spot" width="80px">
                    </div>
                    <div class="spot-data">
                        <p><span id="phone-0${index}"></span></p>
                        <p><a href="" id="url-0${index}"></a></p>
                        <p><span id="member-since-0${index}"></span></p>
                    </div>
                `;
    
            return spotCard;
        };
    
        for (let i = 1; i <= 3; i++) {
            spotlightsMainBox.appendChild(createSpotCard(i));
        }
    });
    
    document.addEventListener("DOMContentLoaded", async () => {
        const nameBusiness01 = document.querySelector("#business-name-01");
        const nameBusiness02 = document.querySelector("#business-name-02");
        const nameBusiness03 = document.querySelector("#business-name-03");
    
        const industry01 = document.querySelector("#tag01");
        const industry02 = document.querySelector("#tag02");
        const industry03 = document.querySelector("#tag03");
    
        const phone01 = document.querySelector("#phone-01");
        const phone02 = document.querySelector("#phone-02");
        const phone03 = document.querySelector("#phone-03");
    
        const url01 = document.querySelector("#url-01");
        const url02 = document.querySelector("#url-02");
        const url03 = document.querySelector("#url-03");
    
        const member01 = document.querySelector("#member-since-01");
        const member02 = document.querySelector("#member-since-02");
        const member03 = document.querySelector("#member-since-03");
    
        const img01 = document.querySelector("#img-01-spot");
        const img02 = document.querySelector("#img-02-spot");
        const img03 = document.querySelector("#img-03-spot");
    
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
    
            const shuffledData = data.sort(() => 0.5 - Math.random());
    
            const businessNames = [nameBusiness01, nameBusiness02, nameBusiness03];
            const industries = [industry01, industry02, industry03];
            const phones = [phone01, phone02, phone03];
            const urls = [url01, url02, url03];
            const members = [member01, member02, member03];
            const imgs = [img01, img02, img03];
    
            businessNames.forEach((nameElement, index) => {
                if (nameElement && shuffledData[index]) {
                    nameElement.innerHTML = `${shuffledData[index].Name}`;
                }
            });
    
            industries.forEach((industry, index) => {
                if (industry && shuffledData[index]) {
                    industry.innerHTML = `${shuffledData[index].Industry}`;
                }
            });
    
            phones.forEach((phone, index) => {
                if (phone && shuffledData[index]) {
                    phone.innerHTML = `Phone: ${shuffledData[index].Phone}`;
                }
            });
    
            urls.forEach((url, index) => {
                if (url && shuffledData[index]) {
                    url.href = `${shuffledData[index].Website}`;
                    url.innerHTML = `Visite the website`;
                }
            });
    
            members.forEach((member, index) => {
                if (member && shuffledData[index]) {
                    member.innerHTML = `Membership level: ${shuffledData[index].Membership}`;
                }
            });
    
            imgs.forEach((img, index) => {
                if (img && shuffledData[index]) {
                    img.src = `${shuffledData[index].logo}`;
                    img.alt = `${shuffledData[index].Name} logo`;
                }
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
    
    const myKey = "ff13f035a56adc677701d28acadf76e1";
    const myLat = "43.604707";
    const myLon = "-116.205847";
    
    const time = new Date();
    const day = time.getDay();
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    
    document.addEventListener("DOMContentLoaded", () => {
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}`;
    
        async function apiFetch() {
            try {
                const response = await fetch(urlWeather);
                if (response.ok) {
                    const data = await response.json();
                    displayResults(data);
                } else {
                    throw new Error(await response.text());
                }
            } catch (error) {
                console.error(error);
            }
        }
    
        const displayResults = (data) => {
            const eventMainBox = document.querySelector("#weather-main");
            eventMainBox.innerHTML = "";
    
            const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            let desc = data.weather[0].description;
    
            eventMainBox.innerHTML = `
                    <div class="current-weather">
                        <h2>The current Weather in: <span id="city-name">${
                            data.name
                        }</span></h2>
                        <h4>${weekdays[day]}</h4>
                        <div class="weather-content"></div>
                        <p>Temperature <span id="current-temp">${parseFloat(
                            data.main.temp
                        ).toFixed(0)}&deg;F</span></p>
                        <figure>
                            <img id="weather-icon" src="${iconsrc}" alt="${desc}">
                            <figcaption>${desc}</figcaption>
                        </figure>
                    </div>
                `;
                const kelvinToFahrenheit = (kelvin) => {
                    return ((kelvin - 273.15) * 9/5) + 32;
                };
                
                // For the current weather
                document.getElementById("current-temp").textContent = `${kelvinToFahrenheit(data.main.temp).toFixed(0)}°F`;
                
                // For the 3-day forecast
                dailyForecasts.forEach((dailyData, index) => {
                    document.getElementById(
                        `weather-icon-${index + 1}`
                    ).src = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;
                    document.getElementById(`figcaption-${index + 1}`).textContent =
                        dailyData.weather[0].description;
                
                    document.getElementById(
                        `temp-${index + 1}`
                    ).textContent = `${kelvinToFahrenheit(dailyData.main.temp).toFixed(0)}°F`;
                });
                
        };
    
        apiFetch();
    });
    
    document.addEventListener("DOMContentLoaded", () => {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}`;
    
        async function apiForecastFetch() {
            try {
                const response = await fetch(forecastUrl);
                if (response.ok) {
                    const forecastData = await response.json();
    
                    displayResultsForecast(forecastData);
                } else {
                    throw new Error(await response.text());
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        const displayResultsForecast = (forecastData) => {
            const weatherForecast = document.querySelector("#weather-forecast");
            weatherForecast.innerHTML = "";
        
            const forecast = document.createElement("article");
            forecast.className = "forecast";
            forecast.innerHTML = `
                    <h3>3-Days Weather Forecast</h3>
                    <div class="main-day-box">
                        <div class="day-box">
                            <h4 id="day-01">${weekdays[(day + 1) % 7]}</h4>
                            <figure>
                                <img id="weather-icon-1" src="" alt="">
                                <figcaption id="figcaption-1"></figcaption>
                            </figure>
                            <p>Temperature: <span id="temp-1"></span></p>
                        </div>
                        <div class="day-box">
                            <h4 id="day-02">${weekdays[(day + 2) % 7]}</h4>
                            <figure>
                                <img id="weather-icon-2" src="" alt="">
                                <figcaption id="figcaption-2"></figcaption>
                            </figure>
                            <p>Temperature: <span id="temp-2"></span></p>
                        </div>
                        <div class="day-box">
                            <h4 id="day-03">${weekdays[(day + 3) % 7]}</h4>
                            <figure>
                                <img id="weather-icon-3" src="" alt="">
                                <figcaption id="figcaption-3"></figcaption>
                            </figure>
                            <p>Temperature: <span id="temp-3"></span></p>
                        </div>
                    </div>
                `;
            weatherForecast.appendChild(forecast);
        
            // Filter forecast data to get 3 days (24 hours apart)
            const dailyForecasts = forecastData.list.filter((item, index) => {
                return index % 8 === 0; // 8 data points per day (3-hour intervals)
            }).slice(0, 3); // Get only the first 3 days
        
            // If there’s not enough forecast data, log an error
            if (dailyForecasts.length < 3) {
                console.error("Not enough forecast data for 3 days.");
                return;
            }
        
            // Loop through the 3-day forecast
            dailyForecasts.forEach((dailyData, index) => {
                const tempInFahrenheit = kelvinToFahrenheit(dailyData.main.temp).toFixed(0);
                const iconSrc = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;
                const description = dailyData.weather[0].description;
        
                // Set the weather icon, description, and temperature
                document.getElementById(`weather-icon-${index + 1}`).src = iconSrc;
                document.getElementById(`figcaption-${index + 1}`).textContent = description;
                document.getElementById(`temp-${index + 1}`).textContent = `${tempInFahrenheit}°F`;
            });
        };
        
        // Helper function to convert from Kelvin to Fahrenheit
        const kelvinToFahrenheit = (kelvin) => {
            return (kelvin - 273.15) * 9 / 5 + 32;
        };
        
    
        apiForecastFetch();
    });
    
    async function getEvents() {
        try {
            const response = await fetch("data/events.json");
            const data = await response.json();
            return data.events;
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    }
    
    async function displayEvents() {
        const events = await getEvents();
        const eventsContainer = document.getElementById("events-list");
    
        eventsContainer.innerHTML = "";
    
        if (events.length === 0) {
            eventsContainer.innerHTML = "<p>No upcoming events at this time.</p>";
            return;
        }
    
        events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
        const nextEvents = events.slice(0, 3);
    
        // Loop through the next 3 events and create HTML to display
        nextEvents.forEach((event) => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("event");
    
            eventElement.innerHTML = `
                <h3>${event.name}</h3>
                <p>Date: ${new Date(event.date).toDateString()}</p>
            `;
    
            eventsContainer.appendChild(eventElement);
        });
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        displayEvents();
    });

        // footer
        document.getElementById("currentyear").textContent =
        new Date().getFullYear();
    document.getElementById(
        "lastModified"
    ).textContent = `Last Modified: ${document.lastModified}`;

    document.addEventListener("DOMContentLoaded", () => {
        const hamButton = document.querySelector("#menu");
        const navigation = document.querySelector("nav");
        hamButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamButton.classList.toggle("open");
        });
    });    


    
    //}
