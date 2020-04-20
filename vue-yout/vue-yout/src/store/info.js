/* eslint-disable */
import firebase from 'firebase/app'
export default {
	state: {
		info: {}
	},
	mutations: {
		setInfo (state, info) {
			state.info = info
		},
		clearInfo (state) {
			state.info = {}
		}
	},
	actions: {
		async refreshInfo ({ dispatch, commit, getters }, refresh) {
			try {
				const uid = await dispatch('getUid')
				const refreshData = {...getters.info, ...refresh}
				await firebase.database().ref(`/users/${uid}/info`).update(refreshData)			
				commit('setInfo', refreshData)
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		async getInfo ({ dispatch, commit }) {
			try {
				const uid = await dispatch('getUid')
				const inf = await firebase.database().ref(`/users/${uid}/info`).once('value')
				const info = inf.val()
				commit('setInfo', info)
			} catch (e) {

			}
		}
	},
	getters: {
		info: s => s.info
	}
}
