<template>
  <div>
    <div class="w-full mt-5">
      <h2 class="title py-5">Rekomendasi Produk</h2>
      <div class="grid gap-2 grid-cols-2 sm:grid-cols-4 gap-x-6 lg:grid-cols-6">
        <product-card
          v-for="(item, index) in newArrival"
          :key="index"
          :name="item.name"
          :moq="item.moq"
          :seller="item.supplier ? item.supplier : '-'"
          :image="item.cover"
          :price="item.price.$numberDecimal"
          :link="`/products/${item.product_id}`"
        >
        </product-card>
      </div>
      <div v-show="showButtonMore" class="w-full flex justify-center mt-2">
        <button
          class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize"
          @click="fetchNewArrival()"
        >
          Tampilkan Lainnya
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../../components/Basic/ProductCard.vue'
export default {
  components: {
    'product-card': ProductCard
  },

  data () {
    return {
      newArrival: [],
      pageNewArrival: 1,
      showButtonMore: false
    }
  },

  async fetch () {
    await Promise.all([this.fetchNewArrival(true)])
  },

  methods: {
    async fetchNewArrival (firstFetch = false) {
      try {
        if (!firstFetch) {
          this.pageNewArrival = this.pageNewArrival + 1
        }
        this.$store.dispatch('setLoading', true)
        const { data } = await this.$axios.get(
          `${this.$config.productDetailHost}/api/product-recommend?page=${this.pageNewArrival}&publish=true`
        )
        this.$store.dispatch('setLoading', false)
        const productData = data.data
        const totalItems = data.total

        if (this.pageNewArrival === 1) {
          this.newArrival = productData
        } else {
          this.newArrival.push(...productData)
        }
        // hide button show more if product has loaded all
        if (this.newArrival.length === totalItems) {
          this.showButtonMore = false
        } else {
          this.showButtonMore = true
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin respond($breakpoint) {
  @if ($breakpoint == medium) {
    @media (min-width: 768px) {
      @content;
    }
  }
  @if ($breakpoint == large) {
    @media (min-width: 1024px) {
      @content;
    }
  }
}

.title {
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  color: rgba(82, 88, 103, 0.96);
  @include respond(medium) {
    font-size: 22px;
    color: rgba(49, 53, 59, 0.96);
  }
}
</style>
