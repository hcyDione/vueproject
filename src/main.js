import Vue from 'vue'
import App from './app.vue'

import './assets/styles/text.css'
import './assets/styles/text-stylus.styl'
import './assets/images/5.jpg'

const root = document.createElement('div')
document.body.appendChild(root)
// h就是createApp这个参数
new Vue({
	render: (h) => h(App)
}).$mount(root)



//https://blog.csdn.net/weixin_40814356/article/details/80625747