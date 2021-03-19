import { createStore } from 'vuex'
import LocalStorage from '@/modules/LocalStorage'

const localStore = new LocalStorage('todoVue')
// const localStore = LocalStorage('todoVue')

export default createStore({
  state: {
    todos: [
      { content: '123', done: false },
      { content: '456', done: true },
      { content: '789', done: false }
    ]
  },
  getters: {
    // get list id
    list (state) {
      return state.todos.map((todo, tId) => {
        return {
          tId,
          todo
        }
      })
    },
    filterList: (state, getters) => (filter) => {
      let status = null
      switch (filter) {
        // case 'all':
        //   return getters.list
        // case 'active':
        //   return getters.list.filter((todo) => { return !todo.todo.done })
        // case 'done':
        //   return getters.list.filter((todo) => { return todo.todo.done })
        // default:
        //   return []
        case 'all':
          return getters.list
        case 'active':
          status = false
          break
        case 'done':
          status = true
          break
      }
      return getters.list.filter((todo) => { return todo.todo.done === status })
    }
    // filterList (state) {
    //   return (filter) => {
    //   }
    // }
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
      // return axios.post().then((result) => {
      // }).catch(() => {
      // })
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
