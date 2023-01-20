<template>
  <div class="bg-white overflow-hidden sm:rounded-md">
    <div class="max-w-5xl mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
      <h1 class="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl mb-8">Riwayat tagihan kedua</h1>
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="(item,index) in bills" :key="index">
          <nuxt-link :to="`/purchase/order/${item.order.order_number}#secondBill`">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p class="text-sm font-medium text-indigo-600 truncate">#{{item.invoice}}</p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      <i class="fas fa-money-bill mr-2 text-gray-500"></i>
                      <span class="truncate">No Pesanan {{item.order.order_number}}</span>
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div>
                      <p class="text-sm text-gray-900">
                        Dipublikasikan pada
                        <time datetime="2020-01-07">{{item.published_at | formatDateString}}</time>
                      </p>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        <i v-if="item.paid_at" class="fas fa-check-circle text-green-600 mr-1"></i>
                        <i v-else class="fas fa-times-circle text-red-600 mr-1"></i>
                        {{ !item.paid_at ? 'Menunggu Pembayaran' : 'Pembayaran Diterima'}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <i class="fas fa-chevron-right text-gray-500"></i>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <div v-if="showButtonMore" class="w-full py-5 flex justify-center">
        <button class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize" @click="fetchBill(false)">Tampilkan Lainnya</button>
      </div>
      <div v-if="!bills.length" class="w-full text-center mx-auto">
        <p class="mt-2 text-base text-gray-700">Belum ada pesanan</p>
        <p class="mt-2 text-sm text-gray-500">Setiap transaksi pembayaran kedua kamu akan tersimpan di sini. Ayo mulai bertransaksi di caribarang dan nikmati kemudahannya.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'BillPage',

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      bills:[],
      showButtonMore:false,
      page:1
    }
  },

  async fetch () {
    await Promise.all([this.fetchBill()])
  },

  methods:{
    async fetchBill (firstFetch = true) {
      try {
        if (!firstFetch) {
          this.page = this.page + 1
        }
        this.$store.dispatch('setLoading', true)
        const {data, meta} = await this.$axios.$get(`/api/bills?page=${this.page}`)
        this.$store.dispatch('setLoading', false)
        if (this.page === 1) {
          this.bills = data
        } else {
          this.bills.push(...data)
        }

        this.showButtonMore = this.bills.length !== meta.total
      } catch (error) {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>
