/* eslint-disable */
export default function currecyFilter (value) {
	return new Intl.NumberFormat('uk-UA', {
		style: 'currency',
		currency: 'UAH'
	}).format(value)
}
