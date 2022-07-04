<template>
	<view class="confirm-order">
		<Lines></Lines>
		<view class="order-map">
			<view class="map-title">
				<view class="map-font">收 件 人 :  张三</view>
				<view>15220457869</view>
			</view>
			<view class="map-site">收货地址: 地址是我.我是地址123</view>
		</view>
		<Lines></Lines>
		<view class="goods-list">
			<view class="goods-item" v-for="(itm, idx) in dataList" :key="idx">
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
		<view class="goods-tip">
			<view>运费</view>
			<view>$ 0.00</view>
		</view>
		<view class="goods-leave">
			留言 <input type="text" value="" placeholder="给卖家留言,140字以内" />
		</view>
		<view class="goods-close">
			共2件商品 小计: 
			<text class="f-active-color">$141.00</text>
		</view>
		<view class="pay-item">
			<view>合计: <text class="f-active-color">$141.00</text></view>
			<view class="pay-btn">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Line.vue'
	export default {
		data() {
			return {
				dataList: [
					{
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
		},
		methods: {
			
		},
		components: {
			Lines
		}
	}
</script>

<style scoped>
 .confirm-order {
	 position: absolute;
	 top: 0;
	 bottom: 0;
	 left: 0;
	 right: 0;
	 width: 100%;
	 height: 100%;
	 background-color: #F7F7F7;
 }
 .order-map {
	 background-color: #FFFFFF;
	 padding: 20rpx 50rpx;
	 line-height: 60rpx;
 }
 .map-title {
	 display: flex;
	 justify-content: space-between;
 }
 .map-font {
	 font-weight: bold;
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
	justify-content: flex-start !important;
 	align-items: flex-end;
 }
 
 .goods-font {
 	height: 88rpx;
 	overflow: hidden;
 }
 .goods-tip {
	 display: flex;
	 justify-content: space-between;
	 padding: 0 20rpx;
	 height: 80rpx;
	 line-height: 80rpx;
	 background-color: #FFFFFF;
	 margin-bottom: 4rpx;
 }
 .goods-leave {
	 display: flex;
	 height: 80rpx;
	 line-height: 80rpx;
	 align-items: center;
	 padding: 0 20rpx;
	 background-color: #FFFFFF;
	 margin-bottom: 4rpx;
 }
 .goods-leave input {
	 padding: 0 20rpx;
 }
 .goods-close {
	 display: flex;
	 justify-content: flex-end;
	 padding-right: 20rpx;
	 height: 80rpx;
	 line-height: 80rpx;
	 background-color: #FFFFFF;
 }
 .pay-item {
	 position: fixed;
	 bottom: 0;
	 right: 0;
	 display: flex;
	 justify-content: flex-end;
	 height: 90rpx;
	 line-height: 90rpx;
	 background-color: #FFFFFF;
 }
 .pay-btn {
	 height: 90rpx;
	 width: 200rpx;
	 text-align: center;
	 color: #ffffff;
	 background-color: #49BDFB;
	 margin-left: 20rpx;
 }
</style>
