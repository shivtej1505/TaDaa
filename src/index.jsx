import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
    addTodo(value) {
        console.log("add");
        console.log(value);
    }

    clearTodos(value){
        console.log("clear");
        console.log(value);
    }

    render() {
        let todo;
        return (
        <div>
            <h2>TaDaa - Simple ToDo</h2>
            <div className="contentApp">
                <ul className="list-group">
                    <li>Lite</li>
                </ul>
            </div>
            <div className="footerApp">
                <input type="text" name="new-todo" ref={node => {todo = node}} />
                <button className="btn add-btn" onClick={() => this.addTodo(todo.value)}>Add</button>
                <button className="btn clear-btn" onClick={() => this.clearTodos(todo.value)}>Clear</button>
            </div>
        </div>
    )}
}


render(<App/>, document.getElementById('root'));