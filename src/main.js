import { createApp } from 'vue'
import App from './App.vue'
import Loader from './components/app/Loader'
import router from './router/router'
import store from './store/store'
import filters from './filters/filters'
import firebase from 'firebase/compat/app';
import tooltipDirective from './directives/tooltip.directive';
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import 'firebase/compat/auth';
import 'firebase/compat/database';

let app

firebase.initializeApp({
    apiKey: "AIzaSyB8CKAZ9QnyfTbVIYOrZtUreio8hdte9cE",
    authDomain: "best-personal-accounting.firebaseapp.com",
    projectId: "best-personal-accounting",
    storageBucket: "best-personal-accounting.appspot.com",
    messagingSenderId: "589064857276",
    appId: "1:589064857276:web:14a58767793cf62842d2b9",
    databaseURL: "https://best-personal-accounting-default-rtdb.firebaseio.com/"
})

firebase.auth().onAuthStateChanged(() => {
    if(!app) {
    app = createApp(App).directive('tooltip', tooltipDirective).use(router).use(messagePlugin).use(filters).use(store).component('Loader', Loader).mount('#app')
    }
})