<template>
  <li>
    <template v-if="!edit">
      <input type="checkbox" v-model="editingTodo.done" />{{ tId }}:
      {{ todo.content }}
    </template>
    <template v-else>
      <input type="text" v-model="editingTodo.content" />
    </template>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    tId: Number,
    edit: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      editingTodo: {
        content: '',
        done: false
      }
    }
  },
  mounted () {
    this.editingTodo.content = this.todo.content
    this.editingTodo.done = this.todo.done
  }
}
</script>
