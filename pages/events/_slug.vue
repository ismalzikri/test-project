<template>
  <div class="relative">
    <div class="bg-white">
      <NewNavbar />
      <section class="hero w-full">
        <div class="hero__explain p-16 lg:p-32 2xl:p-40">
          <div class="mb-5 lg:mb-7">
            <h1 class="text-left w-[500px] leading[80%] lg:leading-[140%] text-white font-bold">
              Selangkah Lebih Dekat dengan Bisnis Impian
            </h1>
          </div>
          <div class="mb-14 lg:mb-10">
            <p class="text-left font-normal leading-[30px] lg:leading-[32px] text-white w-[400px] 2xl:w-[600px]">
              Kesempatan untuk kamu mendapatkan asistensi personal belanja
              produk online langsung dari supplier China dengan tim profesional
              <b>Caribarang.id</b>.
            </p>
          </div>
          <button
            class="whitespace-normal button cursor-pointer p-2 text-white rounded-lg bg-[#E64123] italic"
            @click="toSection">
            Klik disini untuk ketemu Caca
          </button>
        </div>
      </section>
      <section class="mt-16 lg:mt-[150px] service-ask">
        <div class="service-wrap p-3 mb-28 flex justify-center items-center gap-10">
          <div>
            <figure class="">
              <img
                class="h-[300px] lg:h-[620px]"
                src="https://storage.caribarang.id/general/Jeffri-8/9c97319a-0e72-4b11-aea4-7a5c45bed917.webp"
                alt="caca" />
            </figure>
          </div>
          <div class="flex flex-col gap-8">
            <div class="wrap-ask-caca">
              <h2 class="text-[#004B9C] font-semibold text-[20px] lg:text-3xl">
                Apa itu layanan
              </h2>
              <h2 class="text-[#E64123] font-semibold text-[22px] lg:text-[54px]">
                Ketemu Caca?
              </h2>
            </div>
            <div class="flex justify-center">
              <p class="caca-explain text-[#004B9C] text-[14px] lg:text-[22px] w-[300px] lg:w-[700px]">
                Ketemu Caca adalah salah satu program unggulan dari
                <b>Caribarang.id</b> khusus untuk membantu kamu para pegiat
                bisnis yang ingin berbelanja di marketplace China lewat
                <b>Caribarang.id</b>. Dengan Ketemu Caca, kamu akan mendapatkan
                asistensi personal dengan tim CS dan tim Purchasing yang
                berpengalaman.
              </p>
            </div>
            <div>
              <p class="service-repentetation text-[#004B9C] text-[22px] lg:text-[32px] lg:w-[700px]">
                Layanan belanja produk dari China tidak pernah senyaman ini!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="service-explain">
        <div class="bg-[#CAD2DC] relative">
          <div class="pt-10 lg:pt-28 flex flex-col justify-center items-center">
            <h2 class="text-[20px] lg:text-4xl text-[#004B9C] font-bold mb-6">
              Apa yang kamu dapatkan?
            </h2>
            <div class="mb-52">
              <p class="text-center text-[16px] lg:text-[22px] text-[#004B9C] w-[325px] lg:w-[950px]">
                <b>Caribarang.id</b> bisa membantu kamu dalam mengembangkan
                bisnis impianmu lewat pencarian barang grosir dari marketplace
                di China dengan program ini. Kalau kamu Ketemu Caca, kamu akan
                dijelaskan secara detail mengenai proses belanja grosir dari
                China lewat <b>Caribarang.id</b>. Tak hanya itu, kamu juga akan
                terhubung di dalam grup eksklusif dengan tim purchasing kami
                yang akan membantu kamu untuk meng-impor produk.
              </p>
            </div>
            <div class="desktop-service lg:absolute lg:bottom-[120px] flex flex-col gap-10">
              <div class="wrap-explain flex items-center">
                <div class="relative left">
                  <div class="bg-[#006597] px-8 py-2.5 rounded-tl-xl rounded-bl-xl">
                    <figure class="flex flex-col items-center">
                      <img
                        class="mb-4"
                        src="https://storage.caribarang.id/general/Jeffri-8/65a48aa8-050a-4914-a5fc-a6872f007038.webp"
                        alt="konsultasi" />
                      <p class="text-[22px] leading-8 font-bold text-white text-center w-[224px]">
                        Konsultasi Pencarian Barang Termurah
                      </p>
                    </figure>
                  </div>
                  <div
                    class="absolute -top-2.5 -left-4 w-[3px] h-[32px] p-6 shadow-md flex items-center justify-center text-white rounded-full bg-[#E64123]">
                    01
                  </div>
                </div>
                <div class="right bg-white rounded-tr-xl rounded-br-xl">
                  <p class="p-11 text-[14px] lg:text-[22px] text-center leading-[28px] w-full lg:w-[600px]">
                    Tim kami siap membantu kamu untuk mendapatkan produk
                    termurah yang bisa memaksimalkan <b>KEUNTUNGAN</b>
                  </p>
                </div>
              </div>
              <div class="wrap-explain flex items-center">
                <div class="relative left">
                  <div class="bg-[#006597] px-5 py-2.5 rounded-tl-xl rounded-bl-xl">
                    <figure class="flex flex-col items-center">
                      <img
                        class="mb-4"
                        src="https://storage.caribarang.id/general/Jeffri-8/bddb277e-c316-4233-a8f6-aeba553e1ba4.webp"
                        alt="rekomendasi" />
                      <span class="text-[22px] leading-8 font-bold text-white text-center w-[250px]">Rekomendasi
                        Supplier di China
                      </span>
                    </figure>
                  </div>
                  <div
                    class="absolute text-white -top-2.5 -left-4 w-[32px] h-[32px] p-6 shadow-md flex items-center justify-center rounded-full bg-[#E64123]">
                    02
                  </div>
                </div>
                <div class="right bg-white rounded-tr-xl rounded-br-xl">
                  <p class="p-11 text-[14px] lg:text-[22px] text-center leading-[28px] w-full lg:w-[600px]">
                    Dengan tim purchasing professional yang fasih berbahasa
                    Mandarin, kami akan merekomendasikan
                    <b>SUPPLIER TERBAIK</b> untuk kamu.
                  </p>
                </div>
              </div>
              <div class="wrap-explain flex items-center">
                <div class="relative left">
                  <div class="bg-[#006597] px-8 py-2.5 rounded-tl-xl rounded-bl-xl">
                    <figure class="flex flex-col items-center">
                      <img
                        class="mb-2"
                        src="https://storage.caribarang.id/general/Jeffri-8/85931eb3-3945-4519-8dc1-5587f36aad14.webp"
                        alt="bantuan" />
                      <span class="text-[22px] leading-8 font-bold text-white text-center w-[221px]">Bantuan Langsung
                        dari Expert</span>
                    </figure>
                  </div>
                  <div
                    class="absolute text-white -top-2.5 -left-4 w-[32px] h-[32px] p-6 shadow-md flex items-center justify-center rounded-full bg-[#E64123]">
                    03
                  </div>
                </div>
                <div class="right bg-white rounded-tr-xl rounded-br-xl">
                  <p class="p-[53px] text-[22px] text-center leading-[28px] w-[600px]">
                    <b>DIRECT SUPPORT</b> via WhatsApp Group setelah transaksi
                    pertama selesai dilakukan.
                  </p>
                </div>
              </div>
            </div>

            <div class="mobile-service -mt-36 mb-5">
              <div class="flex items-center p-4">
                <div
                  class="px-5 py-2.5 rounded-tl-md rounded-bl-md flex flex-col items-center justify-center bg-[#006597]">
                  <figure class="mb-2 flex flex-col items-center">
                    <img
                      width="32"
                      src="https://storage.caribarang.id/general/Jeffri-8/65a48aa8-050a-4914-a5fc-a6872f007038.webp"
                      alt="konsultasi" />
                  </figure>
                  <span class="text-white text-center text-[12px]">Konsultasi Pencarian Barang Termurah</span>
                </div>
                <div class="bg-white p-8 rounded-tr-md rounded-br-md">
                  <p class="text-center text-[#171717] text-[12px]">
                    Tim kami siap membantu kamu untuk mendapatkan produk
                    termurah yang bisa memaksimalkan <b>KEUNTUNGAN</b>
                  </p>
                </div>
              </div>
              <div class="flex items-center p-4">
                <div
                  class="px-4 py-5 rounded-tl-md rounded-bl-md flex flex-col items-center justify-center bg-[#006597]">
                  <figure class="mb-2">
                    <img
                      width="32"
                      src="https://storage.caribarang.id/general/Jeffri-8/bddb277e-c316-4233-a8f6-aeba553e1ba4.webp"
                      alt="rekomendasi" />
                  </figure>
                  <span class="text-white text-center text-[12px]">Rekomendasi Supplier di China
                  </span>
                </div>
                <div class="bg-white p-6 rounded-tr-md rounded-br-md">
                  <p class="text-center text-[#171717] text-[12px]">
                    Dengan tim purchasing professional yang fasi berbahasa
                    Mandarin, kami akan merekomendasikan
                    <b>SUPPLIER TERBAIK</b> untuk kamu.
                  </p>
                </div>
              </div>
              <div class="flex items-center p-4">
                <div
                  class="px-7 py-4 rounded-tl-md rounded-bl-md flex flex-col items-center justify-center bg-[#006597]">
                  <figure class="mb-2">
                    <img
                      width="32"
                      src="https://storage.caribarang.id/general/Jeffri-8/85931eb3-3945-4519-8dc1-5587f36aad14.webp"
                      alt="bantuan" />
                  </figure>
                  <span class="text-white text-center text-[12px]">Bantuan Langsung dari Expert</span>
                </div>
                <div class="bg-white p-8 rounded-tr-md rounded-br-md">
                  <p class="text-center text-[#171717] text-[12px]">
                    Tim kami siap membantu kamu untuk mendapatkan produk
                    termurah yang bisa memaksimalkan <b>KEUNTUNGAN</b>
                  </p>
                </div>
              </div>
            </div>

            <figure class="hidden lg:block">
              <img
                src="https://storage.caribarang.id/general/Jeffri-8/ed0af0c6-3c15-423c-bbad-df2daa271e80.webp"
                alt="world" />
            </figure>
          </div>
        </div>
      </section>
      <section class="testimonial mt-48 lg:mt-0 p-8 lg:p-28">
        <figure class="hidden lg:block ml-12 2xl:ml-32">
          <img
            src="https://storage.caribarang.id/general/Jeffri-8/5622d157-c72d-487b-8b47-6e1a41709181.webp"
            width="350" height="350" alt="just-quote" />
        </figure>
        <div class="relative flex justify-center">
          <div class="absolute -top-48 flex flex-col justify-center items-center">
            <p class="text-[#004B9C] text-lg lg:text-4xl text-center w-[350px] lg:w-[695px] font-bold">
              Ini cerita mereka yang sudah pernah mengikuti program
              <span class="text-[#E64123]">Ketemu Caca</span>
            </p>
          </div>
        </div>
        <div v-if="testimon.length > 0" class="relative lg:px-28 2xl:px-64 -mt-20 lg:-mt-12">
          <div class="hidden lg:block absolute top-48 lg:-left-2 2xl:left-20">
            <button style="transform: scaleX(-1)" class="border rounded-full w-10 h-10 group" @click="prev()">
              <i class="fas fa-angle-right text-lg text-gray-700 group-hover:text-primary-color-hover"></i>
            </button>
          </div>
          <vue-slick-carousel
            ref="carousel" :arrows="true" :draggable="false" :fade="true" :infinite="true"
            :dots="true" :autoplay="true" :autoplay-speed="5000">
            <div v-for="(item, index) in testimon" :key="index" class="bg-white shadow-lg rounded-lg overflow-hidden">
              <div class="wrap-card flex">
                <div class="flex-none w-full lg:w-72">
                  <img :src="item.image" class="w-full h-full object-cover" alt="" />
                </div>
                <div class="relative p-5 lg:p-14">
                  <div class="relative flex flex-col">
                    <div class="flex flex-col">
                      <span class="text-[#004B9C] text-base lg:text-4xl font-bold mb-2">{{ item.name }}</span>
                      <span class="text-[#004B9C] text-sm lg:text-[22px] font-light">{{ item.profession }}, {{
                        item.address
                      }}</span>
                    </div>
                    <div class="mt-4 lg:mt-8">
                      <p class="text-[12px] lg:text-[22px] lg:w-[600px] text-[#171717]">
                        {{ item.testimoni }}
                      </p>
                    </div>
                  </div>
                  <div class="hidden lg:absolute -bottom-20 -right-10">
                    <img
                      src="https://storage.caribarang.id/general/Jeffri-8/38619c2c-abf9-4558-8e3f-ef7483be78aa.webp"
                      alt="ellips" />
                  </div>
                </div>
              </div>
            </div>
          </vue-slick-carousel>
          <div class="hidden lg:block absolute top-48 lg:right-2 2xl:right-32">
            <button class="border rounded-full w-10 h-10 group" @click="next">
              <i class="fas fa-angle-right text-lg group-hover:text-primary-color-hover"></i>
            </button>
          </div>
        </div>
      </section>
      <section class="submit-form mt-10">
        <div class="flex flex-col justify-center items-center">
          <div class="flex items-center justify-between gap-14">
            <div class="flex flex-col justify-end">
              <h2 class="text-[2rem] w-full lg:w-[400px] lg:text-6xl text-[#004B9C] text-center lg:text-left font-bold">
                Saatnya <span class="text-[#E64123]">Ketemu Caca</span>
              </h2>
              <p
                class="mt-5 text-base leading-6 lg:leading-8 lg:text-[26px] text-[#004B9C] w-[375px] lg:w-[500px] text-center lg:text-left">
                Jangan lewatkan kesempatan terbatas untuk kembangkan bisnismu.
                <b>Daftar segera!</b>
              </p>
            </div>
            <div class="hidden lg:block">
              <img
                src="https://storage.caribarang.id/general/Jeffri-8/7ec8155d-4ef5-4032-8048-95527eaef7f5.webp"
                alt="caca" />
            </div>
          </div>
          <div class="bg-[#EDF5FF] mt-8 lg:mt-0 rounded-lg">
            <form
              id="forms" class="w-full relative flex gap-10 lg:gap-20 pt-12 px-5 lg:px-14"
              @submit.prevent="handleSubmit">
              <div class="left">
                <div>
                  <span class="text-lg font-bold">Informasi Customer</span>
                  <div class="mt-4">
                    <label class="flex flex-col">
                      <div class="flex">
                        <span>Nama</span>
                        <b class="text-red-500">*</b>
                      </div>
                      <input
                        v-model="form.name" type="text" placeholder="Jhon Doe" required autocomplete="name"
                        class="placeholder-slate-300" />
                    </label>
                    <label class="flex flex-col">
                      <div class="flex">
                        <span>Nomor Telepon</span>
                        <b class="text-red-500">*</b>
                      </div>
                      <input
                        v-model="form.phone" type="text" placeholder="08123456789" required autocomplete="phone"
                        class="placeholder-slate-300" @keypress="$mustNumber" />
                    </label>
                    <label class="flex flex-col">
                      <div class="flex">
                        <span>Email</span>
                        <b class="text-red-500">*</b>
                      </div>
                      <input
                        v-model="form.email" type="email" placeholder="jondoe@gmail.com" required
                        autocomplete="email" class="placeholder-slate-300" />
                    </label>
                  </div>
                </div>
                <div>
                  <span class="text-lg font-bold">Informasi Usaha</span>
                  <div class="mt-4">
                    <label class="flex flex-col">
                      Link toko penjualan
                      <input
                        v-model="form.shop_link" type="text" placeholder="shopee.co.id/aceindonesia"
                        class="placeholder-slate-300" />
                    </label>
                    <label class="flex flex-col">
                      Kategori Barang
                      <input
                        v-model="form.shop_category" type="text" placeholder="Home appliances"
                        class="placeholder-slate-300" />
                    </label>
                    <label class="flex flex-col">
                      Alamat Toko Offline
                      <input
                        v-model="form.shop_address" type="text" placeholder="1916 Breitenberg Tunnel"
                        class="placeholder-slate-300" />
                    </label>
                    <label class="flex flex-col">
                      Belanja Stok Tiap Bulan
                      <select id="isStock" @change="handleChange($event, 'isStock')">
                        <option selected disabled>Pilih range</option>
                        <option value="<10jt">10jt</option>
                        <option value="10jt - 20jt">10jt - 20jt</option>
                        <option value="20jt - 30jt">20jt - 30jt</option>
                        <option value="30jt - 40jt">30jt - 40jt</option>
                        <option value="40jt - 50jt">40jt - 50jt</option>
                        <option value="50jt - 100jt">50jt - 100jt</option>
                        <option value=">100jt">>100jt</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>
                  <span class="text-lg font-bold">Aktifitas Impor</span>
                  <div class="mt-4">
                    <label class="flex flex-col">
                      Sudah Pernah Import atau Belum?
                      <select
                        id="isImport" class="flex flex-col"
                        @change="handleChange($event, 'isImport')">
                        <option selected disabled>Pilih Opsi</option>
                        <option value="0">Belum</option>
                        <option value="1">Sudah</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div class="mb-20">
                  <span class="text-lg font-bold">Jadwal kunjungan</span>
                  <div class="mt-4">
                    <label class="flex flex-col">
                      <div class="flex">
                        <span>Tanggal Berkunjung</span>
                        <b class="text-red-500">*</b>
                      </div>
                      <input
                        v-model="form.visit_plan" type="text" placeholder="Pilih Tanggal Berkunjung"
                        class="placeholder-slate-300" onfocus="(this.type='date')"
                        onblur="(this.value == '' ? this.type='text' : this.type='date')" required />
                    </label>
                    <label class="flex flex-col">
                      <div class="flex">
                        <span>Waktu Berkunjung</span>
                        <b class="text-red-500">*</b>
                      </div>
                      <input
                        v-model="form.visit_time" type="text" placeholder="Pilih Waktu Berkunjung"
                        class="placeholder-slate-300" onfocus="(this.type='time')"
                        onblur="(this.value == '' ? this.type='text' : this.type='time')" required />
                    </label>
                  </div>
                </div>
                <div class="hidden lg:block">
                  <img
                    src="https://storage.caribarang.id/general/Jeffri-8/9816b850-8c7e-4f19-8965-53b9f3f738d4.webp"
                    alt="cb-small" />
                </div>
              </div>
              <div class="block -mt-20 mb-10 lg:absolute lg:bottom-10 right-20">
                <button
                  type="submit"
                  class="bg-[#004B9C] rounded-md py-2 px-10 lg:py-3 lg:px-20 text-[18px] text-white">
                  {{ isLoading ? 'Loading..' : 'Submit' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div class="my-14 lg:my-28"></div>
      <Footer />
    </div>
    <div v-if="triggerPopup" class="pop-up px-5 lg:px-96">
      <transition name="pop" appear>
        <div
          v-click-outside="onClickOutside"
          class="rounded-lg shadow-lg flex flex-col items-center justify-center bg-white p-5">
          <div>
            <img
              src="https://storage.caribarang.id/general/Jeffri-8/3516fa20-ac81-4d1b-a762-8be5138d3e0d.webp"
              alt="icon success" />
          </div>
          <div class="mt-4 justify-center items-center flex flex-col gap-2">
            <h2 class="text-[38px] text-[#004B9C] font-bold">Terima Kasih!</h2>
            <span class="text-[22px] text-[#004B9C] text-center">Pendaftaran kamu telah kami terima</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Vue from 'vue'
import Footer from '../../components/SimpleFooter.vue'
import NewNavbar from '../../components/Small/NewNavbar/NewNavbar.vue'

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

export default {
  name: 'EventDetail',

  components: {
    VueSlickCarousel,
    NewNavbar,
    Footer
  },
  layout: 'event',

  data () {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        shop_link: '',
        shop_address: '',
        shop_category: '',
        transaction_per_month: '',
        visit_plan: '',
        visit_time: '',
        is_import: ''
      },
      testimon: [],
      isLoading: false,
      triggerPopup: false
    }
  },

  mounted () {
    this.getTestomonial()
  },

  methods: {
    toSection () {
      document
        .querySelector('.service-ask')
        .scrollIntoView({ behavior: 'smooth' })
    },

    onClickOutside () {
      this.triggerPopup = false
    },

    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    },

    handleChange (event, source) {
      if (source === 'isImport') {
        this.form.is_import = event.target.value
      }
      if (source === 'isStock') {
        this.form.transaction_per_month = event.target.value
      }
    },

    async getTestomonial () {
      try {
        const resp = await this.$axios.get('api/testimonials')
        this.testimon = resp.data.data
      } catch (error) {
        console.log(error)
      }
    },

    async handleSubmit () {
      const select1 = document.getElementById('isImport')
      const select2 = document.getElementById('isStock')

      try {
        this.isLoading = true
        const resp = await this.$axios.post('api/visitors', this.form)
        if (!resp.data.status) return this.$swal.fire('Error!', resp.data.message, 'danger')
        this.$gtm.push({ event: 'Ketemu Caca Leads', email: this.form.email})
        this.triggerPopup = true
        this.isLoading = false
        // eslint-disable-next-line no-return-assign
        Object.keys(this.form).forEach((key) => (this.form[key] = ''))
        select1.value = ''
        select2.value = ''

        setTimeout(() => {
          this.triggerPopup = false
        }, 2000)
      } catch (error) {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin respond($breakpoint) {
  @if ($breakpoint ==medium) {
    @media (max-width: 768px) {
      @content;
    }
  }
}

.pop-up {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.wrap-header {
  @include respond(medium) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.nav-menu {
  @include respond(medium) {
    position: fixed;
    z-index: 2;
    left: -100%;
    top: 3.7rem;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);

    &.active {
      left: 0;
    }
  }

  &__item {
    padding: 5px 5px;
    white-space: nowrap;
    transition: 0.8s;
    list-style: none;
    border: none;
    color: #424242;
    font-weight: 500;

    @include respond(medium) {
      padding: 15px 5px 15px;
    }

    &:hover {
      border-radius: 2px;
      background: #edf5ff;
      box-shadow: inset 0px -3px 0px #004b9c;

      @include respond(medium) {
        box-shadow: none;
      }
    }
  }
}

.hamburger {
  display: none;

  @include respond(medium) {
    display: block;
    cursor: pointer;

    &.active &__bar:nth-child(2) {
      opacity: 0;
    }

    &.active &__bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    &.active &__bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  &__bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #101010;
  }
}

.hero {
  margin: 0;
  height: 760px;
  background: url('https://storage.caribarang.id/general/Jeffri-8/c6b95bf1-1fd9-41fd-9bf6-22420fb6f9be.webp');
  background-position: center;
  background-attachment: fixed;
  background-size: cover;

  &__explain {
    @include respond(medium) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  @include respond(medium) {
    background: url('https://storage.caribarang.id/general/Admin-Caribarang-8/ee847ce8-546f-497c-8fc9-f3bc02c2e74b.webp');
    background-size: cover;
  }

  h1 {
    font-size: 40px;

    @include respond(medium) {
      font-size: 25px;
      width: 350px;
    }
  }

  p {
    font-size: 24px;

    @include respond(medium) {
      font-size: 16px;
      width: 300px;
    }
  }

  .button {
    img {
      @include respond(medium) {
        width: 55px;
        height: 55px;
      }
    }
  }
}

.button {
  -webkit-animation: bounce 2s infinite 2s;
  animation: bounce 2s infinite 2s;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.slick {
  &-dots {
    bottom: 20px !important;
  }
}

.wrap-card {
  @include respond(medium) {
    flex-direction: column;
  }
}

.service-wrap {
  @include respond(medium) {
    flex-direction: column;
  }
}

.wrap-ask-caca {
  @include respond(medium) {
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
  }
}

.caca-explain {
  @include respond(medium) {
    text-align: center;
  }
}

.service-repentetation {
  @include respond(medium) {
    text-align: center;
  }
}

.wrap-explain {
  @include respond(medium) {
    flex-direction: column;
  }
}

.desktop-service {
  @include respond(medium) {
    display: none;
  }
}

.mobile-service {
  display: none;

  @include respond(medium) {
    display: block;
  }
}

form {
  @include respond(medium) {
    flex-direction: column;
    align-items: center;
  }
}

label {
  font-weight: 400;
  color: #424242;
  margin-bottom: 1.25rem;
}

input {
  height: 35px;
  border-radius: 8px;
  width: 20rem;
  margin-top: 10px;
  border: 1px solid #c2c2c2;
}

select {
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #c2c2c2;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

@keyframes bounce {
  0%,
  100%,
  20%,
  50%,
  80% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }

  40% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
  }

  60% {
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
  }
}
</style>
