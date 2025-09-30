// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'test title'
    }
  },
  $development: {
    app:{
      head: {
        title: 'dev'
      }
    }
  },
  runtimeConfig: {
    
  },
  plugins: [
        '~/plugins/socket.js',
        '~/plugins/audio.js',
        '~/plugins/tooltip.js'
  ],
  modules: ['@nuxt/ui']
})
