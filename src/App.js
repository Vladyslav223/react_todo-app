import React from 'react';

import TodoList from './components/TodoList/TodoList';
import Form from './components/Form/Form';
import Filters from './components/Filters/Filters';

class App extends React.Component {
  state = {
    todoList: [],
    todoListOriginal: [],
    completedAll: 0,
  }

  AddTodo = (inputFormValue) => {
    this.setState(prevState => ({
      todoListOriginal: [
        ...prevState.todoListOriginal,
        inputFormValue,
      ],
      todoList: [
        ...prevState.todoListOriginal,
        inputFormValue,
      ],
    }));
  }

  destroyTodo = (idTodoToDestroy) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== idTodoToDestroy),
    }));
  }

  changeStatus = (idTodoToChange) => {
    this.setState(prevState => ({
      todoListOriginal: prevState.todoListOriginal.map(todo => (
        todo.id !== idTodoToChange
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
      )),
      todoList: prevState.todoList.map(todo => (
        todo.id !== idTodoToChange
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
      )),
    }));
  }

  changeStatusAll = () => {
    this.setState(prevState => (
      prevState.completedAll === 0
        ? {
          todoList: prevState.todoList.map(todo => (
            {
              ...todo,
              completed: true,
            }
          )),
          completedAll: 1,
        }
        : {
          todoList: prevState.todoList.map(todo => (
            {
              ...todo,
              completed: false,
            }
          )),
          completedAll: 0,
        }
    ));
  }

  nonCompletedCount = (e) => {
    const count = this.state.todoList
      .filter(todo => todo.completed !== true);

    if (e) {
      this.setState({
        todoList: count,
      });
    }

    if (count.length) {
      return `${count.length} todos left`;
    }

    return false;
  }

  completedAppears = () => {
    const arr = this.state.todoList
      .filter(todo => todo.completed === true);

    return !!arr.length;
  }

  nonCompletedTodosSorting = () => {
    this.setState(prevState => ({
      todoList: prevState.todoListOriginal
        .filter(todo => todo.completed !== true),
    }));
  }

  completedTodosSorting = () => {
    this.setState(prevState => ({
      todoList: prevState.todoListOriginal
        .filter(todo => todo.completed === true),
    }));
  }

  allTodosToShowSorting = () => {
    this.setState({
      todoList: this.state.todoListOriginal,
    });
  }

  render() {
    const { todoList } = this.state;

    return (
      <section className="todoapp">
        <Form AddTodo={this.AddTodo} />
        <TodoList
          handleEdit={this.handleEdit}
          changeStatusAll={this.changeStatusAll}
          changeStatus={this.changeStatus}
          destroyTodo={this.destroyTodo}
          todos={todoList}
        />
        <Filters
          completedAppears={this.completedAppears}
          allTodosToShowSorting={this.allTodosToShowSorting}
          nonCompletedCount={this.nonCompletedCount}
          nonCompletedTodosSorting={this.nonCompletedTodosSorting}
          completedTodosSorting={this.completedTodosSorting}
        />
      </section>
    );
  }
}

export default App;
