<template>
  <main v-show="width">
    <section id="hero">
      <Hero />
    </section>
    <section>
      <MovieLibrary />
    </section>
  </main>
</template>

<script setup>
//original_title, overview, poster_path, release_date, vote_average
const { width } = screenWidth();
</script>

<style scoped>
main {
  width: 100%;
}
</style>
