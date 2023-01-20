<template>
  <div>
    <div class="border-b border-gray-100 pb-2 uppercase text-sm text-gray-600">
      Ubah Password
    </div>
    <div class="w-full md:w-2/4">
      <div v-show="errorMessage" class="py-2">
        <cb-alert title="Error" icon="fas fa-exclamation-circle" color="danger">
          <p>{{ errorMessage }}</p>
        </cb-alert>
      </div>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form method="POST" class="" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="password"
            rules="required"
          >
            <label for="password" class="block text-xs text-gray-600"
            >Password</label
            >
            <div class="mt-1">
              <input
                v-model="password"
                type="password"
                name="password"
                class="shadow-sm focus:ring-indigo-500 focusp:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <p class="text-xs text-red-600">{{ errors[0] }}</p>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="new_password"
            rules="required"
          >
            <label for="new_password" class="block text-xs text-gray-600"
            >Password baru</label
            >
            <div class="mt-1">
              <input
                v-model="new_password"
                type="password"
                name="new_password"
                class="shadow-sm focus:ring-indigo-500 focusp:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <p class="text-xs text-red-600">{{ errors[0] }}</p>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="confirm_password"
            rules="required"
          >
            <label for="confirm_password" class="block text-xs text-gray-600"
            >Konfirmasi password</label
            >
            <div class="mt-1">
              <input
                v-model="confirm_password"
                type="password"
                name="confirm_password"
                class="shadow-sm focus:ring-indigo-500 focusp:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
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
  name: 'ChangePassword',

  components: {
    CbButton,
    ValidationProvider,
    ValidationObserver,
    CbAlert
  },

  data () {
    return {
      password: '',
      new_password: '',
      confirm_password: '',
      errorMessage: ''
    }
  },

  methods: {
    async onSubmit () {
      try {
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$patch(
          '/api/account/change-password',
          {
            old_password: this.password,
            password: this.new_password,
            password_confirmation: this.confirm_password
          }
        )
        this.$store.dispatch('setLoading', false)
        if (!status) {
          this.errorMessage = message
        } else {
          this.password = ''
          this.new_password = ''
          this.confirm_password = ''
          return this.$swal.fire(
            'Berhasil!',
            'Password berhasil diganti',
            'success'
          )
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>
