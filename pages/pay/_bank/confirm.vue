<template>
  <div class="max-w-5xl mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-8">
    <a href="javascript:;" class="mb-3 text-lightBlue-600 text-sm font-semibold hover:text-lightBlue-800" @click="$router.go(-1)"><i class="fas fa-arrow-left"></i> Metode Pembayaran</a>
    <h1 class="text-xl py-3 font-bold text-gray-900"><span class="uppercase">{{bank}}</span> Virtual Account</h1>
    <div class="grid md:grid-cols-3">
      <div class="md:col-span-2 mb-5 md:mb-0">
        <div class="bg-white px-5 py-6 rounded-md">
          <ul class="w-full border border-gray-200 bg-gray-100">
            <li class="grid grid-cols-2 border-b border-gray-200 py-2 px-4">
              <span class="text-gray-500 text-left text-sm">Harga</span>
              <span class="text-gray-600 text-right text-sm">Rp {{invoice ? invoice.amount : 0 | formatPrice}}</span>
            </li>
            <li class="grid grid-cols-2 py-2 px-4">
              <span class="text-gray-800 font-medium text-left text-sm">Total Tagihan</span>
              <span class="text-indigo-600 font-medium text-right text-sm">Rp {{invoice ? invoice.amount : 0 | formatPrice}}</span>
            </li>
          </ul>

          <div class="pt-3">
            <img class="h-14 w-14 rounded-full mr-2" :src="`/img/${bank}-icon.png`" :alt="bank">
          </div>

          <div class="border-b border-gray-200 py-3">
            <h3 class="text-sm text-gray-700 font-medium capitalize mb-2">Informasi penting</h3>
            <ul class="w-full list-disc ml-3">
              <li class="text-gray-600 text-xs py-0.5">Hanya berlaku dengan menggunakan akun <span class="uppercase">{{bank}}</span>, pembayaran dengan akun bank lain tidak akan di proses</li>
              <li class="text-gray-600 text-xs py-0.5">Pastikan nomor Virtual Account kamu sesuai dengan instruksi pembayaran</li>
              <li class="text-gray-600 text-xs py-0.5">Pastikan kembali nominal pembayaran kamu sesuai dengan pemesanan yang kamu lakukan</li>
            </ul>
          </div>

          <div class="w-full">
            <p class="text-xs text-gray-500 py-2">Dengan menekan tombol, Kamu telah menyetujui
              <a href="#" target="_blank" class="text-indigo-600">Syarat & Ketentuan</a> dan
              <a href="/page/privacy" target="_blank" class="text-indigo-600"> Kebijakan Privasi</a> caribarang.id
            </p>
          </div>

          <div class="w-full flex justify-end">
            <div class="mt-3">
              <button class="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold capitalize text-sm px-10 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="processPay">
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="w-full md:w-11/12 mx-auto bg-white shadow-sm px-5 py-6 rounded-md">
          <div class="flex items-center border-b border-gray-200 pb-3">
            <i class="fas fa-file-invoice-dollar text-4xl text-lightBlue-600"></i>
            <div class="flex flex-col pl-5">
              <span class="font-bold text-xs text-gray-600 py-1">No Invoice</span>
              <span class="font-bold text-xs text-gray-800">{{invoice ? invoice.invoice : '-'}}</span>
            </div>
          </div>
          <ul class="w-full pt-2">
            <li class="grid grid-cols-2">
              <span class="text-left text-sm font-semibold text-gray-800">Total Tagihan</span>
              <span class="text-right text-sm font-semibold text-indigo-600">Rp {{invoice ? invoice.amount : 0 | formatPrice}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'ConfirmPay',

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      bank:'',
      invoice:null
    }
  },

  created () {
    this.initPayment()
    this.fetchInvoice()
  },

  methods:{
    initPayment () {
      const paymentType = this.$route.params.bank
      this.bank = paymentType
    },

    async fetchInvoice () {
      try {
        const invoiceId = this.$route.query.invoice
        if (!invoiceId) return   this.$nuxt.error({ statusCode: 404, message: 'Invalid invoice id' })
        this.$store.dispatch('setLoading', true)

        const {data} = await this.$axios.$get(`api/orders/bill/${invoiceId}/bill`)
        this.$store.dispatch('setLoading', false)
        this.invoice = data
        this.invoice = data
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error.messafe)
        throw error
      }
    },

    async processPay () {
      try {
        this.$store.dispatch('setLoading', true)
        const method = this.$route.query.method
        const params = {
          invoice: this.invoice.invoice,
          payment_method:method,
          bank_code:this.bank.toUpperCase()
        }

        const {message, status} = await this.$axios.$post('/api/payments', params)
        this.$store.dispatch('setLoading', false)
        if (!status) return this.$swal.fire(
          'Error!',
          message,
          'danger'
        )
        return this.$router.push(`/pay/${this.bank}/payment?invoice=${this.invoice.invoice}&method=${method}`)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error.messafe)
        throw error
      }
    }
  }
}
</script>
