<template>
  <div
    class="fixed bg-red bottom-5 md:bottom-10 right-2 sm:right-10 md:right-20 bg-red z-100"
  >
    <button
      class="bg-emerald-500 text-white active:bg-emerald-600 font-bold px-2 py-2 sm:px-3 sm:py-3 uppercase text-base rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 relative"
      type="button"
      @click="onChat"
    >
      <img
        src="https://caribarang.oss-ap-southeast-1.aliyuncs.com/identity/wa-icon.png"
        width="40"
        height="40"
        alt="whatsapp-icon"
        class="transform transition duration-200 hover:scale-110"
      />
    </button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as Cookies from 'js-cookie'
export default {
  name: 'CsButton',
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },

  methods: {
    onChat () {
      const lastUrl = window.location.href
      const utmSource = Cookies.get('utm_source') ? Cookies.get('utm_source') : ''
      this.$gtm.push({ event: 'Klik WA', user: this.user })
      let message = `${lastUrl}%0a%0a Hi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊`
      const routeName = this.$route.name
      if (utmSource) {
        if (utmSource === 'Faceboook' || utmSource.includes('FB')) {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Home, FB/IG) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          default:
            message =
              '(Home, FB/IG) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
            break
          }
        }

        if (utmSource.includes('tiktok')) {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Home, Tiktok) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          default:
            message =
              '(Home, TikTok) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
            break
          }
        }

        if (utmSource.includes('ig')) {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Home, IG) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          default:
            message =
              '(Home, IG) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
            break
          }
        }

        if (utmSource.includes('instagram/lnk_at')) {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Home_IGLinkAt) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          case 'products-chinese-new-year':
            message =
              '(Home_IGLinkAt) %0a%0aHai admin! Aku lihat rekomendasi produk dagangan imlek di Caribarang.id, mau tanya-tanya dong! 🙏😊'
            break
          default:
            message =
              '(Home_IGLinkAt) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
            break
          }
        }

        if (utmSource === 'ig/instastoryorganic') {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Story, Instagram) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          default:
            message =
              '(Story, Instagram) %0a%0aHi admin Caribarang.id, aku tertarik untuk impor barang dagangan dari China dong!🙏😊'
            break
          }
        }

        if (utmSource.includes('google')) {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Home, Google) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          default:
            message =
              '(Home, Google) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
            break
          }
        }

        if (utmSource.includes('wablast')) {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Home, Wa Blast) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          default:
            message =
              '(Home, WA Blast) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
            break
          }
        }

        if (utmSource.includes('emailblast')) {
          switch (routeName) {
          case 'events-slug':
            message =
              '(Home, Email) %0a%0aHai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
            break
          default:
            message =
              '(Home, Email) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
            break
          }
        }
      } else if (routeName === 'index') {
        message =
          '(Home) %0a%0aHi Admin Cari Barang.id, tolong bantu cari barang dari China dong! 🙏😊'
      } else if (routeName === 'products-id') {
        message = `Hi Admin Cari Barang.id, tolong carikan barang ini dong:%0a ${lastUrl}%0a 🙏😊`
      } else if (routeName === 'events-slug') {
        message =
          'Hai admin! Aku lihat info di website dan tertarik untuk konsultasi impor sama Caca, boleh tanya-tanya gak? 🙏😊'
      }

      if (this.$isMobile()) {
        return window.open(
          `whatsapp://send?phone=${this.phone}&text=${message}`,
          '_blank'
        )
      } else {
        return window.open(
          `https://api.whatsapp.com/send?phone=${this.phone}&text=${message}`,
          '_blank'
        )
      }
    }
  }
}
</script>
