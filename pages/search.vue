<template>
  <div class="">

    <div class="bg-white">
      <div class="py-8 px-4">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Menampilkan hasil pencarian <span class="capitalize">'{{keyword}}'</span></h1>
        <p class="mt-4 max-w-xl text-sm text-gray-700">Total hasil pencarian '{{keyword}}' {{meta.total}} produk</p>
      </div>
    </div>

    <!-- Filters -->
    <section aria-labelledby="filter-heading">
      <div class="relative z-10 bg-white border-b border-gray-200 pb-4">
        <div class="px-4 flex items-center justify-between">
          <div class="relative inline-block text-left">
            <div>
              <button id="menu-button" type="button" class="group inline-flex justify-center text-sm font-medium text-indigo-700 hover:text-indigo-900" aria-expanded="false" aria-haspopup="true" @click="toggleFilter = !toggleFilter">
                {{sort == 'price' ? 'Harga terendah' : sort == '-price' ? 'Harga tertinggi' : 'Urutkan' }} <span class="text-xs  pl-1 pt-1 fas fa-chevron-down"></span>
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
              <div v-show="toggleFilter" class="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  <a id="menu-item-3" href="javascript:;" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" @click="onSort('price')"> Harga terendah  </a>
                  <a id="menu-item-4" href="javascript:;" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" @click="onSort('-price')"> Harga tertinggi </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Product grid -->
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 gap-x-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-5 py-5">
      <product-card
        v-for="(item,index) in products"
        :key="index"
        :name="item.name"
        :moq="item.moq"
        :seller="item.seller ? item.seller.name: '-'"
        :image="item.cover"
        :price="item.price"
        :link="`/products/${item._id}`"
        target="_blank"
      ></product-card>

    </div>
    <div v-show="showButtonMore" class="w-full flex justify-center mt-2">
      <button class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize" @click="fetchProduct">Tampilkan Lainnya</button>
    </div>

  </div>
</template>
<script>
import ProductCard from '../components/Basic/ProductCard.vue'

export default {
  name:'SearchPage',

  components:{
    ProductCard
  },


  async asyncData ({route, error, $axios}) {
    try {
      const keyword = route.query.keyword
      const sort = route.query.sort ? route.query.sort : ''
      const {data, meta} = await $axios.$get(`/api/search?keyword=${keyword}&sort=${sort}`)
      const showButtonMore = meta.total !== data.length

      return {
        products:data,
        meta,
        sort,
        showButtonMore,
        keyword:decodeURIComponent(route.query.keyword)
      }
    } catch (error) {

    }
  },

  data () {
    return {
      toggleFilter:false,
      products:[],
      sort:'',
      firstRender:false,
      showButtonMore:false,
      page:1
    }
  },

  watchQuery: true,

  methods:{
    async fetchProduct () {
      try {
        this.$store.dispatch('setLoading', true)

        this.page = this.page + 1
        const {data, meta} = await this.$axios.$get(`/api/search?keyword=${this.keyword}&sort=${this.sort}&page=${this.page}`)
        this.$store.dispatch('setLoading', false)
        if (this.firstRender) {
          this.products = data
        } else {
          this.products.push(...data)
        }
        this.firstRender = false
        this.showButtonMore = meta.total !== this.products.length
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },


    onSort (price) {
      this.sort = price
      this.page = 0
      this.firstRender = true
      this.toggleFilter = false
      return this.fetchProduct()
    }
  }
}
</script>
