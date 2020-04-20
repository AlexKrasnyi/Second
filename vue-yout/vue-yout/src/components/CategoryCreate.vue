/* eslint-disable */
<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Створити</h4>
        </div>

        <form @submit.prevent="submitHundlers()">
            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model.trim="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
              >
              <label for="name">Назва</label>
              <span
               class="helper-text invalid"
               v-if="$v.title.$dirty && !$v.title.required">
               Введіть назву категорії
               </span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{ invalid : $v.limit.$dirty && !$v.limit.minValue }"
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
              Створити
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
	data: () => ({
		title: '',
		limit: 100
	}),
	validations: {
		title: { required },
		limit: { required, minValue: minValue(100) }
	},
	mounted () {
		M.updateTextFields()// eslint-disable-line
	},
	methods: {
		async submitHundlers () {
			if (this.$v.$invalid) {
				this.$v.$touch()
				return   // eslint-disable-line
			}
			try {
				const category = await this.$store.dispatch('createCategory', {  // eslint-disable-line
					title: this.title,
					limit: this.limit
        })
				this.title = ''
        this.limit = 100
				this.$v.$reset()
				this.$message('Категорія створена')
				this.$emit('created', category)
			} catch (e) {}
		}
	}
}
</script>
