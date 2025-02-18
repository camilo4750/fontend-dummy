<script setup lang="ts"></script>

<template>
  <div class="flex flex-col h-screen w-full overflow-hidden">
    <div class="w-full flex justify-end p-4">
      <UiBtnColorMode />
    </div>
    <div class="h-screen w-full overflow-y-auto overflow-x-hidden">
    
      <slot />
    </div>
  </div>
</template>
