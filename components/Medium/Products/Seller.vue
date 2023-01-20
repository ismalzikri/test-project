<template>
  <div v-if="isAllsupplierProduct && isOtherProduct" class="mt-10">
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-2xl py-5 font-semibold">Produk lainnya di toko ini</h2>
        <nuxt-link
          :to="`/products/supplier/${data.seller.seller_id_1688}?ref=${data.seller.name}`" target="_blank"
          class="text-indigo-600 text-sm hover:text-indigo-700"
        >Lihat semuanya</nuxt-link
        >
      </div>
      <div class="grid gap-2 grid-cols-2 sm:grid-cols-4 gap-x-6 lg:grid-cols-6">
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
    </div>

    <div v-if="isOtherProduct.length !== 0" class="mt-10">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl py-5 font-semibold">Produk serupa lainnya</h2>
        <nuxt-link
          :to="`/categories/${data.category.slug}`" target="_blank"
          class="text-indigo-600 text-sm hover:text-indigo-700"
        >Lihat semuanya</nuxt-link
        >
      </div>
      <div class="grid gap-2 grid-cols-2 sm:grid-cols-4 gap-x-6 lg:grid-cols-6">
        <BasicProductCard
          v-for="(item, index) in isOtherProduct"
          :key="index"
          :name="item.name"
          :moq="item.moq"
          :seller="item.seller ? item.seller.name : '-'"
          :image="item.cover"
          :price="item.price"
          :link="`/products/${item.uuid}`"
        ></BasicProductCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellerComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
  data () {
    return {
      isAllsupplierProduct: null,
      isOtherProduct: null
    }
  },
  async fetch () {
    try {
      this.$store.dispatch('setLoading', true)
      const getId = this.data.seller.seller_id_1688
      if (getId) {
        const getData = await this.$axios.get(
          `/api/supplier/${getId}/recommendation-product`
        )
        this.isAllsupplierProduct = getData.data.data
        const getData2 = await this.$axios.get(
          `/api/products/${this.$route.params.id}/category`
        )
        this.isOtherProduct = getData2.data.data
        this.$store.dispatch('setLoading', false)
      }
    } catch (error) {
      this.$store.dispatch('setLoading', false)
      console.log('oops', error)
    }
  }
}
</script>
