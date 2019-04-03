<template>
  <div>
    <p v-if="error">{{error}}</p>
    <input type="text" class="input" v-model="text" placeholder="Enter some new text">
    <button v-on="{ click : text ? createPost : warning }">Send</button>
    <div
      class="post"
      v-for="( post, index ) in posts"
      v-bind:item=" post "
      v-bind:index=" index "
      v-bind:key=" post._id "
      @dblclick="editor(post)"
    >
      <button v-on:click="del( post._id )" style="float:left">Del</button>
      <p id="text">{{ post.text }}</p>
      <input type="text" ref="elements" v-show="post.edit" v-model="edited">
      <button v-show="post.edit" @click="editPost(post._id, edited)">Edit</button>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "HelloWorld",
  data() {
    return {
      edited: [],
      posts: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
    async del(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    warning() {
      alert("You must enter text");
    },
    editor(post) {
      post.edit = !post.edit;
      const arr = this.$refs.elements;
      // console.log(arr);
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        element.value = this.edited;
        this.className = "text" + post._id;
        this.$nextTick(() => {
          arr[index].focus();
        });
      }
    },
    editPost(id, text) {
      PostService.EditPost(id, text);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.post {
  margin: 5px;
  padding: 10px;
  background: rgba(255, 255, 0, 0.7);
}
.input {
  margin: 0 0 35px 0;
}
</style>
