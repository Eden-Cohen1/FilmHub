<template>
  <div class="trailer">
    <h1>Trailer</h1>
    <lite-youtube
      v-show="trailer"
      :videoid="trailer"
      playlabel="Play: Keynote (Google I/O '18)"
    />
  </div>
</template>

<script setup>
const trailer = inject("trailer");
</script>
<style scoped>
.trailer {
  margin: auto;
  height: auto;
  max-width: 780px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
lite-youtube {
  width: 100%;
  margin: auto;
  border-radius: 1rem;
}
h1 {
  margin: auto;
  font-size: 1.5rem;
  width: fit-content;
}
</style>
