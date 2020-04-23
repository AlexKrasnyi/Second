/* eslint-disable */
import firebase from 'firebase/app'

export default {
	actions: {
		async login ({ dispatch, commit }, { email, password }) {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password)
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		async register ({ dispatch, commit }, { email, password, name }) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid') 
				await firebase.database().ref(`/users/${uid}/info`).set({
					bill: 100,
					locale: 'uk-UA',
					name
				})
			
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		getUid () {
			const user = firebase.auth().currentUser
			return user ? user.$.W : null
		},
		async logout ({ commit }) {
			await firebase.auth().signOut()
			commit('clearInfo')
		} 
	}
}
