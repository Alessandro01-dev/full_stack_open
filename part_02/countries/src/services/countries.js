import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_API_KEY

const getAll = () => {
  return axios.get(`${baseUrl}/all`).then(response => response.data)
}

const getWeather = (lat, lon) => {
  return axios
    .get(`${weatherUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => response.data)
}

export default { getAll, getWeather }