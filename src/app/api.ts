import { Task } from "./types/type";


const API_BASE_URL = 'http://localhost:8080/tasks'

export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to create task');
    }
    return response.json();
}

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return response.json();
}

export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
};