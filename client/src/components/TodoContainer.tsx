import React, { useState, ChangeEvent, FormEvent } from 'react';
import moment from 'moment';

import { ReactComponent as DeleteIcon } from '../../src/assets/delete.svg';
import { ReactComponent as EditIcon } from '../../src/assets/edit.svg';

import CheckContainer from './CheckContainer';

interface TodoItem {
    id?: string;
    title: string;
    progress: string;
    create_date: Date
    last_updated: Date
}

interface Props {
    todoItems: TodoItem[];
    getData: () => Promise<void>;
}

const PROGRESS = {
    COMPLETE: 'complete',
    INCOMPLETE: 'incomplete',
}

export default function TodoContainer({ todoItems, getData }: Props): JSX.Element {
    const [newTitle, setNewTitle] = useState<string>('');
    const [editId, setEditId] = useState<string>('');
    const [updatedTitle, setUpdatedTitle] = useState<string>('');

    const incompleteList = todoItems.filter(item => item.progress === PROGRESS.INCOMPLETE)
    const completeList = todoItems.filter(item => item.progress === PROGRESS.COMPLETE)

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setNewTitle(e.target.value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        if (newTitle.trim() === '') {
            return;
        }

        const newItem: TodoItem = {
            title: newTitle,
            progress: PROGRESS.INCOMPLETE,
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

        setNewTitle('')

    }

    async function handleEditTodo(todo: TodoItem, editField: string): Promise<void> {
        const { id } = todo

        let updatedItem = {}

        if (editField === 'progress') {
            updatedItem = {
                ...todo,
                progress: todo.progress === PROGRESS.INCOMPLETE ? PROGRESS.COMPLETE : PROGRESS.INCOMPLETE,
                last_updated: new Date()
            };
        } else if (editField === 'title') {

            if (updatedTitle.trim() === '') {
                return;
            }

            setEditId('')
            setUpdatedTitle('')

            updatedItem = {
                ...todo,
                title: updatedTitle,
                last_updated: new Date()
            };
        }

        try {
            const response = await fetch(`http://localhost:8000/list/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            })

            if (response.status === 200) {
                getData();
            }
        } catch (error) {
            console.log(error)
        }

    }

    async function handleDelete(todo: TodoItem): Promise<void> {
        const { id } = todo

        try {
            const response = await fetch(`http://localhost:8000/list/${id}`, {
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

    function handleSetEdit(todo: TodoItem): void {
        const { id } = todo

        if (id) {
            setEditId(id)
        }
    }

    function handleEditChange(e: ChangeEvent<HTMLInputElement>): void {
        setUpdatedTitle(e.target.value)
    }


    function handleCancelEdit(): void {
        setEditId('')
        setUpdatedTitle('')
    }


    const renderList = (listTitle: string, list: TodoItem[]) => {

        const listMarkup = (
            <ul className="TodoList p-5">
                {list.map((todo) => {
                    const { id, title, progress, last_updated } = todo;
                    const lastUpdated = moment(last_updated).fromNow()

                    const editMode = editId === id

                    const titleMarkup = (
                        <div className="flex">
                            <CheckContainer progress={progress} onClick={() => handleEditTodo(todo, 'progress')} />
                            <div className='p-3'>
                                <p className={`text-left ${progress === PROGRESS.COMPLETE && 'line-through text-gray-500'}`}>{title}</p>
                                <p className=' text-xs text-left block text-gray-800	'>{lastUpdated}</p>
                            </div>

                        </div>
                    )

                    const editMarkup = (
                        <div className="flex gap-2 h-2/4 m-auto">
                            <input type="text" onChange={handleEditChange} value={updatedTitle} className=" w-full bg-white border shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 text-center" placeholder="Edit task name" />
                            <div className="flex gap-2">
                                <button className='rounded-md p-2 text-xs text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300' onClick={handleCancelEdit}>Cancel</button>
                                <button className='rounded-md p-2 text-xs text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300' onClick={() => handleEditTodo(todo, 'title')}>Done</button>
                            </div>
                        </div>
                    )

                    return (
                        <li key={id} className='flex w-auto py-1'>
                            {editMode ? editMarkup : titleMarkup}
                            <div className='ml-auto p-3 flex gap-x-2'>
                                {!editMode && progress === PROGRESS.INCOMPLETE ? <button className='w-8 flex flex-col items-center' onClick={() => handleSetEdit(todo)}><EditIcon className='w-5' /></button> : null}
                                <button className='w-8  flex flex-col items-center' onClick={() => handleDelete(todo)}><DeleteIcon className='w-5' /></button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        )

        return (
            <div>
                <h2 className='font-medium text-2xl'>{listTitle}</h2>
                {list.length ? listMarkup : <p className='text-center text-lg'>List is empty</p>}

            </div>
        );
    }

    return (
        <div className="TodoContainer w-2/4">
            {renderList('Tasks', incompleteList)}
            {renderList('Completed Tasks', completeList)}

            <form onSubmit={handleSubmit}>
                <div className="Input">
                    <label className="block">
                        <p className="text-lg block pb-2 text-center">Add task</p>
                    </label>
                    <div className='w-4/5 flex  flex-col items-center m-auto gap-3'>
                        <input type="text" onChange={handleChange} value={newTitle} className="p-3 w-2/4 bg-white border shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 text-center" placeholder="Write a new task" />
                        <button className='border rounded-md p-2 m-auto' type="submit">Add</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
