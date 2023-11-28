<template>
  <main class="hero" v-show="width">
    <div class="bg-hero">
      <NuxtImg provider="random" v-if="imgSize === 1" :src="`hero-image.png`" />
      <NuxtImg
        provider="random"
        v-else-if="imgSize === 2"
        :src="`hero-image-med.png`"
      />
      <NuxtImg provider="random" v-else :src="`hero-image-small.png`" />
    </div>
  </main>
</template>

<script setup>
const { width } = screenWidth();
const imgSize = computed(() => {
  const res = width.value > 1100 ? 1 : width.value > 750 ? 2 : 3;
  return res;
});
</script>
<style scoped>
.hero {
  position: relative;
  top: 0rem;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.158);
}
.bg-hero {
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  top: 0;
}
h1 {
  position: absolute;
  left: 1rem;
  top: 16vw;
  z-index: 15;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--btn-color);
  color: black;
  font-weight: 15rem !important;
}

img {
  position: relative;
  top: 0;
  width: 100%;
  height: auto;
  margin-bottom: 0;
}
@media screen and (max-width: 1100px) {
  h1 {
    top: 20vw;
  }
}
@media screen and (max-width: 1100px) {
  h1 {
    top: 45vw;
    left: 2rem;
    font-size: 0.5rem;
  }
}
</style>
