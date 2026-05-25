import {
  useEffect,
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthContext";

import Loader from "../components/Loader";
import EditTaskModal from "../components/EditTaskModal";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export default function Dashboard() {
  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [filter, setFilter] =
    useState("TODAS");

  const [newTask, setNewTask] = useState({
    titulo: "",
    descripcion: "",
    fechaVencimiento: "",
    estado: "Pendiente",
  });

  // =========================
  // LOAD TASKS
  // =========================

  const loadTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks();

      setTasks(response.data);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las tareas",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // =========================
  // CREATE TASK
  // =========================

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTask.titulo.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Campo requerido",
        text: "El título es obligatorio",
      });
    }

    try {
      await createTask(newTask);

      Swal.fire({
        icon: "success",
        title: "Tarea creada",
        timer: 1200,
        showConfirmButton: false,
      });

      setNewTask({
        titulo: "",
        descripcion: "",
        fechaVencimiento: "",
        estado: "Pendiente",
      });

      loadTasks();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la tarea",
      });
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTask(id);

          Swal.fire({
            icon: "success",
            title: "Eliminada",
            timer: 1000,
            showConfirmButton: false,
          });

          loadTasks();
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdateTask = async (
    updatedTask
  ) => {
    try {
      await updateTask(
        updatedTask.id,
        updatedTask
      );

      Swal.fire({
        icon: "success",
        title: "Tarea actualizada",
        timer: 1000,
        showConfirmButton: false,
      });

      setEditingTask(null);

      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // DRAG START
  // =========================

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData(
      "task",
      JSON.stringify(task)
    );
  };

  // =========================
  // DROP
  // =========================

  const handleDrop = async (
    e,
    estado
  ) => {
    e.preventDefault();

    const task = JSON.parse(
      e.dataTransfer.getData("task")
    );

    try {
      await updateTask(task.id, {
        ...task,
        estado,
      });

      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  // =========================
  // FILTER
  // =========================

  const filteredTasks =
    filter === "TODAS"
      ? tasks
      : tasks.filter(
          (task) => task.estado === filter
        );

  // =========================
  // COLUMNS
  // =========================

  const columns = {
    Pendiente: filteredTasks.filter(
      (task) =>
        task.estado === "Pendiente"
    ),

    "En Progreso":
      filteredTasks.filter(
        (task) =>
          task.estado ===
          "En Progreso"
      ),

    Completada: filteredTasks.filter(
      (task) =>
        task.estado === "Completada"
    ),
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff]">

      {/* NAVBAR */}

      <header className="backdrop-blur-lg bg-white/60 border-b border-white/40 shadow-sm px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50">

        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-700 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
            Workspace
          </h1>

          <p className="text-slate-600 text-lg mt-1">
  Hola,
  <span className="font-bold text-indigo-700">
    {" "}
    {user?.username}
  </span>
  ✨
</p>

          

          <p className="text-slate-500 text-sm">
            Departamento: {user?.department}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:scale-105 transition text-white px-5 py-3 rounded-2xl shadow-lg font-semibold"
        >
          Cerrar sesión
        </button>
      </header>

      {/* MAIN */}

      <main className="p-6 max-w-7xl mx-auto">

        {/* FORM */}

        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 mb-8">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-3xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl shadow-lg">
              ✨
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Crear nueva tarea
              </h2>

              <p className="text-slate-500">
                Organiza mejor tu productividad
              </p>
            </div>

          </div>

          <form
            onSubmit={handleCreateTask}
            className="grid md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              placeholder="Título de la tarea"
              value={newTask.titulo}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  titulo:
                    e.target.value,
                })
              }
              className="bg-white/80 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl transition"
            />

            <input
              type="date"
              value={
                newTask.fechaVencimiento
              }
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  fechaVencimiento:
                    e.target.value,
                })
              }
              className="bg-white/80 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl transition"
            />

            <textarea
              placeholder="Descripción"
              value={newTask.descripcion}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  descripcion:
                    e.target.value,
                })
              }
              className="bg-white/80 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl md:col-span-2 min-h-[120px]"
            />

            <button className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 hover:scale-[1.02] transition-all text-white py-4 rounded-2xl shadow-xl font-semibold text-lg">
              Crear tarea
            </button>

          </form>
        </div>

        {/* STATS */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-all">

    <div className="flex justify-between items-center">

      <div>
        <p className="text-white/70 text-sm mb-2">
          Total tareas
        </p>

        <h3 className="text-4xl font-black">
          {tasks.length}
        </h3>
      </div>

      <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center text-3xl">
        📋
      </div>

    </div>

  </div>

  <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-all">

    <div className="flex justify-between items-center">

      <div>
        <p className="text-white/70 text-sm mb-2">
          En progreso
        </p>

        <h3 className="text-4xl font-black">
          {
            tasks.filter(
              (task) =>
                task.estado ===
                "En Progreso"
            ).length
          }
        </h3>
      </div>

      <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center text-3xl">
        ⚡
      </div>

    </div>

  </div>

  <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-all">

    <div className="flex justify-between items-center">

      <div>
        <p className="text-white/70 text-sm mb-2">
          Completadas
        </p>

        <h3 className="text-4xl font-black">
          {
            tasks.filter(
              (task) =>
                task.estado ===
                "Completada"
            ).length
          }
        </h3>
      </div>

      <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center text-3xl">
        ✅
      </div>

    </div>

  </div>

</div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3 mb-8">

          {[
            "TODAS",
            "Pendiente",
            "En Progreso",
            "Completada",
          ].map((item) => (

            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`px-5 py-3 rounded-2xl font-medium transition-all shadow-sm ${
                filter === item
                  ? "bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-lg scale-105"
                  : "bg-white/70 backdrop-blur-lg text-slate-700 hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LOADER */}

        {loading ? (
          <Loader />
        ) : (

          <div className="grid lg:grid-cols-3 gap-6">

            {Object.keys(columns).map(
              (estado) => (

                <div
                  key={estado}
                  onDrop={(e) =>
                    handleDrop(
                      e,
                      estado
                    )
                  }
                  onDragOver={allowDrop}
                  className="bg-white/50 backdrop-blur-xl border border-white/50 rounded-3xl p-5 shadow-xl min-h-[600px] hover:scale-[1.01] transition-all duration-300"
                >

                  <div className="flex justify-between items-center mb-5">

                    <h2 className="font-bold text-xl text-slate-800">
                      {estado}
                    </h2>

                    <span className="bg-white/80 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {
                        columns[estado]
                          .length
                      }
                    </span>

                  </div>

                  <div className="space-y-4">

                    {columns[
                      estado
                    ].map((task) => (

                      <div
                        key={task.id}
                        draggable
                        onDragStart={(
                          e
                        ) =>
                          handleDragStart(
                            e,
                            task
                          )
                        }
                        className={`
                          rounded-3xl p-5 shadow-lg hover:shadow-2xl 
                          hover:-translate-y-2 transition-all duration-300 
                          cursor-grab border backdrop-blur-xl
                          ${
                            task.estado ===
                            "Pendiente"
                              ? "bg-gradient-to-br from-rose-100 to-pink-50 border-rose-200"
                              : task.estado ===
                                "En Progreso"
                              ? "bg-gradient-to-br from-amber-100 to-yellow-50 border-amber-200"
                              : "bg-gradient-to-br from-emerald-100 to-green-50 border-emerald-200"
                          }
                        `}
                      >

                        <div className="flex justify-between items-start mb-4">

                          <h3 className="font-bold text-slate-800 text-lg leading-tight">
                            {
                              task.titulo
                            }
                          </h3>

                          <span
                            className={`
                              text-xs px-3 py-1 rounded-full font-semibold shadow-sm
                              ${
                                task.estado ===
                                "Pendiente"
                                  ? "bg-rose-500 text-white"
                                  : task.estado ===
                                    "En Progreso"
                                  ? "bg-amber-500 text-white"
                                  : "bg-emerald-500 text-white"
                              }
                            `}
                          >
                            {
                              task.estado
                            }
                          </span>

                        </div>

                        <p className="text-slate-700 text-sm mb-5 leading-relaxed">
                          {
                            task.descripcion
                          }
                        </p>

                        <div className="flex justify-between items-center mb-5">

                          <p className="text-xs text-slate-500 font-medium">
                            📅{" "}
                            {
                              task.fechaVencimiento
                            }
                          </p>

                          <div className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-lg flex items-center justify-center shadow-inner">
                            ✨
                          </div>

                        </div>

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              setEditingTask(
                                task
                              )
                            }
                            className="flex-1 bg-white/80 hover:bg-white text-slate-700 py-2.5 rounded-2xl transition font-semibold shadow-sm"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                task.id
                              )
                            }
                            className="flex-1 bg-slate-900 hover:bg-black text-white py-2.5 rounded-2xl transition font-semibold shadow-lg"
                          >
                            Eliminar
                          </button>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </main>

      {/* MODAL */}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() =>
            setEditingTask(null)
          }
          onSave={handleUpdateTask}
        />
      )}

    </div>
  );
}