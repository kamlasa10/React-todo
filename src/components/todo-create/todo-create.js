import React, {useState} from 'react'
import './todo-create.css'

const TodoCreate = ({addTask}) => {
  const [label, setLabel] = useState('')

  function onChangeLabel(e) {
    setLabel(e.target.value)
  }

  function onSubmitForm(e) {
    e.preventDefault()

    addTask(label)
    setLabel('')
  }

  return (
    <form onSubmit={onSubmitForm}
      className="todo-create d-flex mt-10">
      <input onChange={onChangeLabel}
             className="form-control todo-create__input"
             type="text"
             value={label}
             placeholder="create new task"/>
      <button type="submit" className="btn todo-create__add btn-info">Add</button>
    </form>
  )
}

export default TodoCreate