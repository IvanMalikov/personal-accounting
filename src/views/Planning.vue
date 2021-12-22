<template>
    <div>
    <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ formatBill(info.bill) }}</h4>
    </div>

    <loader v-if="loading"></loader>

    <p class="center" v-else-if="!categories.length">No categories. <router-link to="/categories">Add new category</router-link></p>

    <section v-else>
        <div v-for="cat in categories"
            :key="cat.id"
        >
            <p>
                <strong>{{cat.title}}:</strong>
                {{formatBill(cat.spent)}} from {{formatBill(cat.limit)}}
            </p>
            <div class="progress" v-tooltip="cat.tooltip">
                <div
                    class="determinate"
                    :class="[cat.progressColor]"

                    :style="{width: cat.progressPercent + '%'}"
                ></div>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import {mapGetters} from 'vuex'
export default {
  components: { Loader },
    data() {
        return {
            loading: true,
            categories: [],
        }
    },

    computed: {
        ...mapGetters(['info']),
    },

    methods: {
        formatBill(value) {
            return new Intl.NumberFormat('ua-UA', {
                style: 'currency',
                currency: 'UAH'
            }).format(value)
        }
    },

    async mounted() {
        const records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')

        this.categories = categories.map(cat => {
            const spent = records
                .filter(r => r.categoryId === cat.id)
                .filter(r => r.type === 'outcome')
                .reduce((total, record) => {
                    return total += +record.amount
                }, 0)

            const percent = (100 * spent / cat.limit)
            const progressPercent = percent > 100 ? 100 : percent
            const progressColor = percent < 60
                ? 'green'
                : percent < 100
                    ? 'yellow'
                    : 'red'

            const tooltipValue = cat.limit - spent
            const tooltip = `${this.formatBill(Math.abs(tooltipValue))} ${tooltipValue < 0 ?  ' exceeded' : ' left'}`


            return {
                ...cat,
                progressPercent,
                progressColor,
                spent,
                tooltip
            }
        })

        this.loading = false
    }
}
</script>