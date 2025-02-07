<script setup>
import { onMounted, ref } from "vue";
import { useThreadStore } from "../stores/threadStore";

const threadStore = useThreadStore();
const title = ref("");
const content = ref("");
const editingThread = ref(null);
const editTitle = ref("");
const editContent = ref("");

onMounted(() => {
  threadStore.fetchThreads();
});

const submitThread = () => {
  threadStore.addThread({ title: title.value, content: content.value });
  title.value = "";
  content.value = "";
};

const deleteThread = (id) => {
  threadStore.deleteThread(id);
};

const startEdit = (thread) => {
  editingThread.value = thread._id;
  editTitle.value = thread.title;
  editContent.value = thread.content;
};

const submitEdit = () => {
  if (editingThread.value) {
    threadStore.editThread(editingThread.value, {
      title: editTitle.value,
      content: editContent.value,
    });
    editingThread.value = null;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#0E1113] flex flex-col items-center py-10">
    <!-- Header -->
    <div class="bg-[#0E1113] w-full p-4 shadow-md fixed top-0 left-0 z-50 border-b-1 border-gray-700">
      <div class="flex items-center space-x-2">
        <h1 class="text-3xl font-semibold text-white">Reddit Clone</h1>
      </div>
      <p class="text-white"> By jebonne</p>
      <p class="text-white"> basic CRUD operation following the Reddit concept.</p>
    </div>

    <!-- New Thread Form -->
    <div class="bg-white w-full max-w-4xl mt-25 p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold text-gray-700 mb-4">Create a new post</h2>
      <input 
        v-model="title" 
        type="text" 
        placeholder="Thread Title" 
        class="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500"
      />
      <textarea 
        v-model="content" 
        placeholder="What’s on your mind?" 
        class="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500"
      ></textarea>
      <button 
        @click="submitThread" 
        class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 cursor-pointer mt-4"
      >
        Post
      </button>
    </div>

    <!-- Threads List -->
    <div class="mt-8 w-full max-w-4xl">
      <div v-for="thread in [...threadStore.threads].reverse()" :key="thread._id" class="bg-white p-6 rounded-lg shadow-md mb-6">
        
        <div class="relative">
          <div class="absolute right-0 flex flex-col space-y-2">
            <button @click="startEdit(thread)" class="p-1 rounded hover:bg-gray-200">
              <img src="../../image/edit.png" alt="Edit" class="w-6 h-6" />
            </button>
            <button @click="deleteThread(thread._id)" class="p-1 rounded hover:bg-gray-200">
              <img src="../../image/delete.png" alt="Delete" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-800">{{ thread.title }}</h3>
        </div>

        <p class="text-gray-600 mt-2">{{ thread.content }}</p>
        <div class="mt-4 flex items-center text-sm text-gray-500">
          <span>Posted by Anonymous</span>
          <span class="ml-4">•</span>
          <span class="ml-4">{{ thread.createdAt ? new Date(thread.createdAt).toLocaleString() : "Unknown Date" }}</span>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingThread" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Edit Post</h2>
        <input v-model="editTitle" type="text" class="w-full p-4 border border-gray-300 rounded-md mb-4" />
        <textarea v-model="editContent" class="w-full p-4 border border-gray-300 rounded-md"></textarea>
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="editingThread = null" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          <button @click="submitEdit" class="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>

  </div>
</template>

