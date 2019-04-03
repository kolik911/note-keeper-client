<template>
  <li :title="item.title" :style="{ backgroundColor: item.color}" class="color-picker-item">
    <i v-if="isSelected" class="material-icons">done</i>
  </li>
</template>

<script>
export default {
  name: "color-picker-item",
  props: ["item", "isSelected"],
  computed: {}
};
</script>

<style>
.color-picker-item {
  border: solid 1px rgb(207, 207, 207);
}
.color-picker-item:hover {
  border: solid 1px rgb(97, 97, 97);
}

.selected {
}
</style>
