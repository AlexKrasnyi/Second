<template>
  <div id="app">
    <h1>todo application</h1>
    <!-- <AddTodo
      @add-todo="addTodo"
     />
    <hr>
    <Todolist
    :todos="todos"
    @remove-todo="removeTodo"
     /> -->
     <hr>

     <router-view></router-view>
  </div>
</template>

// <script>
// import Todolist from '@/components/Todolist'
// import AddTodo from '@/components/AddTodoComp'
// export default {

//   data() {
//     return {
//       todos: [
//         // {id:1, title: 'Купить хлеб', completed: false},
//         // {id:2, title: 'Купить масло', completed: false},
//         // {id:3, title: 'Купить пиво', completed: false}
//       ]
//     }
//   },
//   mounted() {
//     fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
//   .then(response => response.json())
//   .then(json => {
//     this.todos=json
//     })
//   },
//   methods: {
//     removeTodo(id) {
//       this.todos = this.todos.filter(t => t.id !== id)
//     },
//     addTodo (todo) {
//       this.todos.push(todo)
//     }
//   },
//   components: {
//     Todolist,
//     AddTodo
//   }
  
// }
// </script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
