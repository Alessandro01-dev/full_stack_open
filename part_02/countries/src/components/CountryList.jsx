const CountryList = ({ country, setQuery }) => {
  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={() => setQuery(country.name.common)}>Show</button>
    </div>
  )
}

export default CountryList