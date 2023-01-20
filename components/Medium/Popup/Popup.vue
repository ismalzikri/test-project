<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-body">
      <figure class="relative">
        <img
          :src="url"
          class="w-[300px] h-[400px] lg:w-[400px] lg:h-full cursor-pointer"
          alt="img-pop-up"
          @click="redirectTo"
        >
        <div class="absolute cursor-pointer -right-4 -top-5" @click="$emit('close')">
          <div class="rounded-full w-10 h-10 bg-white relative">
            <img
              src="https://storage.caribarang.id/general/Caribarang-8/294bcfd5-4ee6-4320-9569-0211b1fc9516.svg"
              alt="close-icon"
              class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
          </div>
        </div>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupComponent',

  props: ['url', 'action'],

  methods: {
    redirectTo () {
      window.location.href = this.action
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
  border-radius: 8px;
}
</style>
