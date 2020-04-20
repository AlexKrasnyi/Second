/* eslint-disable */
<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
            <h4>Редагувати</h4>
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
                <label>Виберіть категорію</label>
                </div>

                <div class="input-field">
                <input
				type="text"
				id="name"
				v-model="title"
				:class="{ invalid: $v.title.$dirty && !$v.title.required}"
				>
                <label for="name">Назва</label>
                <span class="helper-text invalid"
				v-if="$v.title.$dirty && !$v.title.required"
				>
				Введіть назву категорії
				</span>
                </div>

                <div class="input-field">
                <input
                id="limit"
                type="number"
				v-model="limit"
				:class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
                >
                <label for="limit">Ліміт</label>
                <span
				 class="helper-text invalid"
				 v-if="$v.limit.$dirty && !$v.limit.minValue"
				 >
				 Мінімум: {{ $v.limit.$params.minValue.min }} грн.
				 </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                Оновити
                <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { required, minValue } from 'vuelidate/lib/validators'
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
				this.$message('Категорія оновлена успішно')
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
