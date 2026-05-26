import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    department: "Desarrollo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Campo requerido",
        text: "Debes ingresar tu nombre",
      });
    }

    login(form);

    Swal.fire({
      icon: "success",
      title: `Hola ${form.username} 👋`,
      text: "Bienvenido a Workspace",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-700 via-fuchsia-600 to-cyan-500 overflow-hidden">

      {/* LEFT SIDE */}

      <div className="flex-1 relative flex items-center justify-center p-10">

        {/* BLURS */}

        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300/30 rounded-full blur-3xl"></div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-xl text-white">

          <div className="mb-8">

            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-4xl shadow-2xl mb-6">
              ✨
            </div>

            <h1 className="text-6xl font-black leading-tight mb-6">
              Workspace
            </h1>

            <p className="text-2xl text-white/90 leading-relaxed">
              Organiza tus tareas, mejora tu productividad y transforma el caos diario en progreso real.
            </p>

          </div>

          {/* MINI CARDS */}

          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">

              <h3 className="text-4xl font-black mb-2">
                +85%
              </h3>

              <p className="text-white/80">
                Más organización diaria
              </p>

            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">

              <h3 className="text-4xl font-black mb-2">
                ⚡
              </h3>

              <p className="text-white/80">
                Prioriza lo importante
              </p>

            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">

              <h3 className="text-4xl font-black mb-2">
                📅
              </h3>

              <p className="text-white/80">
                Controla fechas límite
              </p>

            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">

              <h3 className="text-4xl font-black mb-2">
                🚀
              </h3>

              <p className="text-white/80">
                Trabaja con claridad
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 rounded-[2rem] shadow-2xl p-8">

          <div className="text-center mb-8">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/20 flex items-center justify-center text-4xl shadow-xl mb-5">
              👋
            </div>

            <h2 className="text-4xl font-black text-white mb-3">
              Bienvenido
            </h2>

            <p className="text-white/80 text-lg">
              Inicia sesión para continuar
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="block text-white mb-2 font-medium">
                Nombre
              </label>

              <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username:
                      e.target.value,
                  })
                }
                className="w-full bg-white/20 border border-white/30 placeholder:text-white/60 text-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-white/30 transition"
              />

            </div>

            <div>

              <label className="block text-white mb-2 font-medium">
                Departamento
              </label>

              <select
                value={form.department}
                onChange={(e) =>
                  setForm({
                    ...form,
                    department:
                      e.target.value,
                  })
                }
                className="w-full bg-white/20 border border-white/30 text-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-white/30 transition"
              >

                <option className="text-black">
                  Desarrollo
                </option>

                <option className="text-black">
                  Diseño
                </option>

                <option className="text-black">
                  Marketing
                </option>

                <option className="text-black">
                  Administración
                </option>

              </select>

            </div>

            <button
              className="w-full bg-white text-indigo-700 hover:scale-[1.02] transition-all font-bold py-4 rounded-2xl shadow-2xl text-lg"
            >
              Ingresar al Workspace
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}