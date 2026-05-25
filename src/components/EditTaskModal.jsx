import { useState } from "react";

export default function EditTaskModal({
  task,
  onClose,
  onSave,
}) {

  const [formData, setFormData] =
    useState(task);

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(formData);
  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-2xl overflow-hidden animate-[fadeIn_.3s_ease]">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 p-6 text-white">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-black">
                Editar tarea
              </h2>

              <p className="text-white/80 mt-1">
                Actualiza la información de la tarea
              </p>

            </div>

            <button
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/30 transition flex items-center justify-center text-2xl"
            >
              ✕
            </button>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          {/* TITLE */}

          <div>

            <label className="block text-slate-700 font-semibold mb-2">
              Título
            </label>

            <input
              type="text"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  titulo:
                    e.target.value,
                })
              }
              className="w-full bg-white/70 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl transition"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block text-slate-700 font-semibold mb-2">
              Descripción
            </label>

            <textarea
              value={
                formData.descripcion
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descripcion:
                    e.target.value,
                })
              }
              className="w-full bg-white/70 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl min-h-[140px]"
            />

          </div>

          {/* DATE + STATUS */}

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block text-slate-700 font-semibold mb-2">
                Fecha límite
              </label>

              <input
                type="date"
                value={
                  formData.fechaVencimiento
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fechaVencimiento:
                      e.target.value,
                  })
                }
                className="w-full bg-white/70 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl"
              />

            </div>

            <div>

              <label className="block text-slate-700 font-semibold mb-2">
                Estado
              </label>

              <select
                value={formData.estado}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estado:
                      e.target.value,
                  })
                }
                className="w-full bg-white/70 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl"
              >

                <option>
                  Pendiente
                </option>

                <option>
                  En Progreso
                </option>

                <option>
                  Completada
                </option>

              </select>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col md:flex-row gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-4 rounded-2xl transition font-semibold"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 hover:scale-[1.02] transition-all text-white py-4 rounded-2xl shadow-xl font-semibold"
            >
              Guardar cambios
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}