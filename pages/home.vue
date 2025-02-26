<script setup lang="ts">
import type { Todo } from "~/types/backend/Todos";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const isLoading = ref<boolean>(true);
const todos = ref<Todo[]>([]);
const paginate = reactive({
  currentPage: 1,
  limit: 16,
  total: 0,
});
const limit: number = 16;
const isOpenModalCreateTask = ref<boolean>(false);
const defaulUrl = useRuntimeConfig().public.baseApiUrl + "/todos";
const fetchUrlTods = ref<string>(defaulUrl);

onMounted(() => {
  getTodos();
});

async function getTodos() {
  isLoading.value = true;
  const skip = (paginate.currentPage - 1) * limit;

  await $fetch(fetchUrlTods.value, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: {
      limit: paginate.limit,
      skip: skip,
    },
    onResponse({ response }) {
      if (!response.ok) {
        throw new Error("Error");
      }

      todos.value = response._data.todos;
      paginate.total = response._data.total;
    },
  })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const userId = ref();
watch(userId, (newUserId) => {
  fetchUrlTods.value = newUserId ? `${defaulUrl}/user/${newUserId}` : defaulUrl;
  getTodos();
});

watch(
  () => paginate.currentPage,
  () => {
    getTodos();
  }
);

function cleanFilters() {
  userId.value = undefined;
}
</script>

<template>
  <UContainer>
    <SectionHomeTaskHeader @open-modal="isOpenModalCreateTask = true" />

    <SectionHomeTaskFilters
      v-model:selected="userId"
      @clean-filters="cleanFilters"
    />

    <SectionHomeTasksList
      v-if="!isLoading"
      :todos="todos"
      :total-todos="paginate.total"
      :currentPage="paginate.currentPage"
      @update:currentPage="paginate.currentPage = $event"
    />
    <SectionHomeTasksSkeleton v-else />
  </UContainer>
  <SectionHomeModalsCreateTask v-model:is-open="isOpenModalCreateTask" />
</template>

<style scoped></style>
