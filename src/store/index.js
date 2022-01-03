import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        inputValue: 'aaa',
        nextId: 4,
        viewKey: 'all'
    },
    mutations: {
        initState(state, list) {
            state.list = list
        },
        inputValueChange(state, val) {
            state.inputValue = val
        },
        addList(state) {
            const obj = {
                id: state.nextId,
                info: state.inputValue.trim(),
                done: false
            }
            state.list.push(obj);
            state.nextId++;
            state.inputValue = '';
        },
        removeItem(state, id) {
            const i = state.list.findIndex(x => x.id === id)
            if (i !== -1) {
                state.list.splice(i, 1)
            }
        },
        statusChange(state, parma) {
            const i = state.list.findIndex(x => x.id === parma.id)
            if (i !== -1) {
                state.list[i].done = parma.status
            }
        },
        cleanStatus(state) {
            state.list = state.list.filter(x => x.done === false)

        },
        changeViewKey(state, key) {
            state.viewKey = key
        }
    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({
                data
            }) => {
                console.log(data);
                context.commit('initState', data)
            })
        }
    },
    getters: {
        unDoneLength(state) {
            return state.list.filter(x => x.done === false).length
        },
        infoList(state) {
            if (state.viewKey === 'all') {
                return state.list
            }
            if (state.viewKey === 'undone') {
                return state.list.filter(x => !x.done)
            }
            if (state.viewKey === 'done') {
                return state.list.filter(x => x.done)
            }
            return state.list
        }
    },
    modules: {}
})