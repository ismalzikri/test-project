<template>
  <div>
    <div class="border-b border-gray-200 pb-10">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
        {{ name }}
      </h1>
    </div>
    <div class="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      <aside>
        <h2 class="sr-only">Filters</h2>

        <button
          type="button"
          class="inline-flex items-center lg:hidden"
          @click="toggleMobileMenu = !toggleMobileMenu"
        >
          <span class="text-sm font-medium text-gray-700">Filters</span>
          <svg
            class="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="hidden lg:block">
          <form class="divide-y divide-gray-200 space-y-10">
            <div class="">
              <fieldset>
                <legend class="block text-sm font-medium text-gray-900">
                  Kategori Terkait
                </legend>
                <div
                  v-for="item in childrens"
                  :key="item.id"
                  class="pt-6 space-y-3"
                >
                  <div class="flex items-center">
                    <input
                      :value="item.id"
                      name="category[]"
                      type="checkbox"
                      class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      :checked="item.id === parseInt(subcategoryId)"
                      @change="onSetSubcategory"
                    />
                    <label for="category-0" class="ml-3 text-sm text-gray-600">
                      {{ item.name }}
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </aside>

      <section
        aria-labelledby="product-heading"
        class="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
      >
        <h2 id="product-heading" class="sr-only">Products</h2>

        <div
          class="grid grid-cols-2 gap-2 sm:grid-cols-3 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-5"
        >
          <product-card
            v-for="(item, index) in products"
            :key="index"
            :name="item.name"
            :moq="item.moq"
            :seller="item.seller ? item.seller.name : '-'"
            :image="item.cover"
            :price="item.price"
            :link="`/products/${item._id}`"
          ></product-card>
        </div>
        <div v-if="!products.length && !firstLoader" class="w-full text-center">
          <p class="text-xl font-bold text-gray-700">Maaf!</p>
          <p class="text-sm text-gray-600 font-bold">
            Saat ini produk di kategori ini belum tersedia, kami akan segera
            menyediakan nya.
          </p>
        </div>

        <div v-show="showButtonMore" class="w-full flex justify-center mt-2">
          <button
            class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize"
            @click="fetchProduct"
          >
            Tampilkan Lainnya
          </button>
        </div>
      </section>
    </div>

    <mobile-filter
      :open="toggleMobileMenu"
      :category="childrens"
      @close="toggleMobileMenu = false"
      @onSelected="onSetSubcategory"
    />
  </div>
</template>
<script>
import ProductCard from '~/components/Basic/ProductCard.vue'
import MobileFilter from '~/components/MobileFilter.vue'
import metaConfig from '~/helpers/meta.js'

export default {
  name: 'CategorySlug',

  components: {
    ProductCard,
    MobileFilter
  },

  async asyncData ({ route, $axios }) {
    try {
      const categoryId = route.params.id
      const { data } = await $axios.$get(`/api/categories/${categoryId}`)
      const meta = metaConfig(
        `/categories/${categoryId}`,
        data.name,
        `Caribarang category - ${data.name}`,
        data.image
      )

      return {
        categoryId: data.id,
        name: data.name,
        cover: data.image,
        childrens: data.children,
        meta,
        title: data.name
      }
    } catch (error) {}
  },

  data () {
    return {
      categoryId: '',
      subcategoryId: '',
      name: '',
      cover: '',
      childrens: [],
      products: [],
      showButtonMore: false,
      firstLoader: true,
      page: 1,
      subcategoryArray: [],
      toggleMobileMenu: false,
      title: ''
    }
  },

  head () {
    return {
      title: `${this.title} | caribarang.id`,
      meta: this.meta
    }
  },

  mounted () {
    if (this.$route.query) {
      this.onSetSubcategory({
        target: { value: this.$route.query.children }
      })
    }
  },

  methods: {
    async fetchProduct () {
      try {
        this.$store.dispatch('setLoading', true)

        const { data, meta } = await this.$axios.$get(
          `/api/products?filter[category_id]=${this.categoryId}&filter[subcategory_id]=${this.subcategoryId}&page=${this.page}`
        )
        this.$store.dispatch('setLoading', false)

        this.page = this.page + 1
        if (this.firstLoader) {
          this.products = data
        } else {
          this.products.push(...data)
        }
        this.firstLoader = false
        this.showButtonMore = meta.total !== this.products.length
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    onSetSubcategory (e) {
      const value = e.target.value
      const index = this.subcategoryArray.findIndex(
        (x) => parseInt(x) === parseInt(value)
      )
      if (this.subcategoryArray.includes(value)) {
        this.subcategoryArray.splice(index, 1)
      } else {
        this.subcategoryArray.push(value)
      }

      this.subcategoryId = this.subcategoryArray.join(',')
      this.page = 1
      this.firstLoader = true
      this.toggleMobileMenu = false
      return this.fetchProduct()
    }
  }
}
</script>
