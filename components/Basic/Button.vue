<template>
  <button
    :class="`text-white active:bg-red-600 font-semibold capitalize text-xs px-6 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${bg}`"
    :type="button"
    @click="$emit('click')"
  >
    <i v-show="icon" :class="icon"></i>&nbsp;{{label}}
  </button>
</template>
<script>
export default {
  name:'CbButton',

  props:{
    color:{
      type:String,
      default:'primary'
    },

    label:{
      type:String,
      default:'Button'
    },

    button:{
      type:String,
      default:'button'
    },

    icon:{
      type:String,
      default:''
    }
  },

  computed:{
    bg () {
      let color = ''
      switch (this.color) {
      case 'danger':
        color =  'bg-red-500 active:bg-red-600'
        break
      case 'primary':
        color = 'bg-lightBlue-500 active:bg-lightBlue-600'
        break

      case 'warning':
        color = 'bg-amber-500 active:bg-amber-600'
        break

      case 'dark':
        color = 'bg-blueGray-500 active:bg-blueGray-600'
        break

      case 'success':
        color = 'bg-emerald-500 active:bg-emerald-600'
        break

      case 'pink':
        color = 'bg-pink-500 active:bg-pink-600'
        break

      case 'disabled': 
        color = 'bg-gray-400 cursor-not-allowed'
        break

      default:
        color = 'bg-lightBlue-500 active:bg-lightBlue-600'
        break
      }
      return color
    }
  }
}
</script>
