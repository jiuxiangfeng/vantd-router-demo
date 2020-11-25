<template>
  <div class="content-header">
    <div :class="{'content-header-top':true,'content-header-top-hidden':headerHidden}">
      <div class="top-left">
        <a-icon
          v-show="!menuHidden"
          type="menu-fold"
          @click="memuToggle"
        />
        <a-icon
          v-show="menuHidden"
          type="menu-unfold"
          @click="memuToggle"
        />
      </div>
      <div class="top-right">
        <a
          href="#"
          class="username"
        >秋酒</a>
        <div class="avatar">
          <img
            src="../assets/logo.png"
            alt=""
          >
        </div>
      </div>
    </div>
    <div :class="{'content-header-bottom':true,'content-header-bottom-up':headerHidden}">
      <ul>
        <li
          class="open-nav-li"
          :class="{active:$route.path === homePage.path}"
          @click="switchPage(homePage)"
        >
          <a-icon
            type="sync"
            v-show="$route.path === homePage.path"
            @click.stop="reloadPage($route)"
          />
          首页
          <a-icon type="home" />
        </li>
        <li
          class="open-nav-li"
          :class="{active:$route.path === item.path}"
          v-for="item in navOpenList"
          :key="item.path"
          @click="switchPage(item)"
        >
          <a-icon
            type="sync"
            v-show="$route.path === item.path"
            @click.stop="reloadPage($route)"
          />
          {{item.meta.title}}
          <a-icon
            type="close"
            @click.stop="closePage(item)"
          />
        </li>
      </ul>
      <a-tooltip
        placement="left"
        v-if="!headerHidden"
      >
        <template slot="title">
          <span>点击隐藏头部</span>
        </template>
        <a-icon
          @click="headerHiddenToggle"
          class="lock"
          type="unlock"
        />
      </a-tooltip>
      <a-tooltip
        placement="left"
        v-if="headerHidden"
      >
        <template slot="title">
          <span>点击显示头部</span>
        </template>
        <a-icon
          @click="headerHiddenToggle"
          class="lock"
          type="lock"
        />
      </a-tooltip>
    </div>

  </div>
</template>

<script>
export default {
  props: ['navOpenList', 'currentPage', 'menuHidden', 'headerHidden', 'homePage'],
  data() {
    return {}
  },
  methods: {
    closePage: function (item) {
      this.$emit('closePage', item)
    },
    switchPage: function (item) {
      this.$emit('switchPage', item)
    },
    reloadPage: function (item) {
      this.$emit('reloadPage', item)
    },
    memuToggle: function () {
      this.$emit('memuToggle')
    },
    headerHiddenToggle: function (toggle) {
      this.$emit('headerHiddenToggle', toggle)
    }
  }
}
</script>

<style lang="less" scoped>
// @import '@/assets/css/antd-theme.less';
.content-header {
  position: relative;
  height: 100px;
  background-color: #f0f2f5;
  .content-header-top {
    //display: flex; // 为了兼容IE9 不用flex布局了
    position: relative;
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
    -moz-transition: all 0.3s; /* Firefox 4 */
    -webkit-transition: all 0.3s; /* Safari 和 Chrome */
    -o-transition: all 0.3s; /* Opera */
    overflow: hidden;
    .top-left {
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 20px;
    }
    .top-right {
      // display: flex; // 为了兼容IE9 不用flex布局了
      // justify-content: flex-end;
      // align-items: center;
      position: absolute;
      right: 0;
      padding-right: 20px;
      width: 50%;
      .username {
        float: right;
        font-size: 16px;
        padding-left: 10px;
        float: right;
      }
      .avatar {
        float: right;
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin-top: 15px;
        border-radius: 15px;
        background-color: #eee;
        overflow: hidden;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  .content-header-top-hidden {
    height: 0;
  }
  .content-header-bottom {
    position: absolute;
    bottom: 0px;
    height: 40px;
    width: 100%;
    transition: all 0.3s;
    -moz-transition: all 0.3s; /* Firefox 4 */
    -webkit-transition: all 0.3s; /* Safari 和 Chrome */
    -o-transition: all 0.3s; /* Opera */
    ul {
      position: absolute;
      padding-left: 16px;
      bottom: 0px;
      .open-nav-li {
        float: left;
        height: 30px;
        min-width: 75px;
        line-height: 30px;
        margin-left: 5px;
        padding: 2px 10px;
        background-color: #fafafa;
        color: rgba(0, 0, 0, 0.65);
        border-radius: 4px 4px 0 0;
        text-align: center;
        cursor: pointer;
        transition: padding 0.5s;
        -moz-transition: padding 0.5s; /* Firefox 4 */
        -webkit-transition: padding 0.5s; /* Safari 和 Chrome */
        -o-transition: padding 0.5s; /* Opera */
        i {
          padding: 0 2px;
        }
      }
      .active {
        height: 31px;
        padding: 2px 20px;
        background-color: #fff;
        color: #13c2c2;
      }
    }
    .lock {
      position: absolute;
      right: 16px;
      line-height: 40px;
      cursor: pointer;
      color: #ccc; // -----
    }
  }
  .content-header-bottom-up {
    bottom: 60px;
  }
}
</style>
