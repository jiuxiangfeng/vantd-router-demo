<template>
  <div :class="{ 'left-slider': true, 'left-slider-hidden': menuHidden}">
    <div class="logo">
      <img
        src="../assets/logo.png"
        alt=""
      >Antd-vue
    </div>
    <div :class="{'left-slider-container':true,'left-slider-container-no-webKit':!isWebkit}">
      <a-menu
        :default-open-keys="[$route.matched[0].path]"
        mode="inline"
        theme="dark"
        :inline-collapsed="menuHidden"
        :selectedKeys="currentPage.path && [currentPage.path]"
      >
        <a-sub-menu
          :key="parent.path"
          v-for="(parent,pindex) in $router.options.routes"
          v-show="!parent.meta.hidden"
        >
          <span slot="title">
            <a-icon :type="!parent.meta.icon?'table':parent.meta.icon" /><span>{{parent.meta.title}}</span>
          </span>
          <a-menu-item
            :key="parent.path+'/'+item.path"
            v-for="item in $router.options.routes[pindex].children"
            @click="openPage({...item,'path':parent.path+'/'+item.path})"
            v-show="!item.meta.hidden"
          >
            {{item.meta.title}}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: ['menuHidden', 'isWebkit', 'currentPage'],
  methods: {
    openPage: function (item) {
      this.$emit('openPage', item)
    }
  }
}
</script>

<style lang="less" scoped>
.left-slider {
  position: absolute;
  height: 100%;
  width: 250px;
  left: 0;
  background-color: #032121;
  transition: all 0.3s;
  -moz-transition: all 0.3s; /* Firefox 4 */
  -webkit-transition: all 0.3s; /* Safari 和 Chrome */
  -o-transition: all 0.3s; /* Opera */
  color: #eaeded;
  .logo {
    height: 60px;
    overflow: hidden;
    background-color: #053434;
    padding-left: 16px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 400;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    img {
      width: 36px;
    }
  }
  .left-slider-container {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    .ant-menu-dark,
    .ant-menu-dark .ant-menu-sub {
      color: rgba(255, 255, 255, 0.5);
      background: #032121;
    }
  }
  .left-slider-container-no-webKit {
    overflow-y: scroll; // 非WebKit内核专属
    right: -17px; // 非WebKit内核专属
    overflow-x: hidden; // 非WebKit内核专属
  }
}
.left-slider-hidden {
  width: 80px;
  overflow: hidden;
}
</style>
