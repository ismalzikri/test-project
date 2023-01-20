<template>
  <div
    class="bg-teal-500 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden"
  >
    <div class="px-2 py-8 sm:px-10">
      <div class="text-white px-3 py-4 border-0 rounded relative mb-4 flex">
        <span class="text-xl inline-block mr-5 align-middle">
          <i class="fas fa-check" />
        </span>
        <span class="inline-block align-middle text-sm text-center">
          <b class="capitalize">Yei !!</b> Akun kamu telah terdaftar, silahkan
          login dan mulai belanja.
        </span>
      </div>
      <div class="mx-auto flex justify-center">
        <nuxt-link
          to="/signin"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  name: 'SignUpCallback',

  layout: 'auth',

  middleware: ['guest'],

  created () {
    this.initCallback()
  },

  methods: {
    initCallback () {
      const signupCookie = Cookie.get('is_verify_success')
      if (!signupCookie) return this.$router.push('/signup')
      Cookie.remove('is_verify_success')
    }
  }
}
</script>
