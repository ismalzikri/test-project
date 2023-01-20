<template>
  <div
    v-if="products.length"
    class="relative w-screen md:w-full left-1/2 -translate-x-1/2 flex h-[399px] mt-20 mb-10 bg-gradient-to-tr from-red-100 to-red-500 lg:rounded-xl"
  >
    <img
      src="https://storage.caribarang.id/general/Admin-Caribarang-8/56b011d7-396b-456b-adfb-972a43918632.webp"
      alt="background imlek caribarang.id"
      class="hidden lg:block absolute w-full h-full z-0 lg:rounded-xl"
    />
    <div class="absolute -top-5 pl-4 left-0 bg-[#AB0E14] rounded-r-full">
      <div class="relative">
        <img
          class="h-14 absolute top-[-28px] -right-7"
          src="https://storage.caribarang.id/general/Admin-Caribarang-8/df79013a-d33b-467a-b7a6-adc04f878d3d.webp"
          alt="icon christmas caribarang.id"
        />
        <div
          class="px-4 py-2 bg-[#E6AF23] text-white flex gap-2 items-center rounded-r-full"
        >
          <img
            class="w-7 h-7"
            src="/icons/chines-year/lampion.webp"
            alt="icon christmas caribarang.id"
          />

          <p class="lg:text-lg font-semibold">Rekomendasi Produk Imlek</p>
        </div>
      </div>
    </div>
    <div class="absolute top-9 right-5 lg:top-7 z-10">
      <div class="justify-end w-full flex pb-5">
        <NuxtLink to="/products/chinese-new-year" class="text-white"
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
  name: 'ChineseNewYear',

  data () {
    return {
      products: []
    }
  },

  async fetch () {
    const { data } = await this.$axios.get(
      '/api/product/recommendations?flag=imlek&limit=6'
    )
    this.products = data.data
  }
}
</script>
