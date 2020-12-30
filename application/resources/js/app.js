import Vue from 'vue'
import vuetify from './vuetify'
import router from './router'
import App from './App.vue'
import vueMoment from 'vue-moment'
import Toasted from 'vue-toasted';

Vue.use(vueMoment)
Vue.use(Toasted)

new Vue({
    // Add this line
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
