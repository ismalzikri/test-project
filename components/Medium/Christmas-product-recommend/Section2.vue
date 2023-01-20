<template>
  <div>
    <p class="text-2xl font-bold mb-3 mt-20">Produk Natal Lainnya</p>
    <div class="grid gap-2 grid-cols-2 sm:grid-cols-4 gap-x-6 lg:grid-cols-6">
      <product-card
        v-for="(item, index) in newArrival"
        :key="index"
        :name="item.name"
        :moq="item.moq"
        :seller="item.supplier ? item.supplier : '-'"
        :image="item.cover"
        :price="item.price"
        :link="`/products/${item.product_uuid}`"
      ></product-card>
    </div>
    <div v-show="isShowButtonMore" class="w-full flex justify-center mt-2">
      <button
        class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize"
        @click="onAddProducts()"
      >
        Tampilkan Lainnya
      </button>
    </div>
  </div>
</template>

<script>
import ProductCard from '../../Basic/ProductCard.vue'
export default {
  name: 'ProductRecommendationsIndex',
  components: { 'product-card': ProductCard },
  data () {
    return {
      newArrival: [],
      isShowButtonMore: false,
      page: 1
    }
  },
  async fetch () {
    this.$store.dispatch('setLoading', true)
    const { data, meta } = await this.$axios.$get(
      `/api/product/recommendations/relateds?flag=christmas&page=${this.page}`
    )
    this.newArrival = data
    if (this.newArrival.length === meta.total) {
      this.isShowButtonMore = false
    } else {
      this.isShowButtonMore = true
    }
    this.$store.dispatch('setLoading', false)
  },
  methods: {
    async onAddProducts () {
      this.$store.dispatch('setLoading', true)
      this.page = parseInt(this.page) + 1
      const { data, meta } = await this.$axios.$get(
        `/api/product/recommendations/relateds?flag=christmas&page=${this.page}`
      )
      this.newArrival.push(...data)
      if (this.newArrival.length === meta.total) {
        this.isShowButtonMore = false
      } else {
        this.isShowButtonMore = true
      }
      this.$store.dispatch('setLoading', false)
    }
  }
}
</script>
