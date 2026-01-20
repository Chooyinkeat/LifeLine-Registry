<script setup lang="ts">
import { ref } from "vue";
import Hero from "@/components/Hero.vue"; // <-- import your component
import Stats from "@/components/Stats.vue";
import Campaigns from "@/components/Campaigns.vue";
import Features from "@/components/Features.vue";

const campaigns = ref([
  {
    id: 1,
    title: "Emergency Relief Drive",
    description:
      "Collecting essential supplies for families affected by recent flooding",
    status: "Active",
    volunteers: 45,
    location: "Downtown Area",
    urgency: "High",
  },
  {
    id: 2,
    title: "Community Cleanup Day",
    description: "Join us in cleaning up local parks and public spaces",
    status: "Active",
    volunteers: 32,
    location: "Central Park",
    urgency: "Medium",
  },
  {
    id: 3,
    title: "Food Bank Support",
    description: "Volunteers needed to organize and distribute food items",
    status: "Active",
    volunteers: 28,
    location: "Community Center",
    urgency: "Medium",
  },
]);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
    <!-- Hero section -->
    <Hero />
    <!-- Stats Section -->
    <Stats />
    <!-- Active Campaigns Section -->
    <Campaigns :campaigns="campaigns" />
    <!-- Features Section -->
    <Features />
  </div>
</template>
