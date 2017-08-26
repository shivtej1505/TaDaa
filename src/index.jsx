import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { todoReducer } from './reducers.jsx'
import { ContentApp } from './ContentApp.jsx'
import { FooterApp } from './FooterApp.jsx';

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
        let { store } = this.props;
        let items = store.getState() || [] ;
        return (
        <div>
            <h2>TaDaa - Simple ToDo</h2>
            <ContentApp items={items}/>
            <FooterApp addTodo={this.addTodo.bind(this)} clearTodos={this.clearTodos.bind(this)}/>
        </div>
    )}
}

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
