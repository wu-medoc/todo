<template>
  <div class="todo">
    <h1>This is an todo page</h1>
     <!-- replace替代自己的歷史記錄 -->
    <router-link to="/todo" :class="{'active': defActive}" replace>all</router-link>｜
    <router-link to="/todo?filter=active" replace>active</router-link>｜
    <router-link :to="{ path:'/todo', query:{ filter:'done' }}" replace>do</router-link>
    <!-- <router-link :to="{ name:'Todo', query:{ filter:'done' }}">do</router-link>｜ -->
    <p>show: {{ filter }}</p>
    <p>{{ list }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // all, active, done
      filter: 'all',
      defActive: false
    }
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
      // return this.$store.getters.filterList(this.$router.route.query.filter)  // 不建議風險高
    }
  },
  watch: {
    // function(第一次進入未watch)
    // 第一層不要用()=>, 會導致this指向Vue
    // $route: function (route) {
    //   // check query => redirect
    //   this.filter = route.query.filter || 'all'
    // }

    // object
    $route: {
      // immediate進入馬上執行
      immediate: true,
      handler: function (route) {
        (route.query.filter === undefined) ? this.defActive = true : this.defActive = false
        this.filter = route.query.filter || 'all'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.todo a {
  text-decoration: none;
  color: black;
  font-weight: 400;
  &.active,
  &.router-link-exact-active:focus {
    color: green;
    font-weight: 700;
  }
}
</style>
