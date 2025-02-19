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
  await $fetch("https://dummyjson.com/todos", {
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
  }).finally(() => {
    isLoading.value = false;
  });
}

watch(currentPage, () => {
  getTodos();
});
</script>

<template>
  <UContainer>
    <div class="flex justify-between items-center gap-4">
      <h2 class="font-bold text-4xl py-5">Tasks</h2>
      <div class="">
        <UButton label="Crate task" @click="isOpenModalCreateTask = true" />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-5 p-5" v-show="!isLoading">
      <UCard
        v-for="todo in todos"
        :key="todo.id"
        :ui="{
          base: 'hover:shadow-lg',
          header: {
            padding: 'sm:px-3 px-2 py-2',
          },
          body: {
            padding: 'sm:px-3 px-3 py-3 h-32',
          },
          footer: {
            padding: 'sm:px-3 px-2 py-2',
          },
        }"
      >
        <template #header>
          <div class="flex justify-between">
            <span class="rounded-full border px-2">{{ todo.id }}</span>
            <UBadge
              :color="todo?.completed ? 'green' : 'red'"
              :ui="{ rounded: 'rounded-full' }"
            >
              <span v-if="todo?.completed">Active</span>
              <span v-else>Inactive</span>
            </UBadge>
          </div>
        </template>
        <div>
          {{ todo.todo }}
        </div>
      </UCard>
      <div class="col-span-4 flex justify-end">
        <UPagination
          v-model="currentPage"
          :page-count="1"
          :total="todos.length"
        />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-5" v-show="isLoading">
      <UCard class="animate-pulse h-32" v-for="index in 16" :key="index" />
    </div>
  </UContainer>
  <SectionHomeModalsCreateTask v-model:is-open="isOpenModalCreateTask" />
</template>

<style scoped></style>
