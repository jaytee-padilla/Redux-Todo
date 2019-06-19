import React from 'react';
import {connect} from 'react-redux';
import {Input, Form, Button, Checkbox} from 'antd';
import {addTodo, toggleTodo, deleteTodo} from './actions';
import './App.css';
import 'antd/dist/antd.css';
import uuid4 from 'uuid/v4';

class App extends React.Component {
	state = {
		todo: '',
	};

	onSubmitHandler = event => {
		event.preventDefault();

		const todo = {
			task: this.state.todo,
			completed: false,
			id: uuid4()
		};

		this.props.addTodo(todo);
		this.setState({todo: ''});
	}

	onChangeHandler = event => {
		this.setState({[event.target.name]: event.target.value})
	};

	render() {
		return (
			<div className="App">
				<Form onSubmit={this.onSubmitHandler}>
					<Input name={"todo"} value={this.state.todo} onChange={this.onChangeHandler} />
					<Button type={"primary"} onClick={this.onSubmitHandler}>Add Todo</Button>
				</Form>
				{this.props.todos.map(todo => {
					return <h3 key={uuid4()} onClick={() => this.props.toggleTodo(todo.id)}>
						<Checkbox checked={todo.completed} />
						{todo.task}
						<Button type={"danger"} onClick={() => this.props.deleteTodo(todo.id)}>Delete</Button>
					</h3>
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		todos: state.todos
	}
}

export default connect(mapStateToProps, {addTodo, toggleTodo, deleteTodo})(App);
