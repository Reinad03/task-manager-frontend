import { deleteTask, updateTask } from "../api";
import { Task } from "../types/type";

type TaskListProps = {
    tasks: Task[];
    onTaskDeleted: () => void;
    onEditTask: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskDeleted, onEditTask }) => {
    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            onTaskDeleted();
        } catch (error) {
            console.error('Error deleting task; ', error)
        }
    };

    const handleToggleStatus = async (task: Task) => {
        const updatedStatus: 'To Do' | 'Completed' = task.status === 'To Do' ? 'Completed' : 'To Do';
        const updatedTask = { ...task, status: updatedStatus };

        try {
            await updateTask(task.id, updatedTask);
            onTaskDeleted();
        } catch (error) {
            console.error('Error toggling task status:', error);
        }
    };

    return (
        <ul className="taskList">
            {tasks.map((task) => (
                <li key={task.id} className="taskItem">
                    <h3 className={task.status === 'Completed' ? 'completed' : ''}>{task.title}</h3>
                    <p className={task.status === 'Completed' ? 'completed' : ''}>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <div className="actions">
                        <button className="editButton" onClick={() => onEditTask(task)}>Edit</button>
                        <button className="deleteButton" onClick={() => handleDelete(task.id!)}>Delete</button>
                        <button className="toggleButton" onClick={() => handleToggleStatus(task)}>
                            {task.status === 'To Do' ? 'Complete' : 'Undo'}</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;