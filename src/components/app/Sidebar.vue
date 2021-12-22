<template>
    <ul class="sidenav app-sidenav" :class="{open: isOpen}">

        <router-link
            v-for="link in links"
            custom
            :key="link.url"
            :to="link.url"
            v-slot="{navigate, href}"
        >
            <li @click="navigate" :class="{
                    active: $route.path === href
                }">
                <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
            </li>
        </router-link>
    </ul>
</template>

<script>

export default {
    props: ['isOpen'],
    data() {
        return {
            links: [
                {title: this.$filters.localizeFilter('Menu_Bill'), url: '/', exact: true},
                {title: this.$filters.localizeFilter('Menu_History'), url: '/history'},
                {title: this.$filters.localizeFilter('Menu_Planning'), url: '/planning'},
                {title: this.$filters.localizeFilter('Menu_NewRecord'), url: '/record'},
                {title: this.$filters.localizeFilter('Menu_Categories'), url: '/categories'}
            ]
        }
    }
}
</script>