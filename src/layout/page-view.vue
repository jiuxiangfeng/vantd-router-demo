<template>
  <div :class="{'content-main':true,'content-main-up':headerHidden}">
    当前缓存的组件：{{includeCache}}
    <hr>
    <transition name="bounce">
      <keep-alive :include="includeCache">
        <router-view
          v-if="!isReload"
          :key="$route.Path"
        ></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['headerHidden', 'isReload', 'includeCache'],
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.content-main {
  position: absolute;
  padding: 10px 16px;
  width: 100%;
  top: 100px;
  bottom: 20px;
  margin: auto;
  background-color: #fff;
  overflow: auto;
  transition: all 0.3s;
  -moz-transition: all 0.3s; /* Firefox 4 */
  -webkit-transition: all 0.3s; /* Safari 和 Chrome */
  -o-transition: all 0.3s; /* Opera */
}
.content-main-up {
  top: 40px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateX(-100%);
  }
  20% {
    transform: translateX(-100%);
  }
  // 50% {
  //   transform: translateX(-50%);
  // }
  100% {
    transform: translateX(0);
  }
}
</style>
