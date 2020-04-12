<template>
  <div >
    <h2>todo application</h2>
    <router-link to="/">Home</router-link>
    <AddTodo
      @add-todo="addTodo"
     />
    <hr>
    <Todolist
    v-if="todos.lehgth"
    :todos="todos"
    @remove-todo="removeTodo"
     />
     <!-- <p v-else>No todos</p> -->
  </div>
</template>

<script>
import Todolist from '@/components/Todolist'
import AddTodo from '@/components/AddTodoComp'
export default {

  data() {
    return {
      todos: [
        // {id:1, title: 'Купить хлеб', completed: false},
        // {id:2, title: 'Купить масло', completed: false},
        // {id:3, title: 'Купить пиво', completed: false}
      ]
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
  .then(response => response.json())
  .then(json => {
    this.todos=json
    })
  },
  methods: {
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    addTodo (todo) {
      this.todos.push(todo)
    }
  },
  components: {
    Todolist,
    AddTodo
  }
  
}
</script>