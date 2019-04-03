// import axios from "axios";

const url = "http://localhost:5000/api/posts/";

class PostService {
  // static getPosts() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await axios.get(url);
  //       const data = res.data;
  //       resolve(
  //         data.map(post => ({
  //           ...post,
  //           createdAt: new Date(post.createdAt)
  //         }))
  //       );
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }
  static async getTodos() {
    const api_call = await fetch(url);
    const data = await api_call.json();
    return data;
  }

  static insertTodo(text) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ text })
    }).then(response => response.json());
  }

  static editTodo(id, todo) {
    return fetch(`${url}${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }).then(response => response.json());
  }

  // static editTodo(id, text) {
  //   return fetch(`${url}${id}`, {
  //     method: "PUT",
  //     mode: "cors",
  //     cache: "no-cache",
  //     headers: {
  //       "Content-Type": "application/json"
  //       // "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: JSON.stringify({ text })
  //   }).then(response => response.json());
  //   // console.log(id, data);
  // }

  static deleteTodo(id) {
    return fetch(`${url}${id}`, {
      method: "Delete"
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    );
  }
}

export default PostService;
