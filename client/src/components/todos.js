import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewToDo] = useState('');


    const { user, setUser } = useContext(UserContext)

    let onlineUser = JSON.parse(localStorage.getItem('onlineUser')).user_id;

    useEffect(() => {
        const getTodos = async () => {
            const data = await fetch(`http://localhost:8000/todos?user_id=${onlineUser}`);
            const response = await data.json();
            setTodos(response);
        }

        getTodos()


    }, [])

    useEffect(() => {

    }, [])


    const handleChange = async (i, todo_id, todo) => {
        const data = await fetch(`http://localhost:8000/todos/${todo_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !todo.completed })
        })
        const newArr = [...todos]
        console.log(i)
        if (newArr[i].completed === 1) {
            newArr[i].completed = 0
        } else {
            newArr[i].completed = 1
        }
        setTodos(newArr)
    }

    const handleSubmit = async () => {
        const data = await fetch(`http://localhost:8000/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body :JSON.stringify({user_id : onlineUser , task: newTodo , completed:false})
        })
        const response = await data.json();
        setTodos([...todos, response[0]])
    }



    return (
        <>
            <div >
                <input type="text" placeholder="enter todo" value={newTodo} onChange={e => setNewToDo(e.target.value)} />
                <button type='submit' onClick={handleSubmit}>add new task</button>
            </div>
            {todos.map((todo, i) => {
                
                return (
                    <>
                        <div key={todo.todo_id}>
                            <input type="checkbox" defaultChecked={todo.completed == 1 ? true : false} onChange={() => handleChange(i, todo.todo_id, todo)} />
                            <label className="labelTodo">{todo.task}</label>
                        </div>
                    </>
                )
            })
            }
        </>
    )


}