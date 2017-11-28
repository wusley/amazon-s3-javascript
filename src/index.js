import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/home';

import S3 from './plugins/s3';

Vue.use(VueRouter);
Vue.use(S3);

const routes = [{
    name: 's3',
    path: '/s3',
    component: Home
}, {
    path: '*',
    redirect: '/s3'
}];

const router = new VueRouter({
    routes
});

new Vue({
    router
}).$mount('#app');
