export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {
    //
  }
})
