<template>
  <div class="container">
    <h1>TodoList</h1>

    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th style="width: 55%">Todo</th>
            <th style="width: 15%">CreatedAt</th>
            <th style="width: 10%">Status</th>
            <th style="width: 20%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, key) in lists" :key="key.id">
            <th>{{ list.text }}</th>
            <th>{{ list.created_at }}</th>
            <th v-if="list.status === 1">Complete</th>
            <th v-if="list.status === 0">Not yet</th>
            <th>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="complete_todo(list.id)"
              >
                COMPLETE
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="remove_todo(list.id)"
              >
                REMOVE
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <div v-show="error_msg">
        <p>Please enter characters from 0 ~ 25 characters</p>
      </div>
      <input
        type="text"
        style="width: 50%"
        v-model="todo_text"
        placeholder="Add new todo"
      />
      <button type="button" class="btn btn-outline-primary" @click="add_todo()">
        ADD
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lists: [],
      todo_text: "",
      list_id: null,
      error_msg: false,
    };
  },
  mounted: function () {
    this.show_todo();
  },
  methods: {
    show_todo() {
      axios
        .get("/api/todo")
        .then((response) => this.createdat_split(response["data"]));
    },
    add_todo() {
      if (this.check_length()) {
        axios
          .post("/api/todo", {
            text: this.todo_text,
          })
          .then(this.show_todo());
      } else {
        this.error_msg = true;
      }
    },
    complete_todo(id) {
      axios.put("/api/todo/" + id).then(this.show_todo());
    },
    remove_todo(id) {
      axios.delete("/api/todo/" + id).then(this.show_todo());
    },
    check_length() {
      if (this.todo_text.length < 26 && this.todo_text.length > 0) {
        this.error_msg = false;
        return true;
      } else {
        this.error_msg = true;
        return false;
      }
    },
    createdat_split(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].created_at = data[i].created_at
          .substr(0, 16)
          .replace(/\-/g, "/")
          .replace("T", " ");
      }
      this.lists = data;
    },
  },
};
</script>