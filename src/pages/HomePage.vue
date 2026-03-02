<template>
  <div class="home">

    <h1>ДОБРО ПОЖАЛОВАТЬ В НОНОГРАММЫ</h1>

    <RouterLink to="/game" class="btn">
      НАЧАТЬ ИГРУ
    </RouterLink>

  </div>
</template>

<style scoped> 

.home {
  height: 90vh;
  background: url("/bg.jpg") center / cover no-repeat;

  padding-top: 40px;
  text-align: center;
}

h1 {
  font-size: 36px;
  color: black;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  background: black;
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>