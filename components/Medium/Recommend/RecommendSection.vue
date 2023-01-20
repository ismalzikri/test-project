<template>
  <div class="recomendation">
    <div class="recomendation__title">
      <div class="recomendation__title__highlight">
        <img 
          src="/img/box_check.png" 
          width="27" 
          height="27" 
          alt="icon" 
        />
        <h2>Rekomendasi Produk</h2>
      </div>
      <div></div>
      <NuxtLink
        to="/products/product-recommend"
        class="text-white text-md font-medium"
      >Lihat semua</NuxtLink
      >
    </div>

    <div class="wrap">
      <product-card
        v-for="(item, index) in Recommend"
        :key="index"
        :name="item.name"
        :moq="item.moq"
        :seller="item.supplier ? item.supplier : '-'"
        :image="item.cover"
        :price="item.price.$numberDecimal"
        :link="`/products/${item.product_id}`"
        class="card"
      ></product-card>
    </div>
  </div>
</template>

<script>
import ProductCard from '../../Basic/ProductCard.vue'
export default {

  name:'RecommendSection',

  components: {
    'product-card': ProductCard
  },
  data () {
    return {
      Recommend: []
    }
  },

  async fetch () {
    try {
      this.$store.dispatch('setLoading', true)
      const { data } = await this.$axios.get(
        `${this.$config.productDetailHost}/api/product-recommend?page=1&publish=true&limit=6`
      )
      this.Recommend = data.data
      this.$store.dispatch('setLoading', false)
    } catch (error) {
      this.$store.dispatch('setLoading', false)
      throw error
    }
  }
}
</script>

<style lang="scss" scoped>

@mixin respond($breakpoint) {
  @if ($breakpoint == small) {
    @media (min-width: 393px) {
      @content;
    }
  }
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

.recomendation {
  padding: 15px 18px 8px;
  margin: 0 -16px;
  box-shadow: 0 1px 6px 0 rgb(49 53 59 / 12%);
  background: url('https://storage.caribarang.id/general/Jeffri-8/5480f4a0-214b-4192-a13d-a6a1457f80a3.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @include respond(medium) {
    margin: unset;
    margin-bottom: 16px;
    border-radius: 9px;
  }
  &__title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    &__highlight {
      position: absolute;
      display: flex;
      gap: 9px;
      align-items: center;
      padding: 8px 25px 8px 8px;
      top: -35px;
      margin: 0 -18px;
      background: linear-gradient(90deg, #013a78 27.6%, #277edc 100%);
      box-shadow: 0px 1.55738px 3.11477px rgba(0, 0, 0, 0.12);
      border-radius: 0px 38.9346px 38.9346px 0px;
      border: 0 solid #e64123;
      border-left-width: 1em;
      h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: #ffffff;
        @include respond(medium) {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
