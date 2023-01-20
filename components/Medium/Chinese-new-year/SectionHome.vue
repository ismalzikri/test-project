<template>
  <div v-if="products">
    <p class="text-2xl font-bold mb-5 mt-5">Produk Rekomendasi Imlek</p>
    <img
      src="https://storage.caribarang.id/general/Admin-Caribarang-8/240e16f5-30d2-4d73-a55c-3b81879aeaa4.webp"
      alt="banner"
      class="w-full rounded-[40px] mb-16"
    />
    <div class="grid gap-2 grid-cols-2 sm:grid-cols-4 gap-x-6 lg:grid-cols-6">
      <NuxtLink
        v-for="(item, index) in products"
        :key="index"
        :to="`/products/${item.product_uuid}`"
        class="rounded-[20px] overflow-hidden relative group"
      >
        <img
          src="https://storage.caribarang.id/general/Admin-Caribarang-8/ad3e2b0b-1171-4e03-b7e4-7d468ada73d8.webp"
          alt="card-image"
          class="w-full h-full"
        />
        <div class="absolute top-0 w-full h-full p-1 pb-2">
          <div
            class="w-full aspect-w-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8 rounded-2xl"
          >
            <img
              :src="item.cover"
              :alt="item.name"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <p class="text-sm truncate text-white mx-2 mt-1 md:mt-2">
            {{ item.name }}
          </p>
          <p class="text-xs text-white mx-2">Estimasi HPP</p>
          <p class="text-sm font-semibold text-red-600 mt-0.5 ml-3">
            Rp {{ item.price | formatPrice }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChineseNewYearSectionHome',

  data () {
    return {
      products: null
    }
  },

  async fetch () {
    this.$store.dispatch('setLoading', true)
    const { data } = await this.$axios.get(
      '/api/product/recommendations?flag=imlek'
    )
    this.products = data.data

    this.$store.dispatch('setLoading', false)
  }
}
</script>

<style lang="scss" scoped>
 .aspect-w-1 {
    position: relative;
    padding-bottom: calc(1 / 1 * 112%);
 }
</style>