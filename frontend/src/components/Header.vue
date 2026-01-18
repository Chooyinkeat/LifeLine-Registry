<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <RouterLink to="/home" class="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <div class="text-xl font-bold">VolunteerHub</div>
            <div class="text-xs text-primary-100">Community Response System</div>
          </div>
        </RouterLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <RouterLink
            to="/home"
            class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-colors"
            active-class="bg-white bg-opacity-20"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/campaigns"
            class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-colors"
            active-class="bg-white bg-opacity-20"
          >
            Campaigns
          </RouterLink>
          <RouterLink
            to="/login"
            class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-colors border border-white border-opacity-30"
            active-class="bg-white bg-opacity-20"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-white text-primary-600 hover:bg-gray-100 transition-colors shadow-md"
          >
            Register
          </RouterLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
