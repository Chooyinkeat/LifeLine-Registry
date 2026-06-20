<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchCampaignStats } from "@/services/campaigns";
import type { CampaignStats } from "@/types/Campaign";

const stats = ref<CampaignStats>({
  activeVolunteers: 0,
  completedCampaigns: 0,
  activeCampaigns: 0,
  communitiesServed: 0,
});

onMounted(async () => {
  try {
    stats.value = await fetchCampaignStats();
  } catch {
    // keep defaults on error
  }
});

function formatStat(value: number, suffix = "+") {
  if (value >= 1000) return `${Math.floor(value / 1000)}K${suffix}`;
  return `${value}${suffix}`;
}
</script>

<template>
  <section class="py-12 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
        <div>
          <h2 class="text-4xl font-bold text-primary-600">
            {{ formatStat(stats.activeVolunteers) }}
          </h2>
          <p class="mt-2 text-gray-600">Active Volunteers</p>
        </div>
        <div>
          <h2 class="text-4xl font-bold text-primary-600">
            {{ formatStat(stats.completedCampaigns) }}
          </h2>
          <p class="mt-2 text-gray-600">Total Campaigns</p>
        </div>
        <div>
          <h2 class="text-4xl font-bold text-primary-600">
            {{ formatStat(stats.activeCampaigns) }}
          </h2>
          <p class="mt-2 text-gray-600">Active Campaigns</p>
        </div>
        <div>
          <h2 class="text-4xl font-bold text-primary-600">
            {{ formatStat(stats.communitiesServed) }}
          </h2>
          <p class="mt-2 text-gray-600">Communities Served</p>
        </div>
      </div>
    </div>
  </section>
</template>
