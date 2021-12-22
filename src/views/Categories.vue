<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <loader v-if="loading"></loader>

            <div class="row" v-else>

                <category-create 
                    @created="addNewCategory"
                ></category-create>

                <category-edit 
                    v-if="categories.length"
                    :categories="categories"
                    @updated="updateCategories"
                    :key="categories.length + updateCount"
                ></category-edit>

                <p v-else class="center">No categories</p>

            </div>
        </section>
    </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'

export default {
    data() {
        return {
            categories: [],
            loading: true,
            updateCount: 0
        }
    },

    methods: {
        addNewCategory(category) {
            this.categories.push(category)
        },

        updateCategories(category) {
            const idx = this.categories.findIndex(c => c.id === category.id)
            this.categories[idx].title = category.title
            this.categories[idx].limit = category.limit
            this.updateCount++
        }
    },

    components: {
        CategoryCreate, CategoryEdit,
        Loader
    },

    async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories')
        this.loading = false
    }
}
</script>