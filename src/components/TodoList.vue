<template>
  <ul class="todo-list">
    <slot v-for="todo in todos" :todo="todo"/>
  </ul>
</template>

<script>
export default {
  name: "todo-list",
  props: ["todos"]
};
</script>

<style>
.todo-list {
  padding: 0;
  margin: 30px 0 0 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
</style>
