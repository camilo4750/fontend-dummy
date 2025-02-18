<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  layout: "transparent",
});

const schema = z.object({
  userName: z.string().nonempty("El email es requerido"),
  password: z.string().min(8, "El minimo de caractetes es 8"),
});

type Schema = z.output<typeof schema>;

const credentials = reactive({
  userName: "",
  password: "",
});

const isLoading = ref(false);
const showPassword = ref(false);

async function onSubmitLogin(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  useAuth()
    .login(event.data.userName, event.data.password)
    .then((response) => {
      navigateTo('/home');
    })
    .catch((e) => {
      useToast().add({
        title: "Error",
        description: e._data.message,
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
  <div class="h-full w-full flex justify-center items-center">
    <div
      class="w-96 h-96 bg-gray-200 dark:bg-black shadow-lg rounded-lg flex flex-col justify-center items-center p-5"
    >
      <h1 class="text-3xl font-bold text-black dark:text-white pb-8">
        Dummy Api
      </h1>
      <UForm
        :schema="schema"
        :state="credentials"
        class="space-y-4 w-full"
        @submit="onSubmitLogin"
      >
        <UFormGroup label="Nombre usuario" name="userName">
          <UInput
            v-model="credentials.userName"
            type="text"
            :disabled="isLoading"
          />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="credentials.password"
            :type="showPassword ? 'text' : 'password'"
            :disabled="isLoading"
          >
            <template #trailing>
              <span
                class="flex items-center pointer-events-auto cursor-pointer"
                @click="showPassword = !showPassword"
              >
                <UIcon
                  v-if="showPassword"
                  name="material-symbols:visibility-off-outline"
                  
                />
                <UIcon v-else  name="material-symbols:visibility-outline"/>
              </span>
            </template>
          </UInput>
        </UFormGroup>
        <UButton type="submit" :loading="isLoading" block clas>
          Ingresar
        </UButton>
      </UForm>
    </div>
  </div>
</template>
