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
            <Icon name="material-symbols:search" />
          </button>
        </div>
      </form>
      <div class="sort">
        <p>sort by:</p>
        <label
          ><input
            type="radio"
            v-model="sortOption"
            name="e"
            @click="sortByRating(movies)"
          />
          rating</label
        >
        <label
          ><input
            type="radio"
            v-model="sortOption"
            name="e"
            @click="sortByDate(movies)"
          />
          release date</label
        >
        <label
          ><input
            type="radio"
            v-model="sortOption"
            name="e"
            @click="sortByTitle(movies)"
          />
          A-Z</label
        >
      </div>
    </div>
    <div class="movie-container">
      <div class="card" v-for="movie in movies">
        <div class="img">
          <nuxt-img
            v-if="movie?.poster_path"
            format="webp"
            :src="img_starting_path + movie?.poster_path"
            loading="lazy"
            @lading="console.log('load')"
          />
          <nuxt-img
            v-else
            provider="random"
            format="webp"
            :src="`card-bg.png`"
          />
        </div>
        <div class="title">
          <h3>{{ sliceHeadline(movie?.title) }}</h3>
        </div>
        <div class="text">
          {{ truncateText(movie?.overview, 280) }}
        </div>
        <div class="year">
          {{ movie?.release_date?.split("-")[0] }}
        </div>
        <div class="rating">
          {{ movie?.vote_average.toFixed(1) }} / 10 <i class="far fa-eye"></i>
        </div>
        <NuxtLink :to="'movies/' + movie?.id">View More</NuxtLink>
      </div>
    </div>
    <div v-if="loading" class="loading-indicator"><h1>Loading...</h1></div>
  </main>
</template>

<script setup>
let searchTimeout;
const img_starting_path = "https://image.tmdb.org/t/p/original";
const pageCounter = ref(1);
const searchInput = ref(null);
const sortOption = ref(null);
const { results } = await $fetch(`/api/movies?page=${pageCounter.value}`);
let movies = reactive(results);
const { loading } = loadMore();
watch(loading, async (newValue) => {
  if (newValue && !searchInput.value) {
    try {
      pageCounter.value++;
      const { results } = await $fetch(`/api/movies?page=${pageCounter.value}`);
      movies.push(...results);
      loading.value = false;
      if (sortOption.value) {
        sortOption.value = null;
        ElNotification({
          title: "Pay Attention..",
          message: h(
            "i",
            { style: "color: black" },
            "Loaded more videos, Library is unsorted.."
          ),
          position: "bottom-left",
        });
      }
    } catch (err) {
      console.log("Could not fetch more movies", err);
    } finally {
      loading.value = false;
    }
  }
});

watch(searchInput, async (newValue) => {
  if (newValue.length < 1) {
    movies.length = 0;
    loading.value = true;
    return;
  }
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    const { results } = await $fetch(`/api/search?search=${newValue}`);
    movies.length = 0;
    movies.push(...results);
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
  font-size: 1.2rem;
  text-align: center;
  font-weight: 700;
  color: #fffc;
  padding: 15px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: 0 -95px 28px -25px #000 inset;
}
.card .text {
  position: absolute;
  bottom: 80px;
  height: 120px;
  padding: 0px 10px 20px;
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
}
</style>
