<template>
  <div>
    <transition
      enter-active-class="transition ease-out duration-200" enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">

      <div
        v-show="toggle"
        class="z-10 absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
        <div class="max-w-2xl mx-auto px-4">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="(item, index) in wishlists" :key="index" class="py-6 flex items-center">
              <img
                :src="item.product_cover" :alt="item.product_name"
                class="flex-none w-16 h-16 rounded-md border border-gray-200">
              <div class="ml-4 flex-auto">
                <h2 class="font-medium text-gray-900">
                  <a href="#">{{ item.product_name | readmore }}</a>
                </h2>
              </div>
            </li>
          </ul>
          <p
            v-if="!wishlists.length"
            class="text-sm text-center font-medium text-indigo-600 hover:text-indigo-500 py-3">Favorit kosong</p>
          <div v-show="wishlists.length" class="flex text-center">
            <nuxt-link
              to="/wishlists"
              class="w-full bg-lightBlue-500 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-lightBlue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
              Lihat Semua
            </nuxt-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'WishlistDropdown',
  props: {
    toggle: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState({
      wishlists: state => state.wishlists
    })
  }
}
</script>
