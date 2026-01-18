<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <main>
      <RouterView />
      <!-- THIS is where login/register appear -->
    </main>
    <Footer />
  </div>
</template>
