<template>
  <label :for="/radio/.test(type) && 'blank'" class="wo-input">
    <i class="wo-input-icon" v-if="icon">
      <span :style="{backgroundImage: `url('${icon}')`}"></span>
    </i>
    <span class="wo-input-label" v-if="label">{{label}}</span>
    <input class="wo-input-unit" v-if="/checkbox/.test(type)" :type="type" @change="handleChange" v-model="val" :readonly="readonly" :name="name" :placeholder="placeholder" />
    <label class="wo-input-radio" v-if="/radio/.test(type)" v-for="item in radioItems" :key="item.value">
      <input class="wo-input-unit" :type="type" @change="handleChange" :value="item.value" v-model="val" :readonly="readonly" :name="name" :placeholder="placeholder" />
      <span class="wo-input-label-radio">{{item.label}}</span>
    </label>
    <input class="wo-input-area" v-if="!/radio|checkbox/.test(type)" :type="type" @keyup="handleKeyup" v-model="val" :readonly="readonly" :name="name" :placeholder="placeholder" />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "WoInput",
  props: {
    icon: String,
    label: String,
    type: {
      type: String,
      default: "text"
    },
    name: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    maxLength: {
      type: Number
    },
    value: String | Number,
    readonly: String | Boolean,
    radioItems: Array,
    default: String | Number
  },
  data() {
    return {
      val: this.value
    }
  },
  mounted () {
    if (this.type === 'radio' && this.default) {
      this.val = this.default
      this.handleChange()
    }
  },
  watch: {
    value: function (val) {
      this.val = val
    }
  },
  methods: {
    handleKeyup() {
      const val = this.val;
      this.handleMaxLength(val, this.onChange);
    },
    handleMaxLength(val) {
      if (this.maxLength && val.length > this.maxLength) {
        this.val = val.slice(0, this.maxLength);
      }
      this.$emit("input", val);
    },
    handleChange() {
      this.$emit("input", this.val);
    }
  }
};
</script>

<style lang="css">
.wo-input {
  width: 100%;
  height: 46px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0 10px;
}
.wo-input-icon {
  width: 40px;
  border-right: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  padding-right: 10px;
  margin-right: 12px;
}
.wo-input-icon span {
  display: block;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 30px;
  height: 40px;
  margin: 0 auto;
}
.wo-input-label {
  width: 40%;
  font-size: 14px;
  color: #333;
}
.wo-input-area {
  margin-top: -1px;
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  color: #333;
}
.wo-input-radio {
  margin-right: 16px;
}
</style>
