import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import toast from "react-hot-toast";

const TaskForm = ({ fetchTasks }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Validation
    if (!form.title.trim() || !form.description.trim()) {
      return toast.error("Title and Description both are required ❗");
    }

    try {
      await api.post("/tasks", form);
      toast.success("Task added successfully 🚀");
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      toast.error("Failed to add task");
    }
  };
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="w-full border p-2 rounded-lg"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="w-full border p-2 rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Add Task
      </button>
    </motion.form>
  );
};

export default TaskForm;
