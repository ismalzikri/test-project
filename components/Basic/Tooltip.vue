<template>
  <div class="flex flex-wrap">
    <div class="w-full text-right">
      Rp - 
      <button class="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150" type="button" @mouseenter="toggleTooltip()" @mouseleave="toggleTooltip()">
        <i class="fas fa-info-circle"></i>
      </button>
      <div ref="tooltipRef" :class="{'hidden': !tooltipShow, 'block': tooltipShow}" class="absolute left-0 bg-lightBlue-600 border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg shadow-md">
        <div>
          <div class="bg-lightBlue-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 capitalize rounded-t-lg">
            {{title}}
          </div>
          <div class="text-white p-3">
            {{content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createPopper } from '@popperjs/core'
  
export default {
  name: 'BottomLightBlueTooltip',

  props:{
    title:{
      type:String,
      default:''
    },

    content:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      tooltipShow: false
    }
  },
  methods: {
    toggleTooltip () {
      if (this.tooltipShow) {
        this.tooltipShow = false
      } else {
        this.tooltipShow = true
        createPopper(this.$refs.btnRef, this.$refs.tooltipRef, {
          placement: 'bottom'
        })
      }
    }
  }
}
  </script>
  