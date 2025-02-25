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

const isLoading = ref<boolean>(true);

async function updateTodo(id: number, completed: boolean) {
  isLoading.value = false;
  await $fetch(`${useRuntimeConfig().public.baseApiUrl}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !completed }),
    onResponse({ response }) {
      if (!response.ok) {
        useToast().add({
          id: "error update todo",
          title: "Error",
          description: response._data.message,
          icon: "material-symbols:brightness-alert-rounded",
        });
      }

      useToast().add({
        id: "success update todo",
        title: "Success",
        description: "Todo updated successfully",
        icon: "material-symbols:done-all-rounded",
      });
    },
  })
    .catch((error) => {
      console.error("Error updating todo:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
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
            <span v-if="todo?.completed">completed</span>
            <span v-else>Pending</span>
          </UBadge>
          <UPopover>
            <UButton
              :ui="{ rounded: 'rounded-full' }"
              size="xs"
              color="white"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />

            <template #panel>
              <div>
                <div class="w-48">
                  <ul class="">
                    <li
                      disabled
                      @click="updateTodo(todo.id, todo.completed)"
                      class="px-3 py-1 hover:bg-slate-200 hover:dark:bg-blue-200 hover:dark:text-black cursor-pointer"
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-sm">{{
                          todo.completed ? "Pending" : "Done"
                        }}</span>
                        <UIcon
                          :name="
                            todo.completed
                              ? 'material-symbols:pending-actions-rounded'
                              : 'material-symbols:download-done-rounded'
                          "
                        />
                      </div>
                    </li>
                    <li
                      class="px-3 py-1 hover:bg-slate-200 hover:dark:bg-blue-200 hover:dark:text-black cursor-pointer"
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-sm">Delete</span>
                        <UIcon name="material-symbols:delete" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </UPopover>
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
