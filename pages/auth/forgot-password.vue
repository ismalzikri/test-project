<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white rounded-md sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
      <div class="px-4 py-8 sm:px-10">
        <p class="text-lg font-medium text-gray-600 flex justify-center items-center">
          Atur Ulang Password
        </p>
        <div v-show="errorMessage" class="bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-5 rounded relative mt-2" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div class="mt-6">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form method="POST" class="" @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider v-slot="{ errors }" tag="div" class="mb-2" name="email" rules="required|email">
                <label for="email" class="sr-only">Email</label>
                <input v-model="email" type="email" name="email" autocomplete="email" placeholder="Email address" class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md">
                <p class="text-red-500 text-xs italic py-1">{{errors[0]}}</p>
              </ValidationProvider>
              <div>
                <cb-button class="w-full" color="primary" button="submit" label="KIRIM E-Mail" />
                <nuxt-link to="/" class="w-full mt-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-slate-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                  Kembali
                </nuxt-link>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import CbButton from '~/components/Basic/Button.vue'
export default {
  name: 'ForgotPasswordPage',
  components: {
    ValidationProvider,
    ValidationObserver,
    CbButton
  },

  layout: 'auth',

  middleware : ['guest'],

  data () {
    return {
      errorMessage: '',
      email: ''
    }
  },

  methods: {
    async onSubmit () {
      try {
        this.$store.dispatch('setLoading', true)
        const {status, message} = await this.$axios.$post('/api/forgot-password', {
          email: this.email
        })
        this.$store.dispatch('setLoading', false)
        if (status) {
          Cookie.set('email_forgot_password', this.email)
          return this.$router.push('/auth/reset-password')
        } else {
          this.errorMessage = message
          return false
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw console.error()
      }
    }
  }
}
</script>
