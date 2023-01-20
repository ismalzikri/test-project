<template>
  <div class="">
    <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 py-5">Favorit</h2>
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 gap-x-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-5">
      <wishlist-card
        v-for="(item,index) in wishlists"
        :key="index"
        :name="item.product_name"
        :image="item.product_cover"
        :price="item.product_price"
        :link="`/products/${item.product_uuid}`"
        @delete="postDelete(item, index)"
      ></wishlist-card>
    </div>
    <div v-show="showButtonMore" class="w-full flex justify-center mt-2">
      <button class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize" @click="fetchWishlists()">Tampilkan Lainnya</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import WishlistCard from '../../components/Basic/WishlistCard.vue'
export default {
  name:'WishListPage',

  components:{
    'wishlist-card':WishlistCard
  },

  data () {
    return {
      wishlists:[],
      page:1,
      showButtonMore:false
    }
  },

  async fetch () {
    await Promise.all([this.fetchWishlists(true)])
  },

  computed:{
    ...mapState({
      wishlistsTotal:state => state.wishlistsTotal
    })
  },

  methods:{
    ...mapActions({
      setwishlistsTotal:'setwishlistsTotal'
    }),

    async fetchWishlists (firstFetch = false) {
      try {
        if (!firstFetch) {
          this.page = this.page + 1
        }

        this.$store.dispatch('setLoading', true)
        const {data, meta} = await this.$axios.$get(`/api/wishlists?page=${this.page}`)
        this.$store.dispatch('setLoading', false)
        const wishlist = data
        const totalItems = meta.total
        if (this.page === 1) {
          this.wishlists = wishlist
        } else {
          this.wishlists.push(...wishlist)
        }

        if (this.wishlists.length === totalItems) {
          this.showButtonMore = false
        } else {
          this.showButtonMore = true
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        this.$swal.fire({icon: 'error', title: 'Error', text: error.message})
      }
    },

    async postDelete (item, index) {
      try {
        this.$store.dispatch('setLoading', true)
        const {status, message} = await this.$axios.$delete(`/api/wishlists/${item._id}`)
        this.$store.dispatch('setLoading', false)
        if (!status) {
          this.$swal.fire({icon: 'error', title: 'Error', text: message})
        } else {
          this.wishlists.splice(index, 1)
          this.setwishlistsTotal((parseInt(this.wishlistsTotal) - 1))
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        this.$swal.fire({icon: 'error', title: 'Error', text: error.message})
      }
    }
  }
}
</script>
