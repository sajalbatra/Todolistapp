import Task from '../models/Task.js';

// Controller function to create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, category, dueDate } = req.body;

        const newTask = new Task({
            title,
            description,
            category,
            dueDate,
            user: req.user._id // Assuming you have user authentication and you can access the user ID from the request
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, dueDate } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, {
            title,
            description,
            category,
            dueDate
        }, { new: true });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await Task.findByIdAndDelete(id);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createTask, getAllTasks, updateTask, deleteTask };
