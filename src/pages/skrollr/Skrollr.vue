<template>
  <div id="skrollr-body">
    <div class="skrollr-filling-1000"></div>
    <div v-html="skrollrHtml"></div>
    <div class="skrollr-filling-1000"></div>
    <div class="skrollr-filling-1000"></div>
  </div>
</template>

<script>
import skrollr from 'skrollr'

export default {
  name: 'Skrollr',
  props: {
    skrollrHtml: String
  },
  mounted () {
    this.createSkrollr()
  },
  data () {
    return {
      mySkrollr: null
    }
  },
  methods: {
    createSkrollr () {
      this.mySkrollr = skrollr.init()
    },
    refreshSkrollr () {
      setTimeout(() => {
        this.mySkrollr.refresh()
      }, 200)
    }
  },
  watch: {
    skrollrHtml: function () {
      if (this.mySkrollr) {
        this.refreshSkrollr()
      } else {
        this.createSkrollr()
      }
    }
  }
}
</script>

<style lang="less">
.skrollr-filling-500 {
  height: 500px;
}
.skrollr-filling-1000 {
  height: 1000px;
}
#skrollr-body {
  position: relative;
  .skrollr-scene {
    img {
      width: 100%;
    }
  }
}
</style>
