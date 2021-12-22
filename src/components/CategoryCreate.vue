<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form @submit.prevent="onSubmit">
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
                Создать
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
    data() {
        return {
            title: '',
            limit: 0
        }
    },

    setup: () => ({v$: useVuelidate()}),

    validations() {
        return {
            title: {required},
            limit: {minValue: minValue(1)}
        }
    },

    methods: {
        async onSubmit() {
            if(this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            try {
                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit
                })
                this.title = ''
                this.limit = 0
                this.v$.$reset()
                this.$message('Category has been created')
                this.$emit('created', category)
            } catch (error) {}
        }
    },

    mounted() {
        M.updateTextFields()
    }
}
</script>