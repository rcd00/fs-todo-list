import React, { useState, ChangeEvent, FormEvent } from 'react';
import moment from 'moment';

import { ReactComponent as DeleteIcon } from '../../src/assets/delete.svg';

import CheckContainer from './CheckContainer';

interface TodoItem {
    id?: string;
    item: string;
    progress: string;
    create_date: Date
    last_updated: Date
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
            create_date: new Date(),
            last_updated: new Date()
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
            progress: todo.progress === 'incomplete' ? 'complete' : 'incomplete',
            last_updated: new Date()
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

    const incompleteList = todoItems.filter(item => item.progress === 'incomplete')
    const completeList = todoItems.filter(item => item.progress === 'complete')

    const renderList = (listTitle: string, list: TodoItem[]) => {

        return (
            <div>
                <h2 className='font-medium text-xl'>{listTitle}</h2>
                <ul className="TodoList p-5">
                    {list.map((todo) => {
                        const { id, item, progress, create_date } = todo;
                        const createdDate = moment(create_date).fromNow()

                        return (
                            <li key={id} className='flex w-auto space py-1'>
                                <CheckContainer progress={progress} onClick={() => handleCheckboxChange(todo)} />
                                <div className='p-3'>
                                    <span className={`text-left ${progress === 'complete' && 'line-through text-gray-500'}`}>{item}</span>
                                    <span className=' text-xs text-left block text-gray-800	'>{createdDate}</span>
                                </div>
                                <div className='ml-auto p-3 flex gap-x-2'>
                                    <button className='w-8' onClick={() => handleDelete(todo)}><DeleteIcon className='w-5' /></button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }


    return (
        <div className="TodoContainer w-4/5">

            {renderList('Tasks', incompleteList)}
            {renderList('Completed Tasks', completeList)}

            <form onSubmit={handleSubmit}>
                <div className="Input">
                    <label className="block">
                        <span className="text-lg block pb-2 text-center">Add to-do</span>
                    </label>
                    <div className='w-4/5 flex  flex-col items-center m-auto gap-3'>
                        <input type="text" onChange={handleChange} value={inputValue} className="p-3 w-full bg-white border shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 text-center" placeholder="to-do" />
                        <button className='border rounded-md p-2 m-auto' type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
