<template>
  <div class="home">
    <div class="actors">
      <div v-if="errored" class="error">
        <div class="error__title">Произошла ошибка</div>
      </div>
      <div v-else class="actors-search">
        <label class="actors-search__label">Поиск:</label>
        <input
          v-model="findActorText"
          type="text"
          class="actors-search__input"
        />
      </div>
      <div class="pagination">
        <button class="pagination__prev" @click="prevPage()">Предыдущая</button>
        <span v-for="(num, index) in 9" :key="index" class="pagination-pages">
          <button class="pagination-pages__button" @click="changePage(index)">
            {{ index + 1 }}
          </button>
        </span>
        <button class="pagination__next" @click="nextPage()">Следующая</button>
      </div>
      <div class="actors-info">
        <div
          class="actors-info-block"
          v-for="(actor, index) in filterActors"
          :key="index"
        >
          <div class="actors-info-block__name">{{ actor.name }}</div>
          <div class="actors-info-block__about">Рост: {{ actor.height }}</div>
          <div class="actors-info-block__about">Вес: {{ actor.mass }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Actors",
  data() {
    return {
      actors: [],
      errored: false,
      findActorText: "",
      page: 1,
    };
  },
  computed: {
    // Поиск
    filterActors() {
      if (this.findActorText) {
        return this.actors.results.filter((elem) => {
          return elem.name.toLowerCase().includes(this.findActorText);
        });
      }
      return this.actors.results;
    },
    countPages() {
      return Math.ceil(this.actors.count / 10);
    },
  },
  mounted() {
    this.loadActors();
  },
  methods: {
    // Загрузка данных
    loadActors() {
      axios
        .get("https://swapi.dev/api/people/?page=" + this.page)
        .then((response) => {
          this.actors = response.data;
          this.errored = false;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    // Работа со страницами
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.loadActors();
      } else {
        console.log("Ну и куда");
      }
    },
    nextPage() {
      if (this.page < this.countPages) {
        this.page++;
        this.loadActors();
      } else {
        console.log("Ну и куда");
      }
    },
    changePage(index) {
      if (this.page != index + 1) {
        this.page = index + 1;
        this.loadActors();
      } else {
        console.log("На месте");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.actors {
  max-width: 600px;
  padding: 30px;
  margin: 0 auto;
  border: 1px #969696 solid;
  color: #1d1d1d;
  border-radius: 5px;
  /* Поиск */
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
  .pagination {
    margin-top: 30px;
    text-align: center;
    button {
      margin: 0 1px;
      padding: 10px;
      border: none;
      background-color: #fff;
      transition: 0.1s;
      &:hover {
        box-shadow: 0 0 4px 1px #1d1d1d;
      }
      &:focus {
        outline: none;
      }
      &:active {
        box-shadow: 0 0 1px 1px #1d1d1d;
      }
    }
    // &__prev {

    // }
    // &-pages {
    //   &__button {
    //     margin: 0 1px;
    //   }
    // }
  }
  /* Инфо */
  &-info {
    margin-top: 25px;
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
      &__about {
        display: inline-block;
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
