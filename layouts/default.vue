<template>
  <main class="nav-bar sec-color">
    <a href="/"><NuxtImg class="logo" :src="`logo.png`" /></a>
  </main>
  <slot />
</template>

<style scoped>
.nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 0 0.7rem 0rem;
}
.logo {
  position: relative;
  width: 5.8rem;
  height: auto;
  margin: auto;
}
a {
  width: 5rem;
  height: 29px;
}
img {
  margin: auto;
}
</style>
