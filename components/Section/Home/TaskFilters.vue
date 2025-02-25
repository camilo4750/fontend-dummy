<script setup lang="ts">
const emit = defineEmits(["update:selected", "cleanFilters"]);

const searchName = ref<string>("");
const selectedFilter = ref<string>("");
const searchFilters = [
  {
    name: "Name user",
    value: "nameUser",
  },
];

function handleSelected(id: string) {
  emit("update:selected", id);
}

function cleanFilters() {
  searchName.value = "";
  emit("cleanFilters");
}

</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-5">
    <USelect
      class="col-span-2 md:col-span-1"
      color="white"
      placeholder="filter..."
      v-model="selectedFilter"
      :options="searchFilters"
      option-attribute="name"
    />

    <UiUserSearchInput
     class="col-span-2"
      v-show="selectedFilter === 'nameUser'"
      v-model="searchName"
      @selected="handleSelected"
    />

    <UTooltip text="clean filter">
      <UButton
        v-show="selectedFilter"
        color="yellow"
        :ui="{ rounded: 'rounded-full' }"
        icon="material-symbols:close-small-outline-rounded"
        @click="cleanFilters"
      />
    </UTooltip>
  </div>
</template>
