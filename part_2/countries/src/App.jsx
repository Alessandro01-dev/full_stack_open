import axios from "axios"
import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import CountryList from "./components/CountryList"
import CountryDetail from "./components/CountryDetail"
import countryService from "./services/countries"

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getAll().then(data => setCountries(data))
  }, [])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const countriesToShow = query === ''
    ? []
    : countries.filter(c =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    )

  const singleCountry = countriesToShow.length === 1 ? countriesToShow[0] : null

  useEffect(() => {
    if (singleCountry) {
      const [lat, lon] = singleCountry.capitalInfo.latlng
      countryService.getWeather(lat, lon).then(data => setWeather(data))
    }
  }, [singleCountry])

  return (
    <>
      <Filter query={query} handleChange={handleChange} />
      <div>
        {countriesToShow.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {countriesToShow.length <= 10 && countriesToShow.length > 1 && countriesToShow.map(country => (
          <CountryList key={country.cca3} country={country} setQuery={setQuery} />
        ))
        }

        {singleCountry && (
          <CountryDetail country={singleCountry} weather={weather} />
        )}
      </div>
    </>
  )

}

export default App