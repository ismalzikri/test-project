<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-10 px-4 sm:py-24 sm:px-6 lg:px-0">
      <h1
        class="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl"
      >
        Keranjang belanja
      </h1>
      <form class="mt-12">
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
          <h5
            v-if="!carts.length"
            class="text-base text-gray-700 font-medium text-center py-4"
          >
            Keranjang belanja anda kosong
          </h5>
          <div class="mb-4 flex items-center">
            <label class="text-gray-500">
              <input
                v-model="allSelected"
                class="mr-6 rounded-sm border-2 border-[#0ea5e9] w-6 h-6"
                type="checkbox"
                @change="selectAll"
              />
              Pilih Semua
            </label>
          </div>
          <ul
            role="list"
            class="border-t border-b border-gray-200 divide-y divide-gray-200"
          >
            <li
              v-for="(item, index) in carts"
              :key="index"
              class="flex items-center py-6"
            >
              <div class="mr-6">
                <input
                  ref="boxes"
                  :checked="item.ready_to_checkout"
                  :value="item.uuid"
                  type="checkbox"
                  class="rounded-sm border-2 border-[#0ea5e9] w-6 h-6"
                  @click="getCheckbox($event, index)"
                />
              </div>

              <div class="flex-shrink-0">
                <img
                  :src="item.product_cover"
                  :alt="item.product_name"
                  class="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                />
              </div>

              <div class="ml-4 flex-1 flex flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <a
                        :href="`/products/${item.product_uuid}`"
                        target="_blank"
                        class="font-medium text-gray-700 hover:text-indigo-600"
                      >
                        {{ item.product_name | readmore }}
                      </a>
                    </h4>
                    <p class="ml-4 text-sm font-medium text-gray-900">
                      Rp {{ item.product_price | formatPrice }}
                    </p>
                  </div>
                  <p
                    v-for="(variant, i) in item.items"
                    :key="i"
                    class="mt-1 text-xs text-gray-500"
                  >
                    <span v-if="variant.variant_type != 'no_variant'"
                    >- {{ variant.variant_item_name | readmore }} X
                      {{ variant.quantity }}</span
                    >
                  </p>
                </div>

                <div class="mt-4 flex-1 flex items-end justify-between">
                  <p class="flex items-center text-sm text-gray-700 space-x-2">
                    <span>Kuantitas: {{ item.total_quantity }}</span>
                  </p>
                  <div class="ml-4">
                    <button
                      type="button"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      @click="onDelete(item, index)"
                    >
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="mt-10">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium text-gray-900">Subtotal</dt>
                <dd class="ml-4 text-base font-medium text-indigo-700">
                  Rp {{ totalPrice | formatPrice }}
                </dd>
              </div>
            </dl>
            <p class="mt-1 text-sm text-gray-500">
              Estimasi pengiriman dan pajak dihitung pada saat membuat pesanan
            </p>
          </div>

          <div v-if="carts.length" class="mt-10 flex text-center">
            <cb-button
              :color="totalPrice == 0 ? 'disabled' : 'primary'"
              label="Buat Pesanan"
              button="button"
              class="w-full"
              @click="GotoCheckout()"
            />
          </div>
        </section>
      </form>
    </div>
    <PopupAlert v-if="errorMessage" message="Silahkan pilih barang kamu terlebih dahulu ya!" title="Kesalahan !" @confirm="confirm" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CbButton from '~/components/Basic/Button.vue'
import PopupAlert from '~/components/Basic/PopupAlert.vue'

export default {
  name: 'CartPage',
  components: { CbButton, PopupAlert },

  middleware: ['islogged', 'exists-phone'],

  data () {
    return {
      carts: [],
      selected: [],
      total: 0,
      errorMessage:false,
      allSelected: false
    }
  },

  async fetch () {
    await Promise.all([this.fetchCart()])
  },

  head () {
    return {
      title: 'Carts | caribarang.id'
    }
  },

  computed: {
    totalPrice () {
      const selectedItems = this.carts.filter((item) => this.selected.includes(item.uuid))

      return selectedItems.reduce((sum, item) => sum + item.product_price, 0)
    }
  },

  mounted () {
    if (this.$refs.boxes) {
      const selectedItem = this.$refs.boxes.filter(item => item.checked).map((item) => item.value)
      if (selectedItem) this.selected =  selectedItem
    }
  },

  methods: {
    ...mapActions({
      setCartTotal: 'setCartTotal'
    }),

    async fetchCart () {
      try {
        this.$store.dispatch('setLoading', true)
        const { data } = await this.$axios.$get('/api/carts')
        this.$store.dispatch('setLoading', false)
        this.carts = data
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    confirm () {
      this.errorMessage = !this.errorMessage
    },

    selectAll () {
      if (this.allSelected) {
        const selected = this.carts.map((item) => item.uuid)
        this.selected = selected
        this.$refs.boxes.forEach((checkbox) => {
          checkbox.checked = true
        })
      } else {
        this.selected = []
        this.$refs.boxes.forEach((checkbox) => {
          checkbox.checked = false
        })
      }
    },

    getCheckbox (event, index) {
      if (event.target.checked) {
        this.selected.push(event.target.value)
      } else {
        this.selected.splice(this.selected.indexOf(index), 1)
      }
    },

    onDelete (item, index) {
      this.$swal
        .fire({
          icon: 'warning',
          title: 'Konfirmasi',
          text: 'Anda yakin menghapus item ini ?',
          showCancelButton: true,
          confirmButtonText: 'Yakin'
        })
        .then((result) => {
          if (result.value) return this.postDelete(item, index)
        })
    },

    async GotoCheckout () {
      if (this.totalPrice === 0) {
        this.errorMessage = true
        return
      }

      try {
        this.$store.dispatch('setLoading', true)
        const resp = await this.$axios.post('/api/carts/checkout', { carts: this.selected })
        this.$store.dispatch('setLoading', false)
        if (resp.data.data.length) this.$router.push('/checkout')
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error)
      }
    },

    async postDelete (item, index) {
      try {
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$delete(
          `/api/carts/${item.uuid}`
        )
        this.$store.dispatch('setLoading', false)
        if (!status) {
          this.$swal.fire({icon: 'error', title: 'Error', text: message})
        } else {
          this.carts.splice(index, 1)
          this.setCartTotal(this.carts.length)
          return this.$swal.fire({icon: 'success', title: 'Berhasil', text: 'Produk telah di hapus '})
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw console.error()
      }
    }
  }
}
</script>
