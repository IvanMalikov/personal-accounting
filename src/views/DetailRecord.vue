<template>
    <div>

        <loader v-if="loading"></loader>

        <div v-else-if="record">

            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">История</router-link>
                <a class="breadcrumb">
                    {{record.type === 'income' ? 'Income' : 'Outcome'}}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card "
                        :class="{
                            'red': record.type === 'outcome',
                            'green': record.type === 'income',
                        }"
                    >
                        <div class="card-content white-text">
                            <p>Описание: {{record.description}}</p>
                            <p>Сумма: {{record.amount}}</p>
                            <p>Категория: {{record.categoryName}}</p>

                            <small>{{record.date}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="center" v-else>No record with id = {{$route.params.id}}</p>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
export default {
  components: { Loader },
    data() {
        return {
            record: null,
            loading: true
        }
    },

    async mounted() {
        const id = this.$route.params.id
        const record = await this.$store.dispatch('fetchRecordById', id)
        const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

        this.record = {
            ...record,
            categoryName: category.title
        }

        this.loading = false
    }
}
</script>