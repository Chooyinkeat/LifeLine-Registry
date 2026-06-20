<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import {
  fetchCampaigns,
  createCampaign,
  joinCampaign,
  deleteCampaign,
} from "@/services/campaigns";
import type { Campaign, CreateCampaignPayload } from "@/types/Campaign";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { isAuthenticated, isOrganization, isVolunteer, user } = useAuth();

const campaigns = ref<Campaign[]>([]);
const loading = ref(true);
const showCreateModal = ref(false);
const submitting = ref(false);

const form = ref<CreateCampaignPayload>({
  title: "",
  description: "",
  location: "",
  urgency: "Medium",
});

onMounted(async () => {
  await loadCampaigns();
});

async function loadCampaigns() {
  loading.value = true;
  try {
    campaigns.value = await fetchCampaigns();
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load campaigns. Is the backend running?",
    });
  } finally {
    loading.value = false;
  }
}

function openCreateModal() {
  if (!isAuthenticated.value) {
    router.push("/login");
    return;
  }
  if (!isOrganization.value) {
    Swal.fire({
      icon: "info",
      title: "Organizations Only",
      text: "Only organization accounts can create campaigns.",
    });
    return;
  }
  showCreateModal.value = true;
}

async function handleCreate() {
  submitting.value = true;
  try {
    const created = await createCampaign(form.value);
    campaigns.value.unshift(created);
    showCreateModal.value = false;
    form.value = { title: "", description: "", location: "", urgency: "Medium" };
    Swal.fire({
      icon: "success",
      title: "Campaign Created",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    Swal.fire({ icon: "error", title: "Failed", text: message });
  } finally {
    submitting.value = false;
  }
}

async function handleJoin(campaign: Campaign) {
  if (!isAuthenticated.value) {
    router.push("/login");
    return;
  }
  if (!isVolunteer.value) {
    Swal.fire({
      icon: "info",
      title: "Volunteers Only",
      text: "Only volunteer accounts can join campaigns.",
    });
    return;
  }
  try {
    const updated = await joinCampaign(campaign.id);
    const index = campaigns.value.findIndex((c) => c.id === campaign.id);
    if (index !== -1) campaigns.value[index] = updated;
    Swal.fire({
      icon: "success",
      title: "Joined!",
      text: `You joined "${campaign.title}".`,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({ icon: "error", title: "Failed", text: getErrorMessage(error) });
  }
}

async function handleDelete(campaign: Campaign) {
  const result = await Swal.fire({
    icon: "warning",
    title: "Delete Campaign?",
    text: `This will permanently delete "${campaign.title}".`,
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
  });
  if (!result.isConfirmed) return;

  try {
    await deleteCampaign(campaign.id);
    campaigns.value = campaigns.value.filter((c) => c.id !== campaign.id);
    Swal.fire({
      icon: "success",
      title: "Deleted",
      timer: 1200,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({ icon: "error", title: "Failed", text: getErrorMessage(error) });
  }
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    const msg = error.response.data.message;
    return Array.isArray(msg) ? msg.join(", ") : msg;
  }
  return "Something went wrong. Please try again.";
}

function urgencyClass(urgency: string) {
  if (urgency === "High") return "bg-red-100 text-red-700";
  if (urgency === "Low") return "bg-green-100 text-green-700";
  return "bg-yellow-100 text-yellow-700";
}

function urgencyBar(urgency: string) {
  if (urgency === "High") return "bg-red-500";
  if (urgency === "Low") return "bg-green-500";
  return "bg-yellow-500";
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Campaigns</h1>
          <p class="text-xl text-gray-600">
            Manage and discover community campaigns
          </p>
        </div>
        <button
          @click="openCreateModal"
          class="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md"
        >
          + Create Campaign
        </button>
      </div>

      <div v-if="loading" class="text-center py-16 text-gray-500">
        Loading campaigns...
      </div>

      <div
        v-else-if="campaigns.length === 0"
        class="bg-white rounded-xl shadow-md p-12 border border-gray-200 text-center"
      >
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">No campaigns yet</h2>
        <p class="text-gray-500 mb-6">
          Be the first to create a community campaign.
        </p>
        <button
          @click="openCreateModal"
          class="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
        >
          Create Campaign
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
        >
          <div :class="['h-2', urgencyBar(campaign.urgency)]" />
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  urgencyClass(campaign.urgency),
                ]"
              >
                {{ campaign.urgency }} Priority
              </span>
              <span
                class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold"
              >
                {{ campaign.status }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ campaign.title }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ campaign.description }}
            </p>
            <div class="flex items-center text-sm text-gray-500 mb-2 space-x-4">
              <span>{{ campaign.location }}</span>
              <span>{{ campaign.volunteers }} volunteers</span>
            </div>
            <p class="text-xs text-gray-400 mb-4">
              by {{ campaign.createdBy.name }}
            </p>
            <div class="flex gap-2">
              <button
                v-if="campaign.status === 'Active'"
                @click="handleJoin(campaign)"
                class="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Join Campaign
              </button>
              <button
                v-if="user?.id === campaign.createdBy.id"
                @click="handleDelete(campaign)"
                class="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showCreateModal = false"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Create Campaign</h2>
        <form @submit.prevent="handleCreate" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >Title</label
            >
            <input
              v-model="form.title"
              required
              minlength="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="Campaign title"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >Description</label
            >
            <textarea
              v-model="form.description"
              required
              minlength="10"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="Describe the campaign..."
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >Location</label
            >
            <input
              v-model="form.location"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="City or area"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >Urgency</label
            >
            <select
              v-model="form.urgency"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div class="flex gap-3 pt-2">
            <button
              type="button"
              @click="showCreateModal = false"
              class="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
            >
              {{ submitting ? "Creating..." : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
