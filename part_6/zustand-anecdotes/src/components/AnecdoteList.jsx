import { useAnecdotes, useFilter, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const actions = useAnecdoteActions()
  const vote = actions.vote

  const anecdotesToShow = anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes)

  return (
    <>
      {anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => actions.deleteAnecdote(anecdote.id)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList