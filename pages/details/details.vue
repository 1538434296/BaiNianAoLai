<template>
	<view class="details">
		<!-- 商品图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item >
				<view class="swiper-item">
					<image class="swiper-img" :src="goodsContent.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品详情 -->
		<view class="details-goods">
			<view class="goods-pprice">${{goodsContent.pprice}}</view>
			<view class="goods-oprice">${{goodsContent.oprice}}</view>
			<view class="goods-name">{{goodsContent.name}}</view>
		</view>
		<!-- 商品详情图 -->
		<view>
			<view>
				<image class="details-img" src="../../static/img/detail1.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail2.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail3.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail4.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail5.jpg" mode=""></image>
			</view>
		</view>
		<!-- 商品列表 -->
		<Card cardTitle="看了又看"></Card>
		<CommodityList :dataList="dataList"></CommodityList>
		<!-- 底部 -->
		<view class="details-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche" @tap="toCartBtn"></view>
			<view class="add-shopcart" @tap="showPop">加入购物车</view>
			<view class="purchase" @tap="showPop">立即购买</view>
		</view>
		<!-- 底部弹出层 -->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent ="">
			<!-- 蒙层 -->
			<view class="pop-mask" @tap="hidePop"></view>
			<!-- 内容块 -->
			<view class="pop-box" :animation="animationData">
				<view><image class="pop-img" :src="goodsContent.imgUrl" mode=""></image></view>
				<view class="pop-num">
					<view>购买数量</view>
					<UniNumberBox min=1 :vakue='num' @change="changeNumber"></UniNumberBox>
				</view>
				<view class="pop-sub" @tap="clickBtn">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	import Card from "@/components/common/Card.vue"
	import CommodityList from "@/components/common/CommodityList.vue"
	import UniNumberBox from "@/components/uni/uni-number-box/uni-number-box.vue"
	import { mapMutations } from "vuex"

	export default {
		components: {
			Card,
			CommodityList,
			UniNumberBox
		},
		data() {
			return {
				isShow: false,
				goodsContent: {},
				animationData:{},
				swiperList: [{
						imgUrl: '../../static/img/details1.jpeg'
					},
					{
						imgUrl: '../../static/img/details2.jpeg'
					},
					{
						imgUrl: '../../static/img/details3.jpeg'
					}
				],
				dataList: [{
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
					}
				],
				num: 1
			}
		},
		onLoad(e) {
			this.getData(e.id);
		},
		// 修改返回的行为
		onBackPress() {
			if(this.isShow) {
				this.hidePop();
				return true;
			}
		},
		// 分享点击
		onNavigationBarButtonTap(e) {
			if(e.type === 'share') {
				uni.share({
					provider: 'weixin',
					type: 0,
					scene: "WXSceneSession",
					title: this.goodsContent.name,
					href: "http://192.168.213.40:3000/api/goods/id="+this.goodsContent.id+"",
					imageUrl: "",
					success: (res) => {
						uni.showToast({
							title: '分享成功'
						})
					},
					fail: (err) => {
						console.log("fail" + JSON.stringify(err));
					}
				})
			}
		},
		methods: {
			...mapMutations(['addShopCart']),
			
			changeNumber(value) {
				this.num = value;
			},
			// 加入购物车
			clickBtn() {
				
					console.log(this.goodsContent);
				let goods = this.goodsContent;
				this.goodsContent['checked'] = false;
				this.goodsContent['num'] = this.num;
				// 加入Vuex
				this.addShopCart(goods);
				this.hidePop();
				uni.showToast({
					title: '成功加入购物车',
					icon: 'none'
				})
				
			},
			getData(id) {
				$http.request({
					url: '/goods/id',
					data: {
						id
					}
				}).then((res) => {
					this.goodsContent = res.data[0]
				}).catch((err)=> {
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			toCartBtn() {
				uni.switchTab({
					url: '../shopcart/shopcart'
				})
			},
			showPop() {
				var animation = uni.createAnimation({
				      duration: 200
				    })
				animation.translateY(600).step();
				this.animationData = animation.export();
				this.isShow = true;
				setTimeout(() => {
					animation.translateY(0).step();
					this.animationData = animation.export();
				},200)
			},
			hidePop() {
				this.isShow = false;
			}
		}
	}
</script>

<style scoped>
	swiper {
		width: 100%;
		height: 700rpx;
	}

	.swiper-img {
		width: 100%;
		height: 700rpx;
	}

	.details-goods {
		text-align: center;
		font-weight: 600;
		font-size: 36rpx;
		padding: 10rpx 0;
	}

	.details-img {
		width: 100%;
		height: 700rpx;
	}
	
	.details-foot {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}
	.details-foot .iconfont {
		width: 56rpx;
		height: 56rpx;
		border-radius: 100%;
		background-color: #000000;
		color: #FFFFFF;
		text-align: center;
		margin: 0 10rpx;
	}
	.add-shopcart {
		margin: 0rpx 40rpx;
		padding: 10rpx 30rpx;
		background-color: #000000;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
	.purchase {
		margin: 0rpx 40rpx;
		padding: 10rpx 30rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
	.pop {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
	.pop-mask {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.2);
	}
	.pop-box {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
	}
	.pop-img {
		width: 260rpx;
		height: 260rpx;
	}
	.pop-num {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		
	}
	.pop-sub {
		line-height: 80rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		text-align: center;
	}
</style>
