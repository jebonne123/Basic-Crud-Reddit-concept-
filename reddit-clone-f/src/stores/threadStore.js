import { defineStore } from "pinia";
import axios from "axios";

// Get the base URL from the environment variable
const baseUrl = import.meta.env.VITE_API_URL;

export const useThreadStore = defineStore("threadStore", {
    state: () => ({
        threads: [],
    }),
    actions: {
        async fetchThreads() {
            // Fixing the double '/ThreadAPIRoutes' issue
            const res = await axios.get(`${baseUrl}`); // Just use base URL
            this.threads = res.data;
        },
        async addThread(thread) {
            await axios.post(`${baseUrl}`, thread); // Same here, no need to append 'ThreadAPIRoutes'
            this.fetchThreads();
        },
        async deleteThread(id) {
            await axios.delete(`${baseUrl}?id=${id}`); // Delete thread using base URL
            this.threads = this.threads.filter(thread => thread._id !== id);
        },
        async editThread(id, updatedData) {
            const res = await axios.put(`${baseUrl}?id=${id}`, updatedData); // Update thread using base URL
            this.threads = this.threads.map(thread =>
                thread._id === id ? res.data : thread
            );
        }
    },
});
