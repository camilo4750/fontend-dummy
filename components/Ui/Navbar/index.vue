<script setup lang="ts">
const options = [
  {
    name: "Products",
    link: "/"
  },
  {
    name: "Recipes",
    link: "/"
  },
  {
    name: "Testimonials",
    link: "/"
  },
  {
    name: "Post",
    link: "/"
  }
]
</script>

<template>
  <div class="h-16 w-full bg-blue-300 flex justify-between items-center px-5 py-2">
    <div class="">Dummy</div>
    <div class="">
      <ul class="flex gap-5 hover:font-bold">
        <li class="hover:font-bold" v-for="option in options">{{ option.name }}</li>
      </ul>
    </div>
    <div class="">
    </div>
  </div>
</template>

<style scoped>

</style>