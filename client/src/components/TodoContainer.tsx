import React, { useState, ChangeEvent, FormEvent } from 'react';


interface TodoItem {
    id?: string;
    item: string;
    progress: string;
    create_date: Date
}

interface Props {
    todoItems: TodoItem[];
    getData: () => Promise<void>;
}

export default function TodoContainer({ todoItems, getData }: Props): JSX.Element {
    const [inputValue, setInputValue] = useState<string>('');

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        if (inputValue.trim() === '') {
            return;
        }

        const newItem: TodoItem = {
            item: inputValue,
            progress: 'incomplete',
            create_date: new Date()
        };

        try {
            const response = await fetch("http://localhost:8000/list", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            })

            if (response.status === 200) {
                getData();
            }
        } catch (error) {
            console.log(error)
        }

        setInputValue('')

    }

    async function handleCheckboxChange(todo: TodoItem): Promise<void> {

        const updatedTodo = {
            ...todo,
            progress: todo.progress === 'incomplete' ? 'complete' : 'incomplete'
        };

        try {
            const response = await fetch(`http://localhost:8000/list/${todo.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTodo)
            })

            if (response.status === 200) {
                getData();
            }
        } catch (error) {
            console.log(error)
        }

    }

    async function handleDelete(todo: TodoItem): Promise<void> {

        try {
            const response = await fetch(`http://localhost:8000/list/${todo.id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.status === 200) {
                getData();
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="TodoContainer border rounded-md border-orange-400 p-10">
            <h2 className='text-center font-medium text-xl'>Todo List</h2>

            <ul className="TodoList p-5">
                {todoItems.map((todo) => {
                    const { id, item, progress } = todo;

                    return (
                        <li key={id} className='flex'>
                            <input type="checkbox" checked={progress === 'complete'} className="default:ring-2 ..." onChange={() => handleCheckboxChange(todo)} />
                            <div className={`px-2 text-left ${progress === 'complete' ? 'text-amber-400' : 'text-red-600'}`}>{item}</div>
                            <p className=' text-right pl-10' onClick={() => handleDelete(todo)}>x</p>
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
