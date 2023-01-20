<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-8">
    <auth-content></auth-content>
    <signup-component
      :error-message="errorMessage"
      @submit="onSubmit"
    ></signup-component>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import meta from '~/helpers/meta.js'
import AuthContent from '~/components/auth/AuthContent.vue'
import SignupComponent from '~/components/auth/SignupComponent.vue'
export default {
  name: 'SignUpPage',

  components: {
    AuthContent,
    SignupComponent
  },

  layout: 'auth',

  middleware: ['guest'],

  data () {
    return {
      errorMessage: ''
    }
  },

  head () {
    return {
      title: 'Sign up | Caribarang',
      meta: meta(
        'https://caribarang.id/signup',
        'Sign up | Caribarang',
        'Silahkan daftarkan akun caribarang anda dan Dapatkan barang dagangan impor termurah dari supplier tangan pertama terbaik lewat Caribarang.id',
        'https://caribarang.id/img/logo-navbar-web.webp'
      )
    }
  },

  methods: {
    async onSubmit (params) {
      try {
        this.$store.dispatch('setLoading', true)

        const { status, message } = await this.$axios.$post(
          '/api/register',
          params
        )
        this.$store.dispatch('setLoading', false)
        if (!status) {
          this.errorMessage = message
        } else {
          window.dataLayer.push({email: params.email, event: 'enhanced_conversion'})
          Cookie.set('is_signup_success', 'Signup-success')
          Cookie.set('email_verified', params.email)
          this.$router.push('/auth/signup-verify')
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error.message)
      }
    }
  }
}
</script>
