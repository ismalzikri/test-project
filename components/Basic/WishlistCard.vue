<template>
  <div class="bg-white mb-5 shadow-sm rounded-md overflow-hidden">
    <nuxt-link :to="link" :target="target" class="group">
      <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img :src="image" :alt="name" class="w-full h-full object-center object-cover group-hover:opacity-75">
      </div>
      <div class="px-2 py-2 w-full">
        <h3 class="text-xs text-gray-500 group-hover:text-indigo-600">{{name | readmore}}</h3>
        <p class="py-2 text-sm font-medium text-blue-800">
          Rp {{price | formatPrice}}
        </p>
      </div>
    </nuxt-link>
    <div class="px-2">
      <button class="text-red-500 w-full mt-2 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="onDelete()">
        Hapus
      </button>
    </div>
  </div>
</template>
<script>

export default {
  name:'WishlistCard',

  props:{
    name:{
      type:String,
      default:''
    },

    image:{
      type:String,
      default:'https://cbu01.alicdn.com/img/ibank/2020/782/823/16756328287_499955907.200x200.jpg'
    },

    price:{
      type:[String, Number],
      default:0
    },

    link:{
      type:String,
      default:''
    },

    target:{
      type:String,
      default:'_blank'
    }
  },

  methods:{
    onDelete () {
      this.$swal.fire({
        icon:'warning',
        title: 'Konfirmasi',
        text: 'Anda yakin menghapus item ini ?',
        showCancelButton: true,
        confirmButtonText: 'Yakin'
      }).then((result) => {
        if (result.value) return this.$emit('delete')
      })
    }
  }
}
</script>
