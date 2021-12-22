<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p 
                v-for="cur of currencies"
                :key="cur"
                class="currency-line"
            >
              <span> {{ $filters.currencyFilter(getCurrency(cur), cur) }} </span>
            </p>
          </div>
        </div>
    </div>

</template>

<script>
export default {
    props: ['rates'],

    data() {
        return {
            currencies: ['UAH', 'USD', 'EUR']
        }
    }, 

    methods: {
        getCurrency(currency) {
            return (this.base * this.rates[currency]).toFixed(2)
        }
    },

    computed: {

        base() {
            return this.$store.getters.info.bill / (this.rates['UAH'] / this.rates['EUR'])
        }

    }

    
}
</script>