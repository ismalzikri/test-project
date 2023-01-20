<template>
  <div>
    <div class="border-b border-gray-100 pb-2 uppercase text-sm text-gray-600">
      Edit Profil
    </div>
    <div class="w-full md:w-2/4">
      <div v-show="errorMessage" class="py-2">
        <cb-alert title="Error" icon="fas fa-exclamation-circle" color="danger">
          <p>{{ errorMessage }}</p>
        </cb-alert>
      </div>
      <div v-show="!user.phone" class="py-2">
        <cb-alert
          title="INFORMASI PENTING!!!"
          icon="fas fa-info-circle"
          color="danger"
          class="mb-2"
        >
          <p class="text-xs">
            Untuk mengakses semua fitur caribarang.id dan mendapatkan
            rekomendasi produk sesuai minat anda Mohon untuk melengkapi
            informasi
            <strong>Nomor Telepon</strong> dan
            <strong>Kategori yang Kamu Sukai</strong> terlebih dahulu ya !
          </p>
        </cb-alert>
      </div>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form method="POST" class="" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="name"
            rules="required"
          >
            <label for="email" class="block text-xs text-gray-600">Nama</label>
            <div class="mt-1">
              <input
                v-model="user.name"
                type="text"
                name="name"
                class="shadow-sm focus:ring-indigo-500 focusp:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <p class="text-xs text-red-600">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="phone"
            :rules="{
              regex: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
              required: true,
            }"
          >
            <label for="email" class="block text-xs text-gray-600">No Hp</label>
            <div class="mt-1">
              <input
                v-model="user.phone"
                type="text"
                name="phone"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                @keypress="$mustNumber"
              />
            </div>
            <p class="text-xs text-red-600">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="dob"
            rules="required"
          >
            <label for="email" class="block text-xs text-gray-600"
            >Tanggal lahir</label
            >
            <div class="mt-1">
              <input
                v-model="user.dob"
                type="date"
                name="dob"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <p class="text-xs text-red-600">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="gender"
            rules="required"
          >
            <div>
              <label class="text-xs font-medium text-gray-600"
              >Jenis Kelamin</label
              >
              <fieldset class="mt-4">
                <div class="space-y-4">
                  <div class="flex items-center">
                    <input
                      v-model="user.gender"
                      name="gender"
                      value="M"
                      type="radio"
                      checked
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label class="ml-3 block text-xs font-medium text-gray-600">
                      Laki-laki
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      v-model="user.gender"
                      name="gender"
                      value="W"
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label class="ml-3 block text-xs font-medium text-gray-600">
                      Perempuan
                    </label>
                  </div>
                </div>
              </fieldset>
              <p class="text-xs text-red-600 mt-2">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="interest_category"
            rules="required"
          >
            <label for="email" class="block text-xs text-gray-600"
            >Kategori Utama yang Paling Kamu Sukai</label
            >
            <div class="mt-1">
              <select
                v-model="category"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Pilih Kategori Utama yang Paling Kamu Sukai</option>
                <option
                  v-for="(item, index) in categories"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <p class="text-xs text-red-600">{{ errors[0] }}</p>
          </ValidationProvider>

          <div class="mb-5">
            <cb-button color="primary" label="Simpan" button="submit" />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import CbButton from '../Basic/Button.vue'
import CbAlert from '../Basic/Alert.vue'

export default {
  name: 'EditProfil',

  components: {
    CbButton,
    ValidationProvider,
    ValidationObserver,
    CbAlert
  },

  data () {
    return {
      user: {
        name: '',
        phone: '',
        gender: '',
        dob: ''
      },
      category: '',
      categories: [{ id: '', name: '' }],
      errorMessage: ''
    }
  },

  mounted () {
    this.fetchUser()
    this.fetchCategories()
  },

  methods: {
    async fetchUser () {
      try {
        this.$store.dispatch('setLoading', true)
        const { data } = await this.$axios.$get('/api/me')
        this.$store.dispatch('setLoading', false)
        this.user = data
        this.category = data.interestCategory ? data.interestCategory.category.id : ''
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    async fetchCategories () {
      try {
        this.$store.dispatch('setLoading', true)
        const { status, data } = await this.$axios.get('/api/categories')
        this.$store.dispatch('setLoading', false)
        if (status) {
          this.categories = data.data
        } else {
          this.categories = []
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error.message)
      }
    },

    async onSubmit () {
      try {
        this.$store.dispatch('setLoading', true)

        const { status, message } = await this.$axios.$put('/api/me', {
          name: this.user.name,
          phone: this.user.phone,
          dob: this.user.dob,
          gender: this.user.gender,
          interest_category: this.category
        })
        this.$store.dispatch('setLoading', false)

        if (!status) {
          this.errorMessage = message
        } else {
          return window.location.replace('/profile')
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    }
  }
}
</script>
