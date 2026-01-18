<script setup lang="ts">
import { ref } from "vue";

// Sample data - in production, this would come from your API
const stats = ref([
  { label: "Active Campaigns", value: "24", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { label: "Registered Volunteers", value: "156", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { label: "Communities Served", value: "12", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Total Impact", value: "1.2K+", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
]);

const campaigns = ref([
  {
    id: 1,
    title: "Emergency Relief Drive",
    description: "Collecting essential supplies for families affected by recent flooding",
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
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 px-6 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Building Stronger Communities Together
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Connect volunteers with urgent community needs. Respond to incidents faster. Make a real impact.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              class="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Join as Volunteer
            </a>
            <a
              href="/campaigns"
              class="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-400 transition-colors border-2 border-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create Campaign
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-primary-200"
          >
            <div class="flex items-center justify-between mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
              </svg>
            </div>
            <div class="text-3xl font-bold text-primary-900 mb-1">{{ stat.value }}</div>
            <div class="text-sm text-primary-700 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Active Campaigns Section -->
    <section class="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Active Campaigns</h2>
          <p class="text-xl text-gray-600">Find campaigns that need your support right now</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="campaign in campaigns"
            :key="campaign.id"
            class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 group"
          >
            <div :class="[
              'h-2',
              campaign.urgency === 'High' ? 'bg-red-500' : 'bg-yellow-500'
            ]"></div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  campaign.urgency === 'High' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                ]">
                  {{ campaign.urgency }} Priority
                </span>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {{ campaign.status }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ campaign.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ campaign.description }}</p>
              <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ campaign.location }}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {{ campaign.volunteers }} volunteers
                </div>
              </div>
              <button class="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Join Campaign
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <a
            href="/campaigns"
            class="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All Campaigns
          </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p class="text-xl text-gray-600">Simple steps to make a difference</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">1. Register</h3>
            <p class="text-gray-600">Create your account as a volunteer or organization</p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">2. Create or Join</h3>
            <p class="text-gray-600">Start a campaign or join existing ones in your area</p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">3. Make Impact</h3>
            <p class="text-gray-600">Work together to respond to incidents and help communities</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
