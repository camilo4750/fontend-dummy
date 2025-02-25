<script setup lang="ts">
import type { SelectUser } from "~/types/backend/Users";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

interface Props {
  isOpen: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits(["update:isOpen"]);

const isOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit("update:isOpen", value),
});

const schema = z.object({
  todo: z.string({
    required_error: "Todo is required",
    invalid_type_error: "Todo must be a string",
  }),
  completed: z.boolean({
    required_error: "Complete is required",
    invalid_type_error: "Complete must be a boolean",
  }),
  userId: z
    .string({
      required_error: "User is required",
    })
    .transform((val) => Number(val)),
});

type Schema = z.output<typeof schema>;

const task = reactive({
  todo: undefined,
  completed: undefined,
  userId: undefined,
});

const isLoading = ref<boolean>(false);
const isLoadingUsers = ref<boolean>(false);
const users = ref<SelectUser[]>([]);
const optionsComplete = [
  {
    value: true,
    label: "Tarea completada",
  },
  {
    value: false,
    label: "Tarea pendiente",
  },
];

onMounted(() => {
  getUsers();
});

async function getUsers() {
  isLoadingUsers.value = true;
  $fetch(useRuntimeConfig().public.baseApiUrl + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: {
      limit: 30,
    },
    onResponse({ response }) {
      if (!response.ok) {
        useToast().add({
          id: "error-fetching-users",
          title: "Error",
          description: response._data.message,
          icon: "i-heroicons-information-circle-20-solid",
        });
        return;
      }

      const dataUsers = response._data.users;
      const formatUser = dataUsers.map(
        (user: { firstName: string; lastName: string; id: number }) => ({
          name: `${user.firstName} ${user.lastName}`,
          value: user.id,
        })
      );

      users.value = formatUser;
    },
  })
    .catch((error) => {
      console.error("Error fetching users:", error);
    })
    .finally(() => {
      isLoadingUsers.value = false;
    });
}

async function onSubmitCreateTask(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  $fetch(useRuntimeConfig().public.baseApiUrl + "/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: event.data,
    onResponse({ response }) {
      if (response.status === 201) {
        isOpen.value = false;
        useToast().add({
          title: "Success",
          description: "Task created successfully",
          color: "green",
          icon: "material-symbols:check-circle",
        });

        task.todo = undefined;
        task.completed = undefined;
        task.userId = undefined;
      }
    },
  })
    .catch((error) => {
      useToast().add({
        title: "Error",
        description: error._data.message,
        color: "red",
        icon: "material-symbols:error",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Create Task
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>
      <div>
        <UForm
          :schema="schema"
          :state="task"
          class="space-y-4"
          @submit="onSubmitCreateTask"
        >
          <UFormGroup label="Task" name="todo" required>
            <UInput
              v-model="task.todo"
              placeholder="Task"
              :disabled="isLoading"
            />
          </UFormGroup>

          <UFormGroup label="Task status" name="completed" required>
            <URadioGroup
              v-model="task.completed"
              :options="optionsComplete"
              :disabled="isLoading"
            />
          </UFormGroup>

          <UFormGroup label="User" name="userId" required>
            <USelect
              :disabled="isLoading"
              v-model="task.userId"
              :options="users"
              option-attribute="name"
              :loading="isLoadingUsers"
            />
          </UFormGroup>

          <UButton type="submit" :loading="isLoading" block>Submit</UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>
