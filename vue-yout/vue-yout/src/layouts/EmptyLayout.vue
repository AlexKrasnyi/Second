<template>
	<div class="grey darken-1 empty-layout">
		<router-view />
	</div>
</template>

<script>
/* eslint-disable */
import messages from '@/utils/messages.js'
import localizeFilter from '@/filters/localize.filter'
export default {
	computed: {
		error () {
			return this.$store.getters.error
		}
	},
	watch: {
		error (fbError) {
			this.$error(messages[fbError.code] || localizeFilter('MainLayour_ErrorMessage'))
		}
	}
}
</script>
