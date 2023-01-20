<template>
  <div v-if="products">
    <p class="text-2xl font-bold mb-5 mt-5">Produk Rekomendasi Natal</p>
    <img
      src="https://storage.caribarang.id/general/m-royco-30/41694497-7b47-4db6-b945-d76ec9ba4489.jpg"
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
          src="https://storage.caribarang.id/general/m-royco-30/ccbeb1f3-41a1-4e3f-bb0c-c5c2a65abee5.png"
          alt=""
          class="w-full h-full"
        />
        <div class="absolute top-0 w-full h-full p-1 pb-2">
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8 rounded-2xl"
          >
            <img
              :src="item.cover"
              :alt="item.name"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <p class="text-sm truncate text-white mx-2 mb-1 mt-1">
            {{ item.name }}
          </p>
          <p class="text-xs text-white mx-2">Estimasi HPP</p>
          <p class="text-base font-semibold text-white mx-2">
            Rp {{ item.price | formatPrice }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChristmasProductRecommendSection1',
  data () {
    return {
      products: null
    }
  },
  async fetch () {
    this.$store.dispatch('setLoading', true)
    const { data } = await this.$axios.get(
      '/api/product/recommendations?flag=christmas'
    )
    this.products = data.data

    this.$store.dispatch('setLoading', false)
  }
}
</script>
