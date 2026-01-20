<script setup lang="ts"></script>

<!-- Hero Section -->
<template>
  <section
    class="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 px-6 overflow-hidden"
  >
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"
      ></div>
    </div>
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Building Stronger Communities Together
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-primary-100">
          Connect volunteers with urgent community needs. Respond to incidents
          faster. Make a real impact.
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
</template>
