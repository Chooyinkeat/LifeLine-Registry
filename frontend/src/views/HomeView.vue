<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchCampaigns } from "@/services/campaigns";
import type { Campaign } from "@/types/Campaign";
import Hero from "@/components/Hero.vue";
import Stats from "@/components/Stats.vue";
import Campaigns from "@/components/Campaigns.vue";
import Features from "@/components/Features.vue";

const campaigns = ref<Campaign[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const all = await fetchCampaigns("Active");
    campaigns.value = all.slice(0, 3);
  } catch {
    campaigns.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
    <Hero />
    <Stats />
    <div v-if="loading" class="py-16 text-center text-gray-500">
      Loading campaigns...
    </div>
    <Campaigns v-else :campaigns="campaigns" />
    <Features />
  </div>
</template>
