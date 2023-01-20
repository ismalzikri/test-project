<template>
  <header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
        <div class="hidden md:flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
          <div class="flex-shrink-0 flex items-center">
            <a href="/">
              <img class="h-11 w-auto hidden md:block" src="/img/logo-navbar-web.webp" alt="Caribarang Logo">
            </a>
          </div>
        </div>
        <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
          <div class="flex items-center pr-3 md:px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div class="w-full">
              <label for="search" class="sr-only">Cari</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input v-model="keyword" class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cari" type="search" @keyup.enter="onSearch">
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
          <nuxt-link v-if="isLogin" to="/wishlists" class="flex bg-white rounded-full mr-2 text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">View Favorit</span>
            <span class="h-6 w-6 text-xl"><i class="fas fa-heart"></i></span>
            <span class="text-xs font-medium text-red-700 group-hover:text-gray-800">{{wishlistsTotal}}</span>
          </nuxt-link>

          <nuxt-link v-if="isLogin" to="/cart" class="flex bg-white rounded-full mr-2 text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">View cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span class="text-xs font-medium text-red-700 group-hover:text-gray-800">{{cartTotal}}</span>
          </nuxt-link>

          <button v-on-clickaway="awayToggleMenuMobile" type="button" class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500" aria-expanded="false" @click="toogleMenuMobile = !toogleMenuMobile">
            <span class="sr-only">Open menu</span>
            <i v-show="!toogleMenuMobile" class="fas fa-bars"></i>
          </button>
        </div>

        <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
          <div class="ml-4 flow-root text-sm lg:relative lg:ml-4">
            <button v-if="isLogin" v-on-clickaway="awayWishlistToggle" type="button" class="group -m-2 p-2 flex items-center" aria-expanded="false" @click="toggleWishlist = !toggleWishlist">
              <span class="h-6 w-6 text-xl"><i class="fas fa-heart text-gray-300"></i></span>
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-800">{{wishlistsTotal}}</span>
              <span class="sr-only">items in favorit, view bag</span>
            </button>

            <wishlist-dropdown :toggle="toggleWishlist"/>
          </div>

          <div class="ml-4 flow-root text-sm lg:relative lg:ml-8">
            <button v-if="isLogin" v-on-clickaway="awayCartToggle" type="button" class="group -m-2 p-2 flex items-center" aria-expanded="false" @click="toggleCart = !toggleCart">
              <svg class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-800">{{cartTotal}}</span>
              <span class="sr-only">items in cart, view bag</span>
            </button>

            <cart-dropdown :toggle="toggleCart"/>
          </div>

          <!-- Profile dropdown -->
          <div v-if="isLogin" class="flex-shrink-0 relative ml-5">
            <div>
              <button v-on-clickaway="awayProfilToggle" type="button" class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false" aria-haspopup="true" @click="toggleProfile = !toggleProfile">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="user && user.avatar ? user.avatar : `https://ui-avatars.com/api/?name=${user.name.substring(0,2)}&background=004B9C&color=ffffff&bold=true&format=png`" :alt="user ? user.name : 'avatar'">
              </button>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >

              <div v-show="toggleProfile" class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <nuxt-link to="/profile" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1">Profil</nuxt-link>
                <nuxt-link to="/purchase/order" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1">Riwayat Belanja</nuxt-link>
                <nuxt-link to="/purchase" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1">Riwayat Tagihan ke 1</nuxt-link>
                <nuxt-link to="/purchase/bills" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1">Riwayat Tagihan ke 2</nuxt-link>
                <a href="javascript:;" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1" @click="logout">Keluar</a>
              </div>
            </transition>
          </div>

          <nuxt-link v-if="!isLogin" to="/signin" class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Masuk
          </nuxt-link>
        </div>
      </div>
    </div>

    <sidebar-menu :open="toogleMenuMobile" @close="toogleMenuMobile = false" @logout="logout"/>
  </header>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import { directive as onClickaway } from 'vue-clickaway'
// import MobileMenu from './MobileMenu.vue'
import CartDropdown from '../CartDropdown.vue'
import WishlistDropdown from '../WishlistDropdown.vue'
import SidebarMenu from '../SidebarMenu.vue'
export default {
  name:'NavbarComponent',

  directives: {
    onClickaway
  },

  components:{
    // MobileMenu,
    CartDropdown,
    WishlistDropdown,
    SidebarMenu

  },

  data () {
    return {
      toggleProfile:false,
      toogleMenuMobile:false,
      toggleCart:false,
      toggleWishlist:false,
      keyword:''
    }
  },

  computed:{
    ...mapState({
      isLogin:state => state.auth.loggedIn,
      user:state => state.auth.user,
      carts:state => state.carts,
      cartTotal:state => state.cartTotal,
      wishlists:state => state.wishlists,
      wishlistsTotal:state => state.wishlistsTotal,
      contentType:state => state.contentType
    })
  },


  created () {
    this.initKeyword()
  },

  methods:{
    ...mapActions({
      setCart:'setCart',
      setCartTotal:'setCartTotal',
      setWishlist:'setWishlist',
      setwishlistsTotal:'setwishlistsTotal'
    }),

    initKeyword () {
      const keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
      this.keyword = decodeURIComponent(keyword)
    },

    onSearch () {
      return  window.location.replace(`/search?keyword=${encodeURIComponent(this.keyword)}`)
    },

    async logout () {
      this.$store.dispatch('setLoading', true)
      this.setCart([])
      this.setCartTotal(0)
      this.setWishlist([])
      this.setwishlistsTotal(0)
      await this.$auth.logout()
      this.$store.dispatch('setLoading', false)
    },

    awayCartToggle () {
      this.toggleCart = false
    },

    awayWishlistToggle () {
      this.toggleWishlist = false
    },

    awayProfilToggle (type) {
      this.toggleProfile = false
    },

    awayToggleMenuMobile () {
      this.toogleMenuMobile = false
    }
  }

}
</script>
