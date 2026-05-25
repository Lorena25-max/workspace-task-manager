import { useState, useEffect } from "react";

export default function EditTaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState(task);

  useEffect(() => {
    setForm(task);
  }, [task]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-3">
        <h2 className="text-lg font-bold">Editar tarea</h2>

        <input
          className="w-full border p-2 rounded"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded"
          value={form.descripcion}
          onChange={(e) =>
            setForm({ ...form, descripcion: e.target.value })
          }
        />

        <select
          className="w-full border p-2 rounded"
          value={form.estado}
          onChange={(e) =>
            setForm({ ...form, estado: e.target.value })
          }
        >
          <option>Pendiente</option>
          <option>En Progreso</option>
          <option>Completada</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>
          <button
            onClick={() => onSave(form)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}