<template>
  <div class="flex justify-center items-center mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
    <div class="bg-white rounded-md sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
      <div class="px-4 py-8 sm:px-10">
        <p class="text-lg font-medium text-gray-600 flex justify-center items-center">
          Password Pemulihan
        </p>
        <div v-show="errorMessage" class="bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-5 rounded relative mt-2" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div v-show="successMessage" class="bg-green-100 border text-sm border-green-400 text-green-700 px-4 py-5 rounded relative mt-2" role="alert">
          <strong class="font-bold">Sukses!</strong>
          <span class="block sm:inline">{{ successMessage }}</span>
        </div>
        <div class="mt-6">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form method="POST" class="" @submit.prevent="handleSubmit(onSubmit)">
              <label for="otp" class="block text-xs text-gray-600 mb-2">OTP</label>
              <div class="grid grid-cols-4 gap-2 mb-5">
                <div v-for="(item,n) in arrOtp" :key="n" class="">
                  <input
                    ref="inputOtp"
                    type="text"
                    pattern="[0-9]*"
                    autocomplete="off"
                    inputmode="numeric"
                    class="block w-full h-10 text-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold border-gray-300 rounded-md"
                    :value="item.code"
                    @input="onInputOtp($event,n)"
                    @keypress="$mustNumber"
                  >
                </div>
              </div>

              <ValidationProvider v-slot="{ errors }" tag="div" class="mb-5" name="new_password" rules="required">
                <label for="new_password" class="block text-xs text-gray-600">Password baru</label>
                <div class="mt-1">
                  <input v-model="new_password" type="password" name="new_password" class="shadow-sm focus:ring-indigo-500 focusp:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <p class="text-xs text-red-600">{{errors[0]}}</p>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" tag="div" class="mb-5" name="confirm_password" rules="required">
                <label for="confirm_password" class="block text-xs text-gray-600">Konfirmasi password</label>
                <div class="mt-1">
                  <input v-model="confirm_password" type="password" name="confirm_password" class="shadow-sm focus:ring-indigo-500 focusp:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <p class="text-xs text-red-600">{{errors[0]}}</p>
              </ValidationProvider>

              <div>
                <cb-button class="w-full" color="primary" button="submit" label="Ganti Password" />
                <div class="text-center mt-5">
                  <span>Belum menerima e-mail? </span>
                  <a href="#" class="font-medium py-2 text-indigo-600 hover:text-indigo-500 underline" @click="onResendCode">
                    Kirim ulang kode
                  </a>
                </div>
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
      successMessage: '',
      new_password: '',
      confirm_password: '',
      otp: '',
      arrOtp:[
        {code:''},
        {code:''},
        {code:''},
        {code:''}
      ]
    }
  },

  created () {
    this.initCallback()
  },

  mounted () {
    this.$refs.inputOtp[0].focus()
  },

  methods: {
    initCallback () {
      const emailForgotPassword = Cookie.get('email_forgot_password')
      if (!emailForgotPassword) return this.$router.push('/signin')
    },

    onInputOtp (e, index) {
      const value = e.target.value
      const otp = value.substr(value.length - 1)
      this.arrOtp[index].code = otp
      if (index < 3) {
        const next = index === 3 ? 3 : index + 1
        this.$refs.inputOtp[next].focus()
      } else {
        this.$refs.inputOtp[3].blur()
      }
    },

    async onSubmit () {
      try {
        const otp = this.arrOtp.map(x => x.code).join('')
        if (otp.length < 4) {
          this.errorMessage = 'Lengkapi kode otp'
        }

        this.$store.dispatch('setLoading', true)
        const {status, message} = await this.$axios.$post('/api/reset-password', {
          code:otp,
          password:this.new_password,
          password_confirmation:this.confirm_password
        })
        this.$store.dispatch('setLoading', false)
        if (!status) {
          this.errorMessage = message
        } else {
          Cookie.remove('email_forgot_password')
          this.$swal.fire('Berhasil!', 'Password berhasil diganti', 'success')
          return this.$router.push('/signin')
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
      }
    },

    async onResendCode () {
      try {
        const email = Cookie.get('email_forgot_password')
        this.$store.dispatch('setLoading', true)
        const {status, message} = await this.$axios.$post('/api/resend-code', {email})
        if (!status) {
          this.errorMessage = message
        } else {
          this.successMessage = message
        }
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    }
  }
}
</script>
