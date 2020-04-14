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
