<template>
  <div class="about">
    <div class="about__title animated fadeInUp">Actors Vue</div>
    <div class="about__text animated fadeInUp">
      Приложение для отображения фильмов и актеров с их поиском
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.about {
  padding: 150px 0 240px 0;
  background: linear-gradient(to top, #333333 0%, #fff 100%);
  background-size: cover;
  &__title {
    user-select: none;
    font-size: 100px;
    font-weight: bold;
    color: #fafafa;
    text-shadow: 3px 5px #1f1f1f;
    text-align: center;
    animation-duration: 2s;
  }
  &__text {
    user-select: none;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 400;
    color: #fafafa;
    text-shadow: 1px 1px #1f1f1f;
    text-align: center;
    animation-duration: 3s;
  }
}
</style>
