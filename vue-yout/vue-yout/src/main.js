/* eslint-disable */
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/dateFilter'
import currencyFilter from '@/filters/currencyFilter'
import localizeFilter from '@/filters/localize.filter'
import messagePlugin from '@/utils/message.plugin.js'
import titlePlugin from '@/utils/title.plugin.js'
import tooltipDirective from '@/directives/tooltip.directive.js'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

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
