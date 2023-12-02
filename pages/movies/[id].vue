<template>
  <main class="single-movie">
    <Movie />
    <Youtube />
    <Reviews />
  </main>
</template>

<script setup>
const route = useRoute();
const movie = await fetchSingleMovie(route.params.id);
const reviews = await fetchReviews(route.params.id);
const trailer = await fetchTrailer(route.params.id);

provide("movie", movie);
provide("reviews", reviews);
provide("trailer", trailer);
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
