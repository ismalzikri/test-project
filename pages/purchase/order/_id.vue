<template>
  <div class="bg-gray-50">
    <div class="max-w-2xl mx-auto pt-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
        <div v-if="order" class="flex sm:items-baseline sm:space-x-4">
          <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Pesanan <span class="underline">{{order.order_number}}</span></h1>
          <nuxt-link :to="`/purchase/${order.invoice.invoice}`" class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block">Lihat invoice</nuxt-link>
        </div>
        <p class="text-sm text-gray-600">Tanggal Transaksi <time datetime="2021-03-22" class="font-medium text-gray-900">{{order ? order.created_at : '-' | formatDate }}</time></p>
        <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden">Lihat invoice<span aria-hidden="true"> &rarr;</span></a>
      </div>

      <!-- Products -->
      <div class="mt-6">
        <h2 class="sr-only">Products purchased</h2>

        <div v-if="order" class="space-y-8">
          <div class="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg">
            <div class="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
              <div class="sm:flex lg:col-span-7">
                <div class="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                  <img :src="order.product_cover" :alt="order.product_name ? order.product_name : ''" class="w-full h-full object-center object-cover sm:w-full sm:h-full">
                </div>

                <div class="mt-6 sm:mt-0 sm:ml-6">
                  <h3 class="text-base font-medium text-gray-900">
                    <nuxt-link class="hover:text-indigo-600" :to="`/products/${order.cart.product_uuid}`" :title="order.product_name">{{order.product_name | readmore}}</nuxt-link>
                  </h3>
                  <p class="mt-2 text-sm font-medium text-gray-900">Rp {{ order.total_product_price | formatPrice }} </p>
                  <p class="mt-2 text-sm font-medium text-gray-900"><span class="text-gray-500">Kuantitas {{ order.cart.total_quantity }}</span></p>
                  <div v-if="order.cart.items.length" class="">
                    <p class="mt-2 text-sm font-medium text-gray-900">Varian</p>
                    <p class="mt-1 text-xs text-gray-500">
                      <span v-for="(val, i) in order.cart.items" :key="i">
                        {{val.variant_item_name}} x {{val.quantity}} <span v-if="order.cart.items.length !== (i + 1)">,</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-6 lg:mt-0 lg:col-span-5">
                <dl class="flex md:justify-end text-sm">
                  <div>
                    <dt class="font-medium text-gray-900">Info Pengiriman</dt>
                    <div v-if="order1688">
                      <div class="mt-2 flex items-center justify-between">
                        <dt class="text-gray-500">Kurir</dt>
                        <dd class="text-gray-900">{{order1688.courier}}</dd>
                      </div>
                      <div class="mt-2 flex items-center justify-between">
                        <dt class="text-gray-500">No Resi</dt>
                        <dd class="text-gray-900">{{order1688.receipt_no}}</dd>
                      </div>
                    </div>
                    <dd class="mt-3 text-gray-500">
                      <span class="block">{{order.address.receiver}} - {{order.address.phone}}</span>
                      <span class="block">{{order.address.address}}</span>
                      <span class="block">{{order.address.city ? order.address.city + ',' : ''}} {{order.address.province}}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div class="flex sm:justify-end pb-4 px-4 sm:px-6 lg:gap-x-8 sm:-mt-4">
              <a href="javascript:;" class="text-xs font-medium text-indigo-600 hover:text-indigo-500 sm:block" @click="toggleOrderStatus = true">Lihat Detail Transaksi</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing -->
      <div v-if="order" class="mt-16">
        <h2 class="sr-only">Ringkasan Tagihan Pertama</h2>
        <div class="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <dl class="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div class="w-full">
              <dt class="font-bold text-gray-900 uppercase">Tagihan Pertama</dt>
              <div class="mt-3">
                <dd v-if="order.paid_at" class="-ml-4 -mt-4 flex flex-wrap">
                  <div class="ml-4 mt-4 flex-shrink-0">
                    <i class="fas fa-credit-card text-gray-400"></i>
                  </div>
                  <div class="ml-4 mt-4">
                    <p class="text-green-600">Pembayaran Diterima</p>
                    <p class="text-gray-600 text-xs">{{order.invoice.paid_by}}</p>
                    <p class="text-gray-600 text-xs">{{order.invoice.paid_at}}</p>
                  </div>
                </dd>
                <dd v-else class="-ml-4 -mt-4 flex flex-wrap">
                  <div class="ml-4 mt-4 flex-shrink-0">
                    <span v-if="order.invoice.has_expired" class="text-red-600 font-medium">Order expired</span>
                    <span v-else class="text-orange-600 font-medium">Menunggu pembayaran</span>
                  </div>
                </dd>
              </div>
            </div>
          </dl>

          <dl v-if="order" class="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
            <div class="py-4 flex items-center justify-between">
              <dt class="text-gray-600">Harga Produk</dt>
              <dd class="font-medium text-gray-900">Rp {{order.total_product_price | formatPrice}}</dd>
            </div>
            <div class="py-4 flex items-center justify-between">
              <dt class="text-gray-600">Estimasi Ongkos Kirim lokal China</dt>
              <dd class="font-medium text-gray-900">Rp {{order.total_warehouse_delivery_fee | formatPrice}}</dd>
            </div>
            <div v-if="order.total_transfer_fee !== 0" class="py-4 flex items-center justify-between">
              <dt class="text-gray-600">Transfer fee</dt>
              <dd class="font-medium text-gray-900">Rp {{order.total_transfer_fee | formatPrice}}</dd>
            </div>
            <div class="py-4 flex items-center justify-between">
              <dt class="text-gray-600">Handling fee</dt>
              <dd class="font-medium text-gray-900">Rp {{order.total_handling_fee | formatPrice}}</dd>
            </div>
            <div class="pt-4 flex items-center justify-between">
              <dt class="font-medium text-gray-900">TOTAL</dt>
              <dd class="font-medium text-indigo-600">Rp {{order.subtotal | formatPrice}}</dd>
            </div>
            <div v-if="!order.invoice.has_expired && !order.paid_at" class="w-full pt-5">
              <nuxt-link :to="`/purchase/${order.invoice.invoice}#paymentMethod`" class="block text-center bg-lightBlue-500 w-full text-white active:bg-lightBlue-600 font-bold capitalize text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Bayar Sekarang
              </nuxt-link>
            </div>
          </dl>
        </div>
      </div>

      <div id="secondBill" ref="secondBill" class="">
        <div v-if="order && order.bill" class="mt-10">
          <h2 class="sr-only">Ringkasan Tagihan kedua</h2>
          <div class="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8" :class="[secondBill ? ' border-2 border-lightBlue-400' : '']">
            <dl class="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
              <div class="w-full">
                <dt class="font-bold text-gray-900 uppercase">Tagihan Kedua</dt>
                <div class="mt-3">
                  <dd v-if="order.bill.paid_at" class="-ml-4 -mt-4 flex flex-wrap">
                    <div class="ml-4 mt-4 flex-shrink-0">
                      <i class="fas fa-credit-card text-gray-400"></i>
                    </div>
                    <div class="ml-4 mt-4">
                      <p class="text-green-600">Pembayaran Diterima</p>
                      <p class="text-gray-600 text-xs">{{order.invoice.paid_by}}</p>
                      <p class="text-gray-600 text-xs">{{order.invoice.paid_at}}</p>
                    </div>
                  </dd>
                  <dd v-else class="-ml-4 -mt-4 flex flex-wrap">
                    <div class="ml-4 mt-4 flex-shrink-0">
                      <span class="text-orange-600 font-medium">Menunggu pembayaran</span>
                    </div>
                  </dd>
                </div>
              </div>
            </dl>
            <dl class="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
              <div v-for="(item,index) in order.bill.items.filter((x) => x.name !== 'Original Amount')" :key="index" class="py-4 flex items-center justify-between">
                <dt class="text-gray-600 capitalize">{{item.name}}</dt>
                <dd class="font-medium text-gray-900">Rp {{item.amount | formatPrice}}</dd>
              </div>
              <div class="py-4 flex items-center justify-between">
                <dt class="font-medium text-gray-900">TOTAL</dt>
                <dd class="font-medium text-indigo-600">Rp {{order.bill.amount | formatPrice}}</dd>
              </div>
              <div v-if="!order.bill.paid_at" class="w-full pt-5">
                <div v-if="!order.bill.payment_log || order.bill.has_expired" class="">
                  <virtualAccount :invoice="order.bill.invoice"/>
                </div>
                <div v-else>
                  <nuxt-link :to="`/pay/${order.bill.paid_by}/payment?invoice=${order.bill.invoice}&method=VIRTUAL_ACCOUNT`" class="block text-center bg-lightBlue-500 w-full text-white active:bg-lightBlue-600 font-bold capitalize text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Lanjutkan Pembayaran
                  </nuxt-link>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <popup
      title="Detail Transaksi"
      :toggle="toggleOrderStatus"
      :show-cancel-button="true"
      cancel-text="Tutup"
      @close="toggleOrderStatus = false"
    >
      <template #popup-body>
        <div class="py-3 sm:px-8">
          <div class="mt-6 flow-root">
            <ul role="list" class="">
              <li v-for="(item, index) in statuses" :key="index">
                <div class="relative pb-8">
                  <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div class="relative flex space-x-3">
                    <div>
                      <span class="h-8 w-8 rounded-full bg-green-400 flex items-center justify-center ring-8 ring-white">
                        <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>

                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-xs text-gray-500">{{item.name}}</p>
                      </div>
                      <div class="text-right text-xs whitespace-nowrap text-gray-500">
                        <time datetime="2020-09-20">{{item.created_at | formatDateString}}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </popup>
  </div>
</template>
<script>
import virtualAccount from '~/components/VirtualAccount.vue'
import Popup from '~/components/Basic/Popup.vue'
export default {
  name:'OrderDetail',

  components:{
    virtualAccount,
    Popup
  },

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      order:null,
      secondBill:false,
      statuses:[],
      toggleOrderStatus:false,
      order1688:null
    }
  },

  mounted () {
    this.fetchOrder()
  },

  methods:{
    async fetchOrder () {
      try {
        this.$store.dispatch('setLoading', true)
        const orderNumber = this.$route.params.id
        const {data} = await this.$axios.$get(`/api/orders/items/${orderNumber}`)
        this.statuses = data.statuses
        this.$store.dispatch('setLoading', false)
        this.order = data
        this.order1688 = data.order1688
        setTimeout(() => {
          this.scrollToElement()
        }, 1000)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    scrollToElement () {
      const hash = this.$route.hash
      if (typeof hash !== 'undefined' && hash === '#secondBill') {
        this.secondBill = true
        const el = this.$refs.secondBill
        if (el) {
          el.scrollIntoView({behavior: 'smooth'})
        }
      }
    }
  }
}
</script>
