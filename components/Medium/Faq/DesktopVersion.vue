<template>
  <section class="desktop mt-20 mb-32 flex justify-center gap-28">
    <div class="tabs-nav">
      <div>
        <span class="ml-2 text-[#004B9C] text-2xl font-semibold">Topik</span>
        <div class="border 1px solid my-6"></div>
      </div>
      <div>
        <div class="w-full">
          <div
            class="text-[#004B9C] text-[20px] py-2 px-3 cursor-pointer hover:bg-[#DAECFF] hover:ease-out duration-200 rounded-lg"
            @click="$emit('faq')"
          >
            FAQ
          </div>
          <ul class="nested mt-6">
            <li
              class="nested__item flex items-center hover:bg-[#DAECFF] hover:ease-out duration-200 py-2 rounded-lg gap-2"
              :class="[faq ? 'bg-[#DAECFF] font-semibold' : '']"
              @click="$emit('faq')"
            >
              <div class="dot" :class="[faq ? 'bg-[#0E4E9B]' : '']"></div>
              <span> Pengiriman Barang</span>
            </li>
            <li
              class="nested__item flex items-baseline hover:bg-[#DAECFF] hover:ease-out duration-200 py-2 rounded-lg gap-2"
              :class="[refund ? 'bg-[#DAECFF] font-semibold' : '']"
              @click="$emit('refund')"
            >
              <div class="dot" :class="[refund ? 'bg-[#0E4E9B]' : '']"></div>
              <span class="w-[190px]">Proses Pembayaran dan Refund</span>
            </li>
            <li
              class="nested__item flex items-baseline hover:bg-[#DAECFF] hover:ease-out duration-200 py-2 rounded-lg gap-2"
              :class="[account ? 'bg-[#DAECFF] font-semibold' : '']"
              @click="$emit('account')"
            >
              <div class="dot" :class="[account ? 'bg-[#0E4E9B]' : '']"></div>
              <span class="w-[160px]">Keamanan Akun dan Lainnya</span>
            </li>
          </ul>
        </div>
        <div
          class="text-[#004B9C] text-[20px] mt-5 py-2 px-3 cursor-pointer hover:bg-[#DAECFF] hover:ease-out duration-200 rounded-lg"
          :class="[term ? 'bg-[#DAECFF] font-semibold' : '']"
          @click="$emit('term')"
        >
          Syarat dan Ketentuan
        </div>
        <div
          class="text-[#004B9C] text-[20px] mt-5 py-2 px-3 cursor-pointer hover:bg-[#DAECFF] hover:ease-out duration-200 rounded-lg"
          :class="[privacy ? 'bg-[#DAECFF] font-semibold' : '']"
          @click="$emit('privacy')"
        >
          Kebijakan Privasi
        </div>
        <div
          class="text-[#004B9C] text-[20px] mt-5 py-2 px-3 cursor-pointer hover:bg-[#DAECFF] hover:ease-out duration-200 rounded-lg"
          :class="[contact ? 'bg-[#DAECFF] font-semibold' : '']"
          @click="$emit('contact')"
        >
          Hubungi Kami
        </div>
      </div>
    </div>
    <div class="tabs-content w-[60%] 2xl:w-[50%]">
      <div>
        <article v-if="faq" class="faq">
          <h1 class="text-[#004B9C] -ml-8 font-semibold text-3xl">
            Pertanyaan Seputar Pengiriman Barang
          </h1>
          <div class="faq__content -ml-8 mt-12">
            <accordion-component
              v-for="(item, index) in faqsDB.delivery"
              :key="index"
            >
              <template #title>
                <span class="font-bold text-md">{{ item.title }}</span>
              </template>
              <template #content>
                <ul
                  v-for="(list, idx) in item.content"
                  :key="idx"
                  class="list-disc ml-5"
                >
                  <li class="leading-6">{{ list.text }}</li>
                </ul>
              </template>
            </accordion-component>
          </div>
        </article>
        <article v-if="refund" class="refund">
          <h3 class="text-[#004B9C] -ml-8 font-semibold text-3xl w-[600px]">
            Pertanyaan Seputar Proses Pembayaran dan Refund
          </h3>
          <div class="refund__content -ml-8 mt-12">
            <accordion-component
              v-for="(item, index) in faqsDB.refund"
              :key="index"
            >
              <template #title>
                <span class="font-bold text-md">{{ item.title }}</span>
              </template>
              <template #content>
                <ul
                  v-for="(list, idx) in item.content"
                  :key="idx"
                  class="list-disc ml-5"
                >
                  <li class="leading-6">{{ list.text }}</li>
                </ul>
              </template>
            </accordion-component>
          </div>
        </article>
        <article v-if="account" class="account">
          <h3 class="text-[#004B9C] -ml-8 font-semibold text-3xl w-[600px]">
            Pertanyaan Seputar Keamanan Akun dan Lainnya
          </h3>
          <div class="account__content -ml-8 mt-12">
            <accordion-component
              v-for="(item, index) in faqsDB.account"
              :key="index"
            >
              <template #title>
                <span class="font-bold text-md">{{ item.title }}</span>
              </template>
              <template #content>
                <ul
                  v-for="(list, idx) in item.content"
                  :key="idx"
                  class="list-disc ml-5"
                >
                  <li class="leading-6">{{ list.text }}</li>
                </ul>
              </template>
            </accordion-component>
          </div>
        </article>
        <article v-if="term" class="term">
          <h3 class="text-[#004B9C] font-semibold text-3xl w-[600px]">
            Syarat dan Ketentuan
          </h3>
          <div class="term__content">
            <div
              class="w-full mt-6 prose prose-indigo prose-lg text-gray-600 mx-auto"
            >
              <p class="text-gray-700">Selamat Datang di CariBarang.id</p>
              <p class="py-2">
                Silahkan membaca Syarat &amp; Ketentuan pengguna berikut
                dengan cermat dan teliti. Dengan mengakses/menggunakan situs
                CariBarang.id, maka Anda telah dianggap telah membaca,
                memahami dan menyetujui semua isi dalam Syarat &amp; Ketentuan
                ini yang tidak dapat dicabut.
              </p>
              <p class="py-2">
                Apabila Anda berusia dibawah 17 tahun, Anda harus mendapatkan
                izin dari orang tua atau wali Anda dan bersedia untuk
                mengambil tanggung jawab atas konsekuensi atas semua
                penggunaan akun atau semua layanan CariBarang.id yang
                menggunakan akun tersebut . Apabila Anda tidak menyetujui
                Syarat &amp; Ketentuan pengguna berikut ini, maka Anda
                sebaiknya berhenti/tidak mengakses dan/atau menggunakan
                Platform atau Layanan CariBarang.id.
              </p>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Definisi:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  “Syarat &amp; Ketentuan” adalah perjanjian antara pihak
                  pengguna dan pihak CariBarang.id yang mengatur tanggung
                  jawab, hak dan kewajiban pengguna dan CariBarang.id dalam
                  hal menggunakan situs, bertransaksi, atau layanan yang
                  terkait lainnya pada situs dimana perusahaan beroperasi.
                </li>
                <li class="py-1.5">
                  “Kami”, “CariBarang.id” merujuk kepada PT. Digital Trading
                  Solusindo , adalah perusahaan yang didirikan untuk
                  menjalankan kegiatan usaha jasa web portal www.CariBarang.id
                </li>
                <li class="py-1.5">
                  “Anda”, “Pengguna” merujuk kepada orang atau badan hukum
                  yang berhasil atau ingin mendaftar akun dan berhak untuk
                  menggunakan fasilitas layanan pada situs CariBarang.id
                  dengan sah.
                </li>
                <li class="py-1.5">
                  “Akun” yang berarti akun yang dipergunakan oleh pengguna
                  untuk mengakses atau menggunakan layanan CariBarang.id,
                  termasuk namun tidak terbatas pada pembeli maupun hanya
                  sekedar berkunjung ke situs CariBarang.id.
                </li>
                <li class="py-1.5">
                  “Layanan” merujuk kepada jasa layanan yang kami sediakan
                  yaitu jasa pencarian, pembelian, dan pengiriman barang.
                </li>
                <li class="py-1.5">
                  “Hak Kekayaan Intelektual” merujuk pada kepemilikan kekayaan
                  intelektual (HAKI) termasuk namun tidak terbatas pada hak
                  cipta, paten, hak merek dagang, hak desain, hak model
                  utilitas, atau hak kekayaan intelektual lainnya yang ada di
                  dalam atau atas platform dan atas materi yang dimiliki,
                  dikuasai, kepemilikan lisensi oleh kami atau pemberi lisensi
                  kami atau penyedia layanan kami. Serta kami juga berhak
                  untuk menjaga kekayaan intelektual kami sepenuhnya sesuai
                  hukum. Tidak ada bagian dari platform atau material yang
                  dapat disimpan, dipasang atau dipergunakan dengan cara
                  apapun pada peralatan, situs, sistem atau server lain dengan
                  tujuan kepentingan non-pribadi dan komersial tanpa ada izin
                  tertulis sebelumnya dari kami atau pemilik hak cipta yang
                  bersangkutan.
                </li>
                <li class="py-1.5">
                  “Produk”, “Barang” adalah benda yang memiliki wujud atau
                  fisik yang tersedia dan dapat diantar atau dikirimkan, atau
                  dijual oleh jasa pengirim barang kepada Anda.
                </li>
                <li class="py-1.5">
                  “Hukum Yang Berlaku” adalah undang-undang, putusan,
                  keputusan, interpretasi, peraturan, aturan, adat, praktik,
                  arahan, pedoman, pemberitahuan, surat edaran, dan sejenisnya
                  yang berasal dari badan pengatur yang berwenang yang belaku
                  dan yang mengikat pihak-pihak yang bersangkutan dengan
                  penggunaan atau penawaran dari layanan.
                </li>
                <li class="py-1.5">
                  “Konten” adalah segala material, informasi, fungsi atau feed
                  dalam bentuk link, software, aplikasi, situs, warna, suara,
                  bunyi, gambar, video, atau dalam bentuk apapun yang
                  ditampilkan atau disediakan oleh perusahaan atau oleh pihak
                  ketiga yang sah.
                </li>
                <li class="py-1.5">
                  “Data Pribadi” adalah semua data atau informasi yang
                  dapat/sudah teridentifikasi secara otomatis/tersendiri atau
                  yang hasil kombinasi dengan informasi lainnya secara
                  langsung atau tidak langsung dan yang dapat dipergunakan
                  untuk mengidentifikasi, komunikasi atau mencari Anda.
                </li>
                <li class="py-1.5">
                  “Kerugian” berarti semua pertanggungan, aksi, proses, segala
                  biaya, kerugian, pembebanan, Tindakan, pengeluaran, claim,
                  penalty, tuntutan dan kewajiban lainnya, yang tidak dapat
                  diduga atau yang dapat diduga.
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Akun, Password dan Keamanan:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  Anda dengan ini menyatakan bahwa Anda telah membaca,
                  mengerti dan menyetujui perjanjian ini dengan sah menurut
                  hukum
                </li>
                <li class="py-1.5">
                  Anda telah membaca, mengerti dan menyetujui untuk tidak
                  memodifikasi, menggunakan, membongkar, menggandakan atau
                  melakukan kegiatan eksploitasi lainnya pada sistem,
                  jaringan, data, situs atau fasilitas CariBarang.id tanpa ada
                  izin yang sah dari kami.
                </li>
                <li class="py-1.5">
                  Pemilik akun hanya dapat mengakses dan menggunakan password
                  dan pada/atau area tertentu yang terlindungi pada layanan
                  atan platform. Anda tidak diperbolehkan berusaha untung
                  mencari atau memperoleh akses tidak sah (illegal) ke area
                  Platform dan/atau layanan ini, atau ke area informasi lain
                  yang dilindungi, dengan cara apapun yang tanpa izin yang sah
                  dari kami. Pelanggaran terhadap ketentuan ini merupakan
                  pelanggaran yang didasarkan pada hukum dan/atau sesuai
                  dnegan perundang-undangan dan peraturan yang berlaku.
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Persyaratan Penggunaan:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  Izin penggunaan situs dan layanan CariBarang.id berlaku
                  sampai diakhiri sebagaimana dalam Syarat dan Layanan ini
                  atau Anda gagal mematuhi persyaratan atau ketentuan apapun
                  dari halaman ini. Dalam hal demikian, kami dapat melakukan
                  pengakhiran tersebut dengan/tanpa pemberitahuan sebelumnya.
                </li>
                <li class="py-1.5">
                  <div class="">Anda dengan ini setuju untuk tidak:</div>
                  <ul class="list-disc ml-5">
                    <li class="py-1">
                      Memposting/memasang, memberikan, mengunggah,
                      menyediakan, atau mengirimkan konten/ulasan yang
                      melanggar hukum, berbahaya, ada Tindakan pengancaman
                      atau kriminalitas, kasar, melecehkan, pelanggaran
                      privasi pihak lain, berbau pornografi, mengandung unsur
                      SARA atau kebencian;
                    </li>
                    <li class="py-1">
                      Memposting/memasang, memberikan, mengunggah,
                      menyediakan, atau mengirimkan konten/ulasan yang berisi
                      anak di bawah umur yang tanpa adanya pengawasan atau
                      menggunakan layanan yang merugikan dengan cara apapun;
                    </li>
                    <li class="py-1">
                      Memposting/memasang, memberikan, mengunggah,
                      menyediakan, atau mengirimkan konten/ulasan yang tidak
                      berhak Anda sediakan berdasarkan hukum atau ikatan
                      kontrak termasuk 02informasi yang besifat
                      rahasia/eksklusif yang didapatkan sebagai bagian dari
                      perjanjian non pengungkapan
                    </li>
                    <li class="py-1">
                      Memposting/memasang, memberikan, mengunggah,
                      menyediakan, atau mengirimkan konten/ulasan yang
                      melanggar merek dagang, hak paten, hak cipta, atau hak
                      kepemilikan dari pihak mana pun
                    </li>
                    <li class="py-1">
                      Melakukan penyamaran atau pura-pura sebagai
                      orang/entitas/pihak/kelompok lain (termasuk dalam
                      pemalsuan afiliasi), atau memberikan
                      informasi/keterangan yang salah
                    </li>
                    <li class="py-1">
                      Menggunakan platform atau layanan untuk tujuan yang
                      melanggar hukum/illegal
                    </li>
                    <li class="py-1">
                      Berusaha untuk mendapatkan akses yang tidak sah atau
                      yang dapat mengganggu sistem atau jaringan platform atau
                      layanan
                    </li>
                    <li class="py-1">
                      Berusaha untuk mengganggu pemakaian, pemanfaatan,
                      menikmati dari layanan atau platform
                    </li>
                    <li class="py-1">
                      Menghapus pemberitahuan mengenai hak kepemilikan dari
                      situs
                    </li>
                    <li class="py-1">
                      Menggunakan layanan atau platform untuk mendapatkan
                      kepentingan pribadi tanpa adanya izin yang sah dari
                      pihak kami
                    </li>
                    <li class="py-1">
                      Menggunakan fasilitas platform atau layanan kami dengan
                      menggunakan segala perangkat keras dan/atau perangkat
                      lunak yang tidak resmi/tanpa izin dari kami, termasuk
                      namun tidak terbatas pada, bot, simulator, emulator,
                      virus, atau perangkat keras maupun perangkat lunak dan
                      sejenisnya
                    </li>
                    <li class="py-1">
                      Menggunakan platform atau layanan yang diluar dari
                      aturan aturan kebijakan penggunaan setiap jaringan yang
                      terhubung
                    </li>
                    <li class="py-1">
                      Menggunakan layanan atau platform kami dengan sengaja
                      atau tidak sengaja melanggar hukum, peraturan, aturan,
                      kode atau sejenisnya di negara bagian, nasional, atau
                      internasional yang berlaku (termasuk dalam
                      undang-undang, persyaratan/sejenisnya)
                    </li>
                    <li class="py-1">
                      Menggunakaan platform atau layanan kami dengan tujuan
                      untuk mengumpulkan, menyimpan, mengubah data pribadi
                      pengguna lainnya yang berhubungan dengan kegiatan
                      terlarang, melanggar hak cipta atau hak kekayaan
                      intelektual lainnya, melakukan pemasaran (termasuk
                      informasi/data pengguna) tanpa adanya izin tertulis yang
                      sah dari pihak kami.
                    </li>
                  </ul>
                </li>
                <li class="py-1.5">
                  Dengan tetap menggunakan, mengakses, dan menikmati layanan
                  kami, maka kami akan menganggap Anda telah membaca,
                  memahami, dam menyetujui bahwa semua konten/informasi yang
                  anda berikan untuk umum atau secara pribadi, merupakan
                  tanggung jawab tunggal orang dari mana konten tersebut
                  berasal. Anda menyetujui bahwa Anda sendiri, bukan
                  CariBarang.id yang bertanggung jawab atas semua konten yang
                  Anda peroleh, simpan, sediakan, kirimkan melalu situs atau
                  platform kami termasuk semua konsekuensi yang dapat timbul.
                </li>
                <li class="py-1.5">
                  Anda mengakui bahwa kami dan pihak yang kami tunjuk memiliki
                  hak tapi bukan kewajiban atas kebijakan mereka sendiri untuk
                  melakukan penyaringan setiap informasi/konten termasuk tapi
                  tidak terbatas pada penolakan, penghapusan, pembekuan,
                  pemberhentian, pemindahan yang tersedia di platform/layanan
                  kami tanpa kewajiban apapun terhadap Anda
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Transaksi Pembelian:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  <div class="">Kami mendukung metode pembayaran berikut</div>
                  <ul class="list-disc ml-5">
                    <li class="py-1">Bank Transfer</li>
                    <li class="py-1">Virtual Account</li>
                  </ul>
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Pemutusan/Perhentian Layanan:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  <div class="">
                    Untuk setiap pelanggaran atas kebijakan ini, kami kami
                    dapat melakukan berbagai tindakan, termasuk, dengan tidak
                    terbatas pada, salah satu atau semua dari hal-hal berikut
                    ini
                  </div>
                  <ul class="list-disc ml-5">
                    <li class="py-1">Penghapusan Konten atau Akun</li>
                    <li class="py-1">Pembatasan pada hak Akun</li>
                    <li class="py-1">Penangguhan dan pengakhiran Akun</li>
                    <li class="py-1">
                      Tuntutan pidana terhadap pengguna/pemilik Akun
                    </li>
                    <li class="py-1">
                      Tindakan perdata terhadap pengguna/pemilik Akun,
                      termasuk dengan tidak terbatas pada klaim untuk kerugian
                      dan/atau ganti rugi sementara atau perintah ganti rugi
                      oleh pengadilan
                    </li>
                  </ul>
                </li>
                <li class="py-1.5 hidden">
                  Perusahaan dapat menangguhkan sebagian/seluruh layanan kami
                  berdasarkan penilaian sendiri tanpa ada pemberitahuan
                  sebelumnya kepada pengguna, misalnya dalam rangka
                  pemeliharaan/pembaharuan rutin/mendesak sistem untuk
                  layanan/platform, kegagalan untuk menyediakan layanan yang
                  dikarenakan oleh suatu hal.
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Harga dan Pengiriman:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  Anda telah membaca, mengerti dan menyetujui bahwa
                  CariBarang.id telah melakukan usaha sebaik mungkin untuk
                  memberikan harga, jenis perusahaan pengiriman/ekspedisi yang
                  terbaik kepada Anda, namun tidak ada jaminan mengenai
                  keakuratan harga. Setiap permasalahan yang terjadi atau
                  dapat terjadi pada saat proses pengiriman barang oleh
                  penyedia jasa layanan pengiriman barang adalah tanggung
                  jawab penyedia jasa layanan pengiriman
                </li>
                <li class="py-1.5">
                  Oleh karena itu, CariBarang.id menyarankan Anda untuk
                  melakukan perhitungan terlebih dahulu sebelum melakukan
                  pembayaran dan apabila mendapati kesalahan harga, mohon
                  sekiranya Anda untuk menginformasikan hal tersebut kepada
                  kami.
                </li>
                <li class="py-1.5">
                  Pengiriman barang dalam sistem kami wajib menggunakan jasa
                  perusahaan pengiriman/ekspedisi yang telat kami verifikasi
                  rekanan oleh kami dan yang telah Anda pilih.
                </li>
                <li class="py-1.5">
                  Periode pengiriman barang yang tertulis dalam platform kami
                  adalah estimasi atau perkiraan. Kami berhak untuk merubah
                  setiap saat tanpa ada pemberitahuan sebelumnya.
                </li>
                <li class="py-1.5">
                  Kami tidak dapat menjamin mengenai soal ketepatan waktu
                  dalam proses packaging, pengiriman barang akan berjalan
                  sesuai dengan estimasi yang kita berikan. Kami tidak
                  bertanggung jawab untuk setiap kerugian yang dikarenakan
                  keterlambatan proses ini.
                </li>
                <li class="py-1.5">
                  Proses pengiriman untuk wilayah tertentu yang sulit
                  dijangkau seperti pulau-pulau yang terisolasi atau
                  terpencil, atau alasan memungkinkan lainnya dapat
                  mengakitbatkan proses pengiriman yang lebih lama dari
                  estimasi yang telah disampaikan dalam platform kami.
                </li>
                <li class="py-1.5">
                  Biaya yang harus dibayar oleh pengguna adalah harga yang
                  ditampilkan pada waktu pengguna melakukan konfirmasi
                  pembayaran pesanan. Harga tersebut adalah biaya yang harus
                  dikeluarkan oleh pengguna hanya untuk sampai pengiriman ke
                  Gudang Indonesia di Jakarta, untuk kelanjutan pengiriman
                  dari Gudang Indonesia ke tujuan/tempat Anda, biaya dan jenis
                  ekspedisi lokal akan dikonfirmasi lebih lanjut oleh tim
                  kami.
                </li>
                <li class="py-1.5">
                  Harga produk yang tersedia/ditampilkan di dalam platform
                  kami setiap saat tanpa ada pemberian alasan apapun dan/atau
                  tanpa pemberitahuan sebelumnya.
                </li>
                <li class="py-1.5">
                  Dengan melanjutkan transaksi dengan layanan kami, Pengguna
                  telah menyetujui untuk membayar total biaya yang harus
                  dibayar, termasuk pada harga barang, biaya pengiriman, biaya
                  penanganan, atau biaya-biaya lain yang mungkin timbul dalam
                  proses transaksi.
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg hidden">
                Ganti Rugi/Refund:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm hidden">
                <li class="py-1.5">
                  Barang yang diambil oleh bea cukai sebagai sample bukan
                  tanggung jawab kami
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Batasan Tanggung Jawab:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  <div class="">
                    Kami tidak akan bertanggung jawab dalam keadaan apapun
                    baik dalam hal garansi, kontrak, kebijakan, atau perbuatan
                    yang melawan atau mengabaikan kewajiban/hukum, atau
                    penyebab lainnya dari tindakan hukum, dalam hukum,
                    peraturan, atau perundang-undangan yang berlaku, untuk:
                  </div>
                  <ul class="list-disc ml-5">
                    <li class="py-1">Hilangnya penggunaan</li>
                    <li class="py-1">Hilangnya pendapatan/keuntungan</li>
                    <li class="py-1">Hilangnya Data</li>
                    <li class="py-1">Hilangnya Itikad Baik</li>
                    <li class="py-1">
                      Terjadinya kerugian langsung atau tidak langsung yang
                      mungkin timbul dari atau sehubungan dengan
                      penggunaan/ketidakmampuan/kesalahan untuk menggunakan
                      pelayanan/platform kami
                    </li>
                  </ul>
                </li>
                <li class="py-1 5">
                  Setiap kerugian baik material atau nonmaterial yang
                  disebabkan oleh pihak-pihak yang tidak berwenang yang
                  mengatasnamakan kami adalah bukan tanggung jawab kami. Oleh
                  karena itu, kami sangat menyarankan Anda untuk lebih
                  berhati-hati jika ada yang mengatasnamakan CariBarang.id dan
                  meminta data-data yang bersifat rahasia (seperti PIN,
                  Password, Nomor Kartu Kredit, Kode OTP atau sejenisnya).
                </li>
                <li class="py-1 5">
                  Apabila ada ketentuan dari Syarat Layanan ini yang dianggap
                  melanggar hukum, batal, atau karena alasan apapun tidak
                  dapat diberlakukan berdasarkan hukum di yurisdiksi tersebut,
                  maka ketentuan tersebut harus dianggap dapat dipisahkan dari
                  syarat dan ketentuan ini dan tidak akan mempengaruhi
                  keabsahan dan keberlakuan setiap ketentuan yang tersisa di
                  yurisdiksi tersebut maupun keabsahan dan keberlakuan
                  ketentuan tersebut berdasarkan hukum di yurisdiksi lainnya
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Pembaharuan:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  Syarat &amp; Ketentuan ini mungkin dapat diubah atau
                  diperbaharui dari waktu ke waktu tanpa adanya pemberitahuan
                  sebelumnya. Maka dari itu, kami sangat merekomendasikan anda
                  untuk mengecek/memeriksa dan membaca halaman Syarat &amp;
                  Ketentuan ini dari waktu ke waktu untuk mengetahui jika
                  terdapat perubahan apapun. Dengan tetap menggunakan,
                  mengakses atau menikmati layanan CariBarang.id, maka kami
                  akan menganggap Anda menyetujui segala isi dalam halaman
                  Syarat &amp; Ketentuan ini dengan segala
                  perubahan-perubahannya.
                </li>
              </ul>

              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Biaya Layanan:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  Biaya Layanan adalah biaya yang diberikan kepada pengguna
                  jasa kami untuk tujuan pemeliharaan dan peningkatan layanan
                  dan sistem dalam bertransaksi yang ada dalam platform atau
                  layanan kami
                </li>
              </ul>
              <h2 class="py-1.5 font-bold text-gray-900 text-lg">
                Ketentuan Lainnya:
              </h2>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1.5">
                  Segala biaya perangkat komunikasi, biaya internet/LAN,
                  persiapan computer, biaya telepon, atau lain-lain yang
                  diperlukan untuk mengakses layanan kami adalah tanggung
                  jawab pengguna
                </li>
              </ul>
            </div>
          </div>
        </article>
        <article v-if="privacy" class="term">
          <h3 class="text-[#004B9C] font-semibold text-3xl w-[600px]">
            Kebijakan dan Privasi
          </h3>
          <div class="term__content">
            <div
              class="w-full mt-6 prose prose-indigo prose-lg text-gray-600 mx-auto"
            >
              <p class="pb-2.5">
                Caribarang.id akan selalu berusaha menghormati dan melindungi
                hak-hak pribadi atau privasi Anda.
              </p>
              <p class="pb-2.5">
                Informasi tertentu yang Anda berikan kepada caribarang.id pada
                saat menggunakan situs ini hanya akan digunakan sesuai dengan
                pernyataan privasi ini.
              </p>
              <p class="pb-2.5">
                Kami dapat mengubah Kebijakan Privasi ini dari waktu ke waktu
                dengan mengurangi atau menambahkan ketentuan pada halaman ini.
                Segala perubahan yang berkaitan dengan kebijakan ini akan
                dipublikasikan di situs CariBarang.id atau melalui platform
                media lain. Kami mengharapkan Anda untuk rutin memeriksa
                halaman privasi ini guna mengetahui setiap perubahan. Dengan
                mengakses dan menggunakan layanan yang disediakan oleh
                CariBarang.id, Anda dianggap telah menyetujui amandemen yang
                dibuat dalam ketentuan Kebijakan Privasi ini.
              </p>
              <p class="pb-2.5">
                Kebijakan ini akan menentukan manakah informasi pribadi Anda
                yang kami kumpulkan atau Anda sediakan akan diproses. Silahkan
                baca bagian berikut dengan seksama untuk memahami ketentuan
                yang berkaitan dengan data pribadi Anda dan bagaimana kami
                akan memperlakukan informasi tersebut.
              </p>

              <h2 class="py-2 font-bold text-gray-900 text-lg">
                PENGUMPULAN INFORMASI
              </h2>

              <p class="pb-2.5">
                Siapapun melihat, mengakses dan melakukan transaksi di situs
                CariBarang.id, Namun, beberapa fitur dan fasilitas dari situs
                ini hanya dapat diakses oleh member yang terdaftar.
              </p>
              <p class="pb-2.5">
                Untuk mendaftar member di CariBarang.id, Anda harus
                menyediakan beberapa informasi, termasuk, antara lain, Nama
                Lengkap, Alamat E-mail, Jenis Kelamin, Nomor Telepon, Alamat
                Lengkap, Alamat Pengiriman, dan/atau Rekening Bank, Informasi
                Kartu Debit dan Kartu Kredit
              </p>
              <p class="pb-2.5">
                Selain Itu, beberapa informasi lain yang akan kami kumpulkan
                dari Anda adalah antara lain, Alamat IP, Tipe Browser yang
                digunakan, Halaman/Screen di Situs Kami yang Anda Kunjungi,
                Waktu/Tanggal Akses, dan Lokasi atau Statistik lainnya.
              </p>
              <p class="pb-2.5">
                Informasi mengenai data pribadi Anda yang telah diberikan juga
                dapat disimpan dan/atau diproses di luar negara oleh pihak
                yang bekerja untuk CariBarang.id di negara lain atau oleh
                penyedia layanan pihak ketiga, vendor, mitra, kontraktor,
                afiliasi, atau supplier CariBarang.id dengan memastikan bahwa
                data tersebut akan tetap terlindungi sesuai dalam Kebijakan
                Privasi ini.
              </p>
              <p class="pb-2.5">
                Kami berasumsi bahwa setiap informasi yang Anda berikan di
                atas untuk saat ini dan di kemudian hari adalah akurat, benar
                dan tidak menyesatkan. Anda juga setuju untuk menginformasikan
                ketidakakuratan atau apabila ada perubahan dari informasi
                tersebut. Apabila informasi dan perubahan yang Anda berikan
                terbukti tidak benar, kami dengan ini menyatakan akan tidak
                bertanggung jawab untuk setiap konsekuensi yang mungkin
                terjadi dalam kaitannya dengan informasi yang salah tersebut
                dan amandemen yang tersedia.
              </p>

              <h2 class="py-2 font-bold text-gray-900 text-lg">
                PENGGUNAAN INFORMASI
              </h2>
              <p>
                Informasi yang telah kami kumpulkan dari Anda dapat kami
                gunakan untuk:
              </p>
              <ul role="list" class="list-decimal ml-5 text-sm">
                <li class="py-1">Terkait dalam konfirmasi pesanan</li>
                <li class="py-1">
                  Terkait dalam proses pembayaran transaksi
                </li>
                <li>
                  Menghubungi Anda sehubungan dengan riset pasar atau
                  pengembangan situs CariBarang.id, sehingga kami dapat terus
                  meningkatkan layanan kami dan/atau memenuhi permintaan Anda
                  pada setiap produk dan layanan yang disediakan oleh
                  CariBarang.id. Untuk kepentingan tersebut, kami akan
                  menghubungi Anda melalui e-mail. Kami juga dapat menggunakan
                  informasi tersebut untuk menyesuaikan situs CariBarang.id
                  dengan minat Anda.
                </li>
                <li>
                  Menyediakan informasi/promosi melalui e-mail, WhatsApp, atau
                  social media yang diperlukan secara teratur untuk Anda jika
                  terdapat penawaran dan/atau promosi tentang penawaran
                  produk, atau informasi lain dan yang kami anggap Anda
                  butuhkan di CariBarang.id.
                </li>
                <li>
                  Mengumpulkan data transaksi antara Anda dan kami dan/atau
                  mitra bisnis kami, termasuk informasi tentang penggunaan
                  produk dan jasa yang kami sediakan.
                </li>
                <li>Catatan Internal/administrasi kami.</li>
                <li>
                  Kami juga dapat menggunakan data Anda serta memungkinkan
                  pihak ketiga yang dipilih untuk menggunakan data Anda untuk
                  menyediakan informasi tentang produk dan jasa yang Anda
                  minati dan kami atau mereka dapat menghubungi Anda.
                </li>
                <li>
                  Bila kapan saja Anda ingin berhenti menerima e-mail kami di
                  masa mendatang, kami memasukkan informasi mendetail
                  informasi berhenti berlangganan di bawah tiap-tiap email.
                </li>
              </ul>

              <h2 class="py-2 font-bold text-gray-900 text-lg">KEAMANAN</h2>
              <p class="pb-2.5">
                Untuk mencegah akses ilegal, kami akan melakukan pengamanan
                fisik, elektronik, dan manajerial-prosedural yang diperlukan
                untuk melindungi informasi Anda yang kami kumpulkan secara
                online.
              </p>
              <p class="pb-2.5">
                Kami menerapkan Langkah-langkah keamanan untuk menjaga
                keamanan informasi pribadi Anda. Akses terbatas untuk
                informasi umum, riwayat pembayaran dan informasi keamanan
                pembayaran. Namun demikian, tidak adanya jaminan atau keamanan
                absolut tidak dapat terhindarkan.
              </p>

              <h2 class="py-2 font-bold text-gray-900 text-lg">
                PENGENDALIAN INFORMASI
              </h2>
              <p>
                Kami tidak akan menjual, mendistribusikan, atau menyewakan
                informasi pribadi Anda kepada pihak ketiga kecuali bahwa kami
                diwajibkan oleh hukum yang berlaku di Indonesia untuk
                melakukan hal tersebut.
              </p>
              <p>
                Kami dapat memberikan informasi pribadi apabila kami
                diwajibkan oleh hukum atau yakin bahwa tindakan tersebut
                diperlukan untuk (1) proses pengadilan atau proses hukum
                lainnya; (2) melindungi dan membela hak cipta dan properti
                kami, (3) perlindungan terhadap penyalahgunaan situs kami,
                atau (4) melindungi keamanan pribadi atau properti terhadap
                pengguna kami atau publik (dapat diartikan bahwa jika Anda
                memberikan informasi palsu atau berpura-pura menjadi orang
                lain, informasi mengenai Anda dapat diberikan sebagai bagian
                dari penyelidikan).
              </p>

              <h2 class="py-2 font-bold text-gray-900 text-lg">
                HUKUM YANG BERLAKU
              </h2>
              <p>
                Setiap persyaratan dan ketentuan dalam Kebijakan Privasi
                disesuaikan dengan hukum yang berlaku di wilayah Republik
                Indonesia.
              </p>
              <p>
                Dengan menggunakan CariBarang.id, Anda dianggap telah
                menyetujui Syarat dan Ketentuan Penggunaan situs kami.
              </p>
            </div>
          </div>
        </article>
        <article v-if="contact" class="contact-us">
          <h3 class="text-[#004B9C] font-semibold text-3xl">Hubungi Kami</h3>
          <div class="contact-us__info mt-5">
            <div class="flex items-center gap-4 mb-5">
              <span><i class="fas fa-phone-alt"></i></span>
              <span class="font-medium">0811-1916-3004</span>
            </div>
            <div class="flex items-center gap-4 mb-5">
              <span><i class="fas fa-envelope"></i></span>
              <span class="font-medium">info@caribarang.id</span>
            </div>
            <div class="flex items-start gap-4">
              <span><i class="fas fa-map-marker-alt"></i></span>
              <span class="w-[450px] font-medium"
              >Jl. Mangga Besar VIII No.12 E, Kec. Taman Sari, Kota Jakarta
                Barat, Daerah Khusus Ibukota Jakarta, 11150</span
              >
            </div>
          </div>
          <div class="contact-us__map mt-5">
            <div id="DesktopMap" class="w-full rounded-xl h-[300px]"></div>
          </div>
          <div class="mt-5">
            <span class="font-semibold text-base"
            >Kunjungi Media Sosial Kami</span
            >
            <div class="flex items-center gap-5 mt-4">
              <a href="https://www.tiktok.com/@caribarang.id" target="_blank">
                <svg
                  id="icons"
                  data-v-d8de15c4=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 512 512"
                  class="filterGray"
                >
                  <path
                    data-v-d8de15c4=""
                    d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/officialcaribarang.id"
                target="_blank"
              >
                <svg
                  data-v-d8de15c4=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="filterGray"
                >
                  <path
                    data-v-d8de15c4=""
                    d="M22 12.0609C22 6.50383 17.5234 2 12 2C6.47656 2 2 6.50383 2 12.0609C2 17.0835 5.65625 21.2454 10.4375 22V14.9691H7.89844V12.0609H10.4375V9.84437C10.4375 7.32325 11.9297 5.93005 14.2148 5.93005C15.3086 5.93005 16.4531 6.12655 16.4531 6.12655V8.60248H15.1914C13.9492 8.60248 13.5625 9.37866 13.5625 10.1745V12.0609H16.3359L15.8926 14.9691H13.5625V22C18.3438 21.2454 22 17.0835 22 12.0609Z"
                    fill="#1877F2"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/officialcaribarang.id/"
                target="_blank"
              >
                <svg
                  data-v-d8de15c4=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  class="filterGray"
                >
                  <g data-v-d8de15c4="" fill="none" fill-rule="evenodd">
                    <path
                      data-v-d8de15c4=""
                      d="M12 24c6.628 0 12-5.373 12-12S18.628 0 12 0 0 5.373 0 12s5.372 12 12 12"
                      fill="#D93174"
                    ></path>
                    <path
                      data-v-d8de15c4=""
                      d="M14.716 5.28H9.284A4.008 4.008 0 0 0 5.28 9.284v5.432a4.007 4.007 0 0 0 4.004 4.003h5.432a4.007 4.007 0 0 0 4.004-4.003V9.284a4.008 4.008 0 0 0-4.004-4.004zm2.652 9.436a2.652 2.652 0 0 1-2.652 2.652H9.284a2.653 2.653 0 0 1-2.652-2.652V9.284a2.652 2.652 0 0 1 2.652-2.652h5.432a2.652 2.652 0 0 1 2.652 2.652v5.432z"
                      fill="#FFF"
                    ></path>
                    <path
                      data-v-d8de15c4=""
                      d="M12 8.442A3.562 3.562 0 0 0 8.442 12 3.561 3.561 0 0 0 12 15.557 3.561 3.561 0 0 0 15.558 12 3.562 3.562 0 0 0 12 8.442m0 5.731a2.174 2.174 0 1 1 0-4.348 2.174 2.174 0 0 1 0 4.348m3.558-4.94a.79.79 0 1 0 0-1.581.79.79 0 0 0 0 1.581"
                      fill="#FFF"
                    ></path>
                  </g>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCZwneZSoKtdSC9wk-50QkSw"
                target="_blank"
              >
                <svg
                  data-v-d8de15c4=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="filterGray"
                >
                  <path
                    data-v-d8de15c4=""
                    d="M22.7724 7.45454C22.7724 7.45454 22.5448 5.89089 21.9 5.2C21.0655 4.29091 20.1172 4.29091 19.7 4.25453C16.6276 4.03637 12 4 12 4C12 4 7.37239 4.03637 4.3 4.25453C3.88277 4.29091 2.9345 4.32728 2.1 5.2C1.41723 5.89093 1.22761 7.45454 1.22761 7.45454C1.22761 7.45454 1 9.3091 1 11.1637V12.8728C1 14.7273 1.22761 16.5455 1.22761 16.5455C1.22761 16.5455 1.45521 18.1092 2.1 18.8C2.9345 19.7091 4.0345 19.6728 4.52761 19.7819C6.27239 19.9636 12 20 12 20C12 20 16.6276 20 19.7 19.7455C20.1172 19.7091 21.0655 19.6727 21.9 18.8C22.5448 18.1091 22.7724 16.5455 22.7724 16.5455C22.7724 16.5455 23 14.6909 23 12.8727V11.1636C23 9.3091 22.7724 7.45454 22.7724 7.45454Z"
                    fill="#FF0000"
                  ></path>
                  <path
                    data-v-d8de15c4=""
                    d="M9 8V16L16 12.092L9 8Z"
                    fill="#F7F9FA"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import AccordionComponent from '../../Small/Accordion.vue'
import { faqsDB } from '../../../helpers/faqs'
export default {
  components: {
    AccordionComponent
  },

  data () {
    return {
      faqsDB
    }
  },

  computed: {
    faq () {
      return this.$route.path === '/faq'
    },

    refund () {
      return this.$route.path === '/faq/refund'
    },

    account () {
      return this.$route.path === '/faq/account'
    },

    term () {
      return this.$route.path === '/faq/term-condition'
    },

    privacy () {
      return this.$route.path === '/faq/privacy-policy'
    },

    contact () {
      return this.$route.path === '/faq/contact-us'
    }
  },

  mounted () {
    if (this.contact) {
      const contentString = `<div class="">
            <p>Lokasi kantor Caribarang.id</p>
            <br/>
                <a target="_blank" href="https://www.google.com/maps/place/Caribarang.id/@-6.1511163,106.8257194,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69f554d4779937:0xa872d6d4cf32875!8m2!3d-6.1511163!4d106.8257194" class=""><span style="color:#1773E8;">Tampilkan di Google Maps</span>
                </a>
          </div>`

      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(document.getElementById('DesktopMap'), {
        center: { lat: -6.151671, lng: 106.825774 },
        zoom: 14
      })
      // eslint-disable-next-line no-undef
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      })

      // eslint-disable-next-line no-undef, no-unused-vars, no-new
      const marker = new google.maps.Marker({
        position: { lat: -6.151671, lng: 106.825774 },
        map,
        title: 'Caribarang.id'
      })
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false
      })
      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

@mixin respond($breakpoint) {
  @if ($breakpoint == medium) {
    @media (min-width: 768px) {
      @content;
    }
  }
  @if ($breakpoint == large) {
    @media (min-width: 1024px) {
      @content;
    }
  }
}

.desktop {
  display: none;

  @include respond(large) {
    display: flex;
  }
}

.nested {
    &__item {
      cursor: pointer;
      padding-left: 20px;
      margin-bottom: 10px;
      color: #004b9c;
      font-size: 18px;

      .dot {
        width: 10px;
        height: 10px;
        border: 2px solid #0e4e9b;
        border-radius: 50%;
      }
    }
}

.filterGray {
  filter: grayscale(1);
  &:hover {
    filter: none;
  }
}
</style>
