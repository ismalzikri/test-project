<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-body p-5">
      <div v-if="loadinglist" class="text-center">
        <p class="text-center">Loading...</p>
      </div>
      <div
        v-else-if="list.length > 0"
        class="w-full flex flex-col justify-between"
      >
        <div class="flex justify-between">
          <span>Voucher Yang Tersedia</span>
          <img
            src="https://storage.caribarang.id/general/Caribarang-8/294bcfd5-4ee6-4320-9569-0211b1fc9516.svg"
            alt="icon-close"
            class="cursor-pointer"
            @click="$emit('close')"
          />
        </div>

        <div class="flex flex-col gap-5 mt-4">
          <button
            v-for="(item, index) in list"
            :key="index"
            :disabled="isVoucherDisabled(item)"
            :class="[
              isVoucherDisabled(item) ? 'bg-[#F5F5F5]' : 'border-gray-300',
              isVoucherSelected(item) ? 'bg-[#EFF7FF] border-[#086DE3]' : '',
            ]"
            class="flex items-center justify-between border rounded-lg p-4"
            @click="selectVoucher(item.voucher_name, item.voucher_code, index)"
          >
            <div>
              <div class="flex flex-col items-start">
                <span
                  :class="
                    !item.status || isVoucherDisabled(item)
                      ? 'text-[#AAAAAA]'
                      : ''
                  "
                  class="text-sm font-medium"
                >
                  {{ item.voucher_name }}
                </span>
                <span class="text-sm text-[#AAAAAA] mt-1">{{
                  item.voucher_description
                }}</span>
              </div>
              <div class="flex items-center gap-3 mt-3">
                <img
                  src="https://storage.caribarang.id/general/Caribarang-8/12b09c97-30eb-405d-a276-c0b75c127469.svg"
                  alt="icon-time"
                />
                <p
                  :class="
                    !item.status || isVoucherDisabled(item)
                      ? 'text-[#AAAAAA]'
                      : 'text-[#E64123]'
                  "
                  class="text-xs"
                >
                  {{ item.expired_at }}
                </p>
              </div>
            </div>
            <div
              v-if="
                item.voucher_code == selectedVoucherCode ||
                  item.voucher_code == voucherCode
              "
            >
              <img
                src="https://storage.caribarang.id/general/Caribarang-8/4dfbfc6a-8dd4-4943-9879-96ed6bf2df1f.svg"
                alt="icon-checklist"
              />
            </div>
          </button>
        </div>
        <div class="mt-12">
          <button
            :disabled="selectedVoucherCode === ''"
            :class="[
              selectedVoucherCode === '' ? 'bg-[#AAAAAA]' : 'bg-[#0EA5E9]',
            ]"
            class="w-full py-2 rounded-md text-white font-medium"
            @click="confirmation"
          >
            {{ loading ? 'loading...' : 'konfirmasi' }}
          </button>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center gap-3">
        <img
          src="https://storage.caribarang.id/general/Caribarang-8/1ba1a71c-b49e-45e0-b00f-e2ac6eaa665b.svg"
          alt="no-item-voucher"
        />
        <p class="font-medium text-[#0E4E9B]">
          Maaf, saat ini voucher tidak tersedia
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ListDesktop',

  // eslint-disable-next-line vue/require-prop-types
  props: ['list', 'loadinglist'],

  data () {
    return {
      errorMessage: '',
      selectedVoucherName: '',
      selectedVoucherCode: '',
      loading: false
    }
  },

  computed: {
    ...mapState(['voucherName', 'voucherCode'])
  },

  methods: {
    ...mapActions(['setVoucherName', 'setVoucherCode']),

    selectVoucher (name, code) {
      if (code === this.selectedVoucherCode) {
        name = ''
        code = ''
      } else if (code === this.voucherCode) {
        name = ''
        code = ''
        this.setVoucherName('')
        this.setVoucherCode('')
      }

      this.selectedVoucherName = name
      this.selectedVoucherCode = code
    },

    isVoucherDisabled (voucher) {
      if (
        (this.selectedVoucherCode &&
          voucher.voucher_code !== this.selectedVoucherCode) ||
        (voucher.voucher_code !== this.voucherCode && this.voucherCode !== '')
      ) {
        return true
      } else if (!voucher.status) {
        return true
      }
      return false
    },
    isVoucherSelected (voucher) {
      if (
        (this.selectedVoucherCode &&
          voucher.voucher_code === this.selectedVoucherCode) ||
        voucher.voucher_code === this.voucherCode
      ) {
        return true
      }
      return false
    },

    confirmation () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.setVoucherName(this.selectedVoucherName)
        this.setVoucherCode(this.selectedVoucherCode)
        this.$emit('close')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.modal-body {
  position: absolute;
  width: 35%;
  background-color: #fff;
  border-radius: 8px;
}
</style>
