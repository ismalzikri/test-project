<template>
  <div class="w-full mb-5 mt-8  home-carousel">
    <div v-if="categories.length" class="bg-white shadow-sm rounded-sm">
      <div class="border-b border-gray-100 py-3 px-5">
        <h2 class="text-lg font-medium text-gray-600 uppercase">Kategori</h2>
      </div>
      <VueSlickCarousel v-bind="carousel_setting" class="relative">
        <div v-for="item in categories" :key="item.id" class="relative border-r border-gray-100">
          <nuxt-link
            v-for="(val, n) in item" :key="n" :to="`/categories/${val.slug}`"
            class="flex flex-col px-5 py-8 border-b border-gray-100 hover:shadow-md last:border-0">
            <div class="p-5 relative">
              <div
                class="absolute h-full w-11/12 mx-auto top-0 left-0 bg-contain bg-center bg-no-repeat p-5 py-5"
                :style="`background-image:url(${val.image})`"></div>
            </div>
            <div class="pb-12 relative">
              <p class="text-xs text-gray-600 text-center py-5 absolute capitalize">{{ val.name }}</p>
            </div>
          </nuxt-link>
        </div>
        <template #prevArrow>
          <div class="category-arrow">
            <i class="fas fa-arrow-left"></i>
          </div>
        </template>
        <template #nextArrow>
          <div class="category-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </template>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  name: 'CategoryWidget',

  components: {
    VueSlickCarousel
  },

  data () {
    return {
      carousel_setting: {
        focusOnSelect: false,
        infinite: false,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 1,
        touchThreshold: 5,
        accessibility: false,
        draggable: false,
        swipe: false,
        responsive: [
          {
            breakpoint: 812,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
        ]
      },
      categories: []
    }
  },

  created () {
    this.fetchCategory()
  },

  methods: {
    async fetchCategory () {
      try {
        const { data } = await this.$axios.$get('/api/categories')
        const mapCategory = []
        let items = []
        let number = 1
        for (let index = 0; index < data.length; index++) {
          items.push(data[index])
          if (number % 2 === 0) {
            mapCategory.push(items)
            items = []
          }
          number++
        }
        this.categories = mapCategory
      } catch (error) {
        console.log(error, 'error')
        throw error
      }
    }
  }
}
</script>
<style lang="scss">
.slide-border {
  height: 1px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
