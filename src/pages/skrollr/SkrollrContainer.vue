<template>
  <div id="SkrollrContainer" class="skrollr">
    <div class="skrollr-dashboard">
      <div class="skrollr-dashboard-config" :class="{'hide': !toggleShow}">
        <div class="config-btns">
          <button class="config-btns-toggle" @click="toggleHandle()">{{toggleShow ? '收起' : '展开'}}</button>
          <button class="config-btns-changeData" @click="updateSkrollr()">执行</button>
        </div>
        <SkrollrConfig ref="skConfig" />
      </div>
      <div class="skrollr-dashboard-show" :class="{'full': !toggleShow}">
        <Skrollr :skrollrHtml.sync="skrollrHtml" />
      </div>
    </div>
  </div>
</template>

<script>
import Skrollr from './Skrollr'
import SkrollrConfig from './SkrollrConfig'

export default {
  name: 'SkrollrContainer',
  data () {
    return {
      toggleShow: true,
      skrollrHtml: ''
    }
  },
  mounted () {
    this.updateSkrollr()
  },
  computed: {
  },
  components: {
    Skrollr,
    SkrollrConfig
  },
  methods: {
    toggleHandle () {
      this.toggleShow = !this.toggleShow
    },
    updateSkrollr () {
      this.skrollrHtml = this.$refs.skConfig.getSkrollrHtml()
    }
  }
}
</script>

<style lang="less">
@configWidth: 500px;
.skrollr {
  &-dashboard {
    position: relative;
    &-config {
      position: fixed;
      left: 0;
      width: @configWidth;
      z-index: 10;
      &.hide {
        left: -@configWidth;
      }
      .skrollr-config {
        max-height: 600px;
        overflow: auto;
      }
      .config-btns {
        position: absolute;
        right: -100px;
        width: 100px;
        button {
          background-color: #ddd;
          border: 1px solid #999;
          text-align: center;
          height: 36px;
          line-height: 36px;
          width: 100px;
          margin-bottom: 10px;
        }
      }
    }
    &-show {
      position: absolute;
      right: 0;
      left: @configWidth;
      &.full {
        left: 0;
      }
    }
  }
  &-code {
    width: 100%;
    height: 300px;
    margin-top: 20px;
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
