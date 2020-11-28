import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_name: '',
            todo_completed: false
        }
    }

    onChangeTodoName(e) {
        this.setState({
            todo_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo: ${this.state.todo_name}`);

        const newTodo = {
            todo_name: this.state.todo_name,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:9094/todolist', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_name: '',
            todo_completed: false
        })
        this.props.history.push('/');
        window.location.reload(false);
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Todo: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_name}
                            onChange={this.onChangeTodoName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
