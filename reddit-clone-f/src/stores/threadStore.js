import { defineStore } from "pinia";
import axios from "axios";

export const useThreadStore = defineStore("threadStore", {
    state: () => ({
        threads: [],
    }),
    actions: {
        async fetchThreads() {
            const res = await axios.get("http://localhost:3000/api/ThreadAPIRoutes");
            this.threads = res.data;
        },
        async addThread(thread) {
            await axios.post("http://localhost:3000/api/ThreadAPIRoutes", thread);
            this.fetchThreads();
        },
        async deleteThread(id) {
            await axios.delete(`http://localhost:3000/api/ThreadAPIRoutes?id=${id}`);
            this.threads = this.threads.filter(thread => thread._id !== id);
        },
        async editThread(id, updatedData) {
            const res = await axios.put(`http://localhost:3000/api/ThreadAPIRoutes?id=${id}`, updatedData);
            this.threads = this.threads.map(thread =>
                thread._id === id ? res.data : thread
            );
        }
    },
});
