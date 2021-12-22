<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Сумма</th>
                <th>Дата</th>
                <th>Категория</th>
                <th>Тип</th>
                <th>Открыть</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, index) in records" :key="record.id">
                <td>{{index + 1}}</td>
                <td>{{$filters.currencyFilter(record.amount)}}</td>
                <td>{{$filters.dateFilter(record.date)}}</td>
                <td>{{record.categoryName}}</td>
                <td>
                <span class="white-text badge" :class="[record.typeClass]">{{record.typeText}}</span>
                </td>
                <td>
                <button class="btn-small btn" 
                    @click="$router.push('/detail-record/' + record.id)"
                    v-tooltip="'Open'"
                >
                    <i class="material-icons">open_in_new</i>
                </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        records: {
            type: Array,
            required: true
        }
    }
}
</script>