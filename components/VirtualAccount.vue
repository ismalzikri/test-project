<template>
  <div class="">
    <h3 class="text-base font-bold text-gray-900 py-2">Virtual Account</h3>
    <p class="text-xs text-gray-400">Kamu bisa membayar dengan transfer melalui ATM, Internet Banking & Mobile Banking.
    </p>
    <ul class="w-full py-2">
      <li
        v-for="(item, index) in virtualAccounts" :key="index"
        class="flex items-center border-b border-gray-200 justify-between py-1.5">
        <div class="w-1/2 text-gray-800 font-medium">
          <nuxt-link
            :to="`/pay/${item.value}/confirm?invoice=${invoice}&method=VIRTUAL_ACCOUNT`">{{ item.name }}</nuxt-link>
        </div>
        <nuxt-link
          :to="`/pay/${item.value}/confirm?invoice=${invoice}&method=VIRTUAL_ACCOUNT`"
          class="w-1/2 flex items-center justify-end">
          <img class="h-12 w-12 mr-2" :src="item.icon" alt="icon bank">
          <i class="fas fa-chevron-right text-gray-400"></i>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { virtualAccounts } from '../helpers/bank.js'
export default {
  name: 'VirtualAccount',

  props: {
    invoice: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      virtualAccounts
    }
  }
}
</script>
