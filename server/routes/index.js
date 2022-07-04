var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/api/goods/id', function(req, res, next) {
	let id =req.query.id;
	connection.query("select * from goods_search where id= "+id+"", function(error, results, fields) {
		if (error) throw error;
		res.json({
			"code": 0,
			"data": results
		})
	})
})


router.get('/api/goods/list', function(req, res, next) {
	res.json({
		"code":0,
		"data": [
			{
				id:1,
				name: '家居家纺',
				data: [
					{
						name: '家纺',
						list:[
							{
								id:1,
								name: '毛巾/浴巾',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:2,
								name: '枕头',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:3,
								name: '被子',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:4,
								name: '被套',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:5,
								name: '套件',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:6,
								name: '抱枕靠垫',
								imgUrl: '../../static/img/list1.jpg'
							}
						]
					},
					{
						name: '生活日用',
						list:[
							{
								id:1,
								name: '浴室用品',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:2,
								name: '衣架',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:3,
								name: '洗发水',
								imgUrl: '../../static/img/list1.jpg'
							}
						]
					}
				]
			},
			{
				id:2,
				name: '女装',
				data:[
					{
						name: '裙子',
						list:[
							{
								id:1,
								name: '连衣裙',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:2,
								name: '半身裙',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:3,
								name: '睡衣',
								imgUrl: '../../static/img/list1.jpg'
							}
						]
					},
					{
						name: '上装',
						list:[
							{
								id:1,
								name: 'T恤',
								imgUrl: '../../static/img/list1.jpg'
							},
							{
								id:2,
								name: '衬衫',
								imgUrl: '../../static/img/list1.jpg'
							}
						]
					}
				]
			},
			{
				id:3,
				name: '内衣配饰',
				data:[
					{
						id:1,
						name:'',
						list:[
							{
								
							}
						]
					}
				]
			}
		],
		
	})
});


router.get('/api/goods/search', function(req, res, next) {
	//desc降序   asc升序
	//获取对象的key
	console.log(req.query);
	let [goodsName, orderName] = Object.keys(req.query);
	// name参数的值
	let name = req.query.name;
	// orderName的key的值
	let order = req.query[orderName];
	
	connection.query("select * from goods_search where name like '%" + name + "%' order by "+ orderName +" "+ order +" ", function(error, results, fields) {
		if (error) throw error;
		res.json({
			"code": 0,
			"data": results
		})
	})
})

// 首页推荐
router.get('/api/index_list/data', (req, res, next) => {
	res.json({
		"code": 0,
		"topBar": [{
				id: 1,
				name: "推荐"
			},
			{
				id: 2,
				name: "运动户外"
			},
			{
				id: 3,
				name: "服饰内衣"
			},
			{
				id: 4,
				name: "鞋靴箱包"
			},
			{
				id: 5,
				name: "美妆个护"
			},
			{
				id: 6,
				name: "家居数码"
			},
			{
				id: 7,
				name: "食品母婴"
			},
		],
		"data": [{
				type: "swiperList",
				data: [{
						imgUrl: '../../static/img/swiper1.jpg'
					},
					{
						imgUrl: '../../static/img/swiper2.jpg'
					},
					{
						imgUrl: '../../static/img/swiper3.jpg'
					}
				]
			},
			{
				type: "recommendList",
				data: [{
						bigUrl: "../../static/img/Children.jpg",
						data: [{
								imgUrl: "../../static/img/Children1.jpg"
							},
							{
								imgUrl: "../../static/img/Children2.jpg"
							},
							{
								imgUrl: "../../static/img/Children3.jpg"
							}
						]
					},
					{
						bigUrl: "../../static/img/Furnishing.jpg",
						data: [{
								imgUrl: "../../static/img/Furnishing1.jpg"
							},
							{
								imgUrl: "../../static/img/Furnishing2.jpg"
							},
							{
								imgUrl: "../../static/img/Furnishing3.jpg"
							}
						]
					}
				]
			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
				]
			}
		]
	})
});
//运动户外
router.get('/api/index_list/2/data/1', (req, res, next) => {
	res.json({
		"code": 0,
		"data": [
			{
				type: "bannerList",
				data: [
					{imgUrl: '../../static/img/banner1.jpg'},
				]
			},
			{
				type: "iconsList",
				data: [
					{
						imgUrl: '../../static/img/icons1.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons2.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons3.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons4.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons5.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons6.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons7.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons8.png',
						name: "运动户外"
					}
				]
			},
			{
				type: "hotList",
				data: [
					{
						id: 1,
						imgUrl: "../../static/img/hot1.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 2,
						imgUrl: "../../static/img/hot2.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 3,
						imgUrl: "../../static/img/hot3.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					}
				]
			},
			{
				type: "shopList",
				data: [
					{
						BigUrl: "../../static/img/shop.jpg",
						data: [
								{
									id: 1,
									imgUrl: "../../static/img/shop1.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								},
								{
									id: 2,
									imgUrl: "../../static/img/shop2.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								},
								{
									id: 3,
									imgUrl: "../../static/img/shop3.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								},
								{
									id: 4,
									imgUrl: "../../static/img/shop4.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								}
						]
					}
				]
			},
			{
				type: "commodityList",
				data: [
					{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
				]
			}
		]
	})
})
//服饰内衣
router.get('/api/index_list/3/data/1', (req, res, next) => {
	res.json({
		"code": 0,
		"data": [
			{
				type: "bannerList",
				data: [
					{imgUrl: '../../static/img/banner1.jpg'},
				]
			},
			{
				type: "iconsList",
				data: [
					{
						imgUrl: '../../static/img/icons1.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons2.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons3.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons4.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons5.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons6.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons7.png',
						name: "运动户外"
					},
					{
						imgUrl: '../../static/img/icons8.png',
						name: "运动户外"
					}
				]
			},
			{
				type: "hotList",
				data: [
					{
						id: 1,
						imgUrl: "../../static/img/hot1.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 2,
						imgUrl: "../../static/img/hot2.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 3,
						imgUrl: "../../static/img/hot3.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					}
				]
			},
			{
				type: "shopList",
				data: [
					{
						BigUrl: "../../static/img/shop.jpg",
						data: [
								{
									id: 1,
									imgUrl: "../../static/img/shop1.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								},
								{
									id: 2,
									imgUrl: "../../static/img/shop2.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								},
								{
									id: 3,
									imgUrl: "../../static/img/shop3.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								},
								{
									id: 4,
									imgUrl: "../../static/img/shop4.jpg",
									name: "test",
									pprice: 19,
									oprice: 29,
									discount: 4.9,
								}
						]
					}
				]
			},
			{
				type: "commodityList",
				data: [
					{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
				]
			}
		]
	})
})
//运动户外下拉加载
router.get('/api/index_list/2/data/2',(req, res, next) => {
	res.json({
		"code": 0,
		"data": [
			{
				type: "commodityList",
				data: [
					{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "test",
						pprice: 19,
						oprice: 29,
						discount: 4.9,
					},
				]
			}
		]
	})
})
router.get('/api/index_list/1/data/2',(req, res, next) => {
	res.json(
		{
			"code": 0,
			"data": [
				{
					type: "commodityList",
					data: [
						{
							id: 1,
							imgUrl: "../../static/img/commodity1.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
						{
							id: 2,
							imgUrl: "../../static/img/commodity2.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
						{
							id: 3,
							imgUrl: "../../static/img/commodity3.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
						{
							id: 4,
							imgUrl: "../../static/img/commodity4.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
					]
				}
			]
		}
	)
})

router.get('/api/index_list/3/data/2',(req, res, next) => {
	res.json({
			"code": 0,
			"data": [
				{
					type: "commodityList",
					data: [
						{
							id: 1,
							imgUrl: "../../static/img/commodity1.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
						{
							id: 2,
							imgUrl: "../../static/img/commodity2.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
						{
							id: 3,
							imgUrl: "../../static/img/commodity3.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
						{
							id: 4,
							imgUrl: "../../static/img/commodity4.jpg",
							name: "test",
							pprice: 19,
							oprice: 29,
							discount: 4.9,
						},
					]
				}
			]
	})
})

module.exports = router;
