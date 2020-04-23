/* eslint-disable */
<template>
	<div>
		<div class="page-title">
			<h3>Категорії</h3>
		</div>
		<section>
			<Loader v-if="loading" />
			<div class="row" v-else>
				<CategoryCreate @created="addNewCategory" />

				<CategoryEdit
				v-if="categories.length"
				:categories="categories"
				:key="categories.lengts + updateCount"
				@refreshed="refreshCategory"
				/>
				<p v-else class="center"> Категорій ще нема</p>
			</div>
		</section>
	</div>
</template>

<script>
/* eslint-disable */
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
	metaInfo () {
        return {
        title: this.$title('Menu_Categories')
        }
    },
	name: 'categories',
	data () {
		return {
			categories: [],
			loading: true,
			updateCount: 0
		}
	}, 
	components: {
		CategoryCreate, CategoryEdit
	},
	async mounted () {
		this.categories = await this.$store.dispatch('getCategory')
		this.loading = false
	},
	methods: {
		addNewCategory (category) {
			this.categories.push(category)
			console.log(this.categories)// eslint-disable-line
		},
		refreshCategory (category) {
			const ind = this.categories.findIndex(c => c.id === category.id)
			this.categories[ind].title = category.title
			this.categories[ind].limit = category.limit
			this.updateCount++

		}
	}
}
</script>
