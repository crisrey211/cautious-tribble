import React from 'react'
import { Button, Card } from 'flowbite-react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'
import { useTask } from '@context/TasksContext'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const TaskCard = ({ task }) => {
    const { deleteTask } = useTask()

    return (
        <Card className="max-w-sm">
            <div className="min-w-0 flex-1">
                <header className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white gap-3 justify-around">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <div className="flex gap-2">
                        <Button
                            size="xs"
                            color={'failure'}
                            onClick={() => {
                                deleteTask(task._id)
                            }}
                        >
                            <FaRegTrashAlt />
                        </Button>

                        <Link to={`/tasks/${task._id}`}>
                            <MdModeEditOutline />
                        </Link>
                    </div>
                </header>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {dayjs(task.date).utc().format('DD/MM/YYYY')}
                    {/* {new Date(task.date).toLocaleDateString()} DONT WORK*/}
                    {/* <p>{task.date.toLocaleString()}</p> */}
                </p>
            </div>
        </Card>
    )
}

export default TaskCard
