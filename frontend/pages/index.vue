<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <form
      @submit.prevent="uploadFile"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm"
    >
      <div class="mb-4">
        <label
          for="fileInput"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Choose a file:
        </label>
        <input
          id="fileInput"
          type="file"
          name="file"
          @change="handleFileChange"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-4">
        <label
          for="resolutionSelect"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Select resolution:
        </label>
        <select
          id="resolutionSelect"
          v-model="selectedResolution"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option
            v-for="resolution in resolutions"
            :key="resolution"
            :value="resolution"
          >
            {{ resolution }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-between mt-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
        <button
          type="button"
          @click.prevent="viewStatus"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View Status
        </button>
      </div>
    </form>

    <div v-if="statusData" class="mt-4 mx-44">
      <h2 class="text-2xl font-bold mb-2 first-letter:text-red-600">
        Status Information
      </h2>
      <div v-for="(images, category) in statusData" :key="category" class="">
        <h3
          class="text-sm my-5 first-letter:text-red-600 first-letter:uppercase font-semibold mb-1"
        >
          {{ category }}
        </h3>
        <ol v-if="images.length > 0" class="flex flex-wrap flex-row gap-5">
          <li v-for="image in images" :key="image.url" class="text-xs">
            <!-- <img :src="image.url" alt="Image" width="100" height="100" /> -->
            {{ image.url }}
          </li>
        </ol>
        <p v-else>No images in this category.</p>
      </div>
      <p v-if="Object.keys(statusData).length === 0">
        No status information available.
      </p>
    </div>

    <div v-if="alertMessage" class="mt-4">
      <div
        class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
        role="alert"
      >
        <p class="font-bold">Info:</p>
        <p>{{ alertMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const selectedFile = ref(null);
    const selectedResolution = ref("original");
    const resolutions = ref(["original", "low", "medium", "high"]);
    const statusData = ref(null);
    const alertMessage = ref(null);

    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("file", selectedFile.value);
      formData.append("resolution", selectedResolution.value);
      console.log("Request Payload:", formData);

      try {
        const response = await axios.post(
          "http://localhost:8080/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);

        alertMessage.value = "File uploaded successfully!";
        setTimeout(() => {
          alertMessage.value = null;
        }, 3000);
      } catch (error) {
        console.error("Error uploading file:", error);

        alertMessage.value = "Error uploading file. Please try again.";
        setTimeout(() => {
          alertMessage.value = null;
        }, 3000);
      }
    };

    const viewStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/images");
        statusData.value = response.data;
        console.log(response.data);

        alertMessage.value = "Status information retrieved successfully!";
        setTimeout(() => {
          alertMessage.value = null;
        }, 3000);
      } catch (error) {
        console.error(error);

        alertMessage.value =
          "Error fetching status information. Please try again.";
        setTimeout(() => {
          alertMessage.value = null;
        }, 3000);
      }
    };

    return {
      selectedFile,
      selectedResolution,
      resolutions,
      statusData,
      alertMessage,
      handleFileChange,
      uploadFile,
      viewStatus,
    };
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
