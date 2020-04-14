import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		error: null
	},
	mutations: {
		setError (state, error) {
			state.error = error
		},
		clearError (state) {
			state.error = null
		}
	},
	actions: {
		async getCurrency () {
			const res = await fetch('http://data.fixer.io/api/latest?access_key=c59a83e7f939fdfa5a1d1ab4a4e627b3&symbols=USD,EUR,UAH')
			return await res.json()
		}
	},
	getters: {
		error: s => s.error
	},
	modules: {
		auth, info
	}
})
