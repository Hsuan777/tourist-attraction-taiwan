<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <div class="container">
      <h1 class="d-flex align-items-center">
        <NuxtLink to="/" class="navbar-brand text-primary p-0 fz-larger">
          Taiwan
        </NuxtLink>
      </h1>
      <NuxtLink
        to="/favorite"
        class="btn btn-white text-secondary d-flex align-items-center shadow"
      >
        <img src="../static/icon/icon_like-2.svg" alt="icon_like" class="pe-1">
        我的最愛
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
};
</script>
