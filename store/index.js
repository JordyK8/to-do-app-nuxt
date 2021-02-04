import EventService from '../backend/EventService'

export const state =() => ({
  test: 'hoi'
})

export const mutations = {
    add(state, payload) {
        
    },
    remove(state, payload) {

    },
    change(state, payload) {
        
    }
}

export const actions = {
    add(context, payload) {

    },
    remove(context, payload) {

    },
    change(context, payload) {
        
    }
}

export const getters = {
    todos(state) {
        return state.todos
    }
}