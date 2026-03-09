<template>
  <div class="home">

    <img src="/bg.jpg" alt="Нонограммы" class="main-image" />

    <div class="about">
      <h1>Что такое Нонограммы?</h1>

      <p>
        Нонограммы — это логическая головоломка, в которой нужно
        закрашивать клетки по подсказкам. Когда вы правильно
        решите задачу, появляется скрытая картинка.
      </p>

      <p>
        Эта игра помогает развивать логику и внимательность.
        Попробуйте решить несколько уровней и проверьте себя!
      </p>

      <RouterLink to="/game" class="btn">
        НАЧАТЬ ИГРУ
      </RouterLink>

    </div>

  </div>
</template>

<style scoped>

.home{
  text-align:center;
}

.main-image{
  width:100%;
  max-height:500px;
  object-fit:cover;
}

.about{
  max-width:800px;
  margin:50px auto;
  padding:20px;
}

.about h1{
  font-size:32px;
  margin-bottom:20px;
}

.about p{
  font-size:18px;
  margin-bottom:15px;
}

.btn{
  display:inline-block;
  margin-top:20px;
  padding:12px 30px;
  background:black;
  color:white;
  text-decoration:none;
  font-weight:bold;
}

</style>