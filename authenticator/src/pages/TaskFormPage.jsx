import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTask } from '../context/TasksContext'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const TaskFormPage = () => {
    const { register, handleSubmit, setValue } = useForm()
    const { createTask, getTask, updateTask } = useTask()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id)
                setValue('title', task.title)
                setValue('description', task.description)
                setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'))
            }
        }
        loadTask()
    }, [])

    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
        }

        if (params.id) {
            updateTask(params.id, dataValid)
        } else {
            createTask(dataValid)
        }
        navigate('/tasks')
    })

    return (
        <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form className="flex flex-col" onSubmit={onSubmit}>
                <input
                    className={'w - full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'}
                    type="text"
                    placeholder="Title"
                    autoFocus
                    {...register('title')}
                />
                <textarea
                    className={'w - full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'}
                    rows={3}
                    placeholder="Description"
                    {...register('description')}
                />
                <input
                    className={'w - full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'}
                    type="date"
                    {...register('date')}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
            </form>
        </div>
    )
}

export default TaskFormPage
