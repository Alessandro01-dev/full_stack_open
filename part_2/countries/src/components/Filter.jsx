const Filter = ({query, handleChange}) => {
  return (
    <form>
      find countries <input value={query} onChange={handleChange} />
    </form>
  )
}

export default Filter