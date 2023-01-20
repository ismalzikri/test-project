<template>
  <header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8"
      >
        <div
          class="hidden md:flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2"
        >
          <div class="flex-shrink-0 flex items-center">
            <a href="/">
              <img
                class="h-11 w-auto hidden md:block"
                src="/img/logo-navbar-web.webp"
                alt="Caribarang Logo"
              />
            </a>
          </div>
        </div>
        <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6 py-4">
          <div
            class="flex items-center pr-3 md:px-6 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0"
          >
            <div class="w-full py-1">
              <ul class="flex justify-center text-center items-center gap-10">
                <figure>
                  <img
                    class="block md:hidden w-12 h-11"
                    src="/img/logo-navbar-mobile.webp"
                    alt="caribarang-logo-mobile"
                  />
                </figure>
                <li class="text-sm font-semibold relative group">
                  <nuxt-link
                    to="/"
                    class="hover:text-[#004B9C]"
                    :class="[
                      $route.query.product !== 'local'
                        ? 'text-[#004B9C]'
                        : 'text-gray-500'
                    ]"
                  >
                    Produk 1688.com
                  </nuxt-link>
                  <div
                    :class="[
                      $route.query.product !== 'local'
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    ]"
                    class="w-full bg-primary-color h-0.5 mt-2 absolute -bottom-1 duration-300 left-1/2 -translate-x-1/2"
                  ></div>
                </li>
                <li class="text-sm font-semibold mr-2 relative group">
                  <small
                    :class="[
                      $route.query.product === 'local'
                        ? 'bg-red-500'
                        : 'bg-red-400'
                    ]"
                    class="absolute top-[-17px] right-0 text-[9px] group-hover:bg-red-500 text-white px-2 -py-1 rounded-full"
                  >
                    Coming Soon
                  </small>
                  <nuxt-link
                    :class="[
                      $route.query.product === 'local'
                        ? 'text-[#004B9C] '
                        : 'text-gray-500'
                    ]"
                    class="hover:text-[#004B9C]"
                    :to="{ path: '/', query: { product: 'local' } }"
                  >
                    Produk Lokal Indonesia
                  </nuxt-link>
                  <div
                    :class="[
                      $route.query.product === 'local'
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    ]"
                    class="bg-primary-color h-0.5 mt-2 absolute -bottom-1 duration-300 left-1/2 -translate-x-1/2"
                  ></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden"
        >
          <nuxt-link
            v-if="isLogin"
            to="/wishlists"
            class="flex bg-white rounded-full mr-2 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span class="sr-only">View favorit</span>
            <svg
              viewBox="0 0 28 24"
              fill="none"
              stroke="none"
              class="h-[19px] w-6 fill-[#0b63c1] hover:fill-[#004B9C]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 24C10.6925 23.28 0.5 17.64 0.5 7.5C0.5 5.92588 0.99528 4.39166 1.91568 3.11467C2.83609 1.83768 4.13495 0.882656 5.62829 0.384875C7.12163 -0.112905 8.73374 -0.128203 10.2363 0.341148C11.7388 0.8105 13.0555 1.74071 14 3C14.9445 1.74071 16.2612 0.8105 17.7637 0.341148C19.2663 -0.128203 20.8784 -0.112905 22.3717 0.384875C23.865 0.882656 25.1639 1.83768 26.0843 3.11467C27.0047 4.39166 27.5 5.92588 27.5 7.5C27.5 17.64 17.3075 23.28 14 24ZM14 21C18.68 19.605 24.5 13.7925 24.5 7.5C24.5 6.30653 24.0259 5.16193 23.182 4.31802C22.3381 3.47411 21.1935 3 20 3C18.0425 3 16.043 4.2495 14 6.75C11.957 4.2495 9.9575 3 8 3C6.80653 3 5.66193 3.47411 4.81802 4.31802C3.97411 5.16193 3.5 6.30653 3.5 7.5C3.5 13.7925 9.32 19.605 14 21Z"
              />
            </svg>
            <span
              class="text-xs font-medium text-pink-700 group-hover:text-pink-800"
            >{{ wishlistsTotal }}</span
            >
          </nuxt-link>

          <div
            v-if="isLogin"
            class="flex cursor-pointer bg-white rounded-full mr-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            @click="goToCheckout"
          >
            <span class="sr-only">View cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              class="flex-shrink-0 h-6 w-6 stroke-[#0b63c1] hover:stroke-[#004B9C]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
            <span
              class="text-xs font-medium text-red-700 group-hover:text-gray-800"
            >{{ cartTotal }}</span
            >
          </div>

          <button
            v-on-clickaway="awayToggleMenuMobile"
            type="button"
            class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            aria-expanded="false"
            @click="toogleMenuMobile = !toogleMenuMobile"
          >
            <span class="sr-only">Open menu</span>
            <i v-show="!toogleMenuMobile" class="fas fa-bars"></i>
          </button>
        </div>

        <div
          class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 gap-5"
        >
          <div class="flow-root text-sm lg:relative">
            <button
              v-on-clickaway="awayWishlistToggle"
              type="button"
              class="group -m-2 p-2 flex items-center"
              aria-expanded="false"
              @click="
                isLogin
                  ? (toggleWishlist = !toggleWishlist)
                  : $router.push('/signin')
              "
            >
              <svg
                viewBox="0 0 28 24"
                class="h-[19px] w-6 fill-[#0b63c1] hover:fill-[#004B9C]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill-width="1"
                  fill=""
                  stroke=""
                  d="M14 24C10.6925 23.28 0.5 17.64 0.5 7.5C0.5 5.92588 0.99528 4.39166 1.91568 3.11467C2.83609 1.83768 4.13495 0.882656 5.62829 0.384875C7.12163 -0.112905 8.73374 -0.128203 10.2363 0.341148C11.7388 0.8105 13.0555 1.74071 14 3C14.9445 1.74071 16.2612 0.8105 17.7637 0.341148C19.2663 -0.128203 20.8784 -0.112905 22.3717 0.384875C23.865 0.882656 25.1639 1.83768 26.0843 3.11467C27.0047 4.39166 27.5 5.92588 27.5 7.5C27.5 17.64 17.3075 23.28 14 24ZM14 21C18.68 19.605 24.5 13.7925 24.5 7.5C24.5 6.30653 24.0259 5.16193 23.182 4.31802C22.3381 3.47411 21.1935 3 20 3C18.0425 3 16.043 4.2495 14 6.75C11.957 4.2495 9.9575 3 8 3C6.80653 3 5.66193 3.47411 4.81802 4.31802C3.97411 5.16193 3.5 6.30653 3.5 7.5C3.5 13.7925 9.32 19.605 14 21Z"
                />
              </svg>

              <span
                v-if="isLogin"
                class="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800"
              >{{ wishlistsTotal }}</span
              >
              <span class="sr-only">items in favorit, view bag</span>
            </button>
            <wishlist-dropdown :toggle="toggleWishlist" />
          </div>

          <div class="flow-root text-sm lg:relative">
            <button
              v-on-clickaway="awayCartToggle"
              type="button"
              class="group -m-2 p-2 flex items-center"
              aria-expanded="false"
              @click="
                isLogin ? (toggleCart = !toggleCart) : $router.push('/signin')
              "
            >
              <!-- stroke-[#0053ab] hover:stroke-[#004B9C] -->
              <svg
                class="h-6 w-6 stroke-[#0b63c1] hover:stroke-[#004B9C]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  fill=""
                  stroke=""
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span
                v-if="isLogin"
                class="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800"
              >{{ cartTotal }}</span
              >
              <span class="sr-only">items in cart, view bag</span>
            </button>

            <cart-dropdown :toggle="toggleCart" />
          </div>

          <!-- Profile dropdown -->
          <div v-if="isLogin" class="flex-shrink-0 relative ml-5">
            <div>
              <button
                v-on-clickaway="awayProfilToggle"
                type="button"
                class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-expanded="false"
                aria-haspopup="true"
                @click="toggleProfile = !toggleProfile"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  :src="
                    user && user.avatar
                      ? user.avatar
                      : `https://ui-avatars.com/api/?name=${user.name.substring(
                        0,
                        2
                      )}&background=004B9C&color=ffffff&bold=true&format=png`
                  "
                  :alt="user ? user.name : 'avatar'"
                />
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
              <div
                v-show="toggleProfile"
                class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <nuxt-link
                  to="/profile"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                >Profil</nuxt-link
                >
                <nuxt-link
                  to="/purchase/order"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                >Riwayat Belanja</nuxt-link
                >
                <nuxt-link
                  to="/purchase"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                >Riwayat Tagihan ke 1</nuxt-link
                >
                <nuxt-link
                  to="/purchase/bills"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                >Riwayat Tagihan ke 2</nuxt-link
                >
                <a
                  href="javascript:;"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  @click="logout"
                >Keluar</a
                >
              </div>
            </transition>
          </div>

          <nuxt-link
            v-if="!isLogin"
            to="/signin"
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Masuk
          </nuxt-link>
        </div>
      </div>
    </div>

    <sidebar-menu
      :open="toogleMenuMobile"
      @close="toogleMenuMobile = false"
      @logout="logout"
    />
  </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { directive as onClickaway } from 'vue-clickaway'
// import MobileMenu from './MobileMenu.vue'
import CartDropdown from '../CartDropdown.vue'
import WishlistDropdown from '../WishlistDropdown.vue'
import SidebarMenu from '../SidebarMenu.vue'
export default {
  name: 'NavbarTabMenu',

  directives: {
    onClickaway
  },

  components: {
    // MobileMenu,
    CartDropdown,
    WishlistDropdown,
    SidebarMenu
  },

  data () {
    return {
      toggleProfile: false,
      toogleMenuMobile: false,
      toggleCart: false,
      toggleWishlist: false,
      keyword: ''
    }
  },

  computed: {
    ...mapState({
      isLogin: (state) => state.auth.loggedIn,
      user: (state) => state.auth.user,
      carts: (state) => state.carts,
      cartTotal: (state) => state.cartTotal,
      wishlists: (state) => state.wishlists,
      wishlistsTotal: (state) => state.wishlistsTotal,
      contentType: (state) => state.contentType
    })
  },

  methods: {
    ...mapActions({
      setCart: 'setCart',
      setCartTotal: 'setCartTotal',
      setWishlist: 'setWishlist',
      setwishlistsTotal: 'setwishlistsTotal'
    }),

    goToCheckout () {
      window.location.href = '/cart'
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
