import { useAnecdoteActions } from "../store"

const Filter = () => {
  const actions = useAnecdoteActions()
  const setFilter = actions.setFilter

  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter