<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'Dummy Api',
  meta: [
    {name: 'description', content: 'My amazing site.'}
  ],
})
</script>