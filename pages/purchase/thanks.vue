<template>
  <div class="w-full flex justify-center">
    <div class="bg-white w-full md:w-2/5 py-10 px-5 shadow text-center rounded-md">
      <i class="fas fa-check-circle text text-5xl text-emerald-500"></i>
      <p class="text-sm py-3 text-gray-600 font-medium">
        Pesanan kamu berhasil di Konfirmasi mohon tunggu beberapa saat admin kami akan segera menghubungimu
      </p>
      <p v-if="link">
        <a :href="link" class="text-indigo-600 hover:text-indigo-500 text-xs">Lihat pembelian</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name:'PurchaseThanks',

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      link:null
    }
  },

  created () {
    const query = this.$route.query
    if (query.po) {
      this.link = `/purchase/${query.po}`
    }
  }
}
</script>
