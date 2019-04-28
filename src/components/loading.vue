<template>
   <div class="load-container">
        <div class="load load1"></div>
        <div class="load load2"></div>
        <div class="load"></div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang='scss' scoped>
.load-container {
    // margin: 50px auto;
    width: 70px;
    display: inline;
    text-align: center;
    .load {
        width: 15px;
        height: 15px;
        background-color: #fff;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
        animation: bouncedelay 1.4s infinite ease-in-out;
        /* Prevent first frame from flickering when animation starts */
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    .load1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    .load2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
}

@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>