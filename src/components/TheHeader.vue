<template>
  <header class="header">
    <div class="header-content">

      <RouterLink to="/">
      <img src="/logo.png" alt="Лого" class="logo" />
    </RouterLink>


      <nav class="nav">
        <RouterLink to="/">ГЛАВНАЯ</RouterLink>
        <RouterLink to="/game">ИГРА</RouterLink>
        <RouterLink to="/help">ПОМОЩЬ</RouterLink>
      </nav>

      <div class="spacer"></div>

    </div>
  </header>
</template>

<style scoped>
.header {
  height: 80px;
  background: rgb(252, 245, 245);
  border-bottom: 1px solid #ddd;
}

.header-content {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
}

.logo {
  height: 90px;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.nav a {
  text-decoration: none;
  color: black;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
}
</style>
