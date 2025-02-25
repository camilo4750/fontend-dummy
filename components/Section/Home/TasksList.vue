<script setup lang="ts">
import type { Todo } from "~/types/backend/Todos";
interface Props {
  todos: Todo[];
  currentPage: number;
  totalTodos: number;
}

const props = defineProps<Props>();

const currentPage = computed({
  get: () => props.currentPage,
  set: (value) => emit("update:currentPage", value),
});

const emit = defineEmits(["update:currentPage"]);


const items = [
  [
    {
      label: "Edit",
      icon: 'material-symbols:edit-square-outline-rounded',
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Delete",
      icon: 'material-symbols:delete',
      click: () => {
        console.log("Edit");
      },
    },
  ],
];

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
    <UCard
      v-for="todo in todos"
      :key="todo.id"
      :ui="{
        base: 'hover:shadow-lg',
        header: { padding: 'sm:px-3 px-2 py-2' },
        body: { padding: 'sm:px-3 px-3 py-3' },
        footer: { padding: 'sm:px-3 px-2 py-2' },
      }"
    >
      <template #header>
        <div class="flex justify-between">
          <UBadge
            :color="todo?.completed ? 'green' : 'red'"
            :ui="{ rounded: 'rounded-full' }"
          >
            <span v-if="todo?.completed">Active</span>
            <span v-else>Inactive</span>
          </UBadge>
          <UDropdown :items="items" :ui="{}" :popper="{ placement: 'bottom-start' }">
            <UButton
              :ui="{ rounded: 'rounded-full' }"
              size="xs"
              color="white"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
        </div>
      </template>
      <div>{{ todo.todo }}</div>
    </UCard>
  </div>
  <div class="w-full flex justify-end">
      <UPagination
        v-model="currentPage"
        :page-count="16"
        :total="props.totalTodos"
      />
    </div>
</template>
