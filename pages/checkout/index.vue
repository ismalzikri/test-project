<template>
  <div class="">
    <cb-alert v-if="!identityStatus" title="Informasi KTP" icon="fas fa-info-circle" color="danger" class="mb-2">
      <p class="text-xs">
        <strong>PENTING!!!</strong> Mohon untuk melengkapi informasi <strong>Kartu Tanda Penduduk (KTP) atau Surat Izin Mengemudi (SIM)</strong> kamu sebelum membuat pesanan.
        <nuxt-link to="/profile/ktp" class="text-indigo-600 underline font-semibold">Lengkapi</nuxt-link>
      </p>
    </cb-alert>
    <cb-alert v-if="!isPhone" title="Informasi Nomor telepon" icon="fas fa-info-circle" color="danger" class="mb-2">
      <p class="text-xs">
        <strong>PENTING!!!</strong> Mohon untuk melengkapi informasi <strong>Nomor telepon</strong> kamu sebelum membuat pesanan.
        <nuxt-link to="/profile/edit" class="text-indigo-600 underline font-semibold">Lengkapi Nomor telepon</nuxt-link>
      </p>
    </cb-alert>
    <div class="max-w-7xl mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14 bg-white">
      <h1 class="sr-only">Checkout</h1>
      <div class="max-w-lg mx-auto grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
        <div class="max-w-lg mx-auto w-full">
          <h2 class="sr-only">Order summary</h2>
          <div class="flow-root">
            <ul v-if="carts.length" role="list" class="-my-6 divide-y divide-gray-200">
              <li v-for="(item,index) in carts" :key="index" class="py-6 flex space-x-6">
                <img :src="item.product_cover" :alt="item.product_name" class="flex-none w-12 h-12 md:w-24 md:h-24 object-center object-cover bg-gray-100 rounded-md">
                <div class="flex-auto">
                  <div class="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                    <div class="flex-auto text-sm font-medium space-y-1">
                      <h3 class="text-gray-900">
                        <nuxt-link :to="`/products/${item.product_uuid}`" class="text-gray-700 hover:text-indigo-600">{{item.product_name}}</nuxt-link>
                      </h3>
                      <p v-for="(variant,i) in item.items" :key="i" class="hidden text-gray-500 text-xs sm:block">- {{variant.variant_item_name}} X {{variant.quantity}}</p>
                      <p class="text-xs text-gray-500">Harga produk Rp {{item.product_price | formatPrice}}</p>
                      <p class="text-xs text-gray-500 md:text-sm">Estimasi Ongkos Kirim lokal China Rp {{item.warehouse_delivery_fee | formatPrice}}</p>

                      <div class="py-2">
                        <fieldset>
                          <legend class="text-sm font-medium text-gray-900 pb-2">Metode pengiriman dari China?</legend>
                          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <SelectCard title="Lewat Laut" unit="Cbm" label="Estimasi 30 - 45 hari" :checked="item.shipping_method == 'sea'" @selected="item.shipping_method = 'sea'"/>
                            <SelectCard title="Lewat Udara" unit="Kg" label="Estimasi 7 - 14 hari" :checked="item.shipping_method == 'air'" @selected="item.shipping_method = 'air'"/>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-else class="w-full">
              <h1 class="text-base font-bold text-gray-700 capitalize text-center">Anda belum mempunyai transaksi</h1>
            </div>
          </div>
        </div>

        <div ref="voucher" class="max-w-lg mx-auto w-full">
          <div class=" order-b border-gray-200 divide-y divide-gray-200">
            <div class="mb-7 text-sm text-gray-600 border border-lightBlue-300 rounded-lg px-3 py-3">
              <h3 class="text-base text-gray-800">Alamat pengiriman</h3>
              <div v-if="activeAddress" class="">
                <span class="font-semibold text-gray-900">{{activeAddress.receiver}} - {{activeAddress.phone}}, (Office)</span><br/>
                <span>{{activeAddress.full_address}}</span><br/>
                <span>{{activeAddress.address}} {{activeAddress.district_name}} {{activeAddress.city_name ? activeAddress.city_name + ',' : ''}} {{activeAddress.province_name}}</span>
                <div v-if="carts.length" class="mt-3" >
                  <button type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500" @click="changeAddress">
                    <span>Ubah alamat</span>
                  </button>
                </div>
              </div>
              <div v-if="!activeAddress && carts.length">
                <button type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500" @click="toggleNewAddress = true">
                  <span>Tambah alamat</span>
                </button>
              </div>
            </div>
            <dl class="text-sm font-medium text-gray-500 space-y-6 py-4">
              <div 
                class="flex justify-between border border-lightBlue-300 rounded-lg px-3 py-3 cursor-pointer select-none"  
                @click="onViewVoucher"
              >
                <div class="flex gap-3 items-center">
                  <img 
                    src="https://storage.caribarang.id/general/Caribarang-8/b8f52a1a-518d-4465-8124-ee757c9885f8.svg" 
                    alt="icon-voucher"
                  >
                  <span class="font-medium text-gray-800 relative">
                    <div v-if="voucherCode !== ''">
                      <img
                        class="h-6" 
                        src="https://storage.caribarang.id/general/Caribarang-8/083f9612-5a28-469b-887c-d845c6cc3489.png" 
                        alt="discount-image"
                      >
                      <p class="absolute text-[#E64123] whitespace-nowrap text-xs top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                        {{voucherName}}
                      </p>
                    </div>
                    <span v-else class="font-medium text-sm">Makin hemat pakai voucher</span>
                  </span>
                </div>
                <div>
                  <img 
                    src="https://storage.caribarang.id/general/Caribarang-8/843e8aa2-1fe5-40cd-a140-f4e0a1a85586.svg" 
                    alt="icon-voucher"
                  >
                </div>
              </div>
              <div class="flex justify-between">
                <dt>Subtotal</dt>
                <dd class="text-gray-900">Rp {{subTotal | formatPrice}}</dd>
              </div>
              <div class="flex justify-between">
                <dt>Estimasi Ongkos Kirim lokal China</dt>
                <dd class="text-gray-900">Rp {{warehouseFeliveryFee | formatPrice}}</dd>
              </div>
              <div class="flex justify-between">
                <dt>Handling Fee</dt>
                <dd class="text-gray-900">Rp {{handlingFee | formatPrice}}</dd>
              </div>

              <div class="flex justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt class="text-base">Estimasi Tagihan</dt>
                <dd class="text-base text-indigo-600">Rp {{total | formatPrice }}</dd>
              </div>
              <div v-if="voucherCode !== ''" class="p-3 bg-[#FFE7E2] rounded-lg">
                <p class="text-[#E64123]">
                  Anda telah menggunakan voucher yang akan menggurangi biaya tagihan kedua
                </p>
              </div>
            </dl>
          </div>
          <div class=" w-full mt-5">
            <cb-button v-if="carts.length" class="w-full" color="primary" button="button" label="Buat Pesanan" @click="PostCheckout"/>
          </div>
        </div>
      </div>
    </div>
    <popup
      title="Form alamat"
      :toggle="toggleNewAddress"
      :show-accept-button="true"
      :show-cancel-button="true"
      accept-text="Simpan"
      cancel-text="Batal"
      @close="toggleNewAddress = false"
      @acceptAction="onSubmit"
    >
      <template #popup-body>
        <div class="">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form ref="forms" method="POST" class="" @submit.prevent="handleSubmit(onSubmit)">
              <div class="w-full">
                <ValidationProvider v-slot="{ errors }" tag="div" class="mb-2" name="label" rules="required">
                  <label class="block tracking-wide text-gray-700 text-xs mb-1" for="grid-state">
                    Label <span class="text-red-700 text-xs">*</span>
                  </label>
                  <input v-model="formAddress.label" name="lable" class="appearance-none border-1 text-xs border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Contoh : alamat rumah">
                  <p class="text-red-500 text-xs italic py-1">{{errors[0]}}</p>
                </ValidationProvider>
              </div>
              <div class="w-full grid grid-cols-2 gap-2 mb-4">
                <ValidationProvider v-slot="{ errors }" tag="div" class="mb-2" name="receiverName" rules="required">
                  <label class="block tracking-wide text-gray-700 text-xs mb-1" for="grid-state">
                    Nama Penerima <span class="text-red-700 text-xs">*</span>
                  </label>
                  <input v-model="formAddress.receiver" name="receiverName" class="appearance-none border-1 text-xs border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="John Doe">
                  <p class="text-red-500 text-xs italic py-1">{{errors[0]}}</p>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" tag="div" class="mb-2" name="phone" :rules="{ regex:/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/, required:true }">
                  <label class="block tracking-wide text-gray-700 text-xs mb-1" for="grid-state">
                    No Telepon <span class="text-red-700 text-xs">*</span>
                  </label>
                  <input v-model="formAddress.phone" name="phone" class="appearance-none border-1 text-xs border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="No Telepon" @keypress="$mustNumber">
                  <p class="text-red-500 text-xs italic py-1">{{errors[0]}}</p>
                </ValidationProvider>
              </div>

              <div class="w-full grid grid-cols-2 gap-2 mb-4">
                <ValidationProvider v-slot="{ errors }" tag="div" class="mb-2" name="city" rules="required">
                  <label class="block tracking-wide text-gray-700 text-xs mb-1" for="grid-state">
                    Kecamatan <span class="text-red-700 text-xs">*</span>
                  </label>
                  <input ref="searchTextField" class="appearance-none border-1 text-xs border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Cari Kota atau Kecamatan" @keyup="onsetCity">
                  <p class="text-red-500 text-xs italic py-1">{{errors[0]}}</p>
                  <input type="text" :value="formAddress.city" name="city" class="sr-only">
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" tag="div" class="mb-2" name="postal_code" rules="required">
                  <label class="block tracking-wide text-gray-700 text-xs mb-1" for="grid-state">
                    Kode Pos <span class="text-red-700 text-xs">*</span>
                  </label>
                  <input v-model="formAddress.postal_code" name="postal_code" class="appearance-none border-1 text-xs border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Kode pos" @keypress="$mustNumber">
                  <p class="text-red-500 text-xs italic py-1">{{errors[0]}}</p>
                </ValidationProvider>
              </div>
              <div class="w-full">
                <ValidationProvider v-slot="{ errors }" tag="div" class="mb-2" name="address" rules="required">
                  <label class="block tracking-wide text-gray-700 text-xs mb-1" for="grid-state">
                    Alamat lengkap <span class="text-red-700 text-xs">*</span>
                  </label>
                  <textarea v-model="formAddress.address" rows="3" name="address" class="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm: border border-gray-300 rounded-md text-xs"></textarea>
                  <p class="text-red-500 text-xs italic py-1">{{errors[0]}}</p>
                </ValidationProvider>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </template>
    </popup>
    <div v-if="toggleVoucher">
      <MediumVoucherListDesktop 
        :loadinglist="loadinglist" 
        :list="listVoucher"
        @close="toggleVoucher = false"
      />
    </div>

  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {mapActions, mapState} from 'vuex'
import Popup from '~/components/Basic/Popup.vue'
import SelectCard from '~/components/Basic/SelectCard.vue'
import CbAlert from '~/components/Basic/Alert.vue'

import CbButton from '~/components/Basic/Button.vue'
const _ = require('lodash')
export default {
  name:'CheckoutPage',

  components: {
    Popup,
    ValidationProvider,
    ValidationObserver,
    SelectCard,
    CbButton,
    CbAlert
  },

  middleware : ['islogged', 'exists-phone'],

  data () {
    return {
      listVoucher: [],
      carts:[],
      subTotal:0,
      handlingFee:0,
      warehouseFeliveryFee:0,
      total:0,
      toggleNewAddress:false,
      toggleVoucher:false,
      loadinglist:false,
      formAddress:{
        postal_code:'',
        receiver:'',
        label:'',
        address:'',
        phone:'',
        city:''
      },
      activeAddress:null,
      identityStatus:false,
      autocomplete:''
    }
  },

  head () {
    return {
      title: 'Checkout | caribarang.id'
    }
  },

  computed: {
    ...mapState({
      isPhone:state => state.auth.user.phone,
      voucherCode:state => state.voucherCode,
      voucherName:state => state.voucherName
    })
  },

  created () {
    this.fetchCheckout()
    this.fetchIdentity()
  },

  mounted () {
    this.fetchAddress()
  },

  deactivated () {
    this.$destroy()
  },

  methods:{
    ...mapActions({
      setCart:'setCart',
      setCartTotal:'setCartTotal',
      setVoucherName: 'setVoucherName',
      setVoucherCode: 'setVoucherCode'
    }),

    async fetchCheckout () {
      try {
        this.$store.dispatch('setLoading', true)
        const {data} = await this.$axios.$get('/api/carts/checkout')
        this.$store.dispatch('setLoading', false)

        this.carts = data.map(x => {
          x.shipping_method = 'sea'
          return x
        })
        this.subTotal = _.sumBy(data, (x) => parseFloat(x.product_price))
        this.warehouseFeliveryFee = _.sumBy(data, (x) => parseFloat(x.warehouse_delivery_fee))
        this.handlingFee = (this.subTotal + this.warehouseFeliveryFee) * 0.05
        this.total = this.subTotal + this.handlingFee + this.warehouseFeliveryFee

        if (this.$route.query.ref === 'voucher') return this.$refs.voucher.scrollIntoView({ behaviour: 'smooth' })

      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error)
      }
    },

    async fetchCart () {
      try {
        const { data, meta } = await this.$axios.$get('/api/carts?paging=3')
        this.setCart(data)
        this.setCartTotal(meta.total)
      } catch (error) {
        console.log(error)
      }
    },

    async fetchIdentity () {
      try {
        const {status, message} = await this.$axios.$get('/api/account/identity-card')
        if (status) {
          this.identityStatus = message.ktp_file && message.ktp_number
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async fetchAddress () {
      try {
        const {data} = await this.$axios.$get('/api/address')
        if (!data) {
          this.toggleNewAddress = true
          return setTimeout(() => {
            this.initGoogleMapPlace()
          }, 1200)
        }
        this.activeAddress = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async postAddress (params) {
      try {
        this.$store.dispatch('setLoading', true)
        const {status, message} = await this.$axios.$post('/api/address', params)
        this.$store.dispatch('setLoading', false)
        if (!status) return this.$swal.fire(
          'Error!',
          message,
          'danger'
        )
        this.toggleNewAddress = false
        this.activeAddress = message
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        return this.$swal.fire('Error!', error.message, 'danger')
      }
    },

    async PostCheckout () {
      try {
        if (!this.carts.length) return
        if (!this.identityStatus) return this.$swal.fire(
          'Error!',
          'Mohon untuk mengisi informasi Kartu tanda penduduk (KTP) kamu',
          'danger'
        )
        if (!this.activeAddress) return this.$swal.fire(
          'Error!',
          'Mohon untuk mengisi alamat anda',
          'danger'
        )
        if (!this.isPhone) return this.$swal.fire(
          'Error!',
          'Mohon untuk mengisi informasi nomor telepon kamu.',
          'danger'
        )
        this.$store.dispatch('setLoading', true)
        const params = this.carts.map(x => {
          return {
            uuid:x.uuid,
            shipping_method:x.shipping_method
          }
        })
        const {message} = await this.$axios.$post('/api/orders', {
          carts:params,
          voucher: this.voucherCode
        })
        this.$store.dispatch('setLoading', false)
        this.setVoucherName('')
        this.setVoucherCode('')
        
        return this.$router.push(`/purchase/${message.invoice}`)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        this.$swal.fire('Error!', error.response.data.message, 'danger')
        this.fetchCart()
      }
    },

    async getVoucher () {
      try {
        this.loadinglist = true
        const {data} = await this.$axios.get('api/vouchers/list')
        this.listVoucher = data.data
        this.loadinglist = false
      } catch (error) {
        this.loadinglist = false
        this.errorMessage = 'something error, please refresh again !'
      }
    },

    onViewVoucher () {
      if (this.$isMobile()) {
        this.$router.push('checkout/voucher') 
      } else {
        this.toggleVoucher = !this.toggleVoucher
        this.getVoucher()
      } 
    },

    onsetCity (e) {
      const value = e.target.value
      this.formAddress.city = value
    },

    initGoogleMapPlace () {
      const input = this.$refs.searchTextField
      const options = {
        componentRestrictions: {country: 'id'},
        fields: ['address_components', 'geometry'],
        types: ['geocode']
      }
      // eslint-disable-next-line no-undef
      this.autocomplete = new google.maps.places.Autocomplete(input, options)
    },

    fillInAddress () {
      const place = this.autocomplete.getPlace()
      const {lat, lng} = place.geometry.location

      const resultPlace  = {}
      place.address_components.map(x => {
        if (x.types[0] === 'administrative_area_level_4') {
          resultPlace.address = x.long_name
        }

        if (x.types[0] === 'administrative_area_level_3') {
          resultPlace.district = x.long_name
        }

        if (x.types[0] === 'administrative_area_level_2') {
          resultPlace.city = x.long_name
        }

        if (x.types[0] === 'administrative_area_level_1') {
          resultPlace.province = x.long_name
        }
        return x
      })
      resultPlace.lat = lat()
      resultPlace.lng = lng()
      return resultPlace
    },

    changeAddress () {
      const activeAddress = this.activeAddress
      this.$store.dispatch('setLoading', false)
      const city = `${activeAddress.district_name} ${ activeAddress.city_name } ${ activeAddress.province_name}`
      this.formAddress = {
        postal_code:activeAddress.postal_code,
        receiver:activeAddress.receiver,
        label:activeAddress.label,
        address:activeAddress.full_address,
        phone:activeAddress.phone,
        city
      }

      this.toggleNewAddress = true
      setTimeout(() => {
        this.$refs.searchTextField.value = `${activeAddress.district_name } ${ activeAddress.city_name } ${ activeAddress.province_name}`
        this.initGoogleMapPlace()
      }, 1200)
    },

    onSubmit () {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          let params = null
          if (!this.activeAddress) {
            const googleAddress = this.fillInAddress()
            params = {
              receiver:this.formAddress.receiver,
              label:this.formAddress.label,
              ...googleAddress,
              full_address:this.formAddress.address,
              postal_code:this.formAddress.postal_code,
              phone:this.formAddress.phone
            }
          } else {
            let googleAddressNew = null
            const oldCity = `${this.activeAddress.district_name} ${ this.activeAddress.city_name } ${ this.activeAddress.province_name}`
            if (oldCity !== this.formAddress.city) {
              googleAddressNew = this.fillInAddress()
            } else {
              googleAddressNew = {
                address:this.activeAddress.address,
                district:this.activeAddress.district_name,
                city:this.activeAddress.city_name,
                province:this.activeAddress.province_name,
                lat:this.activeAddress.latitude,
                lng:this.activeAddress.longitude
              }
            }
            params = {
              receiver:this.formAddress.receiver,
              label:this.formAddress.label,
              ...googleAddressNew,
              full_address:this.formAddress.address,
              postal_code:this.formAddress.postal_code,
              phone:this.formAddress.phone
            }
          }
          return this.postAddress(params)
        }
      })
        .catch((err) => {
          const geometryError = err.message.includes('geometry')
          if (geometryError) {
            this.$swal.fire('Error!', 'Silahkan pilih kota / alamat sesuai pilihan yang tersedia', 'danger')
          }
        })
    }
  }
}
</script>
