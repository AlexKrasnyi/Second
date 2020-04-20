export default function currecyFilter (value, currency = 'UAH') {
	return new Intl.NumberFormat('uk-ua', {
		style: 'currency',
		currency
	}).format(value)
}
