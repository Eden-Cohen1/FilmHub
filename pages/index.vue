<template>
  <main v-show="width">
    <section id="hero">
      <Hero />
    </section>
    <section class="movie-library">
      <h1>Library</h1>
      <div class="movie-container">
        <div class="card" v-for="movie in movies">
          <div class="img">
            <NuxtImg :src="img_starting_path + movie?.poster_path" alt="" />
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
            {{ movie?.vote_average }} / 10 <i class="far fa-eye"></i>
          </div>
          <NuxtLink :to="'movies/' + movie?.id">View More</NuxtLink>
        </div>
        <!-- <NuxtLink :to="'/posts/' + post.id">{{ post.title }}</NuxtLink> -->
      </div>
      <div v-if="loading" class="loading-indicator"><h1>Loading...</h1></div>
    </section>
  </main>
</template>

<script setup>
//original_title, overview, poster_path, release_date, vote_average
const { width } = screenWidth();
const img_starting_path = "https://image.tmdb.org/t/p/original";
const pageCounter = ref(1);
const { loading } = loadMore();
const { results } = await $fetch(`/api/movies?page=${pageCounter.value}`);
const movies = reactive(results);

watch(loading, async (newValue) => {
  if (newValue) {
    try {
      pageCounter.value++;
      const { results } = await $fetch(`/api/movies?page=${pageCounter.value}`);
      movies.push(...results);
      loading.value = false;
    } catch (err) {
      console.log("Could not fetch more movies", err);
    } finally {
      loading.value = false;
    }
  }
});
</script>

<style scoped>
main {
  width: 100%;
}
.movie-library {
  padding-top: 3rem;
}
h1 {
  margin: auto;
  width: fit-content;
  font-size: 2rem;
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
  animation: hover-shrink 0.2s forwards;
  transition: opacity 0.5s ease 0.2s;
}
.card a:hover {
  font-weight: 600;
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
