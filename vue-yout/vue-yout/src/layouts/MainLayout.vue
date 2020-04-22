<template>
	<div>

		<Loader v-if="loading"/>
		<div class="app-main-layout" v-else>

			<Navbar @click="isOpen = !isOpen"/>

			<Sidebar v-model="isOpen" :key="locale"/>

			<main class="app-content" :class="{full: !isOpen}">
				<div class="app-page">
					<router-view />
				</div>
			</main>

			<div class="fixed-action-btn">
				<router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Menu_NewRecord'">
				<i class="large material-icons">add</i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages.js'
import localizeFilter from '@/filters/localize.filter'
export default {
	name: 'main-layout',
	data: () => ({
		isOpen: true,
		loading: true
	}),
	async mounted () {
	  if (!Object.keys(this.$store.getters.info).length) {
		  await this.$store.dispatch('getInfo')
	  }

	  this.loading = false
	},
	computed: {
		error () {
			return this.$store.getters.error
		},
		locale() {
			return this.$store.getters.info.locale
		}
	},
	watch: {
		error (fbError) {
			this.$error(messages[fbError.code] || 'MainLayour_ErrorMessage')
		}
	},
	components: {
		Navbar, Sidebar
	}
}
</script>
