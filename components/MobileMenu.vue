<template>
  <!-- Mobile menu, show/hide based on menu state. -->
  <nav class="lg:hidden" aria-label="Global">
    <div class="border-t border-gray-200 pt-4 pb-3">
      <div v-if="isLogin" class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
        <div class="flex-shrink-0">
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            :alt="user ? user.name : 'avatar'">
        </div>
        <div class="ml-3">
          <div class="text-sm font-medium text-gray-800">{{ user ? user.name : '-' }}</div>
          <div class="text-sm font-medium text-gray-500">{{ user ? user.email : '-' }}</div>
        </div>
        <nuxt-link
          to="/cart"
          class="ml-auto flex bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="sr-only">View cart</span>
          <svg
            class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ cartTotal }}</span>
        </nuxt-link>
      </div>
      <div v-if="isLogin" class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
        <nuxt-link
          to="/profile"
          class="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Profil</nuxt-link>
        <nuxt-link
          to="/purchase/order"
          class="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Riwayat
          Belanja</nuxt-link>
        <nuxt-link
          to="/purchase"
          class="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Riwayat
          Tagihan ke 1</nuxt-link>
        <nuxt-link
          to="/purchase/bills"
          class="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Riwayat
          Tagihan ke 2</nuxt-link>
        <a
          href="javascript:;"
          class="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          @click="$emit('logout')">Keluar</a>
      </div>
      <div v-else class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
        <nuxt-link
          to="/signin"
          class="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Masuk</nuxt-link>
        <nuxt-link
          to="/signup"
          class="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Daftar</nuxt-link>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MobileMenu',

  computed: {
    ...mapState({
      isLogin: state => state.auth.loggedIn,
      user: state => state.auth.user,
      cartTotal: state => state.cartTotal,
      wishlistsTotal: state => state.wishlistsTotal
    })
  }
}
</script>
