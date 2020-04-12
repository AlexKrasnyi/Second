<template>
    <div>
        <ul>
            <TodoItem
            v-for="(i, o) of todos" 
            v-bind:todo="i"
            :index="o"
            :key="i.id"
            v-on:remove-todo="removeTodo"
             />
        </ul>
    </div>
</template>

<script>
import TodoItem from '@/components/Todoitem'

export default {
    props: ['todos'],
    components: {
        TodoItem
    },
    methods: {
        removeTodo(id) {
            this.$emit('remove-todo', id)
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>