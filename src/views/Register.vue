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
            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model.trim="v$.form.name.$model"
                    :class="{invalid: v$.form.name.$errors.length}"
                >
                <label for="name">Имя</label>
                <small 
                    class="helper-text invalid"
                    v-for="err in v$.form.name.$errors"
                    :key="err"
                >{{ err.$message }}</small>
            </div>
            <p>
                <label>
                    <input type="checkbox" 
                        v-model.trim="v$.form.checkbox.$model"
                        :class="{invalid: v$.form.checkbox.$errors.length}"
                    />
                    <span>С правилами согласен</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    Зарегистрироваться
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Уже есть аккаунт?
                <router-link to="/login">Войти!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
    data() {
        return {
            form: {
                emailAddress: '',
                password: '',
                name: '',
                checkbox: false
            }
        }
    },
    
    setup: () => ({ v$: useVuelidate() }),
    
    validations () {
        return {
            form: {
                emailAddress: { required, email },
                password: { required, minLength: minLength(6) },
                name: {required, minLength: minLength(2)},
                checkbox: {checked: v => v}
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
                password: this.form.password,
                name: this.form.name
            }
            try {
                await this.$store.dispatch('register', formData)
                this.$router.push('/')
            } catch (error) {}

            
        }
    }
}
</script>