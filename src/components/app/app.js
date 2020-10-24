import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import TodoCreate from '../todo-create';

class App extends React.Component {
  value = 100
  filteredTasks = []

  state = {
    todoData: [
      {label: 'Drink Coffee', important: false, done: false, id: 1},
      {label: 'Make Awesome App', important: false, done: false, id: 2},
      {label: 'Have a lunch', important: false, done: false, id: 3}
    ],
    searchText: '',
    filterName: 'all'
  }

  onChangeSearchText = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  filterTodoBySearch(text, arr) {
    if(!text) {
      return arr
    }

   return arr.filter(todo => {
      if(todo.label.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
        return todo
      }
    })
  }

  onDeleted = (id) => {
    this.setState(({todoData}) => {
      const newDate = todoData.filter(todo => todo.id !== id)

      return {
        todoData: newDate
      }
    })
  }

  onAddTask = (text) => {
    this.value += 1
    const newTask = {label: text, important: false, done: false, id: this.value}

    this.setState(({todoData}) => {
      return {
        todoData: [newTask, ...todoData]
      }
    })
  }

  onFilterTabClick = (filterName) => {
    this.setState({
      filterName
    })
  }

  filterTaskByTab(tabName, arr) {
    switch (tabName) {
      case 'all':
        return arr
      case 'active':
        return arr.filter(todo => !todo.done)
      case 'done':
        return arr.filter(todo => todo.done)
    }
  }

  changeReverseProp(id, propName, arr) {
    const idx = arr.findIndex(todo => todo.id === id)
    const newObj = {
      ...arr[idx],
      [propName]: !arr[idx][propName]
    }

    this.setState(({todoData}) => {
      return {
        todoData: [
          ...todoData.slice(0, idx),
          newObj,
          ...todoData.slice(idx + 1)
        ]
      }
    })
  }

  onDoneTask = (id) => {
    this.changeReverseProp(id, 'done', this.state.todoData)
  }

  onImportantTask = (id) => {
    this.changeReverseProp(id, 'important', this.state.todoData)
  }

  render() {
    const {todoData, searchText, filterName} = this.state
    const countDone = todoData.filter(todo => todo.done).length
    const countTodo = todoData.length - countDone
    this.filteredTasks = this.filterTodoBySearch(
      searchText,
      this.filterTaskByTab(filterName, todoData)
    )

    return (
      <div className="todo-app">
        <AppHeader toDo={countTodo} done={countDone}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearchText={this.onChangeSearchText}/>
          <ItemStatusFilter filterName={filterName} onTabFilterClick={this.onFilterTabClick}/>
        </div>
        <TodoList
          onImportant={this.onImportantTask}
          onDeleted={this.onDeleted}
          onDone={this.onDoneTask}
          todos={this.filteredTasks}/>
        <TodoCreate addTask={this.onAddTask}/>
      </div>
    );
  }
}

export default App;
