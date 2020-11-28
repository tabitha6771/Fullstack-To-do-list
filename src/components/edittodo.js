import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_name: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:9094/todolist/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_name: response.data.todo_name,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodoName(e) {
        this.setState({
            todo_name: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_name: this.state.todo_name,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:9094/todolist/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_name}
                            onChange={this.onChangeTodoName}
                        />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.todo_completed}
                            value={this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
