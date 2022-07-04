export default{
	common:{
		// 本地数据,使用前修改ip为本地地址
		baseUrl: '/api/api',
		data: {},
		header: {
			'Context-Type': "application/json",
			"Context-Type": "application/x-ww-form-urlencoded",
		},
		method: 'GET',
		dataType: 'json'
	},
	request( options = {}) {
			// uni.showLoading({
			// 	    title: '加载中'
			// 	});
		options.url = this.common.baseUrl + options.url;
		options.data = options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;
		return new Promise((res,rej) => {
			uni.request({
				...options,
				success: (result) => {
					if(result.statusCode != 200) {
						return rej();
					}else{
						let data = result.data;
						res(data);
					}
				}
			})
		})
	}
}