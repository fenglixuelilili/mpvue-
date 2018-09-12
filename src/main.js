import Vue from "vue"
import App from "./App.vue"
//配置vue在生产环境下的提示关闭
Vue.config.productionTip = false
import http from "@/plugins/request.js"
Vue.use(http)
const app = new Vue()
app.$mount()
export default {
 
}

