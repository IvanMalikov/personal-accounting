<template>
    <div>
    <div class="page-title">
        <h3>Новая запись</h3>
    </div>

    <loader v-if="loading"></loader>

    <p class="center" v-else-if="!categories.length">No categories <router-link to="/categories">Add new category</router-link></p>

    <form class="form" v-else @submit.prevent="onSubmit">
        <div class="input-field" >
        <select ref="select" v-model="category">
            <option
            v-for="cat of categories"
            :key="cat.id"
            :value="cat.id"
            >{{ cat.title }}</option>
        </select>
        <label>Выберите категорию</label>
        </div>

        <p>
        <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
            />
            <span>Доход</span>
        </label>
        </p>

        <p>
        <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
            />
            <span>Расход</span>
        </label>
        </p>

        <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="v$.amount.$model"
            :class="{invalid: v$.amount.$errors.length}"
        >
        <label for="amount">Сумма</label>
        <span
            class="helper-text invalid" 
            v-for="err in v$.amount.$errors"
            :key="err"
            >{{ err.$message }}
        </span>
        </div>

        <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="v$.description.$model"
            :class="{invalid: v$.description.$errors.length}"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text invalid" 
            v-for="err in v$.description.$errors"
            :key="err"
            >{{ err.$message }}
        </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
        </button>
    </form>
    </div>
</template>

<script>

import Loader from '../components/app/Loader.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            loading: true,
            categories: [],
            select: null,
            category: null,
            type: 'outcome',
            amount: 1,
            description: ''
        }
    },

    computed: {
        ...mapGetters(['info']),
        canCreateRecord() {
            if(this.type === 'income') {
                return true
            }

            return this.info.bill >= this.amount
        }
    },

    methods: {
        async onSubmit() {
            if(this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            if(this.canCreateRecord) {
 
                try {
                    await this.$store.dispatch('createRecord', {
                        categoryId: this.category,
                        description: this.description,
                        amount: this.amount,
                        type: this.type,
                        date: new Date().toJSON()
                    }) 

                    const bill = this.type === 'income' 
                    ? this.info.bill + this.amount
                    : this.info.bill - this.amount

                    await this.$store.dispatch('updateInfo', {bill})
                    
                    this.$message('Record successfully created')
                    this.v$.$reset()
                    this.amount = 1
                    this.description = ''

                } catch (error) {}

                
            } else {
                this.$message(`Not enough credits (${this.amount - this.info.bill})`)
            }
            
        }
    },

    setup: () => ({v$: useVuelidate()}),

    validations() {
        return {
            amount: {minValue: minValue(1)},
            description: {required}
        }
    },

    async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories')
        this.loading = false

        if(this.categories.length) {
            this.category = this.categories[0].id
        }

        setTimeout(() => {
            
            this.select = M.FormSelect.init(this.$refs.select);
            M.updateTextFields()

        }, 0)
    },

    beforeUnmount() {
        if(this.select && this.select.destroy) {
            this.select.destroy()
        }
    },

    components: { 
        Loader 
    }

}
</script>