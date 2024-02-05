<!-- <template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm"
      action="http://localhost:8080/upload"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fileInput">
          Choose a file:
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fileInput"
          type="file"
          name="file"
          @change="handleFileChange"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="resolutionSelect">
          Select resolution:
        </label>
        <select
          v-model="selectedResolution"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="resolutionSelect"
        >
          <option v-for="resolution in resolutions" :key="resolution" :value="resolution">
            {{ resolution }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click.prevent="uploadFile"
        >
          Upload
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedResolution: "original",
      resolutions: ["original", "low", "medium", "high"],
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("resolution", this.selectedResolution);

      // Make a POST request to the backend API
      this.$axios
        .post("http://localhost:8080/upload", formData)
        .then((response) => {
          console.log(response.data);
          // Handle success (if needed)
        })
        .catch((error) => {
          console.error(error);
          // Handle error (if needed)
        });
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here if needed */
</style> -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm"
      action="http://localhost:8080/upload"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fileInput">
          Choose a file:
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fileInput"
          type="file"
          name="file"
          @change="handleFileChange"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="resolutionSelect">
          Select resolution:
        </label>
        <select
          v-model="selectedResolution"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="resolutionSelect"
        >
          <option v-for="resolution in resolutions" :key="resolution" :value="resolution">
            {{ resolution }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-between mt-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click.prevent="uploadFile"
        >
          Upload
        </button>
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click.prevent="viewStatus"
        >
          View Status
        </button>
      </div>
    </form>

    <!-- Display status information -->
    <div v-if="statusData" class="mt-4">
      <h2 class="text-xl font-bold mb-2">Status Information</h2>
      <div v-for="(images, category) in statusData" :key="category">
        <h3 class="text-lg font-semibold mb-1">{{ category }}</h3>
        <ul v-if="images.length > 0">
          <li v-for="image in images" :key="image.url">
            {{ image.url }}
          </li>
        </ul>
        <p v-else>No images in this category.</p>
      </div>
      <p v-if="Object.keys(statusData).length === 0">No status information available.</p>
    </div>

    <!-- Alert message -->
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
export default {
  data() {
    return {
      selectedResolution: "original",
      resolutions: ["original", "low", "medium", "high"],
      selectedFile: null,
      statusData: null, // To store status information
      alertMessage: null, // To store alert message
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("resolution", this.selectedResolution);

      this.$axios
        .post("http://localhost:8080/upload", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    viewStatus() {
      this.$axios
        .get("http://localhost:8080/images")
        .then((response) => {
          this.statusData = response.data;
          console.log(response.data);

          // Show alert with information
          this.alertMessage = "Status information retrieved successfully!";
          setTimeout(() => {
            this.alertMessage = null;
          }, 3000); // Clear alert after 3 seconds
        })
        .catch((error) => {
          console.error(error);

          // Show alert with error message
          this.alertMessage = "Error fetching status information. Please try again.";
          setTimeout(() => {
            this.alertMessage = null;
          }, 3000); // Clear alert after 3 seconds
        });
    },
  },
};
</script>

<style scoped>
/* ... (your existing styles) ... */
</style>
