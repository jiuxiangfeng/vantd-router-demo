<template>
  <div class="app-admin">
    <LeftSlider
      :current-page="currentPage"
      :menu-hidden="menuHidden"
      :is-webkit="isWebkit"
      @openPage="openPage"
    />
    <div :class="{'right-content':true, 'right-content100':menuHidden}">
      <RightContentHeader
        :nav-open-list="openNavList"
        :current-page="currentPage"
        :menu-hidden="menuHidden"
        :header-hidden="headerHidden"
        :home-page="homePage"
        @switchPage="switchPage"
        @reloadPage="reloadPage"
        @closePage="closePage"
        @memuToggle="memuToggle"
        @headerHiddenToggle="headerHiddenToggle"
      />
      <page-view
        :header-hidden="headerHidden"
        :is-reload="isReload"
        :include-cache="routeCache"
      />
      <RightContentFooter />
    </div>
  </div>
</template>

<script>
import LeftSlider from './left-slider'
import RightContentHeader from './right-content-header'
import pageView from './page-view'
import RightContentFooter from './right-content-footer'

export default {
  components: { LeftSlider, RightContentHeader, pageView, RightContentFooter },
  data() {
    return {
      openNavList: [],
      homePage: {},
      currentPage: {},
      openPageStack: [],
      menuHidden: false, // 是否隐藏菜单,
      headerHidden: false, // 是否隐藏头部,
      isWebkit: true, // 是否是WebKit 内核
      isReload: false,
      routeCache: []
    }
  },
  mounted() {
    this.homePage = { path: '/Home' }
    this.currentPage = Object.assign({}, this.homePage)
    this.addRouteCache(this.$route.matched[1].components.default.name)
    this.isWebkit = navigator.userAgent.indexOf('WebKit') > -1
    this.itemClick(this.$route) // 直接第一次浏览器中输入访问地址
  },

  methods: {
    itemClick: function (route) {
      let nav = this.openNavList.find(item => {
        return item.path === route.path
      })
      if (!nav) {
        // 添加到已打开页面list
        if (route.path !== '/Home' && route.path !== '/') {
          // 首页不需要开新标签
          this.openNavList.push(route)
        }
        // 添加到访问历史列表
        this.openPageStack.push(this.currentPage)
        nav = route
      } else {
        // 此处全部为已经打开的页面
        if (this.currentPage.path !== route.path) {
          // 如果不是当前页打开的页面
          const index = this.openPageStack.findIndex(item => {
            return item && item.path === route.path
          })
          if (index >= 0) {
            this.openPageStack.splice(index, 1)
          }
          // 添加到访问历史列表
          this.openPageStack.push(this.currentPage)
        }
      }
      // 当前访问的页面
      this.currentPage = nav // { path: route.path, name: route.name }

      this.$router.push({
        path: this.currentPage.path
      }) // 跳转页面

      // setTimeout(() => {
      //   this.addRouteCache(this.$route.matched[1].components.default.name) // 如果不想用watch $route 的方式，这里延迟一会再添加到keep alive 的include缓存也可以
      // }, 200)
    },
    closePage: function (route) {
      const index = this.openNavList.findIndex(item => {
        return item.path === route.path
      })
      if (index >= 0) {
        this.openNavList.splice(index, 1)
        // 如果关闭的是当前打开的页
        if (this.currentPage.path === route.path) {
          this.delRouteCache(this.$route.matched[1].components.default.name) // 关闭页面清掉keep-alive 的缓存
          const prevPage = this.openPageStack.pop()
          this.currentPage = prevPage
          this.$router.push({
            path: this.currentPage.path
          })
        } else {
          this.delRouteCache(route.matched ? route.matched[1].components.default.name : route.component.resolved.options.name) // 关闭页面清掉keep-alive 的缓存
          // 如果不是当前页，直接从栈中删除掉这个访问历史页面
          const index = this.openPageStack.findIndex(item => {
            return item && item.path === route.path
          })
          if (index >= 0) {
            this.openPageStack.splice(index, 1)
          }
        }
      }
    },
    reloadPage: function (route) {
      this.isReload = true
      this.delRouteCache(route.matched[1].components.default.name)
      setTimeout(() => {
        this.$nextTick(() => {
          this.addRouteCache(route.matched[1].components.default.name)
          this.isReload = false
        })
      }, 200)
    },
    openPage: function (route) {
      this.itemClick(route)
    },
    switchPage: function (route) {
      this.itemClick(route)
    },
    memuToggle: function () {
      this.menuHidden = !this.menuHidden
    },
    headerHiddenToggle: function () {
      this.headerHidden = !this.headerHidden
    },
    addRouteCache: function (key) {
      !this.routeCache.includes(key) && this.routeCache.push(key)
    },
    delRouteCache: function (key) {
      const index = this.routeCache.findIndex(item => {
        return item === key
      })
      if (index >= 0) {
        this.routeCache.splice(index, 1)
      }
    }
  },
  watch: {
    $route: function () {
      this.addRouteCache(this.$route.matched[1].components.default.name)
    }
  }
}
</script>

<style lang="less" scoped>
.app-admin {
  position: relative;
  height: 100%;
  width: 100%;
  .right-content {
    position: absolute;
    left: 250px;
    right: 0;
    height: 100%;
    margin: auto;
    transition: all 0.3s;
    -moz-transition: all 0.3s; /* Firefox 4 */
    -webkit-transition: all 0.3s; /* Safari 和 Chrome */
    -o-transition: all 0.3s; /* Opera */
  }
  .right-content100 {
    left: 80px;
  }
}
</style>
