<template>
  <div class="reviews">
    <h1 v-if="reviews.length">Reviews</h1>
    <h1 v-else>- No Reviews -</h1>
    <figure class="review" v-for="review in reviews">
      <blockquote>
        {{ review.content }}
        <div class="arrow"></div>
      </blockquote>
      <div class="author-block">
        <NuxtImg v-if="review.avatar" :src="review.avatar" alt="author" />
        <NuxtImg
          provider="random"
          v-else
          src="/profile-photo.png"
          alt="author"
        />
        <div class="author">
          <h5>
            {{ review.author }}
            <br />
            <small>{{ review.created_at }}</small>
          </h5>
        </div>
      </div>
    </figure>
  </div>
</template>

<script setup>
let reviews = inject("reviews");
reviews = reviews.filter((review) => review.content.length < 1500).slice(1, 8);
</script>
<style scoped>
h1 {
  text-align: left;
}
.reviews {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding-top: 5rem;
}
figure.review {
  font-family: "Raleway", Arial, sans-serif;
  position: relative;
  overflow: hidden;
  max-width: 810px;
  width: 100%;
  color: #333;
  text-align: left;
  box-shadow: none !important;
  /* margin: auto; */
}
figure.review * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  transition: all 0.35s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}
figure.review img {
  max-width: 100%;
  vertical-align: middle;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  margin: 20px 0 0 5px;
}
figure.review blockquote {
  display: block;
  border-radius: 8px;
  position: relative;
  background-color: #f0f0ed;
  padding: 25px 50px 30px 50px;
  font-size: 0.8em;
  font-weight: 500;
  margin: 0;
  line-height: 1.6em;
  font-style: italic;
}
figure.review blockquote:before,
figure.review blockquote:after {
  font-family: "FontAwesome";
  content: "\201C";
  position: absolute;
  font-size: 50px;
  font-style: normal;
  color: var(--btn-color);
}
figure.review blockquote:before {
  top: 25px;
  left: 20px;
}
figure.review blockquote:after {
  content: "\201D";
  right: 20px;
  bottom: 0;
}
figure.review .arrow {
  top: 100%;
  width: 0;
  height: 0;
  border-left: 0 solid transparent;
  border-right: 25px solid transparent;
  border-top: 25px solid #fafafa;
  margin: 0;
  position: absolute;
}

.author-block {
  display: flex;
  align-items: center;
  gap: 1rem;
}
figure.review .author {
  position: relative;
  margin: 0;
  transform: translateY(50%);
}
figure.review .author h5 {
  color: var(--btn-color);
  margin: 0;
  font-weight: 800;
}
figure.review .author h5 small {
  color: gray;
  font-weight: 400;
  text-transform: none;
}
</style>
