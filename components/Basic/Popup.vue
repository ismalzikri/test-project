<template>
  <div>
    <div v-if="show" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex dark-transparent">
      <div class="relative my-6 mx-auto w-11/12 md:w-2/5">
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div class="flex items-start justify-between py-2 px-3 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-lg font-semibold">
              {{title}}
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div class="relative py-2 px-3 flex-auto">
            <slot name="popup-body"></slot>
          </div>
          <div v-if="showAcceptButton || showCancelButton" class="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
            <button v-show="showCancelButton" class="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-gray-800 active:bg-blueGray-600 font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="$emit('close')">
              {{cancelText}}
            </button>
            <button v-show="showAcceptButton" class="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="$emit('acceptAction')">
              {{acceptText}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: 'PopupComponent',
  props:{
    toggle:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:''
    },

    showAcceptButton:{
      type:Boolean,
      default:false
    },

    showCancelButton:{
      type:Boolean,
      default:false
    },

    acceptText:{
      type:String,
      default:'Save Changes'
    },

    cancelText:{
      type:String,
      default:'Close'
    }
  },

  data () {
    return {
      showModal: false
    }
  },

  computed:{
    show:{
      get () {
        return this.toggle
      },

      set () {
        return this.$emit('close')
      }
    }
  }
}
</script>
