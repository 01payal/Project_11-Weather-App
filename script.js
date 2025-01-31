const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = 'ff0ae365545d0e8ce7b1081250b7ee63';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            temperature.textContent = `${Math.round(json.main.temp)}°C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${Math.round(json.wind.speed)} m/s`;

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'sun clear.jpeg';
                    break;
                case 'Rain':
                    image.src = 'rain.jpeg';
                    break;
                case 'Snow':
                    image.src = 'snow.jpeg';
                    break;
                case 'Clouds':
                    image.src = 'rain 2.jpeg';
                    break;
                case 'Mist':
                    image.src = 'mist.jpeg';
                    break;
                case 'Haze':
                    image.src = 'back.jpeg';
                    break;
                default:
                    image.src = 'cloud 2.png';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Could not retrieve weather data. Please check the city name.');
        });
});
