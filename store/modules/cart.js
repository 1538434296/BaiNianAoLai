export default {
	state: {
		list: [
			{
				checked: false,
				discount: "8",
				id: 2,
				imgUrl: "../../static/img/commodity2.jpg",
				name: "2022最新款式靓女",
				num: 1,
				oprice: "99",
				pprice: "69"
			}
		],
		selectedList: []
	},
	getters: {
		checkedAll(state) {
			return state.list.length === state.selectedList.length;
		},
		totalCount(state) {
			let total = {
				pprice: 0,
				num: 0
			}
			state.list.forEach(v => {
				if(state.selectedList.indexOf(v.id) > -1) {
					total.pprice += v.pprice * v.num;
					total.num =state.selectedList.length;
				}
			})
			return total
		}
	},
	mutations: {
		checkAll(state) {
			state.selectedList = state.list.map(v=> {
				v.checked = true;
				return v.id
			})
		},
		unCheckAll(state) {
			state.list.forEach(v => {
				v.checked = false;
			})
			state.selectedList = [];
		},
		checkedFn(state, index) {
			let id = state.list[index].id;
			let i = state.selectedList.indexOf(id);
			// 如果选中
			if( i > -1 ) {
				state.list[index].checked = false;
				return state.selectedList.splice(i,1);
			}
			// 没有选中
			else {
				state.list[index].checked = true;
				state.selectedList.push(id);
			}
			
		},
		addShopCart(state, goods) {
			state.list.push(goods);
		},
		delGoods(state) {
			state.list = state.list.filter(v => {
				return state.selectedList.indexOf(v.id) === -1;
			})
		}
	},
	actions: {
		checkedAllFn({commit,getters}) {
			getters.checkedAll ? commit("unCheckAll") : commit("checkAll") ;
		},
		delGoodsFn({commit}) {
			commit('delGoods');
			uni.showToast({
				title: '删除成功',
				icon: 'none'
			})
			commit("unCheckAll");
			
		}
	}
}