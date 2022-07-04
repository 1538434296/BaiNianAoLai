import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
// 购物车
import cart from './modules/cart.js'
// 地址
import site from './modules/site.js'

export default new Vuex.Store({
	
	modules: {
		cart,
		site
	}
	
	
})