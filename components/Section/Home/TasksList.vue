<script setup lang="ts">
import type { Todo } from "~/types/backend/Todos";
interface Props {
    todos: Todo[];
    currentPage: number;
}

const props = defineProps<Props>();

const currentPage = computed({
    get: () => props.currentPage,
    set: (value) => emit("update:currentPage", value),
})

const emit = defineEmits(["update:currentPage"]);
</script>

<template> 
 <div class="grid grid-cols-4 gap-5 p-5">
    <UCard
      v-for="todo in todos"
      :key="todo.id"
      :ui="{
        base: 'hover:shadow-lg',
        header: { padding: 'sm:px-3 px-2 py-2' },
        body: { padding: 'sm:px-3 px-3 py-3 h-32' },
        footer: { padding: 'sm:px-3 px-2 py-2' },
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
      <div>{{ todo.todo }}</div>
    </UCard>
    <div class="col-span-4 flex justify-end">
      <UPagination
        v-model="currentPage"
        :page-count="1"
        :total="todos.length"
      />
    </div>
  </div>
</template>