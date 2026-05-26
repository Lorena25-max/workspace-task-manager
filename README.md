# 🚀 Workspace - Gestor de Tareas y Productividad

Aplicación web SPA desarrollada con React + Vite para la gestión de tareas de equipos de trabajo.

Este proyecto fue construido como prueba técnica enfocada en:
- Arquitectura frontend moderna
- CRUD completo
- UX/UI profesional
- Manejo de estado
- Persistencia de sesión
- Drag & Drop estilo Trello
- Buenas prácticas con GitFlow

---

# ✨ Características

✅ Inicio de sesión con LocalStorage  
✅ Protección de rutas privadas  
✅ CRUD completo de tareas  
✅ Consumo de API REST  
✅ Drag & Drop entre columnas  
✅ Modal premium de edición  
✅ Confirmaciones con SweetAlert2  
✅ Loader mientras carga la API  
✅ Filtros por estado  
✅ Responsive Design  
✅ Glassmorphism UI  
✅ Dashboard moderno tipo SaaS  
✅ Validación de fechas vencidas  
✅ Persistencia de sesión por usuario  
✅ Gestión de tareas por departamento  
✅ Feedback visual durante Drag & Drop  

---

# 🛠️ Stack Tecnológico

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- SweetAlert2
- Axios
- MockAPI
- LocalStorage
- Git & GitHub
- Vercel

---

# 🌐 API Mockeada

API utilizada:

https://6a14c5b191ff9a63de070727.mockapi.io/api/tasks

---

# 📸 Screenshots

## 🔐 Login

![Login](./public/screenshots/login.jpeg)

---

## 📋 Dashboard

![Dashboard](./public/screenshots/dashboard.jpeg)

---

## 🚀 Drag & Drop

![DragDrop](./public/screenshots/drag-drop.jpeg)

---

## ✏️ Modal de edición

![Modal](./public/screenshots/edit-modal.jpeg)

---

## 📱 Responsive

![Responsive](./public/screenshots/mobile.jpeg)

---

# ⚙️ Instalación Local

## 1. Clonar repositorio

```bash
git clone https://github.com/Lorena25-max/workspace-task-manager
```

---

## 2. Entrar al proyecto

```bash
cd pruebatecnica-lorena
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Ejecutar servidor

```bash
npm run dev
```

---

# 📂 Arquitectura del Proyecto

```txt
src/
│
├── components/
│   ├── EditTaskModal.jsx
│   ├── Loader.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── routes/
│   └── PrivateRoute.jsx
│
├── services/
│   └── taskService.js
│
├── App.jsx
├── main.jsx
```

---

# 🌳 GitFlow Implementado

El proyecto fue desarrollado usando flujo GitFlow:

- main
- develop
- feature/*
- fix/*

Con commits descriptivos siguiendo convenciones profesionales.

---

# 🚀 Deploy

## 🌍 Aplicación en Producción

https://workspace-task-manager-6cxh3p33r-lorena-ruiz-s-projects.vercel.app/login

---

# 🧠 Decisiones Técnicas

- Se utilizó React + Vite para mejorar rendimiento y velocidad de desarrollo.
- Tailwind CSS permitió construir una interfaz moderna y responsive.
- Se implementó LocalStorage para simular persistencia de sesión.
- MockAPI fue utilizado para simular una API RESTful real.
- Se aplicó arquitectura basada en componentes reutilizables.
- Drag & Drop fue diseñado para mejorar la experiencia de usuario tipo Trello.

# 👩‍💻 Autor

Desarrollado por Lorena Ruiz Pérez