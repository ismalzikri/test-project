<template>
  <div class="bg-teal-500 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
    <div class="px-2 py-8 sm:px-10">
      <div class="text-white px-3 py-4 border-0 rounded relative mb-4 flex">
        <span class="text-xl inline-block mr-5 align-middle">
          <i class="fas fa-check" />
        </span>
        <span class="inline-block align-middle text-sm text-center">
          <b class="capitalize">Oops !!</b> Akun kamu belum terverifikasi, mohon lakukan verifikasi akun terlebih dahulu. Silahkan cek email kamu untuk mendapatkan kode verifikasi.
        </span>
      </div>
      <div class="mx-auto flex justify-center">
        <nuxt-link to="/auth/signup-verify" class="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-gray-700 text-white font-bold capitalize text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
          Verifikasi Akun
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  name: 'EmailVerification',

  layout: 'auth',

  middleware : ['guest'],

  created () {
    this.initCallback()
  },

  methods: {
    initCallback () {
      const emailVerifiedCookie = Cookie.get('email_verified')
      if (!emailVerifiedCookie) return this.$router.push('/signup')
    }
  }
}
</script>
