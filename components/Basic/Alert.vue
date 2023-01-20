<template>
  <div :class="`rounded-md bg-${thema}-100 p-4`">
    <div class="flex">
      <div class="flex-shrink-0">
        <span v-show="icon" :class="`text-${thema}-400`">
          <i :class="icon"></i>
        </span>
      </div>
      <div class="ml-3">
        <h3 :class="`text-sm font-medium text-${thema}-800`">{{title}}</h3>
        <div :class="`mt-2 text-sm text-${thema}-800`">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'CbAlert',

  props:{
    color:{
      type:String,
      default:'primary'
    },
    icon:{
      type:String,
      default:''
    },
    title:{
      type:String,
      default:''
    }
  },

  computed:{

    thema () {
      let color = ''
      switch (this.color) {
      case 'success':
        color = 'green'
        break

      case 'danger':
        color = 'red'
        break

      case 'warning':
        color = 'yellow'
        break
      default:
        color = 'blue'
        break
      }
      return color
    }

  }
}
</script>