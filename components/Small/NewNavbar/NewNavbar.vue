<template>
  <section class="header w-full">
    <div class="bg-white-300 py-3 px-4">
      <div class="wrap-header grid items-center sm:grid-cols-4 2xl:grid-cols-3">
        <div class="lg:ml-4">
          <figure>
            <a href="/">
              <img class="h-11 w-auto" src="/img/logo-navbar-web.webp" alt="logo-caribarang" />
            </a>
          </figure>
        </div>
        <ul class="nav-menu flex p-5 md:p-0 gap-[13px] lg:gap-[70px] 2xl:-ml-8 h-full">
          <li class="nav-menu__item"><a href="/events">Konsultasi</a></li>
          <li class="nav-menu__item">
            <a href="/about-us">Tentang Caribarang</a>
          </li>
          <li class="nav-menu__item"><a href="/events">Events</a></li>
          <li class="nav-menu__item"><a href="/blogs">Blog</a></li>
          <li class="nav-menu__item"><a href="/faq">Bantuan</a></li>
          <hr>
          <li class="nav-menu__item"><a href="/signin">Login</a></li>
        </ul>
        <div class="hamburger">
          <span class="hamburger__bar"></span>
          <span class="hamburger__bar"></span>
          <span class="hamburger__bar"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewNavbarComponent',

  mounted () {
    const hamburger = document.querySelector('.hamburger')
    const navMenu = document.querySelector('.nav-menu')

    const handleMobile = () => {
      hamburger.classList.toggle('active')
      navMenu.classList.toggle('active')
    }

    hamburger.addEventListener('click', handleMobile)
  }
}
</script>

<style lang="scss" scoped>
@mixin respond($breakpoint) {
  @if ($breakpoint == medium) {
    @media (max-width: 768px) {
      @content;
    }
  }
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
    text-align: left;
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
</style>
