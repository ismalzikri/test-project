<template>
  <div>
    <label
      class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
      :class="[checked ? 'border-transparent ring-2 ring-indigo-500' : 'border-gray-300']"
      @click="$emit('selected')"
    >
      <input type="radio" name="delivery-method" value="Standard" class="sr-only" aria-labelledby="delivery-method-0-label" aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1">
      <div class="flex-1 flex">
        <div class="flex flex-col">
          <span id="delivery-method-0-label" class="block text-sm font-medium text-gray-900"> {{title}} </span>
          <span v-show="label" id="delivery-method-0-description-0" class="mt-1 flex items-center text-sm text-gray-500"> {{label}} </span>
          <span v-show="price" id="delivery-method-0-description-1" class="mt-3 text-sm font-medium text-gray-900"> Rp {{price | formatPrice}} / {{ unit }}</span>
          <div v-if="status" class="inline-flex px-2 mr-12 text-xs font-semibold bg-orange-100 py-1 text-orange-500 bg-t-100 rounded-full items-center mt-2">{{status}}</div>
        </div>
      </div>
      <i v-show="checked" class="fas fa-check-circle" :class="[checked ? 'text-indigo-600' : '']"></i>
      <div
        class="absolute -inset-px rounded-lg border-2 pointer-events-none"
        :class="[checked ? 'border border-indigo-500' : 'border-2 border-transparent']"
        aria-hidden="true"
      ></div>
    </label>
    <div v-if="event === false" class="mt-4">
      <div v-if="unit === 'Cbm' " >
        <span class="text-sm font-normal ">Minimum pengiriman 0.5 CBM.</span>
        <p class="text-xs font-normal text-gray-500 mt-4">
          CBM adalah singkatan dari cubic meter yaitu satuan volume untuk pengiriman via laut.
        </p>
      </div>
      <p v-else class="text-sm font-normal">Minimum pengiriman 3 Kg.</p>
    </div>
  </div>
</template>
<script>
export default {
  name:'SelectCard',

  props:{
    checked:{
      type:Boolean,
      default:false
    },

    title:{
      type:String,
      default:'Title Card'
    },

    label:{
      type:String,
      default:''
    },

    price:{
      type:[String, Number],
      default:0
    },

    unit:{
      type:String,
      default:'Cbm'
    },

    status:{
      type:String,
      default: ''
    },

    event:{
      type:Boolean,
      default:false
    }
  }
}
</script>
