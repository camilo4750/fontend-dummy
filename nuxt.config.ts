// https://nuxt.com/docs/api/configuration/nuxt-config

import type { NuxtConfig } from "nuxt/schema";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: ['@nuxt/ui'],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    runtimeConfig: {
        public: {
            baseApiUrl: process.env.BACKEND_URL,
        }
    },
    colorMode: {
        preference: 'light'
    },
    ssr: false,
    css: ['@/assets/css/main.css'],
    ui: {
        
    }
} as NuxtConfig)
