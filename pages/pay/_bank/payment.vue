<template>
  <div class="max-w-5xl mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-8">
    <div v-if="expired_at" class="w-full">
      <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-Sky-500 text-center md:text-left">
        <span class="text-sm inline-block mr-5 align-middle">
          <i class="far fa-bell"></i>
        </span>
        <span class="inline-block align-middle mr-8">
          <b class="capitalize">Info!</b> Bayar sebelum kedaluwarsa pada

          <no-ssr>
            <vac :start-time="start_time" :end-time="new Date(expired_at).getTime() + 60000">
              <span
                slot="process"
                slot-scope="{ timeObj }"
                class="font-bold text-gray-800">{{ `${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
              <span slot="finish">Selesai!</span>
            </vac>
          </no-ssr>
        </span>
      </div>
    </div>
    <h1 class="text-xl py-3 font-bold text-gray-900"><span class="uppercase">{{bank}}</span> Virtual Account</h1>
    <div class="grid md:grid-cols-3">
      <div class="md:col-span-2 mb-5 md:mb-0">
        <div class="bg-white px-2 md:px-5 py-6 rounded-md">
          <h2 class="text-base text-gray-600 font-medium py-2">Silahkan transfer ke</h2>
          <ul class="w-full border border-gray-200 bg-gray-100">
            <li class="flex flex-col border-b border-gray-200 py-2 px-4 relative">
              <div class="text-gray-400 text-xs absolute top-1">Virtual Account</div>
              <div class="flex items-center justify-between">
                <span class="text-gray-900 text-left text-sm uppercase">{{bank}}</span>
                <div class="flex justify-end">
                  <img class="w-14 rounded-full" :src="`/img/${icon}`" :alt="icon">
                </div>
              </div>
            </li>
            <li class="flex flex-col border-b border-gray-200 py-2 px-4 relative">
              <div class="text-gray-400 text-xs absolute top-1">No virtual account</div>
              <div class="flex items-center justify-between py-2 mt-1">
                <span ref="virtual_number" class="text-gray-900 text-left text-sm">{{payload ? payload.account_number : '-'}}</span>
                <div class="flex justify-end">
                  <a href="javascript:;" class="text-indigo-600 text-xs pr-2 uppercase" @click="onCopy('account')">Salin</a>
                </div>
              </div>
            </li>
            <li class="flex flex-col border-b border-gray-200 py-2 px-4 relative">
              <div class="text-gray-400 text-xs absolute top-1">Total Pembayaran</div>
              <div class="flex items-center justify-between py-2 mt-1">
                <span class="text-indigo-700 text-left text-sm font-medium">Rp {{payload ? payload.expected_amount : 0 | formatPrice}}</span>
                <div class="flex justify-end">
                  <a href="javascript:;" class="text-indigo-600 text-xs pr-2 uppercase" @click="onCopy('amount')">Salin</a>
                </div>
              </div>
            </li>
          </ul>

          <div class="pt-5">
            <p class="text-base font-medium text-gray-800">Cara Pembayaran</p>
          </div>

          <ul class="w-full pt-3">
            <li v-for="(item,index) in howToPay" :key="index" class="border border-gray-200 mb-3">
              <a href="javascript:;" class="grid grid-cols-2 text-xs text-gray-800 py-2.5 px-3 rounded-sm" @click="item.collapse = !item.collapse">
                <span>{{item.name}}</span>
                <i class="fas fa-chevron-down text-right"></i>
              </a>
              <ul v-show="item.collapse" class="w-full pb-2.5 px-3 text-xs text-gray-500 list-disc ml-3 pr-3">
                <li v-for="(val, n) in item.lists" :key="n">{{val}}</li>
              </ul>
            </li>
          </ul>

          <div v-if="invoice" class="w-full flex flex-col md:flex-row justify-end pt-3">
            <button class="bg-gray-100 text-gray-600 active:bg-gray-200 font-medium capitalize text-sm px-5 md:px-10 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:mb-0 hidden" type="button">
              Ganti Metode pembayaran
            </button>
            <a
              v-if="order"
              :href="`/purchase/order/${order.order_number}#secondBill`"
              class="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-medium capitalize text-sm px-5 md:px-10 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Lihat Detail Tagihan
            </a>
            <a
              v-else
              :href="`/purchase/${invoice}`"
              class="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-medium capitalize text-sm px-5 md:px-10 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Lihat Detail Pesanan
            </a>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="w-full md:w-11/12 mx-auto bg-white shadow-sm px-5 py-6 rounded-md">
          <div class="flex items-center border-b border-gray-200 pb-3">
            <i class="fas fa-file-invoice-dollar text-4xl text-lightBlue-600"></i>
            <div class="flex flex-col pl-5">
              <span class="font-bold text-xs text-gray-600 py-1">No Invoice</span>
              <span class="font-bold text-xs text-gray-800">{{invoice}}</span>
            </div>
          </div>
          <ul class="w-full pt-2">
            <li class="grid grid-cols-2">
              <span class="text-left text-sm font-semibold text-gray-800">Total Tagihan</span>
              <span class="text-right text-sm font-semibold text-indigo-600">Rp {{payload ? payload.expected_amount : 0 | formatPrice}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'PaymentPage',

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      icon:'',
      bank:'',
      howToPay:null,
      payload:null,
      invoice:'',
      expired_at:null,
      start_time:null,
      typeBill:null,
      order:null
    }
  },

  created () {
    this.fetchHowToPay()
    this.fetchInvoice()
  },

  methods:{
    async fetchHowToPay () {
      try {
        const bank = this.$route.params.bank
        const how = await this.$axios.$get(`/api/payment-methods/how-to-pay/${bank}`)
        this.howToPay = how.methods.map((x, i) => {
          x.collapse = false
          return x
        })
        this.icon = how.icon
        this.bank = bank
      } catch (error) {
        console.log(error.message)
        throw error
      }
    },

    async fetchInvoice () {
      try {
        const invoiceId = this.$route.query.invoice
        this.typeBill =  invoiceId.includes('DTS') ? 'FIRST_BILL' : 'SECOND_BILL'
        if (!invoiceId) return this.$nuxt.error({ statusCode: 404, message: 'Invalid invoice id' })
        this.$store.dispatch('setLoading', true)

        const {data} = await this.$axios.$get(`api/orders/bill/${invoiceId}/bill`)
        this.$store.dispatch('setLoading', false)
        if (!data.payment_log || data.payment_status !== 'PENDING') {
          if (this.typeBill === 'FIRST_BILL') return this.$router.push(`/purchase/${data.invoice}`)
          if (this.typeBill === 'SECOND_BILL') return this.$router.push(`/purchase/order/${data.invoice}#secondBill`)
        }
        this.payload = data.payment_log.payload
        this.invoice = data.invoice
        this.expired_at = data.expired_at
        this.start_time = data.now
        this.order = typeof data.order !== 'undefined' ? data.order : null
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    onCopy (type) {
      if (type === 'account') {
        navigator.clipboard.writeText(this.payload.account_number)
      } else {
        navigator.clipboard.writeText(this.payload.expected_amount)
      }
      alert('Berhasil di salin')
    }
  }
}
</script>
