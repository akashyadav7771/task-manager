// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";



// export const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-bold text-white tracking-wide hover:text-indigo-400 transition"
//         >
//           Task<span className="text-indigo-500">Pro</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
//           {user && (
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
//                   : "hover:text-indigo-400 transition"
//               }
//             >
//               Dashboard
//             </NavLink>
//           )}

//           {user ? (
//             <>
//               <span className="text-gray-400 text-sm">
//                 Hi, <span className="text-white">{user.name}</span>
//               </span>

//               <button
//                 onClick={handleLogout}
//                 className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white transition shadow-md"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <NavLink
//                 to="/login"
//                 className="hover:text-indigo-400 transition"
//               >
//                 Login
//               </NavLink>

//               <NavLink
//                 to="/register"
//                 className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white transition shadow-md"
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//         </div>

//         {/* Mobile Button */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-white"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-slate-800 px-6 pb-4 space-y-4 text-gray-300">
//           {user && (
//             <Link to="/dashboard" onClick={() => setOpen(false)}>
//               Dashboard
//             </Link>
//           )}

//           {user ? (
//             <>
//               <p className="text-sm">
//                 Hi, <span className="text-white">{user.name}</span>
//               </p>
//               <button
//                 onClick={handleLogout}
//                 className="w-full bg-indigo-600 py-2 rounded-lg text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" onClick={() => setOpen(false)}>
//                 Login
//               </Link>
//               <Link to="/register" onClick={() => setOpen(false)}>
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };



// export default Navbar;






import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import toast from "react-hot-toast";
import { Search } from "lucide-react";


const Navbar = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/tasks?page=${page}&search=${search}&status=${status}`
      );

      setTasks(data.tasks);
      setPages(data.pages);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/*  PREMIUM NAVBAR */}
      <motion.div
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Left */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
             Hello, <span className="text-indigo-600">{user?.name}</span>
          </h1>

          {/* Right Controls */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-gray-700"
              />
            </div>

            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Tasks</option>
              <option value="pending">🟡 Pending</option>
              <option value="completed">🟢 Completed</option>
            </select>

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto p-6">
        <TaskForm fetchTasks={fetchTasks} />

        {loading ? (
          <p className="text-center mt-6">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center mt-6">No tasks found</p>
        ) : (
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(pages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === num + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white border"
              }`}
            >
              {num + 1}
            </button> 
            
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
