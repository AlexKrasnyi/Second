/* eslint-disable */
/* global M */
<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
	<div class="card-content">
			<span class="card-title">{{'Register_homeAccouting' | localize}}</span>
			<div class="input-field">
				<input
						id="email"
						type="text"
						v-model.trim="email"
						:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
				>
				<label for="email">Email</label>
				<small
				 class="helper-text invalid"
				 v-if="$v.email.$dirty && !$v.email.required"
				 >
				 {{'Register_message_requiredField' | localize}}
				 </small>
				<small
				 class="helper-text invalid"
				 v-else-if="$v.email.$dirty && !$v.email.email"
				 >
				 {{'Register_message_correctEmail' | localize}}
				 </small>
			</div>
				<div class="input-field">
					<input
							id="password"
							type="password"
							v-model.trim="password"
							:class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
					>
					<label for="password">{{'Password' | localize}}</label>
					<small
					class="helper-text invalid"
					v-if="$v.password.$dirty && !$v.password.required"
					>
					{{'Register_message_requiredField' | localize}}
					</small>
					<small
					class="helper-text invalid"
					v-if="$v.password.$dirty && !$v.password.minLength"
					>
					{{'Register_minPassword' | localize}} {{$v.password.$params.minLength.min}} {{'Register_minSymbols' | localize}} {{password.length}}
					</small>
				</div>
		</div>
		<div class="card-action">
			<div>
				<button
						class="btn waves-effect waves-light auth-submit"
						type="submit"
				>
					{{'Enter' | localize}}
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				{{'Login_noAccaunt' | localize}}?
				<router-link to="/register">{{'Register_signUp' | localize}}</router-link>
			</p>
		</div>
	</form>
</template>

<script>
/* eslint-disable */
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
	metaInfo () {
        return {
        title: this.$title('Enter')
        }
    },
	name: 'login',
	data: () => ({
		email: '',
		password: ''
	}),
	validations: {
		email: { email, required },
		password: { required, minLength: minLength(7) }
	},
	mounted () {
		if (messages[this.$route.query.message]) {
			console.log(this.$message(messages[this.$route.query.message]))
			this.$message(messages[this.$route.query.message])
		}
	},
	methods: {
		async onSubmit () {
			if (this.$v.$invalid) {
				this.$v.$touch()
			}
			const formData = {
				email: this.email,
				password: this.password
			}

			try {
				await this.$store.dispatch('login', formData)
				this.$router.push('/')
			} catch (e) {}
		}
	}
}
</script>
