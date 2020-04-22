/* eslint-disable */
<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>{{'CategorCreate_create' | localize}}</h4>
        </div>

        <form @submit.prevent="submitHundlers()">
            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model.trim="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
              >
              <label for="name">{{'CategorCreate_title' | localize}}</label>
              <span
               class="helper-text invalid"
               v-if="$v.title.$dirty && !$v.title.required">
               {{'CategoryCreate_categoryName_message' | localize}}
               </span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{ invalid : $v.limit.$dirty && !$v.limit.minValue }"
              >
              <label for="limit">{{'CategoryCreate_limit' | localize}}</label>
              <span
               class="helper-text invalid"
               v-if="$v.limit.$dirty && !$v.limit.minValue"
               >
               {{'CategoryCreate_min' | localize}}:  {{$v.limit.$params.minValue.min}}  {{'CategoryCreate_uah' | localize}}
               </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              {{'CategorCreate_create' | localize}}
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
				this.$message(localizeFilter('CategoryCreate_message'))
				this.$emit('created', category)
			} catch (e) {}
		}
	}
}
</script>
