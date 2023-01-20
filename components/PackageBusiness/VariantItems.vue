<template>
  <div class="flex flex-col gap-10 overflow-auto max-h-[270px] pr-4">
    <div
      :class="isSelected ? 'border border-[#086DE3]' : ''"
      class="w-full flex justify-between gap-3 items-center border border-[#AAAAAA] py-1.5 px-3 rounded-lg cursor-pointer"
      @click="onClickVariantItems(variantitem)"
    >
      <p class="text-[#747474] py-0.5 text-sm select-none break-all">
        {{ variantitem.name }}
      </p>
      <div
        :class="isSelected ? 'border border-[#086DE3]' : 'border-gray-400'"
        class="w-[100px] border rounded-lg flex items-center px-3"
      >
        <div
          class="font-bold hover:text-[#086DE3] select-none"
          @click="setCounter('decrement')"
        >
          -
        </div>
        <input
          v-model="quantity"
          style="box-shadow: none !important"
          class="w-full text-[#747474] py-1 border-none rounded-md text-sm text-center"
          type="text"
          @keypress="$mustNumber"
        />
        <div
          class="font-bold hover:text-[#086DE3] select-none"
          @click="setCounter('increment')"
        >
          +
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variantitem: {
      type: Object,
      required: true
    },
    indexProduct: {
      type: Number,
      required: true   
    }
  },

  data () {
    return {
      isSelected: false,
      variantItemState: {
        variant_item_id: this.variantitem.id,
        index: this.indexProduct,
        quantity: 0
      },
      quantity:0
    }
  },

  watch: {
    variantItemState: {
      handler () {
        this.$emit('emitVariantItem', this.variantItemState)
      },

      deep: true
    }
  },

  methods: {
    setCounter (operator) {
      if (operator === 'decrement') {
        if (this.quantity <= 0) {
          this.quantity = 0
        } else {
          this.quantity -= 1
        }
      } else {
        this.quantity += 1
      }
    },
    onClickVariantItems (item) {
      this.variantItemState = {
        ...this.variantItemState,
        variant_item_id: item.id,
        index: this.indexProduct,
        quantity: this.quantity 
      }
    }
  }
}
</script>

<style></style>
