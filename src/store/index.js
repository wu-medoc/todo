import { createStore } from 'vuex'
import LocalStorage from '@/modules/LocalStorage'

const localStore = new LocalStorage('todoVue')

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    setTodo (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    createTodo ({ commit }, { todo }) {
      // 1.read POST -> axios.post()
      const todos = localStore.load()
      todos.push(todo)
      localStore.save(todos)
      // 2.commit mutation
      commit('setTodo', todos)
      // 3.return
      return {
        tId: todos.length - 1,
        todos
      }
    },
    readTodo ({ commit }) {
      // 1.read GET -> localStore.load()
      const todos = localStore.load()
      // 2.commit mutation
      commit('setTodo', todos)
      // 3.return
      return {
        todos
      }
    },
    // updateTodo ({ commit }, { tId, todo }) {
    //   // 1.patch -> axios.patch()
    //   const todos = localStore.load()
    //   todos.splice(tId, 1, todo)
    //   localStore.save(todos)
    //   // 2.commit mutation
    //   commit('setTodo', todos)
    //   // 3.return
    //   return {
    //     tId,
    //     todo
    //   }
    // },
    updateTodo ({ commit }, { tId, content }) {
      // 1.patch -> axios.patch()
      const todos = localStore.load()
      todos[tId].content = content
      localStore.save(todos)
      // 2.commit mutation
      commit('setTodo', todos)
      // 3.return
      return {
        tId,
        todo: todos[tId]
      }
    },
    deleteTodo ({ commit }, { tId }) {
      // 1.delete -> axios.post()
      const todos = localStore.load()
      const todos1 = todos.splice(tId, 1)[0]
      localStore.save(todos)
      // 2.commit mutation
      commit('setTodo', todos)
      // 3.return
      return {
        tId: null,
        todos1
      }
    },
    clearTodo ({ commit }) {
      const todos = []
      localStore.save(todos)
      commit('setTodo', todos)
      return {
        todos
      }
    }
  },
  modules: {
  }
})
