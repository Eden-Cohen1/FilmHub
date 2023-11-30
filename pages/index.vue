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
const { width } = screenWidth();
</script>

<style scoped>
main {
  width: 100%;
}
</style>
