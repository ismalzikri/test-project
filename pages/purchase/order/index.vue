<template>
  <div>
    <div class="max-w-xl">
      <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Riwayat belanja</h1>
      <p class="mt-1 text-sm text-gray-500">Periksa status pesanan terbaru, kelola refund, dan unduh invoice</p>
    </div>

    <section aria-labelledby="recent-heading" class="mt-16">
      <h2 id="recent-heading" class="sr-only">Recent orders</h2>

      <div class="space-y-20">
        <div>
          <h3 class="sr-only">Order placed on <time datetime="2021-01-22">January 22, 2021</time></h3>

          <div v-if="banner" class="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
            <dl class="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
              <div class="flex justify-between sm:block">
                <dt class="font-medium text-gray-900">Date placed</dt>
                <dd class="sm:mt-1">
                  <time datetime="2021-01-22">January 22, 2021</time>
                </dd>
              </div>
              <div class="flex justify-between pt-6 sm:block sm:pt-0">
                <dt class="font-medium text-gray-900">Order number</dt>
                <dd class="sm:mt-1">WU88191111</dd>
              </div>
              <div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                <dt>Total amount</dt>
                <dd class="sm:mt-1">$104.00</dd>
              </div>
            </dl>
            <a href="#" class="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
              View Invoice
              <span class="sr-only">for order WU88191111</span>
            </a>
          </div>

          <div class="w-full bg-white px-3">
            <table class="mt-4 w-full text-gray-500 sm:mt-6">
              <caption class="sr-only">
                Products
              </caption>
              <thead class="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                <tr>
                  <th scope="col" class="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">No Pesanan</th>
                  <th scope="col" class="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">Total</th>
                  <th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell">Status</th>
                  <th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell">Tanggal</th>
                  <th scope="col" class="w-0 py-3 font-normal text-right">Info</th>
                </tr>
              </thead>
              <tbody class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                <tr v-for="(item,index) in orders" :key="index">
                  <td class="py-6 pr-8">
                    <div class="flex items-center">
                      <img :src="item.product_cover" :alt="item.product_name" class="w-16 h-16 object-center object-cover rounded mr-6">
                      <div>
                        <nuxt-link :to="`/purchase/order/${item.order_number}`" class="font-medium text-indigo-600">{{item.order_number}}</nuxt-link>
                        <div class="text-gray-600 text-xs">{{item.product_name |readmore}}</div>
                        <div class="mt-1 sm:hidden">Rp {{item.subtotal | formatPrice}}</div>
                      </div>
                    </div>
                  </td>
                  <td class="hidden py-6 pr-8 sm:table-cell">Rp {{item.subtotal | formatPrice}}</td>
                  <td class="hidden py-6 pr-8 sm:table-cell">{{item.last_status}}</td>
                  <td class="hidden py-6 pr-8 sm:table-cell text-xs">{{item.created_at | formatDate}}</td>
                  <td class="py-6 font-medium text-right whitespace-nowrap">
                    <nuxt-link :to="`/purchase/order/${item.order_number}`" class="text-indigo-600 text-xs">Lihat</nuxt-link>
                  </td>
                </tr>
                <tr v-if="!orders.length">
                  <td class="hidden py-6 pr-8 sm:table-cell text-center" colspan="5">
                    <span class="text-base text-gray-700">Anda belum pernah melakukan transaksi</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="showButtonMore" class="w-full py-5 flex justify-center">
            <button class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize" @click="fetchOrder(false)">Tampilkan Lainnya</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name:'OrderIndex',

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      orders:[],
      banner:false,
      showButtonMore:false,
      page:1
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
        const {data, meta} = await this.$axios.$get(`/api/orders/items?page=${this.page}`)
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
