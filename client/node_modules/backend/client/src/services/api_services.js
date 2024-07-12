import axios from "axios";

export const apiServices = {
  signIn: async (payload) => {
    return await axios.post("/api/signin", payload);
  },

  loadUser: async () => {
    return await axios.get("/api/profile");
  },

  addProject: async (payload) => {
    return await axios.post("/api/add-project", payload);
  },

  deleteProject: async (id) => {
    return await axios.delete(`/api/project/${id}`);
  },

  updateProject: async (id, payload) => {
    return await axios.put(`/api/project/${id}`, payload);
  },

  showProject: async () => {
    return await axios.get("/api/project");
  },

  deleteMessage: async (id) => {
    return await axios.delete(`/api/message/${id}`);
  },

  replyMessage: async (id, payload) => {
    return await axios.post(`/api/message/${id}`, payload);
  },

  updateProfile: async (payload) => {
    return await axios.put("/api/profile/update", payload);
  },

  contactUs: async (payload) => {
    return await axios.post("/api/contactus", payload);
  },

  logout: async () => {
    return await axios.get("/api/logout");
  },
};
