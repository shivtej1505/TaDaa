import React from 'react';

export class FooterApp extends React.Component {
    render() {
        let todo;
        let { addTodo, clearTodos } = this.props;
        return(
            <div className="footerApp">
                <input type="text" name="todoInput" defaultValue="" placeholder="Write your task here" ref={node => {todo = node;}} />
                <button className="btn add-btn" onClick={() => {addTodo(todo.value); todo.value = "";}}>Add</button>
                <button className="btn clear-btn" onClick={() => clearTodos()}>Clear</button>
            </div>
        )
    }
}