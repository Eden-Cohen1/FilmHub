<template>
  <main class="movie-library">
    <h1>Library</h1>
    <div class="search">
      <form @submit.prevent="searchApi">
        <div class="search-bar">
          <input
            type="text"
            id="search"
            placeholder="Search FilmHub.."
            v-model="searchInput"
          />
          <button type="submit" @click.prevent="searchApi">
            <Icon name="eos-icons:loading" v-if="searchLoading" />
            <Icon name="material-symbols:search" v-else />
          </button>
        </div>
      </form>
      <div class="sort">
        <p>sort by:</p>
        <label v-for="radio in radioButtons"
          ><input
            type="radio"
            ref="sortOption"
            name="sort"
            @click="radio.function(movies)"
          />
          {{ radio.text }}</label
        >
      </div>
    </div>
    <div class="movie-container">
      <div class="card" v-for="movie in movies">
        <div class="img">
          <NuxtImg
            v-if="movie?.poster_path"
            width="280"
            :src="movie?.poster_path"
            loading="lazy"
          />
          <NuxtImg
            v-else
            provider="random"
            loading="lazy"
            :src="`card-bg.png`"
          />
        </div>
        <div class="title">
          <h3>{{ movie?.title }}</h3>
        </div>
        <div class="text">
          {{ movie?.overview }}
        </div>
        <div class="year">
          {{ movie?.release_date }}
        </div>
        <div class="rating">
          {{ movie?.vote_average }} / 10 <i class="far fa-eye"></i>
        </div>
        <NuxtLink :to="'movies/' + movie?.id">View More</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { radioButtons } from "~/data/const.js";

let searchTimeout;
const pageCounter = ref(1);
const searchInput = ref(null);
const sortOption = ref(null);
const { loading } = loadMore();
const searchLoading = ref(false);
const data = await fetchLibraryPage(pageCounter.value);
let movies = reactive(data);

watch(loading, async (newValue) => {
  if (movies && newValue && !searchInput.value) {
    pageCounter.value++;
    const data = await fetchLibraryPage(pageCounter.value);
    movies.push(...data);
    loading.value = false;
  }
});

watch(pageCounter, (newValue) => {
  if (newValue >= 3) {
    notifyUnsorted();
    sortOption.value?.forEach((opt) => (opt.checked = false));
  }
});

watch(searchInput, async (newValue) => {
  searchLoading.value = true;
  if (newValue.length < 1) {
    pageCounter.value = 1;
    movies.length = 0;
    const data = await fetchLibraryPage(pageCounter.value);
    movies.push(...data);
    searchLoading.value = false;
    return;
  }
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    if (searchLoading.value == true) {
      const data = await fetchSearch(newValue);
      movies.length = 0;
      movies.push(...data);
      searchLoading.value = false;
      pageCounter.value = 1;
    }
  }, 1000);
});
</script>

<style scoped>
.movie-library {
  padding-top: 3rem;
}
h1 {
  margin: auto;
  width: fit-content;
  font-size: 2rem;
  color: white;
  padding-bottom: 1rem;
}
.search {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 60vw;
  max-width: 50rem;
  gap: 0.4rem;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 0.6rem;
  max-width: 50rem;
  width: 60vw;
  margin: auto;
}
#search {
  flex: 1;
  border: none;
  margin: 0.25rem;
  color: black;
  padding: 0.3rem;
}
input:focus {
  border: none;
  outline: none;
}
.search-bar button {
  background: none;
  border: none;
  cursor: pointer;
}
svg {
  width: 1.3rem;
  height: auto;
  color: #757575;
}
.sort {
  display: flex;
  width: fit-content;
  flex-wrap: wrap;
  max-height: 3rem;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  margin-left: 6px;
  gap: 1rem;
}
.search p {
  color: white;
  margin: 0;
}
input[type="radio"] {
  height: 0.85rem;
  aspect-ratio: 1;
  border: calc(1em / 8) solid #939393;
  padding: calc(1.5em / 8);
  background: radial-gradient(farthest-side, var(--btn-color) 94%, #0000) 50%/0
    0 no-repeat content-box;
  border-radius: 50%;
  outline-offset: calc(1rem / 10);
  appearance: none;
  cursor: pointer;
  transition: 0.3s;
}
input[type="radio"]:checked {
  border-color: var(--btn-color);
  background-size: 100% 100%;
}
label {
  display: flex;
  color: white;
}
.movie-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 0.5rem;
  padding: 0rem 5rem;
  min-height: 1000px;
}
.card {
  position: relative;
  overflow: hidden;
  width: 280px;
  height: 400px;
  margin: 50px auto;
  background: #2a264f;
  border: 5px solid #1a163f;
  border-radius: 3px;
  box-shadow: 0 0 10px #2a264f;
}
.card .img {
  width: 280px;
  height: auto;
}
img {
  width: 280px;
  height: auto;
  transition: all 0.5s ease;
}
.card .title {
  height: 22%;
  width: 100%;
  max-width: 95%;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 700;
  word-wrap: break-word;
  color: #fffc;
  padding: 10px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: 0 -95px 28px -25px #000 inset;
}
.card .text {
  position: absolute;
  bottom: 80px;
  height: 120px;
  padding: 0px 10px 30px;
  text-align: center;
  font-size: 0.85rem;
  color: #fff;
  transform: rotate(90deg);
  transform-origin: 0 100px;
  opacity: 0;
  transition: all 0.5s ease;
}
.card .year {
  position: absolute;
  left: 10px;
  top: 15px;
  padding: 3px 10px;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  background: #2a264f;
  color: #fff;
  border-radius: 5px;
  transform: translate(-140px, 0);
  transition: all 0.5s ease;
}
.card .rating {
  position: absolute;
  left: 10px;
  top: 50px;
  padding: 3px 10px;
  font-size: 15px;
  font-weight: 900;
  text-align: center;
  background: var(--btn-color);
  color: black;
  border-radius: 5px;
  transform: translate(-140px, 0);
  transition: all 0.5s ease 0.15s;
}
.card a {
  color: var(--btn-color);
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.25rem;
  margin: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: small;
  opacity: 0;
  text-decoration: none;
  animation: hover-shrink 0.2s forwards;
  transition: opacity 0.5s ease 0.2s;
}
.card a:hover {
  font-weight: 500;
  animation: hover-grow 0.2s forwards;
}
.card:hover a {
  opacity: 1;
}
.card:hover img {
  transform: rotate(10deg) scale(1.3) translate(20px, 0);
  transform-origin: 300px 300px;
  opacity: 0.5;
}
.card:hover .text {
  opacity: 0.8;
  transform: rotate(0deg);
}
.card h3 {
  transition: all 0.5s ease 0.15s;
  text-overflow: wrap;
}
.card:hover h3 {
  transform: translateY(-220px);
}
.card:hover .rating,
.card:hover .year {
  transform: translate(-0.7rem);
}
@media screen and (max-width: 750px) {
  .movie-container {
    padding: 0rem;
  }
  .sort {
    width: 70vw;
    display: flex;
    align-items: left;
    justify-content: left;
  }
}
</style>
