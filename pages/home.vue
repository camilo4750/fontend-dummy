<script setup lang="ts">
import type { Todo } from "~/types/backend/Todos";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const isLoading = ref<boolean>(true);
const todos = ref<Todo[]>([]);
const currentPage = ref<number>(1);
const limit: number = 16;
const isOpenModalCreateTask = ref<boolean>(false);

onMounted(() => {
  getTodos();
});

async function getTodos() {
  isLoading.value = true;
  const skip = (currentPage.value - 1) * limit;
  await $fetch(useRuntimeConfig().public.baseApiUrl + "/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: {
      limit: 16,
      skip: skip,
    },
    onResponse({ response }) {
      if (!response.ok) {
        throw new Error("Error");
      }

      todos.value = response._data.todos;
    },
  })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

watch(currentPage, () => {
  getTodos();
});
</script>

<template>
  <UContainer>
    <SectionHomeTaskHeader @open-modal="isOpenModalCreateTask = true" />

    <SectionHomeTasksList
      v-if="!isLoading"
      :todos="todos"
      :currentPage="currentPage"
      @update:currentPage="currentPage = $event"
    />
    <SectionHomeTasksSkeleton v-else />
  </UContainer>
  <SectionHomeModalsCreateTask v-model:is-open="isOpenModalCreateTask" />
</template>

<style scoped></style>
