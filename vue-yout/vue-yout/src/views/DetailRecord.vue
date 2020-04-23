<template>
    <div>
	<Loader v-if="loading" />
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{'Menu_History' | localize}}</router-link>
      <a @click.prevent  class="breadcrumb">
        {{record.type === 'income' ? 'Income' : 'Outcome' }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div
		 class="card"
		  :class="{
			  'red': record.type ==='outcome',
			  'green': record.type === 'income'
			  }">
          <div class="card-content white-text">
            <p>{{'Description' | localize}} {{ record.description}}</p>
            <p>{{'Sum' | localize}}: {{ record.amount | currency}}</p>
            <p>{{'Category' | localize}}: {{ record.categoryName }} </p>

            <small>{{ record.date | date('datatime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="center" v-else-if="!record">{{'Detail_message_p1' | localize}}: {{$route.params.id}} {{'Detail_message_p2' | localize}}</p>
</div>
</template>

<script>
/* eslint-disable */
import localizeFilter from '@/filters/localize.filter'
export default {
  metaInfo () {
        return {
        title: this.$title('DetailRecord')
        }
    },
	name: 'detail',
	data: () => ({
		record: null,
    loading: true,
  }),
	async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('getRecordById', id)
    const category = await this.$store.dispatch('getCategoryById', record.categoryId)
		this.record ={
			...record,
			categoryName: category.title
    }
    this.loading = false
	}
	}
</script>