<template>
  <div class="movie-card">
    <div class="container">
      <div class="hero">
        <NuxtImg
          v-if="movie?.backdrop_path"
          class="cover"
          :src="movie?.backdrop_path"
        />
        <NuxtImg
          v-else
          provider="random"
          format="webp"
          class="cover"
          :src="`card-bg.png`"
        />
        <NuxtImg
          v-if="movie?.poster_path"
          class="card-img"
          :src="movie?.poster_path"
        />
        <NuxtImg
          v-else
          provider="random"
          class="card-img"
          :src="`card-bg.png`"
        />
        <div class="details">
          <div class="title1">
            {{ movie?.title }}
            <span>{{ movie?.release_date }}</span>
          </div>
          <div class="title2">{{ movie?.production_company }}</div>
        </div>
      </div>
      <div class="description">
        <div class="column1">
          <span class="tag" v-for="genre in movie?.genres">{{
            genre.name
          }}</span>
          <br />
          <span class="tag custom">{{ movie?.vote_average }} / 10</span>
          <span class="tag custom" v-show="movie?.budget"
            >Budget: {{ movie?.budget }}</span
          >
        </div>
        <div class="column2">
          <h1>Description</h1>
          <p>
            {{ movie?.overview }}
          </p>
          <NuxtLink v-show="movie?.homepage.length > 5" :to="movie?.homepage"
            >View Website</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const movie = inject("movie");
</script>

<style scoped>
.movie-card {
  position: relative;
  color: #a9a8a3;
  padding: 40px 0;
}
.container {
  margin: 0 auto;
  width: 780px;
  height: 900px;
  background: #f0f0ed;
  border-radius: 5rem;
  position: relative;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: 0 0 10px #2a264f;
}
.hero {
  height: 400px;
  margin: 0;
  position: relative;
  z-index: 1;
  background-color: var(--dark-bg-main);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.cover {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 780px;
  max-height: 400px;
  opacity: 0.82;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.card-img {
  position: absolute;
  width: 20%;
  bottom: -28%;
  left: 5%;
  z-index: 15;
}
.details {
  position: relative;
  z-index: 5;
  top: 30%;
  left: 5%;
  height: max-content;
  word-wrap: break-word;
  max-width: 90%;
}
.title1 {
  color: white;
  font-size: 2.2rem;
  margin-bottom: 13px;
  position: relative;
  height: fit-content;
}
.title1 span {
  position: absolute;
  top: 3px;
  margin-left: 12px;
  background: var(--btn-color);
  border-radius: 5px;
  color: black;
  font-weight: 600;
  font-size: 14px;
  padding: 0px 4px;
}
.title2 {
  color: #c7c1ba;
  font-size: 23px;
  font-weight: 300;
  margin-bottom: 15px;
  height: 10rem;
}
.description {
  bottom: 0px;
  height: 50%;
  font-size: 16px;
  line-height: 26px;
  color: #b1b0ac;
  z-index: 4;
}
p {
  position: relative;
  top: 0;
  width: 135%;
}
.column1 {
  position: relative;
  top: 10%;
  left: 30%;
  text-align: left;
  width: fit-content;
}
a {
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  bottom: 0;
  right: 0;
  cursor: pointer;
  padding: 0.4rem;
  background-color: var(--btn-color);
}
a:hover {
  background-color: var(--btn-hover-color);
}
.tag {
  background: white;
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 14px;
  margin-right: 4px;
  line-height: 35px;
  cursor: pointer;
}
.tag:hover {
  background: #ddd;
}
.column2 {
  position: absolute;
  bottom: 10%;
  left: 5%;
  width: 480px;
  float: left;
  margin: auto;
}
.column2 h1 {
  color: #888784;
}
.custom {
  background: #2a264f;
  color: white;
}
.custom:hover {
  background-color: #1c1935;
}
@media screen and (max-width: 840px) {
  .container {
    width: 100%;
    border-radius: 0px;
    box-shadow: 0px 7px 2px 2px rgba(255, 255, 255, 0.26);
  }
  .hero {
    height: fit-content !important;
    border-radius: 0px;
  }
  .cover {
    position: relative;
    width: 100%;
    border-radius: 0px;
    top: 7px;
  }
  .details {
    position: absolute;
    top: 30%;
    left: 5%;
  }
  .title1 {
    font-size: 2rem;
  }
  .title2 {
    font-size: 1rem;
  }
  .description {
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }
  p {
    width: 120% !important;
    max-width: 520px;
  }
  .column1 {
    top: 0px;
    left: 50px;
    padding-bottom: 1rem;
    padding-top: 4rem;
  }
  .column2 {
    position: relative;
    bottom: 15%;
    margin: auto;
    margin-left: 0;
  }
}
@media screen and (max-width: 545px) {
  .title1 {
    font-size: 1.2rem !important;
  }
  .title2 {
    font-size: 1rem !important;
  }
  .container {
    height: fit-content !important;
  }
  .description {
    padding-bottom: 5rem;
  }
  p {
    width: 70% !important;
  }
  .card-img {
    width: 6rem;
  }
  .column1 {
    top: 0px;
    left: 0px;
  }
}
</style>
