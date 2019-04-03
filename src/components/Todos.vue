<template>
  <div>
    <add-todo v-on:create-todo="createTodo($event)"/>
    <todo-list :todos="todos">
      <template v-slot="{ todo }">
        <todo-item
          @delete-todo="deleteTodo($event)"
          @edit-todo="editTodo($event)"
          @edit-checkbox="editTodo($event)"
          @edit-background-color="editTodo($event)"
          :todo="todo"
        ></todo-item>
      </template>
    </todo-list>
  </div>
</template>


<script>
import TodoList from "./TodoList.vue";
import AddTodo from "./AddTodo.vue";
import TodoItem from "./TodoItem.vue";

import TodoService from "../TodoService";

export default {
  name: "todos",
  data() {
    return {
      todos: [],
      text: ""
    };
  },
  components: {
    TodoList,
    AddTodo,
    TodoItem
  },
  async created() {
    try {
      this.todos = await TodoService.getTodos();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createTodo(text) {
      await TodoService.insertTodo(text);
      this.todos = await TodoService.getTodos();
    },
    async deleteTodo(id) {
      await TodoService.deleteTodo(id);
      this.todos = await TodoService.getTodos();
    },
    async editTodo(todo) {
      await TodoService.editTodo(todo._id, todo);
      this.todos = await TodoService.getTodos();
    }
    // async editCheckBox(todo) {
    //   await TodoService.editTodo(todo._id, todo);
    //   // console.log(todo);
    //   // console.log(todo.checked);
    // }
  }
};
</script>
