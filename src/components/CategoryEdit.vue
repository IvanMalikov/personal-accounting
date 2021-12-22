<template>
    <div class="col s12 m6">
                    <div>
                    <div class="page-subtitle">
                        <h4>Редактировать</h4>
                    </div>

                    <form @submit.prevent="onSubmit">
                        <div class="input-field" >
                        <select ref="select" v-model="current">
                            <option 
                                v-for="cat of categories" 
                                :key="cat.id"
                                :value="cat.id"
                            >
                                {{ cat.title }}
                            </option>
                        </select>
                        <label>Выберите категорию</label>
                        </div>

                        <div class="input-field">
                            <input
                                id="name"
                                type="text"
                                v-model.trim="v$.title.$model"
                                :class="{invalid: v$.title.$errors.length}"
                            >
                            <label for="name">Название</label>
                            <span class="helper-text invalid"
                                v-for="err in v$.title.$errors"
                                :key="err"
                            >{{ err.$message }}</span>
                        </div>

                        <div class="input-field">
                            <input
                                id="limit"
                                type="number"
                                v-model.number="v$.limit.$model"
                                :class="{invalid: v$.limit.$errors.length}"
                            >
                            <label for="limit">Лимит</label>
                            <span class="helper-text invalid"
                                v-for="err in v$.limit.$errors"
                                :key="err"
                            >{{ err.$message }}</span>
                        </div>

                        <button class="btn waves-effect waves-light" type="submit">
                        Обновить
                        <i class="material-icons right">send</i>
                        </button>
                    </form>
                    </div>
                </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

export default {

    props: {
        categories: {
            type: Array,
            required: true
        }
    },

    data() {
        return{
            select: null,
            title: '',
            limit: 0,
            current: null
        }
    },

    methods: {
        async onSubmit() {
            if(this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            try {
                const categoryData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                }

                await this.$store.dispatch('updateCategory', categoryData)
                this.$message('Category successfully updated')
                this.$emit('updated', categoryData)
            } catch (error) {
                
            }
        }
    },

    watch: {
        current(catId) {
            const {title, limit} = this.categories.find(c => c.id === catId)
            this.title = title
            this.limit = limit
        }
    },

    created() {
        const {id, title, limit} = this.categories[0]
        this.current = id
        this.title = title
        this.limit = limit
    },

    mounted() {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields()
    },

    setup: () => ({v$: useVuelidate()}),

    validations() {
        return {
            title: {required},
            limit: {minValue: minValue(1)}
        }
    },


    beforeUnmount() {
        if(this.select && this.select.destroy) {
            this.select.destroy()
        }
    }
}
</script>