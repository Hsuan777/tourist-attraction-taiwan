<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <div class="container">
      <NuxtLink to="/" class="navbar-brand text-white">
        Taiwan
      </NuxtLink>
      <NuxtLink
        to="/favorite"
        type="button"
        class="btn btn-white text-secondary d-flex align-items-center"
      >
        <img src="../static/icon/icon_like-2.svg" alt="icon_like" class="pe-1">
        我的最愛
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
