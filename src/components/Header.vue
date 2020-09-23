<template>
  <header
    :class="{ 'headroom--unpinned': scrolled }"
    @="handleScroll"
    class="headroom header"
  >
    <router-link :to="{ name: 'Films' }" class="header__logo">
      ActorsVue
    </router-link>
    <ul class="header-buttons">
      <router-link :to="{ name: 'Home' }" class="header-buttons__link"
        >Главная</router-link
      >
      <router-link :to="{ name: 'Actors' }" class="header-buttons__link"
        >Актеры</router-link
      >
      <router-link :to="{ name: 'Films' }" class="header-buttons__link"
        >Фильмы</router-link
      >
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      limitPosition: 50,
      scrolled: false,
      lastPosition: 0,
    };
  },

  methods: {
    handleScroll() {
      if (
        this.lastPosition < window.scrollY &&
        this.limitPosition < window.scrollY
      ) {
        this.scrolled = true;
      }
      if (this.lastPosition > window.scrollY) {
        this.scrolled = false;
      }
      this.lastPosition = window.scrollY;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  margin-bottom: 30px;
  padding: 0 20px;
  background: #fff;
  position: sticky;
  z-index: 1;
  &__logo {
    color: #333333;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
      color: #ffffff;
      text-shadow: 1px 1px 10px #333333;
    }
  }
  &-buttons {
    &__link {
      margin-right: 5px;
      display: inline-block;
      color: #333333;
      font-size: 15px;
      font-weight: 300;
      text-decoration: none;
      padding: 15px;
      transition: 0.5s;
      &:hover {
        color: #fafafa;
        background-color: #333333;
      }
    }
  }
}

.headroom {
  will-change: transform;
  transition: transform 200ms linear;
  &--pinned {
    transform: translateY(0%);
  }
  &--unpinned {
    transform: translateY(-100%);
  }
}
</style>
