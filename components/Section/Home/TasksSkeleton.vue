<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
    <UCard class="animate-pulse h-32" v-for="index in 16" :key="index" />
  </div>
</template>
