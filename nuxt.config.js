// import {products} from './helpers/sitemap.js'
export default {
  target: 'server',
  telemetry: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'caribarang.id',
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'yandex-verification', content: '77a75780e85afd92' },
      {
        name: 'facebook-domain-verification',
        content: 'g4xchian9z48918za5eedq0g8gezc5'
      },
      {
        name: 'ahrefs-site-verification',
        content:
          '4d26dad5fd1e343017f691f088e7aebac17a863d16cc76c05c0bc75179ab68fb'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        href: '/favicon/android-chrome-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png'
      },
      {
        rel: 'preload',
        onload: 'this.rel=\'stylesheet\'',
        as: 'style',
        type: 'text/css',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
      }
    ],
    script: [
      {
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAt7DNKpqzUTKpoMcZovuzsGd-ZNSa0bdM&libraries=places&language=id',
        defer: true
      }
      // { hid: 'tawk.to', src: 'https://embed.tawk.to/626bb3c77b967b11798d13f5/1g1qbchqo', defer: true}
    ]
  },

  loading: { color: '#0274be' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/vee-validate' },
    { src: '~/plugins/persisted-state.js' },
    { src: '~/plugins/inject.js' },
    { src: '~/plugins/vac.js' },
    { src: '~/plugins/mixins.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-canonical-ogurl',
    '@nuxtjs/robots',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-lazy-load',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/gtm'
  ],

  // pwa module configuration https://pwa.nuxtjs.org/workbox

  pwa: {
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://storage.caribarang.id/.*',
          strategyOptions: {
            cacheName: 'cb-chace'
          },
          strategyPlugins: [
            {
              use: 'Expiration',
              config: {
                // Keep at most 50 entries.
                maxEntries: 50,
                // Don't keep any entries for more than 30 days.
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // Automatically cleanup if quota is exceeded.
                purgeOnQuotaError: true
              }
            }
          ]
        }
      ]
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_HOST
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
    extend (config, ctx) {
      config.resolve.symlinks = false
    }
  },

  publicRuntimeConfig: {
    productDetailHost: process.env.NODE_SERVICE_HOST
  },

  watchers: {
    webpack: {
      ignored: /node_modules/
    }
  },

  server: {
    host: '0.0.0.0'
  },

  auth: {
    redirect: {
      login: '/signin',
      logout: '/signin',
      callback: '/callback',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          required: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: `${process.env.API_HOST}/api/login`, method: 'post' },
          user: { url: `${process.env.API_HOST}/api/me`, method: 'get' },
          logout: {
            url: `${process.env.API_HOST}/api/force-logout`,
            method: 'post'
          }
        }
      },
      google: {
        responseType: 'token id_token',
        codeChallengeMethod: '',
        clientId:
          '465557720988-ca1o96fjpcge31cld1prrlgnestdati6.apps.googleusercontent.com',
        scope: ['email']
      },
      facebook: {
        endpoints: {
          userInfo:
            'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: '1139405183570800',
        scope: ['public_profile', 'email']
      }
    }
  },
  gtm: {
    id: 'GTM-TG5QBPP',
    enabled: true,
    scriptDefer: true
  },

  robots: {
    UserAgent: '*',
    Sitemap: 'https://caribarang.id/sitemap.xml'
  },

  canonicalOgUrl: {
    baseURL: 'https://caribarang.id'
  },

  router: {
    trailingSlash: false
  }
}
