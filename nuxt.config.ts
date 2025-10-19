// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'last stage',
      
    }
  },
  $development: {
    app:{
      head: {
        title: 'last stage'
      }
    }
  },
  runtimeConfig: {
    public: {
      basePort: process.env.BASE_PORT,
      baseIp: process.env.BASE_IP,
    }
  },
  plugins: [
        '~/plugins/socket.js',
        '~/plugins/audio.js',
        '~/plugins/tooltip.js'
  ],
  modules: ['@nuxt/ui']
})
