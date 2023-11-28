<template>
  <main class="single-movie">
    <Movie />
    <Reviews />
  </main>
</template>

<script setup>
// backdrop_path, poster_path, budget, genres[index].name, homepage, original_title, overview, production_companies[0].name/.logo_path, release_date, revenue, vote_average **DETAILS**
const route = useRoute();
const { movie, reviews } = await $fetch(`/api/movies/${route.params.id}`);
provide("movie", movie);
provide("reviews", reviews);
console.log(reviews.results);
</script>

<style scoped>
main {
  width: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: hidden;
  top: 100px;
}
</style>
