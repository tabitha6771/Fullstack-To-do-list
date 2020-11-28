import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_name}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
        <td>
            <button className='button' onClick={() => axios.delete('http://localhost:9094/todolist/delete/' + props.todo._id).then(res => window.location.reload(false))}>Delete</button>
        </td>
    </tr >
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:9094/todolist')
            .then(response => {
                this.setState({ todos: response.data.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Todo</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
