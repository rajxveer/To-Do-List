import http from "../http-common";

class ToDoListDataService {
  getAll() {
    return http.get("/");
  }
  create(data) {
    return http.post("/tasks", data);
  }
  update(id, data) {
    return http.put(`/tasks/${id}`, data);
  }
  delete(id) {
    return http.delete(`/tasks/${id}`);
  }
}

export default new ToDoListDataService();