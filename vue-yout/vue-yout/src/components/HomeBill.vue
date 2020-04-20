<template>
    <div class="col s12 m6 l4">
		<div class="card light-blue bill-card">
			<div class="card-content white-text">
			<span class="card-title">Рахунок в валюті</span>

			<p
			class="currency-line"
			v-for="cur in currencies"
			:key="cur"
			>
				<span>{{cur}}: {{ receiveCurrency(cur) }}</span>
			</p>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	props: ['rates'],
	data () {
		return {
			currencies: ['UAH', 'USD', 'EUR']
		}
	},
	computed: {
		base () {
			return this.$store.getters.info.bill / (this.rates.UAH / this.rates.EUR)
		}
	},
	methods: {
		receiveCurrency (currency) {
			return Math.floor(this.base * this.rates[currency])
		}
	}
}
</script>
