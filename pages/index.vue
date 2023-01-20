<template>
  <div class="">
    <div v-if="contentType == '1688'" class="mb-2">
      <search-widget />
    </div>

    <div
      v-if="banners.length && contentType == '1688'"
      class="main-banner w-full bg-white rounded-md shadow-md grid grid-cols-1 lg:grid-cols-5 gap-40 p-0 md:p-3"
    >
      <CategorySide class="hidden lg:block" />
      <div class="right md:col-span-4">
        <vue-slick-carousel
          :arrows="true"
          :draggable="false"
          :infinite="true"
          :dots="true"
          :autoplay="true"
          :autoplay-speed="5000"
        >
          <div v-for="item in banners" :key="item.id" class="cursor-pointer">
            <a :href="item.url_action" target="_blank">
              <img
                :src="item.image"
                alt="banner"
                class="right__image w-full rounded-t-md lg:rounded-sm"
              />
            </a>
          </div>
        </vue-slick-carousel>
        <CategoryMobile />
      </div>
    </div>

    <div v-else class="w-full">
      <div
        v-for="item in banners.filter((e) => e.sequence == 2)"
        :key="item.id"
        class="w-full h-full cursor-pointer"
      >
        <a href="https://caribarang.id/events" target="_blank">
          <img class="w-full rounded-md" :src="item.image" alt="Banner" />
        </a>
      </div>
    </div>

    <div v-if="contentType == '1688'" class="w-full mt-14">
      <MediumHomeBusinessPackage/>
      <MediumRecommendSection />
      <!-- <MediumHomeProduct-christmas /> -->
      <MediumHomeChineseNewYear />

      <h2 class="title py-5">Produk Terbaru</h2>
      <div class="grid gap-2 grid-cols-2 sm:grid-cols-4 gap-x-6 lg:grid-cols-6">
        <product-card
          v-for="(item, index) in newArrival"
          :key="index"
          :name="item.name"
          :moq="item.moq"
          :seller="item.seller ? item.seller.name : '-'"
          :image="item.cover"
          :price="item.price"
          :link="`/products/${item._id}`"
        ></product-card>
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

    <div
      v-else
      class="relative flex w-screen left-1/2 -translate-x-1/2 -mb-14 -mt-14 h-[92vh]"
    >
      <img
        width="1440"
        height="798.91"
        src="https://storage.caribarang.id/general/Jeffri-8/83d1198e-c89d-4f3e-8ede-aa9dbe417f4f.webp"
        alt="background cover produk lokal indonesia caribarang.id"
        class="h-[550px] md:h-[93vh] my-auto mx-auto"
      />

      <img
        width="579"
        height="217"
        class="absolute left-1/2 -translate-x-1/2 top-[45%] -translate-y-1/2"
        src="https://storage.caribarang.id/general/Jeffri-8/8ebcf850-ef98-48ad-87b4-d8ec51b888b9.webp"
        alt="background cover produk lokal indonesia caribarang.id"
      />
    </div>
    <div v-if="showPopup">
      <MediumPopup :url="url" :action="urlAction" @close="triggerPopup" />
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
// import ProductCard from '../components/Basic/ProductCard.vue'
import CategorySide from '../components/Widget/CategorySide.vue'
import CategoryMobile from '../components/Widget/CategoryMobile.vue'
import meta from '~/helpers/meta.js'
import SearchWidget from '~/components/Widget/Search.vue'
export default {
  name: 'IndexPage',

  components: {
    // 'product-card': ProductCard,
    'vue-slick-carousel': VueSlickCarousel,
    SearchWidget,
    CategorySide,
    CategoryMobile
  },

  middleware ({ store, redirect }) {
    if (store.state.auth.loggedIn && !store.state.auth.user.phone) {
      return redirect('/profile/edit')
    }
  },

  data () {
    return {
      newArrival: [],
      Recommend: [],
      banners: [],
      categories: [],
      url: '',
      urlAction: '',
      pageNewArrival: 1,
      showPopup: false,
      showButtonMore: false
    }
  },

  async fetch () {
    await Promise.all([this.fetchNewArrival(true)])
  },

  head () {
    return {
      title: 'caribarang.id | Platform sourcing barang lokal dan luar negeri',
      meta: meta(
        'https://caribarang.id',
        'caribarang.id | Platform sourcing barang lokal dan luar negeri',
        'Platform sourcing barang End-to-End dari China langsung dari pabrik. Dapatkan barang dagangan impor termurah dari supplier tangan pertama terbaik lewat Caribarang.id'
      )
    }
  },

  computed: {
    ...mapState({
      contentType: (state) => state.contentType
    })
  },

  watchQuery (newQuery, oldQuery) {
    const contentType = newQuery.product ? newQuery.product : '1688'
    this.$store.dispatch('setContentType', contentType)
  },

  mounted () {
    // this.fethPopup()
    // this.initContent()
    // this.fetchBanners()
  },

  methods: {
    triggerPopup () {
      Cookies.set(`home-modal-closed-${this.url}`, this.url, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
        secure: false // => set time for 1 hour.
      })

      this.showPopup = false
      this.url = ''
      this.urlAction = ''
    },

    initContent () {
      const route = this.$route.query
      if (typeof route.product !== 'undefined') {
        this.$store.dispatch('setContentType', route.product)
      }
    },

    async fethPopup () {
      try {
        const resp = await this.$axios.get('api/homepage/popup')

        if (resp.data.data.length) {
          const arr = resp.data.data

          // filter only squence 1 show at the first time user visited

          for (const popup of arr) {
            if (Cookies.get(`home-modal-closed-${popup.image}`)) {
              continue
            }

            this.showPopup = true
            this.url = popup.image
            this.urlAction = popup.url_action
            break
          }
        } else {
          this.showPopup = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    async fetchNewArrival (firstFetch = false) {
      try {
        if (!firstFetch) {
          this.pageNewArrival = this.pageNewArrival + 1
        }
        this.$store.dispatch('setLoading', true)
        const { data, meta } = await this.$axios.$get(
          `/api/products?page=${this.pageNewArrival}`
        )
        this.$store.dispatch('setLoading', false)
        const productData = data
        const totalItems = meta.total
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
    },

    async fetchBanners () {
      try {
        this.$store.dispatch('setLoading', true)
        const { data } = await this.$axios.$get('/api/banners')
        this.banners = data
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    }
  }
}
</script>

<style lang="scss">
//  two diffrent mixin contains for reusable responsive breakpoint & keyframes with webkit responsive browser

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

@mixin keyframes-animation($name) {
  @-webkit-keyframes #{$name} {
    @content;
  }
  @keyframes #{$name} {
    @content;
  }
}

@mixin prefix-property($name, $value) {
  -webkit-#{$name}: $value;
  #{$name}: $value;
}

@include keyframes-animation(slide-in-right) {
  from {
    @include prefix-property(transform, translateX(-100%));
  }
  to {
    @include prefix-property(transform, translateX(0%));
  }
}

@include keyframes-animation(slide-in-left) {
  from {
    @include prefix-property(transform, translate(100%, 0));
  }
  to {
    @include prefix-property(transform, translate(0, 0));
  }
}

.main {
  &-banner {
    height: 16.5rem;

    @include respond(medium) {
      height: 24.5rem;
    }
    @include respond(large) {
      height: 25.5rem;
    }

    .right {
      &__image {
        height: 160px;
        @include respond(medium) {
          height: 275px;
        }
        @include respond(large) {
          height: 100%;
        }
      }
      &:hover {
        .slick {
          &-next {
            transform: unset;
            animation: slide-in-right 800ms;
            @include respond(large) {
              display: block !important;
            }
          }

          &-prev {
            transform: unset;
            animation: slide-in-left 800ms;
            @include respond(large) {
              display: block !important;
            }
          }
        }
      }
    }
  }
}

.slick {
  &-dots {
    bottom: -18px;
    display: none !important;

    @include respond(large) {
      display: block !important;
      bottom: -18px !important;
    }
  }
  &-next {
    display: none !important;
    right: 22px !important;
    top: 48% !important;
    &::before {
      font-size: 32px !important;
    }
  }
  &-prev {
    display: none !important;
    z-index: 1;
    left: 10px !important;
    top: 45% !important;
    &::before {
      font-size: 32px !important;
    }
  }
}

.wrap {
  gap: 20px;
  padding: 16px;
  display: flex;
  margin: 0 -16px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: auto hidden;

  @include respond(medium) {
    gap: 25px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
  width: 170px;
  margin-bottom: unset;
  border-radius: 9px;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 6px 0px;
  @include respond(medium) {
    width: 176px;
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
