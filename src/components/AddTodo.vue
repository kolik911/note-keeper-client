<template>
  <div>
    <h1>Simple todo</h1>
    <div class="add-todo-block">
      <input type="text" class="input-todo" placeholder="Enter some text" v-model="text">
      <button @click="createTodo" class="add-todo-button">
        <!-- <i class="fas fa-share"></i> -->
        <i class="material-icons">send</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-todo",
  data() {
    return {
      text: ""
    };
  },
  methods: {
    createTodo() {
      if (!this.text) return alert("Enter some text!!!");
      this.$emit("create-todo", this.text);
      this.text = "";
    }
  }
};
</script>

<style>
@media only screen and (max-width: 768px) {
  .input-todo {
    width: 75% !important;
  }
}
.add-todo-block {
  width: 50%;
  margin: 0 auto;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
}
.input-todo {
  width: 90%;
  border: none;
  outline: none;
  padding: 10px 0;
}
.add-todo-button {
  background: none;
  border: none;
  outline: none;
  float: right;
  margin: 4px 0 0 0;
}
</style>
