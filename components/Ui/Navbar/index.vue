<script setup lang="ts">
const options = [
  {
    name: "Products",
    link: "/",
  },
  {
    name: "Recipes",
    link: "/",
  },
  {
    name: "Testimonials",
    link: "/",
  },
  {
    name: "Post",
    link: "/",
  },
];


const itemsDrowdown = [
  [{
    label: useState("sessionUserName").value,
    avatar: {
      src: useState("sessionUserImg").value,
    }
  }],
  [{
    label: 'Logout',
    icon: 'material-symbols:logout-rounded',
    click: () => {
      useAuth().logout()
    }
  }]
]
</script>

<template>
  <div
    class="h-16 w-full bg-gray-800 text-white flex justify-between items-center px-5 py-2"
  >
    <div class="font-bold text-2xl">Dummy</div>
    <div class="">
      <ul class="flex gap-5">
        <li class="hover:font-bold cursor-pointer" v-for="option in options">{{ option.name }}</li>
      </ul>
    </div>
    <div class="flex gap-3">
      <UiBtnColorMode />
      <UDropdown :items="itemsDrowdown" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="white"
          icon="material-symbols:person"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
    </div>
  </div>
</template>

<style scoped></style>
