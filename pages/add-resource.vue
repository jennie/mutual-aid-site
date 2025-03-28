<!-- pages/add-resource.vue -->
<template>
  <div class="container mx-auto p-4 max-w-2xl">
    <h1 class="text-3xl font-bold mb-4">Add New Mutual Aid Resource</h1>

    <form @submit.prevent="submitResource" class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold mb-4">Basic Information</h2>

        <div class="space-y-4">
          <div>
            <label class="block mb-1">Organization Name *</label>
            <input
              v-model="resource.name"
              required
              class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block mb-1">Description *</label>
            <textarea
              v-model="resource.description"
              required
              class="w-full border rounded p-2 h-32"
              placeholder="Describe what services they provide and who they serve..."></textarea>
          </div>

          <div>
            <label class="block mb-1">Website URL</label>
            <input
              v-model="resource.website"
              type="url"
              class="w-full border rounded p-2"
              placeholder="https://..." />
          </div>

          <div>
            <label class="block mb-1">Contact Email</label>
            <input
              v-model="resource.contactEmail"
              type="email"
              class="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold mb-4">Location</h2>

        <div class="space-y-4">
          <div>
            <label class="block mb-1">Province/Territory *</label>
            <select
              v-model="resource.region"
              required
              class="w-full border rounded p-2">
              <option value="">Select...</option>
              <option>Alberta</option>
              <option>British Columbia</option>
              <option>Manitoba</option>
              <option>New Brunswick</option>
              <option>Newfoundland and Labrador</option>
              <option>Northwest Territories</option>
              <option>Nova Scotia</option>
              <option>Nunavut</option>
              <option>Ontario</option>
              <option>Prince Edward Island</option>
              <option>Quebec</option>
              <option>Saskatchewan</option>
              <option>Yukon</option>
              <option>National</option>
            </select>
          </div>

          <div>
            <label class="block mb-1">City/Town</label>
            <input v-model="resource.city" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block mb-1">Address (if applicable)</label>
            <input
              v-model="resource.address"
              class="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold mb-4">Categorization</h2>

        <div class="space-y-4">
          <div>
            <label class="block mb-1"
              >Resource Tags (select all that apply) *</label
            >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
              <label
                class="flex items-center space-x-2"
                v-for="tag in availableTags">
                <input type="checkbox" :value="tag" v-model="resource.tags" />
                <span>{{ tag }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block mb-1">Services Offered (one per line)</label>
            <textarea
              v-model="servicesText"
              class="w-full border rounded p-2 h-24"
              placeholder="Food distribution&#10;Volunteer opportunities&#10;Financial support"></textarea>
          </div>

          <div>
            <label class="block mb-1">Communities Served</label>
            <input
              v-model="resource.communities"
              class="w-full border rounded p-2"
              placeholder="e.g., Families, Students, Seniors, Indigenous, 2SLGBTQ+" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold mb-4">Verification</h2>

        <div class="space-y-4">
          <div>
            <label class="block mb-1">Your Name *</label>
            <input
              v-model="resource.submittedBy"
              required
              class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block mb-1">Your Email *</label>
            <input
              v-model="resource.submitterEmail"
              type="email"
              required
              class="w-full border rounded p-2" />
          </div>

          <div class="flex items-center">
            <input type="checkbox" id="verified" v-model="resource.verified" />
            <label for="verified" class="ml-2">
              I verify that this information is accurate to the best of my
              knowledge
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer"
        :disabled="!resource.verified">
        Submit Resource
      </button>
    </form>
  </div>
</template>

<script setup>
// available tags for resources - these could also be defined in your database, but let's do this for simplicity
const availableTags = ["food", "housing", "financial support", "mental health"];

const resource = ref({
  name: "",
  description: "",
  website: "",
  contactEmail: "",
  region: "",
  city: "",
  address: "",
  tags: [],
  communities: "",
  submittedBy: "",
  submitterEmail: "",
  verified: false,
  active: true,
});

// partse services text area into array
const servicesText = ref("");
const router = useRouter();

// process form submission ⚙️
async function submitResource() {
  try {
    const formData = {
      ...resource.value,
      services: servicesText.value.split("\n").filter((s) => s.trim() !== ""),
      lastUpdated: new Date(),
      status: "pending",
    };

    const { error } = await useFetch("/api/resources", {
      method: "POST",
      body: formData,
    });

    if (error.value) {
      alert("There was an error submitting the resource. Please try again.");
      return;
    }

    alert("Thank you! 🙌🏻 Your resource has been submitted!");
    router.push("/");
  } catch (err) {
    alert("There was an error submitting the resource. Please try again.");
  }
}
</script>
