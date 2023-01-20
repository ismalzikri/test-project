<template>
  <div class="w-full flex gap-8">
    <div class="w-[65%] flex flex-col gap-8">
      <div class="box-title p-4">Paket {{ $route.params.id }}</div>
      <div class="bg-white rounded-xl p-4">
        <div v-for="(item, index) in products" :key="index">
          <div class="w-full flex gap-8">
            <div class="w-full flex flex-col items-center">
              <div class="w-80 h-80">
                <video
                  v-show="item.coverType === 'video'"
                  ref="video"
                  controls
                  muted
                  class="mx-auto w-full h-full rounded-xl"
                >
                  <source type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <img
                  v-show="item.coverType === 'image'"
                  ref="cover"
                  class="w-full h-full rounded-xl bg-cover"
                  :src="item.cover"
                  alt="detail-img"
                />
              </div>
              <div v-if="item.images.length > 4" class="mt-5 relative">
                <button
                  class="group px-1 absolute left-0 top-1/2 -translate-y-1/2 rotate-180"
                  @click="prev(index)"
                >
                  <i
                    class="fas fa-angle-right text-lg text-gray-700 group-hover:text-primary-color"
                  ></i>
                </button>
 
                <div class="block w-[330px] px-4">
                  <VueSlickCarousel v-bind="carousel_setting" ref="carousel">
                    <div
                      v-for="(preview, index2) in item.images"
                      :key="index2"
                      class="px-2 py-1 cursor-pointer relative"
                    >
                      <div
                        v-show="preview.type === 'video'"
                        class="relative w-[62px] h-[62px] p-1.5 border border-sky-500 rounded-xl hover:border-[#0E4E9B]"
                        @click="onClickSlider(preview.url, 'video', index)"
                      >
                        <video class="w-full h-full" :src="preview.url"></video>
                        <img
                          class="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          src="/icons/systems/play_button.png"
                          alt="icon-play"
                        />
                      </div>
                      <img
                        v-show="preview.type === 'image'"
                        class="rounded-lg w-full h-full bg-cover ring-1 ring-white hover:ring-primary-color hover:p-1"
                        :src="preview.url"
                        alt="img-list-preview"
                        data-not-lazy
                        @click="onClickSlider(preview.url, 'image', index)"
                      />
                    </div>
                  </VueSlickCarousel>
                </div>
 
                <button
                  class="group px-1 absolute right-0 top-1/2 -translate-y-1/2"
                  @click="next(index)"
                >
                  <i
                    class="fas fa-angle-right text-lg text-gray-700 group-hover:text-primary-color"
                  ></i>
                </button>
              </div>
              <div v-else class="mt-5 flex gap-3 justify-center">
                <div
                  v-for="(preview, index2) in item.images"
                  :key="index2"
                  class="w-14 h-14"
                >
                  <div
                    v-show="preview.type === 'video'"
                    class="relative w-[62px] h-[62px] p-1.5 border border-sky-500 rounded-xl hover:border-[#0E4E9B]"
                    @click="onClickSlider(preview.url, 'video', index)"
                  >
                    <video class="w-full h-full" :src="preview.url"></video>
                    <img
                      class="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      src="/icons/systems/play_button.png"
                      alt="icon-play"
                    />
                  </div>
                  <img
                    v-show="preview.type === 'image'"
                    class="rounded-lg w-full h-full bg-cover"
                    :src="preview.url"
                    alt="img-list-preview"
                    @click="onClickSlider(preview.url, 'image', index)"
                  />
                </div>
              </div>
            </div>
            <div class="w-full">
              <p class="font-semibold text-[20px] leading-6 w-[400px]">
                Shoes Men's Summer Cross-border New Men's Shoes Autumn Student
                Casual Running Shoes Trendy Shoes Men's Sneakers Men's Spot
              </p>
              <div class="mt-8 w-full flex gap-2 bg-[#EFF7FF] rounded-lg p-3">
                <img
                  class="w-3.5 h-3.5"
                  src="/icons/systems/info_primary.png"
                  alt="info-icon"
                />
                <p class="text-[#086DE3] text-xs">
                  Pilih varian yang anda inginkan hingga memenuhi
                  {{ item.moq }} pcs
                </p>
              </div>
              <div>
                <p class="my-7">Pilih varian warna yang Anda inginkan</p>
                <div class="flex flex-wrap items-center gap-4">
                  <div
                    v-for="(variant, variantIndex) in item.variants"
                    :key="variantIndex"
                    :class="
                      item.IndexVariant == variantIndex
                        ? 'border border-[#086DE3] py-0.5 rounded-lg'
                        : ''
                    "
                    class="w-12 h-12"
                  >
                    <img
                      class="w-full rounded-lg h-full cursor-pointer"
                      :src="variant.image"
                      alt="img-variant"
                      @click="
                        onClickVariant(variant, 'image', index, variantIndex)
                      "
                    />
                  </div>
                </div>
              </div>
              <p class="mt-7 mb-6">Pilih varian ukuran yang Anda inginkan</p>
              <!-- <div class="flex flex-col gap-3 overflow-auto max-h-[270px] pr-4">
                <div
                  v-for="(item_variant, idx) in item.variantItems"
                  :key="idx"
                  :class="
                    item.IndexVariantItems === idx
                      ? 'border border-[#086DE3]'
                      : ''
                  "
                  class="w-full flex justify-between gap-3 items-center border border-[#AAAAAA] py-1.5 px-3 rounded-lg cursor-pointer"
                  @click="onClickVariantItems(item_variant, index, idx)"
                >
                  <p
                    class="text-[#747474] py-0.5 text-sm select-none break-all"
                  >
                    {{ item_variant.name }}
                  </p>
                  <div
                    :class="
                      item.IndexVariantItems === idx
                        ? 'border border-[#086DE3]'
                        : 'border-gray-400'
                    "
                    class="w-[100px] border rounded-lg flex items-center px-3"
                  >
                    <div
                      class="font-bold hover:text-[#086DE3] select-none"
                      @click="setCounter('decrement', index, idx)"
                    >
                      -
                    </div>
                    <input
                      v-model="item_variant.quantity"
                      style="box-shadow: none !important"
                      class="w-full text-[#747474] py-1 border-none rounded-md text-sm text-center"
                      type="text"
                      @keypress="$mustNumber"
                    />
                    <div
                      class="font-bold hover:text-[#086DE3] select-none"
                      @click="setCounter('increment', index, idx)"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div> -->
              <div v-for="(item_variant, idx) in item.variantItems" :key="idx">
                <PackageBusinessVariantItems
                  :variantitem="item_variant"
                  :index-product="index"
                  @emitVariantItem="handleVariantItemState"
                />
              </div>
            </div>
          </div>
          <hr class="my-12" />
        </div>
      </div>
    </div>
    <div class="w-[32%] h-[fit-content] bg-white rounded-xl p-5">
      <h2 class="font-semibold">Ringkasan Harga</h2>
      <hr class="my-4" />
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-4">
          <span class="text-[#747474]">Harga Produk x 0</span>
          <span class="text-[#747474]">Biaya konsol</span>
          <span class="text-[#747474] whitespace-nowrap"
          >Ongkir Lokal Indonesia</span
          >
        </div>
        <div class="flex flex-col gap-4 text-right">
          <span class="font-semibold">Rp 2,995,980</span>
          <span class="font-semibold">Rp 100,000</span>
          <div class="flex gap-2 justify-end items-center">
            <span>Rp - </span>
            <img
              class="w-4 h-4"
              src="/icons/systems/info_primary.png"
              alt="info-icon"
            />
          </div>
        </div>
      </div>
      <div class="mt-8 flex gap-2 bg-[#EFF7FF] rounded-lg p-3">
        <img
          class="w-3.5 h-3.5"
          src="/icons/systems/info_primary.png"
          alt="info-icon"
        />
        <p class="text-[#086DE3] text-xs w-[350px]">
          Biaya yang tertera belum termasuk biaya pengiriman dari gudang
          indonesia ke alamat Anda
        </p>
      </div>
      <button
        class="w-full mt-4 py-3.5 rounded-xl text-white bg-[#747474]"
        @click="continuePayment"
      >
        Lanjutkan Pembayaran
      </button>
    </div>
  </div>
</template>
 
<script>
/*
  - fecth API by real data & fix some diffrent property
  - businesess logic post data to BE
  - handle logic when quantity variant item - +  moq / total moq
*/
 
import VueSlickCarousel from 'vue-slick-carousel'
import dummyProducts from '~/helpers/products'
export default {
  components: {
    VueSlickCarousel
  },
 
  data () {
    return {
      finalState: {
        campaign: '',
        category: '',
        package: '',
        products: [
          {
            uuid: '',
            variants: [
              {
                variant_id: '',
                variant_item_id: '',
                quantity: ''
              }
            ]
          }
        ]
      },
 
      carousel_setting: {
        dots: false,
        focusOnSelect: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 5,
        arrows: false
      },
      products: [],
      tempVariantItems: [],
      storeObject: {},
      selectedId: null,
      selectedItem: null
    }
  },
  mounted () {
    this.products = dummyProducts.data.map((product) => {
      product.coverType = 'image'
      product.variantItems = []
      product.IndexVariant = 0
      product.IndexVariantItems = 0
 
      if (product.variants[0].items.length) {
        product.variantItems = product.variants[0].items
      }
 
      return product
    })
 
    this.getProducts()
    this.continuePayment()
    this.setDefaultProducts()
  },
 
  methods: {
    prev (index) {
      this.$refs.carousel[index].prev()
    },
    next (index) {
      this.$refs.carousel[index].next()
    },
 
    setCounter (operator, index, variantIndex) {
      if (operator === 'decrement') {
        if (this.products[index].variantItems[variantIndex].quantity <= 0) {
          this.products[index].variantItems[variantIndex].quantity = 0
        } else {
          this.products[index].variantItems[variantIndex].quantity -= 1
        }
      } else {
        this.products[index].variantItems[variantIndex].quantity += 1
      }
    },
    handleVariantItemState (params) {
      const newObj = {
        variant_id: this.selectedId,
        variant_item_id: params.variant_item_id,
        quantity: params.quantity
      }
 
 
      if (this.tempVariantItems.map(JSON.stringify).includes(JSON.stringify(newObj))) {
        this.tempVariantItems.splice(this.tempVariantItems.indexOf(newObj, 1))
      } else {
        this.tempVariantItems.push(newObj)
      }
 
      this.finalState = {
        ...this.finalState,
        products: this.products.map((_) => {
          return {
            variants: this.tempVariantItems
          }
        })
      }
      console.log(this.finalState)
    },
    onClickVariant (variant, covertype, index, variantIndex) {
      this.products[index].IndexVariant = variantIndex
      this.products[index].coverType = covertype
      this.selectedId = variant.id
      this.$refs.cover[index].src = variant.image.replace('.60x60', '')
 
      if (variant.items.length) {
        this.products[index].variantItems = variant.items
      }
    },
    onClickSlider (url, covertype, index) {
      this.products[index].coverType = covertype
 
      if (covertype === 'video') {
        this.$refs.video[index].src = url
      } else {
        this.$refs.cover[index].src = url
      }
    },
 
    async getProducts () {
      try {
        const resp = await this.$axios.get(
          `api/campaign/paket-usaha-lebaran/category/${this.$route.params.slug}/${this.$route.params.id}`
        )
        console.log(resp.data)
      } catch (error) {
        console.log(error)
      }
    },
 
    setDefaultProducts () {
      this.finalState.products = this.products?.map((item) => {
        const newVariants = {
          variant_id: item.variants[0].id,
          variant_item_id: item.variantItems[0].id,
          quantity: item.variantItems[0].quantity
        }

        return {
          uuid: item.uuid,
          variants: newVariants
        }
      })
    },
 
    continuePayment () {
      const url = new URL(window.location.href)
 
      this.finalState = {
        ...this.finalState,
        campaign: url.pathname.split('/')[2],
        package: this.$route.params.id,
        category: this.$route.params.slug
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.box-title {
  padding: 16px;
  color: white;
  font-size: 22px;
  font-weight: 700;
  text-transform: capitalize;
  background: linear-gradient(
    92.58deg,
    #9f3f1c 0%,
    #e2905e 45.47%,
    #a94b25 100%
  );
  border-radius: 12px;
}
</style>