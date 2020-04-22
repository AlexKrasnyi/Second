<template>
    <div>
        <div class="page-title">
            <h3>{{'RecordHistory' | localize}}</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="loading"/>
        <p class="center" v-else-if="!records.length">
            {{'History_message_no_yet' | localize}}.
            <router-link to="/record">{{'History_addNew' | localize}}</router-link>
            </p>

        <section v-else>
        <HistoryTable :records="items"/>

        <Paginate
			v-model="page"
        	:page-count="pageCount"
			:click-handler="pageChangeHandler"
			:prev-text="back"
			:next-text="forward"
			:container-class="'pagination'"
            :page-class="'waves-effect'"
        />
        </section>
    </div>
</template>

<script>
/* eslint-disable */
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import localizeFilter from '@/filters/localize.filter'
import { Bar } from 'vue-chartjs'
export default {
	name: 'history',
	extends: Bar,
	mixins: [paginationMixin],
    data: () => ({
        loading: true,
        records: [],
        categories: []
    }),
    async mounted () {
        this.records = await this.$store.dispatch('getRecord')
        this.categories = await this.$store.dispatch('getCategory')
        this.loading = false
		this.setup()
		//this.loading = false
	},
	methods: {
		setup () {
			this.setupPangination (this.records.map(record => {
            return {
                ...record,
                categoryName: this.categories.find(c => c.id === record.categoryId).title,
                typeClass: record.type === 'income' ? 'green' : 'red',
                typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
            }
		}))

		this.renderChart({
        labels: this.categories.map(i => i.title),
        datasets: [{
            label: localizeFilter('ChartInfo'),
            data: this.categories.map(i => {
				return this.records.reduce((total, r) => {
					if(r.categoryId === i.id && r.type === 'outcome') {
						total += +r.amount
					}
					return total
				}, 0)
			}),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })
	}
	},
    components: {
        HistoryTable
    }
}
</script>
