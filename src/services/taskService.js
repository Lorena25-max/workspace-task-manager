import axios from "axios";

const API_URL =
  "https://6a14c5b191ff9a63de070727.mockapi.io/api/tasks";

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) =>
  axios.post(API_URL, task);

export const updateTask = (id, task) =>
  axios.put(`${API_URL}/${id}`, task);

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/${id}`);