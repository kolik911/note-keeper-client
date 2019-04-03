<template>
  <li @dblclick="toggleEditInput" class="todo-item" :style="{ backgroundColor: todo.color }">
    <label class="container">
      <input type="checkbox" class="checkbox" v-model="todo.checked" @change="editCheckBox">
      <span class="checkmark"></span>
    </label>

    <input
      type="text"
      ref="todoEditInput"
      v-if="edit"
      v-model="newText"
      class="edit-input"
      @keyup.enter="editTodo"
    >
    <p v-if="!edit" class="todo-item-content" v-html="checkText"></p>

    <div class="control-panel">
      <div class="color-picker">
        <i class="material-icons" title="Change color">color_lens</i>
        <color-picker
          v-model="todo.color"
          @input="changeBackgroundColor"
          :backgroundColors="backgroundColors"
        ></color-picker>
      </div>
      <button class="delete-button" @click="deleteTodo" title="Delete">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </li>
</template>

<script>
import ColorPicker from "./ColorPicker.vue";
export default {
  name: "todo-item",
  props: ["todo"],
  data() {
    return {
      edit: false,
      newText: "",
      color: "",
      backgroundColors: [
        {
          title: "White",
          color: "#fff"
        },
        {
          title: "Red",
          color: "#f28b82"
        },
        {
          title: "Orange",
          color: "#fbbc04"
        },
        {
          title: "Yellow",
          color: "#fff475"
        },
        {
          title: "Green",
          color: "#ccff90"
        },
        {
          title: "Tear",
          color: "#a7ffeb"
        },
        {
          title: "Blue",
          color: "#cbf0f8"
        },
        {
          title: "Dark blue",
          color: "#aecbfa"
        },
        {
          title: "Purple",
          color: "#d7aefb"
        },
        {
          title: "Dark Purple",
          color: "#c79fb5"
        },
        {
          title: "Brown",
          color: "#e6c9a8"
        },
        {
          title: "Gray",
          color: "#e8eaed"
        }
      ]
    };
  },
  components: { ColorPicker },
  methods: {
    deleteTodo() {
      if (!this.todo.checked)
        return alert("You must check todo item before delete");

      this.$emit("delete-todo", this.todo._id);
    },
    toggleEditInput() {
      this.edit = !this.edit;
      this.newText = this.todo.text;
      if (!this.edit) return;
      this.$nextTick(() => {
        this.$refs.todoEditInput.focus();
      });
    },
    editTodo() {
      this.$emit("edit-todo", { ...this.todo, text: this.newText });
      this.toggleEditInput();
    },
    editCheckBox() {
      this.$emit("edit-checkbox", this.todo);
    },
    changeBackgroundColor() {
      this.$emit("edit-background-color", this.todo);
    }
  },
  filters: {
    tel(val) {
      if (!val) return "";
      const reg = /\+[0-9]{12}/g;
      return val.replace(reg, '<a href="tel:$&">$&</a>');
    },
    email(val) {
      if (!val) return "";
      const reg = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/g;
      return val.replace(reg, '<a href="mailto:$&">$&</a>');
    }
  },
  computed: {
    checkText() {
      const strTel = this.$options.filters.tel(this.todo.text);
      const strTelEmail = this.$options.filters.email(strTel);
      return strTelEmail;
    }
  }
};
// $options.filters.tel(todo.text),v-html="checkText(todo.text)"
</script>

<style>
.todo-item {
  width: 220px;
  position: relative;
  list-style-type: none;
  padding: 25px 10px;
  margin: 5px 5px 30px 5px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
}

.control-panel {
  color: #000;
  display: none;
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0px;
  /* background: rgba(199, 129, 129, 0);
  -webkit-box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.75); */
  border-radius: 0 0 5px 5px;
  padding: 3px 0 0 0;
}

.todo-list li:hover .control-panel {
  display: block;
  border: none;
}

.color-picker {
  float: left;
  margin: 0 0 0 10px;
  position: relative;
  cursor: pointer;
}

.color-picker:hover .color-list {
  display: flex;
}

.control-panel .delete-button {
  /* display: none; */
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 15px;
  float: right;
}

.control-panel .delete-button i {
  font-size: 20px;
}

/* .todo-list ul li:hover .control-panel .delete-button {
  display: block;
} */

.edit-input {
  background: rgba(199, 129, 129, 0);
  border: none;
  outline: none;
  font-size: 18px;
  padding: 0px 0 25px 0;
  margin: 18px 0;
  width: 100%;
}
.todo-item-content {
  word-wrap: break-word;
  padding: 0px 0 25px 0;
  text-align: left;
  font-size: 18px;
}

.container {
  top: 0px;
  right: -17px;
  display: block;
  position: absolute;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  border-radius: 0 5px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #ccc;
}

.container:hover input ~ .checkmark {
  background-color: #5f5f5f;
}
.container input:checked ~ .checkmark {
  background-color: #000000;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 5px;
  top: 0;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
