<template>
	<view class="my-order">
		<Lines></Lines>
		<view class="order-header">
			<view class="order-item" v-for="(item, index) in tabList" :key='index'
				:class=" tabIndex===index ? 'active':'' " @tap="changeTab(index)">{{item.name}}</view>
		</view>
		<block v-for="(item, index) in tabList" :key="index">
			<view v-show="index === tabIndex">
				<!-- 有订单渲染 -->
				<view class="order-main" :style="'height:'+clentHeight+'rpx;'" v-if="item.list.length > 0">
					<view class="order-goods" v-for="(k,i) in item.list" :key="i">
						<!-- 状态 -->
						<view class="goods-status f-active-color">{{k.status}}</view>
						<!-- 商品 -->
						<view class="goods-list">
							<view class="goods-item" v-for="(itm, idx) in k.data" :key="idx">
								<img class="goods-img" :src="itm.imgUrl" alt="">
								<view class="goods-text">
									<view class="goods-font">{{itm.name}}</view>
									<view class="f-color">颜色:{{itm.color}}</view>
									<view class="f-active-color">七天无理由</view>
								</view>
								<view class="goods-total">
									<view style="font-size: 16px;">${{itm.pprice}}</view>
									<view class="f-color">*{{itm.num}}</view>
								</view>
							</view>
						</view>
						<!-- 总价 -->
						<view class="order-total">
							<view>订单金额:<text class="f-active-color"
									style="font-size: 16px;">${{k.total}}</text>(含运费$0.00)</view>
						</view>
						<!-- 支付 -->
						<view class="order-pay">
							<view class="pay-btn">支付</view>
						</view>
					</view>
				</view>

				<!-- 无订单渲染 -->
				<view class="no-order" v-else>
					<view>您还没有相关订单</view>
					<view class="no-order-home" @tap="toHome">去首页逛逛</view>
					<!-- </view> -->
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	import Lines from '@/components/common/Line.vue'
	export default {
		components: {
			Lines
		},
		data() {
			return {
				clentHeight: 0,
				tabIndex: 0,
				tabList: [{
						name: '全部',
						list: [{
							status: '待买家支付',
							total: 3999,
							data: [{
									imgUrl: '../../static/img/Children2.jpg',
									name: '坐垫办公室四大四大是覅好成绩西南财经1长沙市大总结出几次',
									color: '黑色',
									pprice: '39.00',
									num: '1',
								},
								{
									imgUrl: '../../static/img/Children2.jpg',
									name: '坐垫办公室四大四大是覅好成绩西南财经1长沙市大总结出几次',
									color: '黑色',
									pprice: '39.00',
									num: '2',
								}
							]
						}]
					},
					{
						name: '待付款',
						list: [
							{
								status: '待买家支付',
								total: 3999,
								data: [{
										imgUrl: '../../static/img/Children2.jpg',
										name: '坐垫办公室四大四大是覅好成绩西南财经1长沙市大总结出几次',
										color: '黑色',
										pprice: '39.00',
										num: '1',
									},
									{
										imgUrl: '../../static/img/Children2.jpg',
										name: '坐垫办公室四大四大是覅好成绩西南财经1长沙市大总结出几次',
										color: '黑色',
										pprice: '39.00',
										num: '2',
									}
								]
							}
						]
					},
					{
						name: '待发货',
						list: [
							
						]
					},
					{
						name: '待收货',
						list: []
					},
					{
						name: '待评价',
						list: []
					}
				]
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - uni.upx2px(90);
				}
			});
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index;
			},
			toHome() {
				uni.switchTab({
					url: "../index/index"
				})
			}
		}
	}
</script>

<style scoped>
	.no-order {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.no-order-home {
		width: 230rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #49BDFB;
		border: #49BDFB solid 2rpx;
		border-radius: 25rpx;
		margin-top: 10rpx;
	}

	.my-order {
		background-color: #F1F1F1;
	}

	.order-header {
		display: flex;
		border-bottom: 2rpx solid #F7F7F7;
		background-color: #FFFFFF;
	}

	.order-item {
		flex: 1;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}

	.active {
		border-bottom: 4rpx solid #49BDFB;
	}

	.goods-status {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding-right: 20rpx;
	}

	.goods-item {
		background-color: #F1F1F1;
		display: flex;
		justify-content: center;
		padding: 4rpx 20rpx;
	}

	.goods-img {
		height: 180rpx;
		width: 180rpx;
		margin-right: 20rpx;
	}

	.goods-text {
		flex: 3;
		line-height: 44rpx;
	}

	.goods-total {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.goods-font {
		height: 88rpx;
		overflow: hidden;
	}

	.order-total {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding-right: 20rpx;
	}

	.order-pay {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 20rpx;
		margin-top: 2rpx;
		height: 80rpx;
	}

	.pay-btn {
		width: 140rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #49BDFB;
		border: #49BDFB solid 2rpx;
		border-radius: 25rpx;
	}
</style>
