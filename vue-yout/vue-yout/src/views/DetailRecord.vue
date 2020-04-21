<template>
    <div>
	<Loader v-if="loading" />
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">Історія</router-link>
      <a @click.prevent  class="breadcrumb">
        {{record.type === 'income' ? 'Дохід' : 'Видаток'}}
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
            <p>Опис: {{ record.description}}</p>
            <p>Сума: {{ record.amount | currency}}</p>
            <p>Категорія: {{ record.categoryName }} </p>

            <small>{{ record.date | date('datatime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="center" v-else-if="!record">Запису з id: {{$route.params.id}} не існує</p>
</div>
</template>

<script>
/* eslint-disable */
export default {
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