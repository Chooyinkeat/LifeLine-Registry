<script setup lang="ts">
import type { Campaign } from "@/types/Campaign";

const props = defineProps<{
  campaigns: Campaign[];
}>();
</script>

<template>
  <section class="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Active Campaigns</h2>
        <p class="text-xl text-gray-600">
          Find campaigns that need your support right now
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 group"
        >
          <div
            :class="[
              'h-2',
              campaign.urgency === 'High' ? 'bg-red-500' : 'bg-yellow-500',
            ]"
          ></div>
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  campaign.urgency === 'High'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700',
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
            <h3
              class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors"
            >
              {{ campaign.title }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-2">
              {{ campaign.description }}
            </p>
            <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4">
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {{ campaign.location }}
              </div>
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {{ campaign.volunteers }} volunteers
              </div>
            </div>
            <button
              class="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
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
</template>
