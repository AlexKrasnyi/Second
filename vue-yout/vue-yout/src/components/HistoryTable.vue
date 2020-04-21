<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Сума</th>
                <th>Дата</th>
                <th>Категорія</th>
                <th>Тип</th>
                <th>Відкрити</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, indx) in records" :key="record.id">
                <td>{{indx + 1}}</td>
                <td>{{ record.amount | currency }}</td>
                <td>{{ record.date | date('datatime') }}</td>
                <td>{{ record.categoryName }}</td>
                <td>
                <span
				:class="[record.typeClass]"
				class="white-text badge">{{ record.typeText }}</span>
                </td>
                <td>
                <button
				class="btn-small btn"
				@click="$router.push('/detail-record/' + record.id)"
				v-tooltip="'Подивитись запис'"
				>
                    <i class="material-icons">open_in_new</i>
                </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
/* eslint-disable */
export default {
props: {
	records: {
		required: true,
		type: Array
	}
}
}
</script>
