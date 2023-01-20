<template>
  <div
    class="flex justify-center items-center mt-16 sm:mt-24 lg:mt-0 lg:col-span-6"
  >
    <div
      class="bg-white rounded-md sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden"
    >
      <div class="px-4 py-8 sm:px-10">
        <p
          class="text-lg font-medium text-gray-600 flex justify-center items-center"
        >
          Input Kode OTP
        </p>
        <p class="text-gray-600 text-xs text-center py-2">
          Periksa email kamu untuk mendapatkan kode OTP
        </p>
        <div
          v-show="errorMessage"
          class="bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-5 rounded relative mt-2"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div
          v-show="successMessage"
          class="bg-green-100 border text-sm border-green-400 text-green-700 px-4 py-5 rounded relative mt-2"
          role="alert"
        >
          <strong class="font-bold">Sukses!</strong>
          <span class="block sm:inline">{{ successMessage }}</span>
        </div>
        <div class="mt-6">
          <form method="POST" class="" @submit.prevent="onSubmit">
            <div class="grid grid-cols-4 gap-2 mb-5">
              <div v-for="(item, n) in arrOtp" :key="n" class="">
                <input
                  ref="inputOtp"
                  type="text"
                  pattern="[0-9]*"
                  autocomplete="off"
                  inputmode="numeric"
                  class="block w-full h-14 text-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold border-gray-300 rounded-md"
                  :value="item.code"
                  @input="onInputOtp($event, n)"
                  @keypress="$mustNumber"
                />
              </div>
            </div>
            <div>
              <cb-button
                class="w-full"
                color="primary"
                button="submit"
                label="KIRIM"
              />
            </div>
            <div class="text-center mt-5">
              <a
                href="#"
                class="font-medium py-2 text-indigo-600 hover:text-indigo-500 underline"
                @click="onResendCode"
              >
                Kirim ulang kode
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import CbButton from '~/components/Basic/Button.vue'
export default {
  name: 'SignupVerify',
  components: {
    CbButton
  },

  layout: 'auth',

  middleware: ['guest'],

  data () {
    return {
      submitForm: true,
      errorMessage: '',
      successMessage: '',
      otp: '',
      arrOtp: [{ code: '' }, { code: '' }, { code: '' }, { code: '' }]
    }
  },

  mounted () {
    this.$refs.inputOtp[0].focus()
  },

  methods: {
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
        const otp = this.arrOtp.map((x) => x.code).join('')
        if (otp.length < 4) {
          this.errorMessage = 'Lengkapi kode otp'
        }
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$post('/api/verify', {
          code: otp
        })

        this.$store.dispatch('setLoading', false)
        if (!status) {
          this.errorMessage = message
        } else {
          Cookie.remove('is_signup_success')
          Cookie.remove('email_verified')
          Cookie.set('is_verify_success', 'verify-success')
          this.$router.push('/auth/signup-callback')
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw console.error()
      }
    },

    async onResendCode () {
      try {
        const email = Cookie.get('email_verified')
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$post(
          '/api/resend-code',
          { email }
        )
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
