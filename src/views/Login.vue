<template>
<form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
            <input
                id="email"
                type="text"
                v-model.trim="v$.form.emailAddress.$model"
                :class="{invalid: v$.form.emailAddress.$errors.length}"
            >
            <label for="email">Email</label>
            <small 
                class="helper-text invalid"
                v-for="err in v$.form.emailAddress.$errors"
                :key="err"
            >{{ err.$message }}</small>
        </div>
        <div class="input-field">
            <input
                id="password"
                type="password"
                v-model.trim="v$.form.password.$model"
                :class="{invalid: v$.form.password.$errors.length}"
            >
            <label for="password">Пароль</label>
            <small 
                class="helper-text invalid"
                v-for="err in v$.form.password.$errors"
                :key="err"
            >{{ err.$message }}</small>
        </div>
    </div>
    <div class="card-action">
        <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Войти
                <i class="material-icons right">send</i>
            </button>
        </div>

        <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
        </p>
    </div>
</form>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import messages from '../utils/messages.js'

export default {

    data() {
        return {
            form: {
                emailAddress: '',
                password: ''
            }
        }
    },
    
    setup: () => ({ v$: useVuelidate() }),
    
    validations () {
        return {
            form: {
                emailAddress: { required, email },
                password: { required, minLength: minLength(6) }
            }  
        }
    },

    methods: {
        async onSubmit() {
            if(this.v$.form.$invalid) {
                this.v$.form.$touch()
                return
            }
            
            const formData = {
                email: this.form.emailAddress,
                password: this.form.password
            }
            try {
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            } catch (error) {}

        }
    },

    mounted() {
        if(messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }
    }
}

</script>