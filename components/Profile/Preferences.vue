<template>
  <div>
    <div class="border-b border-gray-100 pb-2 uppercase text-sm text-gray-600">
      Preferensi
    </div>
    <dl class="pt-5 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
      <div class="pb-4 flex items-center justify-between">
        <dt class="text-xs text-gray-500">Edit profil</dt>
        <dd class="font-medium text-gray-900">
          <router-link
            class="text-xs text-indigo-600 hover:text-indigo-500"
            to="/profile/edit"
          >Ubah</router-link
          >
        </dd>
      </div>
      <div class="py-4 flex items-center justify-between">
        <dt class="text-xs text-gray-500">Password</dt>
        <router-link
          class="text-xs text-indigo-600 hover:text-indigo-500"
          to="/profile/change-password"
        >Ubah</router-link
        >
      </div>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'ProfilPreferences'
}
</script>
