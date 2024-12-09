import { useEffect, useState } from "react";
import { Task } from "../types/type";
import { createTask, updateTask } from "../api";


type TaskFormProps = {
    onTaskCreatedOrUpdated: () => void;
    initialTask?: Task;
};

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreatedOrUpdated, initialTask }) => {
    const [title, setTitle] = useState(initialTask?.title || '');
    const [description, setDescription] = useState(initialTask?.description || '');
    const [status, setStatus] = useState(initialTask?.status || 'To Do');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
            setStatus(initialTask.status);
            setIsUpdating(true);
        } else {
            setTitle('');
            setDescription('');
            setStatus('To Do');
            setIsUpdating(false);
        }
    }, [initialTask]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const taskData = { title, description, status };

        try {
            if (isUpdating) {
                await updateTask(initialTask!.id!, taskData);
            } else {
                await createTask(taskData);
            }
            setTitle('');
            setDescription('');
            setStatus('To Do');
            setIsUpdating(false);
            onTaskCreatedOrUpdated();
        } catch (error) {
            console.error("Error submitting task: ", error);
        }
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit} className="taskForm">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" maxLength={500} />
                <select value={status} onChange={(e) => setStatus(e.target.value as 'To Do' | 'Completed')}>
                    <option value="To Do">To Do</option>
                </select>
                <button type="submit">{initialTask ? 'Update Task' : 'Create Task'}</button>
            </form>
        </div>
    )

};

export default TaskForm;