<script setup lang="ts">

</script>


<template>
     <div class="flex justify-between items-center gap-4">
      <h2 class="font-bold text-4xl py-5">Tasks</h2>
      <div class="">
        <UButton label="Crate task" @click="$emit('open-modal')" />
      </div>
    </div>
</template>