<template>
  <div
    v-if="products.length"
    class="relative w-screen md:w-full left-1/2 -translate-x-1/2 flex h-[399px] mt-20 mb-10 bg-gradient-to-tr from-red-100 to-red-500 lg:rounded-xl"
  >
    <img
      src="https://storage.caribarang.id/general/Jeffri-8/9d1953ce-3ef5-48fe-84f5-1e3a548d6cf1.webp"
      alt="background cover product christmas/natal caribarang.id"
      class="hidden lg:block absolute w-full h-full z-0 lg:rounded-xl"
    />
    <div class="absolute -top-5 pl-4 left-0 bg-[#EEB011] rounded-r-full">
      <div class="relative">
        <img
          class="w-[150px] h-12 absolute top-[-38px] right-1"
          src="/icons/christmas/1.png"
          alt="icon christmas caribarang.id"
        />
        <img
          class="w-[80px] h-8 absolute -bottom-3 -left-5"
          src="/icons/christmas/2.png"
          alt="icon christmas caribarang.id"
        />
        <div
          class="px-4 py-2 bg-[#42C269] text-white flex gap-2 items-center rounded-r-full"
        >
          <img
            class="w-7 h-7"
            src="/icons/christmas/christmas.png"
            alt="icon christmas caribarang.id"
          />

          <p class="lg:text-lg font-semibold">Rekomendasi Produk Natal</p>
        </div>
      </div>
    </div>
    <div class="absolute top-9 right-5 lg:top-7 z-10">
      <div class="justify-end w-full flex pb-5">
        <NuxtLink to="/products/christmas-product-recommend" class="text-white"
        >Lihat Semua</NuxtLink
        >
      </div>
    </div>
    <div
      class="overflow-x-auto flex gap-5 px-4 mt-auto w-full justify-between z-10"
    >
      <BasicProductCard
        v-for="(item, index) in products"
        :key="index"
        :name="item.name"
        :moq="item.moq"
        :seller="item.supplier ? item.supplier : '-'"
        :image="item.cover"
        :price="item.price"
        :link="`/products/${item.product_uuid}`"
        class="rounded-b-lg w-[170px]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductChristmas',
  data () {
    return {
      products: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(
      '/api/product/recommendations?flag=christmas&limit=6'
    )
    this.products = data.data
  }
}
</script>
