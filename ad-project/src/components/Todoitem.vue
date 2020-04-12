<template>
    <li>
        <span :class="{done: todo.completed}">
            <input type="checkbox" @change="todo.completed = !todo.completed">
            <strong>{{index + 1}}</strong>
            {{todo.title}}
        </span>
        <button class="rb" @click="$emit('remove-todo', todo.id)">&times;</button>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: Number
    }
}
</script>

<style scoped>
li {
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    padding: .5rem 2rem;
    margin-bottom: 1rem;
}
input {
    margin-right: 1rem;
}
.rb {
    background: red;
    color: white;
    border-radius: 50%;
    font-weight: bold;
}

.done {
    text-decoration: line-through;
}

</style>