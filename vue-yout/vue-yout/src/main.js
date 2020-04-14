import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/dateFilter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)

const firebaseConfig = {
	apiKey: 'AIzaSyCmBHVZi6uJx5-AGSPW29vpKY7N9KHo11A',
	authDomain: 'my-app-vue-b6294.firebaseapp.com',
	databaseURL: 'https://my-app-vue-b6294.firebaseio.com',
	projectId: 'my-app-vue-b6294',
	storageBucket: 'my-app-vue-b6294.appspot.com',
	messagingSenderId: '366537310448',
	appId: '1:366537310448:web:3fc4c7847a772ec1ce8235',
	measurementId: 'G-34G07QPXBD'
}

firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
})
