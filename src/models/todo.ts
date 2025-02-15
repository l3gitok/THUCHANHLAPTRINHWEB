// src/models/todo.ts
import { useState } from 'react';
import { Todo } from '@/services/todo';

export default () => {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const savedTodos = localStorage.getItem('todos');
		return savedTodos ? JSON.parse(savedTodos) : [];
	});

	const addTodo = (todo: Todo) => {
		const newTodos = [...todos, todo];
		setTodos(newTodos);
		localStorage.setItem('todos', JSON.stringify(newTodos));
	};

	const updateTodo = (updatedTodo: Todo) => {
		const newTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
		setTodos(newTodos);
		localStorage.setItem('todos', JSON.stringify(newTodos));
	};

	const deleteTodo = (id: string) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
		localStorage.setItem('todos', JSON.stringify(newTodos));
	};

	return {
		todos,
		addTodo,
		updateTodo,
		deleteTodo,
	};
};
