/* eslint-disable */
<template>
    <div>
    <div class="page-title">
        <h3>{{'Record_new' | localize}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length">{{'Record_categoriesNoYet' | localize}}.
        <router-link to="/categories">{{'Record_editNewCategory' | localize}}</router-link>
    </p>
    <form class="form" v-else @submit.prevent="handleSubmit">
        <div class="input-field" >
        <select ref="select" v-model="category">
            <option
            v-for="i in categories"
			:key="i.id"
			:value="i.id"
			>{{ i.title }}</option>
        </select>
        <label>{{'CategoryEdit_selectCategory' | localize}}</label>
        </div>

        <p>
        <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
				v-model="type"
            />
            <span>{{'Income' | localize}}</span>
        </label>
        </p>

        <p>
        <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
				v-model="type"
            />
            <span>{{'Outcome' | localize}}</span>
        </label>
        </p>

        <div class="input-field">
        <input
            id="amount"
            type="number"
			v-model.number="amount"
			:class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        >
        <label for="amount">{{'Sum' | localize}}</label>
        <span
		class="helper-text invalid"
		v-if="$v.amount.$dirty && !$v.amount.minValue"
		>
        {{'CategoryCreate_min' | localize }} {{$v.amount.$params.minValue.min}} {{'CategoryCreate_uah' | localize}}.
        </span>
        </div>

        <div class="input-field">
        <input
            id="description"
            type="text"
			v-model="description"
			:class="{ invalid: $v.description.$dirty && !$v.description.required }"
        >
        <label for="description">{{'Description' | localize}}</label>
        <span
                class="helper-text invalid"
				v-if="$v.description.$dirty && !$v.description.required"
				>
				{{'Record_enterDescription' | localize}}
				</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
        {{"CategorCreate_create" | localize}}
        <i class="material-icons right">send</i>
        </button>
    </form>
    </div>
</template>

<script>
/* eslint-disable */
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import currencyFilter from '@/filters/currencyFilter'
export default {
    metaInfo () {
        return {
        title: this.$title('Record_new')
        }
    },
    name: 'record',
    data: () => ({
        loading: true,
        select: null,
		categories: [],
		category: null,
		type: 'outcome',
		amount: 1,
		description: ''
	}),
	validations: {
		amount: {minValue: minValue(1)},
		description: {required}
	},
    async mounted () {
        this.categories = await this.$store.dispatch('getCategory')
		this.loading = false
		
		if (this.categories.length) {
			this.category = this.categories[0].id
		}

		setTimeout(() => {
			this.select = M.FormSelect.init(this.$refs.select)
			M.updateTextFields()
		}, 0)
        this.select = M.FormSelect.init(this.$refs.select)
	},
	computed: {
		...mapGetters(['info']),
		canCreateRecord () {
			if (this.type === 'income') {
				return true
			}
			return this.info.bill >= this.amount
		}
	},
	methods: {
		async handleSubmit () {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}

			if (this.canCreateRecord) {
				try {
					await this.$store.dispatch('createRecord', {
					categoryId: this.category,
					amount: this.amount,
					description: this.description,
					type: this.type,
					date: new Date().toJSON()
					})
					 const bill = this.type === 'income'
					 ? this.info.bill + this.amount
					 : this.info.bill - this.amount
					 
					await this.$store.dispatch('refreshInfo', {bill})
					this.$message(localizeFilter('RecordAdd'))
					this.$v.$reset()
					this.amount = 1
					this.description = ''
				} catch (e) {}	
			} else {
				this.$message(`${localizeFilter('Record_message')} ${ currencyFilter(this.amount - this.info.bill) }`)
			}
		}
	},
    destroyed () {
    if (this.select && this.select.destroyed) {
        this.select.destroyed()
    }
    }
}
</script>