import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface TodoItem {
    id: number;
    item: string;
    isCompleted: boolean;
}

export default function TodoContainer(): JSX.Element {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        fetch("http://localhost:8080/list", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => setTodoItems(response))
            .catch((error) => console.error(error));
    }, []);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        if (inputValue.trim() === '') {
            return;
        }

        const newItem: TodoItem = {
            id: 0,
            item: inputValue,
            isCompleted: false
        };

        setTodoItems([...todoItems, newItem]);
        setInputValue('');
    }

    function handleCheckboxChange(id: number): void {
        const updatedTodos: TodoItem[] = todoItems.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        setTodoItems(updatedTodos);
    }

    return (
        <div className="TodoContainer border rounded-md border-orange-400 p-10">
            <h2 className='text-center font-medium text-xl'>Todo List</h2>

            <ul className="TodoList p-5">
                {todoItems.map((todo) => {
                    const { id, item, isCompleted } = todo;

                    console.log(`${item} -- ${isCompleted}`);

                    return (
                        <li key={id} className='flex'>
                            <input type="checkbox" className="default:ring-2 ..." onChange={() => handleCheckboxChange(id)} />
                            <div className={`px-2 text-left ${isCompleted ? 'text-amber-400' : 'text-red-600'}`}>{item}</div>
                        </li>
                    );
                })}
            </ul>

            <form onSubmit={handleSubmit}>
                <div className="Input">
                    <label className="block">
                        <span className="text-lg block pb-2 text-center">Add to-do</span>
                    </label>
                    <input type="text" onChange={handleChange} value={inputValue} className="p-3 bg-white border shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="to-do" />
                    <button className='border rounded-md my-2 p-2 w-full' type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
