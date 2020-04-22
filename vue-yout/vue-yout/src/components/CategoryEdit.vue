/* eslint-disable */
<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
            <h4>{{'CategoryEdit_edit' | localize}}</h4>
            </div>

            <form @submit.prevent="categoryEdit">
                <div class="input-field" >
                <select ref="select" v-model="actual">
                    <option
					v-for="c in categories"
					:key="c.id"
					:value="c.id"
					>{{ c.title }}</option>
                </select>
                <label>{{'CategoryEdit_selectCategory' | localize}}</label>
                </div>

                <div class="input-field">
                <input
				type="text"
				id="name"
				v-model="title"
				:class="{ invalid: $v.title.$dirty && !$v.title.required}"
				>
                <label for="name">{{'CategorCreate_title' | localize}}</label>
                <span class="helper-text invalid"
				v-if="$v.title.$dirty && !$v.title.required"
				>
				{{'CategoryCreate_categoryName_message' | localize}}
				</span>
                </div>

                <div class="input-field">
                <input
                id="limit"
                type="number"
				v-model="limit"
				:class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
                >
                <label for="limit">{{'CategoryCreate_limit' | localize}}</label>
                <span
				 class="helper-text invalid"
				 v-if="$v.limit.$dirty && !$v.limit.minValue"
				 >
				 {{'CategoryCreate_min' | localize}}: {{ $v.limit.$params.minValue.min }} {{'CategoryCreate_uah' | localize}}
				 </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
               {{'Update' | localize}}
                <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
export default {
	props: {
		categories: {
			type: Array,
			required: true
		}
	},
    data: () => ({
		select: null,
		title: '',
		limit: 100,
		actual: null
	}),
	watch: {
		actual (categorId) {
			const { title, limit } = this.categories.find(function (c) {
				return c.id === categorId
			})
			this.title = title
			this.limit = limit
		}
	},
	validations: {
		title: { required },
		limit: { required, minValue: minValue(100) }
	},
	methods: {
		async categoryEdit () {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			try {
				const categoryInform = {
					id: this.actual,
					title: this.title,
					limit: this.limit
				}
				await this.$store.dispatch('categoryRefresh', categoryInform)
				this.$message(localizeFilter('CategoryEdit_massage'))
				this.$emit('refreshed', categoryInform)
			} catch (e) {}
		}
	},
    mounted () {
		this.select = M.FormSelect.init(this.$refs.select)
		M.updateTextFields()
	},
	created () {
		const { id, title, limit } = this.categories[0]
		this.actual = id,
		this.title = title,
		this.limit = limit

	},
    destroyed () {
        if(this.select && this.select.destroyed) {
            this.select.destroyed()
        }
    }
}
</script>
