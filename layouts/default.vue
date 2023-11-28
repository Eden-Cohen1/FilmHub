<template>
  <main class="nav-bar sec-color">
    <div class="nav-items">
      <a href="/"><NuxtImg class="logo" :src="`logo.png`" /></a>
      <form>
        <div class="search-bar">
          <input type="text" id="search" placeholder="Search FilmHub" />
          <button type="submit">
            <Icon name="material-symbols:search" />
          </button>
        </div>
      </form>
    </div>
  </main>
  <slot />
</template>

<script setup></script>

<style scoped>
.nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 0.5rem 0 0.5rem 1rem;
}

.nav-items {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 90%;
  min-height: 35px;
  margin: auto;
  justify-content: center;
}
.logo {
  position: relative;
  top: 0;
  left: 0;
  width: 5rem;
  height: auto;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 0.3rem;
  max-width: 35rem;
  width: 50vw;
}
#search {
  flex: 1;
  border: none;
  margin: 0.25rem;
  color: black;
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
a {
  width: 5rem;
  height: 29px;
}

@media screen and (max-width: 750px) {
  #search {
    width: 2rem;
  }
  .nav-items {
    justify-content: center;
  }
}
</style>
