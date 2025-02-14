// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import type {NuxtConfig} from "@nuxt/schema";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    modules: ['@nuxt/icon', '@nuxt/ui'],
    icon: {
        serverBundle: {
            collections: ['material-symbols'] // <!--- this
        }
    },
} as NuxtConfig)
