<template>
  <ul class="color-list">
    <color-picker-item
      v-for="(item, i) in backgroundColors"
      @click.native="changeColor(item.color)"
      :item="item"
      :key="i"
      :isSelected="isCheckedColor(item.color)"
    />
  </ul>
</template>

<script>
import ColorPickerItem from "./ColorPickerItem.vue";

export default {
  name: "color-picker",
  props: ["backgroundColors", "value"],
  methods: {
    changeColor(color) {
      this.$emit("input", color);
      // console.log(color);
    }
  },
  components: {
    ColorPickerItem
  },
  computed: {
    isCheckedColor() {
      return itemColor => {
        return itemColor === this.value;
      };
    }
  }
};
</script>

<style>
.color-list {
  position: absolute;
  margin: 0;
  /* display: flex; */
  display: none;
  top: -94px;
  width: 120px;
  flex-flow: row wrap;
  left: 0;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  padding: 5px;
  border-radius: 3px;
  background: #fff;
}

.color-list li {
  /* display: none; */
  width: 25px;
  height: 25px;
  border-radius: 30px;
  background: #000;
  list-style: none;
  margin: 0 3px 3px 0;
}
</style>
