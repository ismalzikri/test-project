<template>
  <div class="">
    <cb-alert title="Informasi Tagihan" icon="fas fa-info-circle" color="primary" class="mb-2">
      <p>
        <strong>PENTING!!!</strong> Tagihan ini adalah estimasi tagihan pertama yang meliputi <strong>Harga produk,  Handling fee, Ongkos kirim</strong> dari alamat seller ke <strong>gudang caribarang.id di China</strong>. Kami akan menagihkan kembali biaya <strong>ongkos kirim dari China ke Indonesia</strong> setelah kami menghitung berat dan volume barang yang kamu order. Untuk info lebih lanjut hubungi admin kami
      </p>
    </cb-alert>
    <div class="bg-white">
      <div class="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div v-if="purchase" class="max-w-xl">
          <h1 class="text-sm font-semibold uppercase tracking-wide text-indigo-600">Pesanan Kamu</h1>
          <div class="flex justify-between items-end">
            <span class="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">No PO {{purchase.invoice}}</span>
            <span v-if="purchase.paid_at"><button class="text-blue-800 pointer-events-auto text-xs" @click="download"><i class="fa fa-arrow-circle-down" aria-hidden="true"></i> Cetak</button></span>
          </div>
          <p v-if="!purchase.paid_at && !purchase.has_expired" class="mt-2 text-sm text-gray-500">Pesanan kamu sudah kami terima, admin kami akan segera menghitungkan HPP dan menghubungi kamu via whatsapp secepatnya. Terima kasih.</p>
          <dl v-if="purchase.paid_at" class="mt-5 text-sm font-bold"><span class="text-green-600">LUNAS</span> </dl>
          <dl v-if="!purchase.paid_at && purchase.has_expired" class="mt-5 text-sm font-bold"><span class="text-orange-600">STATUS EXPIRED</span></dl>
        </div>

        <div class="mt-10 border-t border-gray-200">
          <h2 class="sr-only">Your order</h2>

          <h3 class="sr-only">Items</h3>
          <div v-if="purchase" class="">
            <div v-for="(item,n) in purchase.orders" :key="n" class="py-8 border-b border-gray-200 flex space-x-6">
              <img :src="item.product_cover ? item.product_cover : ''" :alt="item.product_name ? item.product_name :''" class="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40">
              <div class="flex-auto flex flex-col">
                <div>
                  <h4 class="font-medium">
                    <nuxt-link to="" class="text-gray-900">
                      #{{item.order_number}}
                    </nuxt-link>
                  </h4>
                  <p class=" text-sm text-indigo-600">
                    {{item.product_name}}
                  </p>

                  <div class="text-xs sm:text-sm flex flex-col mt-4 text-gray-600">
                    <span class="py-1">Harga Produk Rp {{ item.total_product_price | formatPrice}}</span>
                    <span class="py-1">Ongkir lokal China Rp {{ item.total_warehouse_delivery_fee | formatPrice}}</span>
                    <span class="py-1">Handling fee Rp {{ item.total_handling_fee | formatPrice}}</span>
                  </div>
                  <div class="text-xs sm:text-sm flex flex-col mt-2 text-gray-600">
                    <span class="py-1">Kuantitas: {{item.cart.total_quantity}}</span>
                    <span class="py-1">Metode Pengiriman: <span class="uppercase text-indigo-600">{{item.shipping_method === 'air' ? 'udara' : 'laut' }}</span></span>
                  </div>
                </div>
                <div class="mt-4 flex-1 flex items-end">
                  <dl class="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                    <div class="flex">
                      <dd class="text-gray-700">
                        Rp {{item.subtotal | formatPrice}}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:ml-40 sm:pl-6">
          <h3 class="sr-only">Your information</h3>

          <h4 class="sr-only">Alamat Pengiriman</h4>
          <dl v-if="address" class="w-full text-sm py-10">
            <div>
              <dt class="font-medium text-gray-900">Alamat penerima</dt>
              <dd class="mt-2 text-gray-700">
                <address class="not-italic">
                  <span class="block capitalize">{{address.receiver}} - {{address.phone}}</span>
                  <span class="block">{{address.address}}</span>
                  <span class="block">{{address.district}} {{address.city ? address.city + '-' : ''}} {{address.province}}</span>
                </address>
              </dd>
            </div>
          </dl>

          <h3 class="sr-only">Ringkasan Tagihan</h3>
          <dl v-if="purchase" class="space-y-6 border-t border-gray-200 text-sm py-10">
            <div class="flex justify-between text-xs md:text-sm">
              <dt class="font-medium text-gray-900">Subtotal</dt>
              <dd class="text-gray-700">Rp {{totalProductPrice | formatPrice}}</dd>
            </div>
            <div class="flex justify-between text-xs md:text-sm relative">
              <dt class="font-medium text-gray-900">Estimasi Ongkos Kirim lokal China</dt>
              <dd v-if="totalWarehouseDeliveryFee" class="text-gray-700">Rp {{totalWarehouseDeliveryFee | formatPrice}}</dd>
              <Tooltip v-else title="Estimasi Ongkos Kirim lokal China" content="Biaya pengiriman dari seller ke gudang caribarang.id di China. Biaya ini sedang di hitung oleh admin, kami akan segera menghubungi kamu"/>
            </div>
            <div v-if="totalTransferFee != 0.00 && totalTransferFee != null" class="flex justify-between text-xs md:text-sm">
              <dt class="font-medium text-gray-900">Transfer fee</dt>
              <dd class="text-gray-700">Rp {{totalTransferFee | formatPrice}}</dd>
            </div>
            <div class="flex justify-between text-xs md:text-sm">
              <dt class="font-medium text-gray-900">Handling fee</dt>
              <dd class="text-gray-700">Rp {{totalHandlingFee | formatPrice}}</dd>
            </div>
            <div class="flex justify-between font-bold text-xs md:text-sm">
              <dt class="text-gray-900 uppercase">Estimasi Total Tagihan Pertama</dt>
              <dd class="text-gray-900">Rp {{purchase.amount | formatPrice}}</dd>
            </div>
          </dl>

          <div v-if="purchase && purchase.voucherLog !== null" class="bg-[#FFE7E2] rounded-lg p-3 mt-1 mb-5">
            <span class="text-[#E64123] text-xs">
              Anda telah menggunakan voucher yang akan menggurangi biaya tagihan kedua.
            </span>
          </div>

          <div v-if="purchase && !purchase.has_expired" class="">
            <div v-if="purchase.payment_status === 'PENDING'" class="w-full flex">
              <nuxt-link :to="`/pay/${purchase.paid_by}/payment?invoice=${purchase.invoice}&method=VIRTUAL_ACCOUNT`" class="w-full bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold capitalize text-sm px-10 py-3 rounded text-center shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Selesaikan Pembayaran
              </nuxt-link>
            </div>
            <div v-else id="paymentMethod" class="">
              <div v-if="purchase && purchase.published_at && !purchase.paid_at" class="">
                <h3 class="sr-only">Metode Pembayaran</h3>
                <dl class="space-y-6 border-t border-gray-200 text-sm pt-5">
                  <div class="">
                    <h3 class="text-base font-bold text-gray-900 py-2">Virtual Account</h3>
                    <p class="text-xs text-gray-400">Kamu bisa membayar dengan transfer melalui ATM, Internet Banking & Mobile Banking.</p>
                    <ul class="w-full py-2">
                      <li v-for="(item,index) in virtualAccounts" :key="index" class="flex items-center border-b border-gray-200 justify-between py-1.5">
                        <div class="w-1/2 text-gray-800 font-medium">
                          <nuxt-link :to="`/pay/${item.value}/confirm?invoice=${purchase.invoice}&method=VIRTUAL_ACCOUNT`">{{item.name}}</nuxt-link>
                        </div>
                        <nuxt-link :to="`/pay/${item.value}/confirm?invoice=${purchase.invoice}&method=VIRTUAL_ACCOUNT`" class="w-1/2 flex items-center justify-end">
                          <img class="h-12 w-12 mr-2" :src="item.icon" alt="icon bank">
                          <i class="fas fa-chevron-right text-gray-400"></i>
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </dl>

                <div class="bg-teal-500 rounded-md mt-5">
                  <p class="text-sm text-white px-2 py-2 text-center">
                    <i class="fas fa-info-circle"></i> Segera lakukan pembayaran sebelum tagihan ini expired {{purchase.expired_at ? 'pada' + purchase.expired_at : '' }}
                  </p>
                </div>
              </div>
              <div v-if="!purchase.confirmed_at && !purchase.paid_at" class="">
                <button class="w-full bg-green-500 text-white active:bg-lightBlue-600 font-bold capitalize text-sm px-10 py-3 rounded text-center shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click="toggleConfirm = true ">
                  <i class="fab fa-whatsapp"></i> Chat Admin
                </button>
                <p class="text-xs text-indigo-600 py-2">
                  <i class="fas fa-info-circle"></i> Tekan tombol <strong>'Chat admin'</strong> untuk menghubungi admin kami melalui whatsapp.
                </p>
              </div>
              <div v-if="purchase.confirmed_at && !purchase.published_at && !purchase.paid_at" class="bg-emerald-500 rounded-md">
                <p class="text-sm text-white px-2 py-2">
                  <i class="fas fa-info-circle"></i> Yei..., Orderan kamu sedang di proses oleh admin, mohon tunggu beberapa saat, admin kami akan segera menghubungimu kembali untuk menginfokan total tagihan real dari belanjaan kamu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup
      title="Konfirmasi Order"
      :toggle="toggleConfirm"
      :show-accept-button="true"
      :show-cancel-button="true"
      accept-text="Kirim Pesan"
      cancel-text="Batal"
      @close="toggleConfirm = false"
      @acceptAction="onConfirm"
    >
      <template #popup-body>
        <div class="py-3">
          <label class="block tracking-wide text-gray-700 text-sm mb-1" for="grid-state">
            Pesan
          </label>
          <textarea v-model="message" rows="3" name="address" class="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm: border border-gray-300 rounded-md text-sm"></textarea>
          <p class="py-2 text-indigo-500 font-medium text-xs">
            <i class="fas fa-info-circle"></i> Tidak diperbolehkan untuk mengubah No PO! agar proses pesanan kamu tidak terjadi kesalahan.
          </p>
        </div>
      </template>
    </popup>
  </div>
</template>
<script>
import {virtualAccounts} from '../../helpers/bank.js'
import Popup from '~/components/Basic/Popup.vue'
import CbAlert from '~/components/Basic/Alert.vue'
import Tooltip from '~/components/Basic/Tooltip.vue'
const _ = require('lodash')
export default {
  name:'PurchaseDetail',

  components:{
    Popup,
    CbAlert,
    Tooltip
  },

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      purchase:null,
      address:null,
      totalProductPrice:0,
      totalWarehouseDeliveryFee:0,
      totalHandlingFee:0,
      totalTransferFee:0,
      virtualAccounts,
      toggleConfirm:false,
      message:'',
      phone:'6281119163004'
    }
  },

  async fetch () {
    await Promise.all([this.fetchPurchase()])
  },

  methods:{
    initMessage (invoice) {
      this.message = `Halo admin, mohon proses orderan saya No PO *${invoice}*. terimakasih 🙏😊`
    },
    async fetchPurchase () {
      try {
        this.$store.dispatch('setLoading', true)
        const invoice = this.$route.params.invoice
        const {data} = await this.$axios.$get(`/api/orders/${invoice}`)
        this.$store.dispatch('setLoading', false)
        this.purchase = data
        this.address = data.orders[0].address
        this.totalProductPrice = _.sumBy(data.orders, (x) => parseFloat(x.total_product_price))
        this.totalWarehouseDeliveryFee = _.sumBy(data.orders, (x) => parseFloat(x.total_warehouse_delivery_fee))
        this.totalTransferFee = _.sumBy(data.orders, (x) => parseFloat(x.total_transfer_fee))
        this.totalHandlingFee = _.sumBy(data.orders, (x) => parseFloat(x.total_handling_fee))
        this.initMessage(invoice)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    onConfirm () {
      this.toggleConfirm = false
      this.$router.push(`/purchase/thanks?po=${this.purchase.invoice}`)
      return window.open(`https://api.whatsapp.com/send?phone=${this.phone}&text=${this.message}`)
    },
    download () {
      try {
        const invoice = this.$route.params.invoice
        this.$store.dispatch('setLoading', true)
        window.open(`${this.$axios.defaults.baseURL}/api/orders/${invoice}/download`, '_blank')
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    }
  }
}
</script>
