<template>
  <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
    <div
      class="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden"
    >
      <div class="px-4 py-8 sm:px-10">
        <div class="flex items-center justify-center pb-4">
          <a href="/">
            <img
              src="/img/logo-navbar-web.webp"
              class="block h-12 w-auto md:block"
              alt="Caribarang Logo"
            />
          </a>
        </div>
        <div
          v-show="errorMessage"
          class="bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-5 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div class="mt-6">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form
              method="POST"
              class=""
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="mb-2"
                name="email"
                rules="required|email"
              >
                <label for="mobile-or-email" class="sr-only">Email</label>
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="Email"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md placeholder-slate-300"
                />
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="mb-2"
                name="password"
                rules="required"
              >
                <label for="password" class="sr-only">Password</label>
                <input
                  v-model="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autocomplete="current-password"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md placeholder-slate-300"
                />
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
              </ValidationProvider>

              <div class="flex justify-end items-center">
                <div class="text-sm mb-4">
                  <nuxt-link
                    to="/auth/forgot-password"
                    class="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                  >
                    Lupa kata sandi?</nuxt-link
                  >
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Masuk
                </button>
                <div class="relative mt-4">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300" />
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500"> atau </span>
                  </div>
                </div>
                <div class="mt-6 grid grid-cols-2 gap-3">
                  <div @click="loginSocial('facebook')">
                    <a
                      href="javascript:;"
                      class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Facebook</span>
                      <i class="fab fa-facebook mr-2"></i> Facebook
                    </a>
                  </div>

                  <div @click="loginSocial('google')">
                    <a
                      href="javascript:;"
                      class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Google</span>
                      <img
                        class="text-md mr-2 w-5"
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        alt="Google logo"
                      />
                      Google
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <FooterForm :status="true" />
    </div>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import FooterForm from '~/components/auth/FooterForm.vue'

export default {
  name: 'SignComponent',

  components: {
    ValidationProvider,
    ValidationObserver,
    FooterForm
  },

  props: {
    errorMessage: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    onSubmit () {
      this.$emit('submit', {
        email: this.email,
        password: this.password
      })
    },

    loginSocial (socialName) {
      const host = this.$axios.defaults.baseURL
      window.location.href = `${host}/api/oauth/${socialName}`
    }
  }
}
</script>

<style lang="scss">
.fa-facebook {
  color: #4267b2;
  font-size: 19px;
}
</style>
