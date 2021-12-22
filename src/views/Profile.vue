<template>
    <div>
        <div class="page-title">
            <h3>{{$filters.localizeFilter('ProfileTitle')}}</h3>
        </div>

        <form class="form" @submit.prevent="onSubmit">
            <div class="input-field">
            <input
                id="description"
                type="text"
                v-model="v$.name.$model"
            >
            <label for="description">{{$filters.localizeFilter('Name')}}</label>
            <small 
                class="helper-text invalid"
                v-for="err in v$.name.$errors"
                :key="err"
            >{{ err.$message }}</small>
            </div>

            <div class="switch">
                <label>
                English
                <input type="checkbox" v-model="isRuLocale">
                <span class="lever"></span>
                Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
            {{$filters.localizeFilter("Update")}}
            <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {

    data() {
        return {
            name: '',
            isRuLocale: true
        }
    },

    computed: {
        ...mapGetters(['info'])
    },

    methods: {

        ...mapActions(['updateInfo']),

        async onSubmit() {
            if(this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            try {
                await this.updateInfo({
                    name: this.name,
                    locale: this.isRuLocale ? 'ru-RU' : 'en-US'
                })
            } catch (error) {
                
            }
        }
    },

    setup: () => ({ v$: useVuelidate() }),
    
    validations () {
        return {
            name: {required}
        }
    },

    mounted() {
        this.name = this.info.name
        this.isRuLocale = this.info.locale === 'ru-RU'
        setTimeout(() => {
            M.updateTextFields()
        })
    }
}
</script>

<style scoped>
    .switch {
        margin-bottom: 2rem;
    }
</style>