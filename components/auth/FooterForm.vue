<template>
  <div class="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
    <p class="text-xs leading-5 text-gray-500 text-center">{{ status ? 'Belum' : 'Sudah'}} punya akun? 
      <nuxt-link :to="status ? '/signup' : '/signin'" class="text-blue-600 hover:text-blue-700">{{status ? 'Daftar Sekarang' : 'Login disini'}}</nuxt-link>
    </p>
  </div>
</template>
<script>
export default {
  name:'FooterForm',

  props:{
    status:{
      type:Boolean,
      default:false
    }
  }
}
</script>