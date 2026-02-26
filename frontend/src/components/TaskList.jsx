import { motion } from "framer-motion";
import api from "../services/api";
import toast from "react-hot-toast";

const TaskList = ({ tasks, fetchTasks }) => {

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const toggleStatus = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {tasks.map((task) => (
        <motion.div
          key={task._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
            <small style={{ color: "gray" }}>
   {new Date(task.createdAt).toLocaleDateString()} ||  
  {new Date(task.createdAt).toLocaleTimeString()}
</small>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => toggleStatus(task)}
              className="bg-indigo-500 text-white px-3 py-1 rounded-lg"
            >
              Toggle
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;