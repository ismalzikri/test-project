<template>
  <div v-show="open" class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
    <transition
      enter-active-class="transition-opacity ease-linear duration-300" enter-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
      leave-class="opacity-100" leave-to-class="opacity-0">
      <div class="fixed inset-0 bg-black bg-opacity-25" :class="[open ? 'dark-transparent' : '']" aria-hidden="true">
      </div>
    </transition>

    <transition
      enter-active-class="transition ease-in-out duration-300 transform" enter-class="translate-x-full"
      enter-to-class="translate-x-0" leave-active-class="transition ease-in-out duration-300 transform"
      leave-class="translate-x-0" leave-to-class="translate-x-full">
      <div class="relative max-w-xs w-10/12 h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">

        <div class="px-2 flex items-center justify-between" :class="[isLogin ? 'mb-5' : '-mb-5']">
          <figure class="float-right">
            <img src="/img/logo-navbar-web.webp" width="128" height="128" alt="caribarang-logo">
          </figure>
          <div class="absolute top-3 right-5">
            <button
              type="button"
              class="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
              @click="$emit('close')">
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav class="px-2">
          <div v-if="isLogin" class="space-y-1">
            <div class="p-2.5">
              <nuxt-link to="/profile" class="flex-shrink-0 w-full group block">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      :alt="user.name">
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">{{ user.name }}</p>
                    <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">{{ user.email }}</p>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div>
              <h2
                class="text-lightBlue-600 group flex items-center px-2 pt-2 text-base leading-5 font-medium rounded-md">
                Profile Saya
              </h2>
              <ul class="w-full px-2 py-2">
                <li class="text-sm py-1">
                  <router-link
                    to="/profile"
                    class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold">Detail</router-link>
                </li>
                <li class="text-sm py-1">
                  <router-link
                    to="/profile/preferences"
                    class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold">Preferensi</router-link>
                </li>
                <li class="text-sm py-1">
                  <router-link
                    to="/profile/ktp"
                    class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold">KTP</router-link>
                </li>
                <li class="text-sm py-1">
                  <router-link
                    to="/profile/npwp"
                    class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold">NPWP</router-link>
                </li>
              </ul>
            </div>

            <div>
              <h2
                class="text-lightBlue-600 group flex items-center px-2 pt-2 text-base leading-5 font-medium rounded-md">
                Belanjaku
              </h2>
              <ul class="w-full mb-5 px-2 py-2">
                <li class="text-sm py-1">
                  <nuxt-link
                    to="/purchase/order"
                    class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold">
                    Riwayat belanja
                  </nuxt-link>
                </li>
                <li class="text-sm py-1">
                  <nuxt-link to="/purchase" class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold">
                    Riwayat tagihan 1
                  </nuxt-link>
                </li>
                <li class="text-sm py-1">
                  <nuxt-link
                    to="/purchase/bills"
                    class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold">
                    Riwayat tagihan 2
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="px-1 flex gap-2" @click="$emit('logout')">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0284c7"
                  style="vertical-align:middle" display="inline-block">
                  <path
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M5 21h7.5a1.929 1.929 0 0 0 2-2v-2a1 1 0 0 0-2 0v2H5V5h7.5v2a1 1 0 0 0 2 0V5a1.93 1.93 0 0 0-2-2H5a1.93 1.93 0 0 0-2 2v14a1.93 1.93 0 0 0 2 2zM17.71 7.29l4 4a1.001 1.001 0 0 1 0 1.42l-4 4a.999.999 0 0 1-1.42 0 1 1 0 0 1 0-1.42l2.3-2.29H9a1 1 0 1 1 0-2h9.59l-2.3-2.29a1.004 1.004 0 1 1 1.42-1.42z" />
                </svg>
              </div>
              <span>Keluar</span>
            </div>
          </div>
          <div v-else class="flex justify-center flex-col mt-14">
            <cb-button color="primary" label="Login" button="button" @click="$router.push('/signin')" />
            <p class="py-2 text-xs text-gray-600 text-center">
              Tidak punya akun?
            </p>
            <p class="text-xs text-gray-600 text-center">
              <nuxt-link class="text-indigo-600" to="/signup">Daftar</nuxt-link>
            </p>
          </div>
        </nav>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CbButton from '~/components/Basic/Button.vue'

export default {
  name: 'SidebarMenu',

  components: {
    CbButton
  },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
      isLogin: state => state.auth.loggedIn
    })
  }
}
</script>
<style lang="scss">
.dark-transparent {
  background-color: rgba(0, 0, 0, 0.2);
  transition: all .3s ease;
}
</style>
