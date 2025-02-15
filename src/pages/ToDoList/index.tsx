// src/pages/TodoList/index.tsx
import { useModel } from 'umi';
import { useState } from 'react';
import { Button, Input, List, Checkbox } from 'antd';
import { Todo } from '@/services/todo';

const TodoList = () => {
	const { todos, addTodo, updateTodo, deleteTodo } = useModel('todo');
	const [newTodo, setNewTodo] = useState('');

	const handleAddTodo = () => {
		if (newTodo.trim()) {
			addTodo({ id: Date.now().toString(), title: newTodo, completed: false });
			setNewTodo('');
		}
	};

	const handleToggleTodo = (todo: Todo) => {
		updateTodo({ ...todo, completed: !todo.completed });
	};

	const handleDeleteTodo = (id: string) => {
		deleteTodo(id);
	};

	return (
		<div>
			<h1>Todo List</h1>
			<Input
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder='Add a new todo'
				onPressEnter={handleAddTodo}
			/>
			<Button onClick={handleAddTodo} type='primary' style={{ marginTop: 8 }}>
				Add Todo
			</Button>
			<List
				dataSource={todos}
				renderItem={(todo) => (
					<List.Item
						actions={[
							<Button type='link' onClick={() => handleDeleteTodo(todo.id)}>
								Delete
							</Button>,
						]}
					>
						<Checkbox checked={todo.completed} onChange={() => handleToggleTodo(todo)}>
							{todo.title}
						</Checkbox>
					</List.Item>
				)}
				style={{ marginTop: 16 }}
			/>
		</div>
	);
};

export default TodoList;
