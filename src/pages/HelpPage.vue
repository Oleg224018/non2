<template>
  <div class="help">

    <h1>ПОМОЩЬ</h1>

    <div class="content">

      <h2> Что такое нонограммы?</h2>
      <p>
        Нонограммы — это логическая головоломка. Нужно закрашивать клетки
        по подсказкам, чтобы появилась скрытая картинка.
      </p>

      <h2> Как начать игру?</h2>
      <p>
        Перейдите на страницу "ИГРА" в меню и начните решать головоломку.
      </p>

      <h2> Что означают числа?</h2>
      <p>
        Числа слева показывают сколько клеток нужно закрасить в строке.
        Числа сверху показывают сколько клеток нужно закрасить в колонке.
      </p>

      <h2> Что делать если я ошибся?</h2>
      <p>
        Вы можете убрать закрашенную клетку и попробовать решить
        головоломку снова.
      </p>

    </div>

  </div>
</template>

<style scoped>

.help{
  min-height:100vh;
  background:url("/help-bg.jpg") center no-repeat;
  background-size:900px;

  text-align:center;
  padding-top:50px;
}

h1{
  font-size:54px;
  margin-bottom:50px;
}

.content{
width:100%;
  min-height:100vh;

  background:rgba(255,255,255,0.8);

  text-align:center;
  padding:60px 20px;
}

.content h2{
  margin-top:20px;
  font-size:32px;
}

.content p{
  margin-top:10px;
  font-size:25px;
}

</style>