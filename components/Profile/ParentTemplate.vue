<template>
  <div class="bg-white shadow-sm rounded-md py-4 px-5 hidden md:block">
    <h1 class="text-sm font-bold py-1.5 text-lightBlue-600">Profil saya</h1>
    <ul class="w-full mb-5">
      <li class="text-sm py-1">
        <router-link
          to="/profile"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >Detail</router-link
        >
      </li>
      <li class="text-sm py-1">
        <router-link
          to="/profile/preferences"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >Preferensi</router-link
        >
      </li>
      <li class="text-sm py-1">
        <router-link
          to="/profile/ktp"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >KTP atau SIM</router-link
        >
      </li>
      <li class="text-sm py-1">
        <router-link
          to="/profile/npwp"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold hidden"
        >NPWP</router-link
        >
      </li>
    </ul>

    <h1 class="text-sm font-bold py-1.5 text-lightBlue-600 hidden">
      Belanjaku
    </h1>
    <ul class="w-full mb-5 hidden">
      <li class="text-sm py-1">
        <a
          href="javascript:;"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >Riwayat pesanan
          <span class="text-sm py-1.5 px-1.5 rounded-full text-red-500"
          ><i class="fas fa-exclamation-triangle" title="Belum tersedia"></i
          ></span>
        </a>
      </li>
      <li class="text-sm py-1">
        <a
          href="javascript:;"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >Riwayat tagihan 1
          <span class="text-sm py-1.5 px-1.5 rounded-full text-red-500"
          ><i class="fas fa-exclamation-triangle" title="Belum tersedia"></i
          ></span>
        </a>
      </li>
      <li class="text-sm py-1">
        <a
          href="javascript:;"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >Riwayat tagihan 2
          <span class="text-sm py-1.5 px-1.5 rounded-full text-red-500"
          ><i class="fas fa-exclamation-triangle" title="Belum tersedia"></i
          ></span>
        </a>
      </li>
      <li class="text-sm py-1">
        <a
          href="javascript:;"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >Alamat pengiriman
          <span class="text-sm py-1.5 px-1.5 rounded-full text-red-500"
          ><i class="fas fa-exclamation-triangle" title="Belum tersedia"></i
          ></span>
        </a>
      </li>
      <li class="text-sm py-1">
        <a
          href="javascript:;"
          class="text-xs text-gray-600 hover:text-indigo-600 hover:font-semibold"
        >Favorit
          <span class="text-sm py-1.5 px-1.5 rounded-full text-red-500"
          ><i class="fas fa-exclamation-triangle" title="Belum tersedia"></i
          ></span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ParentTemplate'
}
</script>
