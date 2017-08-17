import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

class App extends React.Component {
    addTodo(value) {
        console.log(value);
        let { store } = this.props;
        addTodo(value);
        store.dispatch({type: 'ADD_TODO', value: value});
    }

    clearTodos() {
        let { store } = this.props;
        clearTodos();
        store.dispatch({type: 'CLEAR_TODOS'});
    }

    render() {
        let todo;
        let { store } = this.props;
        let items = store.getState() || [] ;
        return (
        <div>
            <h2>TaDaa - Simple ToDo</h2>
            <div className="listApp">
                { items.length > 0 &&
                <ul className="list-group">
                    { items.map((value, index) => <li key={index}>{value}</li>) }
                </ul>
                }
                { items.length === 0 &&
                    <p>Add new todo</p>
                }
            </div>
            <div className="footerApp">
                <input type="text" name="todoInput" defaultValue="" placeholder="Write your task here" ref={node => {todo = node;}} />
                <button className="btn add-btn" onClick={() => {this.addTodo(todo.value); todo.value = "";}}>Add</button>
                <button className="btn clear-btn" onClick={() => this.clearTodos()}>Clear</button>
            </div>
        </div>
    )}
}

const todoReducer = (state = [], action) => {
    console.log(state, action);
    let newState = Object.assign([], state);
    switch (action.type) {
        case 'ADD_TODO':
            newState.push(action.value);
            break;
        case 'CLEAR_TODOS':
            newState = [];
            break;
        case 'LOAD_INITIAL_TODOS':
            newState = action.todos;
            break;
        default:
            break;
    }
    return newState;
};

const store = createStore(todoReducer, applyMiddleware(logger));

const lite = () => {
    render(<App store={store} />, document.getElementById('root'));
};

store.subscribe(lite);

const storage = chrome.storage.local;

storage.get("todos", function (items) {
    console.log(items);
    store.dispatch({type: 'LOAD_INITIAL_TODOS', todos: items.todos});
});

function addTodo(todo) {
    let todos = [];
    storage.get("todos", function (items) {
        console.log(items);
        todos = items.todos;
        todos.push(todo);
        storage.set({"todos": todos});
    });
}

function clearTodos() {
    storage.set({"todos": []});
}
