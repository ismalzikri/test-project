<template>
  <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
    <div
      class="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden"
    >
      <div class="px-4 py-8 sm:px-10">
        <div class="flex items-center justify-center pb-4">
          <a href="/">
            <img
              src="/img/logo-navbar-web.webp"
              class="block h-12 w-auto md:block"
              alt="Caribarang Logo"
            />
          </a>
        </div>
        <div
          v-show="errorMessage"
          class="bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div class="mt-6">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="py-1"
                name="name"
                rules="required"
              >
                <label for="name" class="sr-only">Nama</label>
                <input
                  v-model="name"
                  type="text"
                  name="name"
                  placeholder="Nama"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md placeholder-slate-300"
                />
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="py-1"
                name="email"
                rules="required|email"
              >
                <label for="mobile-or-email" class="sr-only">Email</label>
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="Alamat email"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md placeholder-slate-300"
                />
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="py-1"
                name="phone"
                :rules="{
                  regex: /^(^\+62|62|^08)(\d{2,4}-?){2}\d{2,4}$/,
                  required: true,
                }"
              >
                <label for="phone" class="sr-only">No WhatsApp</label>
                <input
                  v-model="phone"
                  type="text"
                  name="phone"
                  placeholder="No WhatsApp"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md placeholder-slate-300"
                  @keypress="$mustNumber"
                />
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="py-1"
                name="password"
                rules="required"
              >
                <label for="password" class="sr-only">Password</label>
                <input
                  v-model="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autocomplete="current-password"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md placeholder-slate-300"
                />
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="py-1"
                name="password_confirmation"
                rules="required"
              >
                <label for="password" class="sr-only">konfirmasi Password</label>
                <input
                  v-model="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="konfirmasi Password"
                  autocomplete="current-password"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md placeholder-slate-300"
                />
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
                <p class="text-red-500 text-xs italic py-1">
                  {{ password_confirmation !== '' && password_confirmation !== password ? 'Password tidak sama' : '' }}
                </p>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="py-1"
                name="interest_category"
                rules="required"
              >
                <label for="interest_category" class="sr-only"
                >Pilih kategori utama yang paling kamu sukai</label
                >
                <select
                  v-model="interest_category"
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm border-gray-300 rounded-md"
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
                <p class="text-red-500 text-xs italic py-1">{{ errors[0] }}</p>
              </ValidationProvider>

              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Daftar
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <FooterForm :status="false" />
    </div>
  </div>
</template>
<script>
import * as Cookies from 'js-cookie'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import FooterForm from '~/components/auth/FooterForm.vue'

export default {
  name: 'SignUpComponent',
  components: {
    ValidationProvider,
    ValidationObserver,
    FooterForm
  },

  props: {
    errorMessage: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      categories: [{ id: '', name: '' }],
      email: '',
      password: '',
      password_confirmation:'',
      name: '',
      phone: '',
      interest_category: ''
    }
  },

  mounted () {
    this.fetchCategories()
  },

  methods: {
    onSubmit () {

      if (this.password !== this.password_confirmation) return

      this.$emit('submit', {
        name: this.name,
        phone: this.phone,
        email: this.email.toLowerCase(),
        password: this.password,
        password_confirmation: this.password_confirmation,
        interest_category: this.interest_category,
        utm: Cookies.get('utm_source') ? {
          utm_source: Cookies.get('utm_source') ? Cookies.get('utm_source') : '',
          utm_campaign: Cookies.get('utm_source') ? Cookies.get('utm_source') : '',
          utm_medium: Cookies.get('utm_source') ? Cookies.get('utm_source') : ''
        } : ''
      })
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
    }
  }
}
</script>
