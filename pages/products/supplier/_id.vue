<template>
  <div>
    <div class="rounded-xl flex items-center bg-fixed overflow-hidden relative">
      <img
        src="https://storage.caribarang.id/general/Jeffri-8/e19753b9-76bd-4801-aebf-be6d32cd37fb.webp"
        class="object-cover"
        alt="background cover product supplier caribarang.id"
      />
      <p
        class="absolute left-3 md:left-10 lg:left-20 text-base md:text-3xl lg:text-4xl text-white"
      >
        Produk Lain dari <span class="italic"> {{ $route.query.ref }}</span>
      </p>
    </div>
    <div
      class="grid gap-2 grid-cols-2 sm:grid-cols-4 gap-x-6 lg:grid-cols-6 mt-16"
    >
      <BasicProductCard
        v-for="(item, index) in isAllsupplierProduct"
        :key="index"
        :name="item.name"
        :moq="item.moq"
        :seller="item.seller ? item.seller.name : '-'"
        :image="item.cover"
        :price="item.price"
        :link="`/products/${item.uuid}`"
      ></BasicProductCard>
    </div>
    <div v-if="isShowButtonMore" class="w-full flex justify-center mt-2">
      <button
        class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize"
        @click="onShowButtonMore()"
      >
        Tampilkan Lainnya
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsSupplier',
  data () {
    return {
      isAllsupplierProduct: null,
      isShowButtonMore: true,
      page: 1
    }
  },
  async fetch () {
    this.$store.dispatch('setLoading', true)
    if (!this.$route.params.id) {
      this.$router.push('/')
    }
    const getData = await this.$axios.get(
      `/api/supplier/${this.$route.params.id}/products/all?page=1`
    )
    this.isAllsupplierProduct = getData.data.data
    if (this.isAllsupplierProduct.length === getData.data.meta.total) {
      this.isShowButtonMore = false
    }

    this.$store.dispatch('setLoading', false)
  },
  methods: {
    async onShowButtonMore () {
      this.$store.dispatch('setLoading', true)
      const getData = await this.$axios.get(
        `/api/supplier/${
          this.$route.params.id
        }/products/all?page=${(this.page += 1)}`
      )
      this.isAllsupplierProduct.push(...getData.data.data)
      if (this.isAllsupplierProduct.length === getData.data.meta.total) {
        this.isShowButtonMore = false
      }
      this.$store.dispatch('setLoading', false)
    }
  }
}
</script>
