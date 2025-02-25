<script setup lang="ts">
import type { SelectUser } from "~/types/backend/Users";

interface Props {
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});

const emit = defineEmits(["update:modelValue", "selected"]);

const value = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);

const timeOut = ref();
const results = ref<SelectUser[]>([]);
const isLoading = ref(false);
const isOpen = ref(false);
const cardRef = ref<HTMLElement | null>(null);

async function HandleSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const currentValue = target.value;
  clearTimeout(timeOut.value);
  timeOut.value = setTimeout(async () => {
    if (currentValue.length > 0) {
      isLoading.value = true;
      $fetch(useRuntimeConfig().public.baseApiUrl + "/users/search", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        query: {
          q: currentValue,
        },
        onResponse({ response }) {
          if (response.status === 200) {
            const data = response._data.users;
            const formatUser = data.map(
              (user: { firstName: string; lastName: string; id: number }) => ({
                name: `${user.firstName} ${user.lastName}`,
                value: user.id,
              })
            );
            results.value = formatUser;
          } else results.value = [];
        },
      })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isLoading.value = false;
        });
    } else results.value = [];
  }, 500);
}

const handleClickOutside = (event: Event) => {
  if (cardRef.value && !cardRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

function getId(id: string | number, name: string) {
  emit("selected", id);
  emit("update:modelValue", name);
  isOpen.value = false;
  results.value = [];
}
</script>

<template>
  <div class="relative" ref="cardRef">
    <UInput
      @mousedown="isOpen = true"
      v-model="value"
      icon="i-heroicons-magnifying-glass-20-solid"
      placeholder="Search..."
      :autofocus="false"
      @input="HandleSearch($event)"
    />
    <div
      v-show="isOpen"
      class="absolute left-0 right-0 mt-0.5 dark:bg-gray-900 dark:text-white bg-white rounded-b-lg shadow-lg overflow-y-auto max-h-52 text-black z-50"
    >
      <div v-if="isLoading" class="animate-pulse px-3 py-2">Loading...</div>
      <div v-else-if="!isLoading && results.length === 0" class="px-3 py-2">
        No results found
      </div>
      <div v-else-if="results.length > 0">
        <div v-for="result in results">
          <button
            class="px-3 py-2 dark:text-white dark:hover:text-black dark:hover:bg-blue-300 hover:bg-gray-300 w-full text-left"
            @click="getId(result.value, result.name)"
          >
            {{ result.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
