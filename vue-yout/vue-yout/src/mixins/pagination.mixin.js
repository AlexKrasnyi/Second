/* eslint-disable */
import _ from 'lodash'
import localizeFilter from '@/filters/localize.filter'

export default {
	data () {
		return{
			page: +this.$route.query.page || 1,
			pageSize: 4,
			pageCount: 0,
			allItems: [],
			items: [],
			back: null,
			forward: null
		}
	},
	methods: {
		pageChangeHandler (page) {
			this.$router.push(`${this.$route.path}?page=${page}`)
			this.items = this.allItems[page - 1] || this.allItems[0]
		},
		setupPangination (allItems) {
			this.allItems = _.chunk(allItems, this.pageSize)
			this.pageCount = _.size(this.allItems)
			this.items = this.allItems[this.page - 1] || this.allItems[0]
			this.back = localizeFilter('Back')
			this.forward = localizeFilter('Forward')

		}
	}
}