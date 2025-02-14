<script setup lang="ts">

</script>

<template>
  <div class="h-screen w-full bg-amber-100 flex flex-col overflow-hidden">
      <Navbar/>
    <div class="h-screen w-full bg-white overflow-y-auto overflow-x-hidden">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>