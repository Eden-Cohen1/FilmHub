export function loadMore() {
  const loading = ref(false);
  function update() {
    loading.value =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
  }

  onMounted(() => {
    window.addEventListener("scroll", update);
    update();
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", update);
    update();
  });
  return { loading };
}
