export default {
	state: {
		list: [
			{
				name: '王老六',
				tel: 18623842983,
				cityName: '福建省-龙岩市-上杭县',
				detailSite: '娃哈哈公寓五栋6楼705',
				isDefault: true,
			},
			{
				name: '王老七',
				tel: 18623842982,
				cityName: '福建省-龙岩市-上杭县',
				detailSite: '娃哈哈公寓五栋6楼706',
				isDefault: false,
			}
		],
	},
	getters: {
		
	},
	mutations: {
		createSite(state, obj) {
			state.list.push(obj);
		},
		updataSite(state, {index, item}) {
			for(let key in item) {
				state.list[index[key]] = item[key];
			}
		},
		remoiveSite(state, index) {
			state.list.forEach(v=> {
				if(v.isDefault) {
					v.isDefault = false;
				}
			})
			// if(state.list[index].isDefault === false){
			// 	state.list[index].isDefault = true;
			// }
		}
	},
	actions: {
		createSiteFn({commit}, obj) {
			if(obj.isDefault) {
				commit('remoiveSite');
			}
			commit('createSite', obj);
		},
		updataSiteFn({commit}, obj) {
			if(obj.item.isDefault) {
				commit('remoiveSite');
			}
			commit('updataSite', obj);
		}
	}
}