<!-- pages/resources.vue -->

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Mutual Aid Resources</h1>
      <NuxtLink
        to="/add-resource"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
        Add New Resource
      </NuxtLink>
    </div>

    <!-- search and filter section -->
    <div class="bg-gray-100 p-4 rounded-lg mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="w-full md:w-64">
          <label class="block mb-1 text-sm">Search</label>
          <input
            v-model="search"
            placeholder="Search resources..."
            class="w-full border rounded p-2" />
        </div>

        <div class="w-full md:w-48">
          <label class="block mb-1 text-sm">Region</label>
          <select v-model="region" class="w-full border rounded p-2">
            <option value="">All Regions</option>
            <option>Ontario</option>
            <option>Quebec</option>
            <option>British Columbia</option>
            <!-- add 'em all here -->
          </select>
        </div>

        <div class="w-full md:w-48">
          <label class="block mb-1 text-sm">Type of Aid</label>
          <select v-model="aidType" class="w-full border rounded p-2">
            <option value="">All Types</option>
            <option>Food</option>
            <option>Housing</option>
            <option>Financial</option>
            <option>Health</option>
            <option>Community Fridge</option>
            <!-- more types? -->
          </select>
        </div>
      </div>
    </div>

    <!-- results grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="resource in filteredResources"
        :key="resource._id"
        class="border rounded-lg p-4 shadow">
        <div class="flex justify-between items-start mb-2">
          <h2 class="text-xl font-semibold">{{ resource.name }}</h2>
          <span class="text-xs bg-gray-200 rounded-full px-2 py-1">{{
            resource.region
          }}</span>
        </div>

        <p class="mt-2 text-gray-700">{{ resource.description }}</p>

        <div class="mt-4 text-sm">
          <div class="flex flex-wrap gap-1 mb-2">
            <span
              v-for="tag in resource.tags"
              :key="tag"
              class="bg-blue-100 text-blue-800 rounded px-2 py-0.5">
              {{ tag }}
            </span>
          </div>

          <div class="flex justify-between items-center mt-4 pt-2 border-t">
            <a
              :href="resource.website"
              target="_blank"
              class="text-blue-600 hover:underline"
              >Visit Website</a
            >
            <span class="text-xs text-gray-500"
              >Updated: {{ formatDate(resource.lastUpdated) }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// this fetches all resources from our API:
const { data: resources } = await useFetch("/api/resources");

// the different search and filter states
const search = ref("");
const region = ref("");
const aidType = ref("");

// filter for resources based on search and filters
const filteredResources = computed(() => {
  if (!resources.value) return [];

  return resources.value.filter((resource) => {
    // search query
    const matchesSearch =
      search.value === "" ||
      resource.name.toLowerCase().includes(search.value.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.value.toLowerCase());

    // match region filter
    const matchesRegion =
      region.value === "" || resource.region === region.value;

    // match aid type filter
    const matchesType =
      aidType.value === "" || resource.tags.includes(aidType.value);

    return matchesSearch && matchesRegion && matchesType;
  });
});

// pretty-format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA");
}
</script>
