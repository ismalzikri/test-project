<template>
  <div class="bg-white">
    <div class="max-w-5xl mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
      <h1 class="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl mb-8">Riwayat tagihan pertama</h1>
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">No</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">No Invoice</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Nama Tagihan</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Jumlah Tagihan</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Status Tagihan</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Tanggal</th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(item,index) in orders" :key="index">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-500">{{index + 1}}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <nuxt-link :to="`/purchase/${item.invoice}`" class="text-indigo-600 text-sm leading-5">{{item.invoice}}</nuxt-link>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm text-gray-500">{{item.name}}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm text-gray-500">Rp {{item.amount | formatPrice}}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span v-if="item.paid_at" class="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Lunas</span>
                  <span v-if="!item.paid_at && !item.has_expired" class="inline-flex px-2 text-xs font-semibold text-red-800 bg-red-100 rounded-full">Menunggu Pembayaran</span>
                  <span v-if="!item.paid_at && item.has_expired" class="inline-flex px-2 text-xs font-semibold bg-orange-100 text-orange-500 bg-t-100 rounded-full">Expired</span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm text-gray-500">{{item.created_at | formatDate}}</div>
                </td>
              </tr>
              <tr v-if="!orders.length">
                <td class="hidden py-6 pr-8 sm:table-cell text-center" colspan="6">
                  <span class="text-base text-gray-700">Anda belum pernah melakukan transaksi</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="showButtonMore" class="w-full mt-5 flex justify-center">
        <button class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize" @click="fetchOrder(false)">Tampilkan Lainnya</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'PurchaseIndex',

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      orders:[],
      page:1,
      showButtonMore:false
    }
  },

  async fetch () {
    await Promise.all([this.fetchOrder()])
  },

  methods:{
    async fetchOrder (firstFetch = true) {
      try {
        if (!firstFetch) {
          this.page = this.page + 1
        }
        this.$store.dispatch('setLoading', true)
        const {data, meta} = await this.$axios.$get(`/api/orders?page=${this.page}`)
        this.$store.dispatch('setLoading', false)
        if (this.page === 1) {
          this.orders = data
        } else {
          this.orders.push(...data)
        }

        this.showButtonMore = this.orders.length !== meta.total
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    }
  }
}
</script>
