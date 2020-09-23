<template>
  <div class="home">
    <div class="films">
      <div v-if="errored" class="error">
        <div class="error__title">Произошла ошибка</div>
      </div>
      <div v-else class="films-search">
        <label class="films-search__label">Поиск:</label>
        <input v-model="findFilmText" type="text" class="films-search__input" />
      </div>
      <div>
        <div class="films-info">
          <div
            class="films-info-block"
            v-for="(film, index) in filterFilms"
            :key="index"
          >
            <div class="films-info-block__name">{{ film.title }}</div>
            <div class="films-info-block__director">
              Директор: {{ film.director }}
            </div>
            <div class="films-info-block__producer">
              Продюсер: {{ film.producer }}
            </div>
            <div
              class=""
              v-for="(character, index) in film.character"
              :key="index"
            >
              <div class="">{{ character }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Films",
  data() {
    return {
      films: [],
      errored: false,
      findFilmText: "",
    };
  },
  computed: {
    filterFilms() {
      if (this.findFilmText) {
        return this.films.filter((elem) => {
          return elem.title.toLowerCase().includes(this.findFilmText);
        });
      }
      return this.films;
    },
  },
  mounted() {
    this.loadFilms();
  },
  methods: {
    loadFilms() {
      axios
        .get("https://swapi.dev/api/films/")
        .then((response) => (this.films = response.data.results))
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.films {
  max-width: 600px;
  padding: 30px;
  margin: 0 auto;
  border: 1px #969696 solid;
  color: #1d1d1d;
  border-radius: 5px;
  /* Search */
  &-search {
    position: relative;
    display: flex;
    &__label {
      font-size: 26px;
    }
    &__input {
      width: 100%;
      padding: 5px;
      margin-left: 15px;
      font-weight: 300;
      font-size: 18px;
      border: none;
      border-bottom: 1px #969696 solid;
      outline: none;
      transition: 0.1s;
    }
    &__input:focus {
      border-bottom: 1px #383838 solid;
      box-shadow: 0 0 10px 0 #d6d6d6;
    }
  }
  /* Info */
  &-info {
    margin-top: 25px;
    // height: 500px;
    &-block {
      position: relative;
      padding: 15px;
      margin: 10px 0 0 0;
      border: 1px #41414167 solid;
      border-radius: 1px;
      background-color: #f8f8f867;
      &__date {
        font-size: 15px;
        font-weight: 300;
        text-align: right;
      }
      &__name {
        font-size: 30px;
      }
      &__director,
      &__producer {
        display: block;
        padding-right: 5px;
        font-size: 15px;
        transition: 0.15s;
      }
    }
  }
}
.error {
  padding: 30px;
  border-radius: 3px;
  color: #969696;
  text-align: center;
  font-size: 45px;
  font-weight: 400;
}
</style>
