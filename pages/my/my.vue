<template>
	<view class="my">
		<!-- 用户详情 -->
		<view class="profile">
			<image class="profile-config" 
			src="../../static/img/config.png" 
			@tap="toConfig"></image>
			<view class="profile-content">
				<image  class="profile-img"src="../../static/img/qq.png" mode=""></image>
				<text class="profile-text">用户名</text>
			</view>
		</view>
		<!-- 商品管理 -->
		<view class="order">
			<view class="order-title" @tap="toOrder">
				<text>我的订单</text>
				<text>全部订单 > </text>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image class="order-img" src="../../static/img/order1.png" mode=""></image>
					<text class="order-text">待付款</text>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order2.png" mode=""></image>
					<text class="order-text">待发货</text>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order3.png" mode=""></image>
					<text class="order-text">待收货</text>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order4.png" mode=""></image>
					<text class="order-text">待评价</text>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order5.png" mode=""></image>
					<text class="order-text">退款管理</text>
				</view>
			</view>
		</view>
		<!-- 内容列表 -->
			<view class="my-content-list">
				<view class="my-content-item">
					<text>我的收藏</text>
					<text>></text>
				</view>
				<view class="my-content-item">
					<text>我的收藏</text>
					<text>></text>
				</view>
				<view class="my-content-item">
					<text>我的收藏</text>
					<text>></text>
				</view>
				<view class="my-content-item">
					<text>我的收藏</text>
					<text>></text>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toConfig() {
				uni.navigateTo({
					url: '../config/config'  
				})
			},
			toOrder() {
				uni.navigateTo({
					url: '../my-order/my-order'  
				})
			}
		}
	}
</script>

<style scoped>
	.profile {
		position: relative;
		width: 100%;
		height: 400rpx;
		background: url(../../static/img/mybg.png) no-repeat;
	}
	.profile-config {
		position: absolute;
		top: 15%;
		left: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}
	.profile-content {
		position: absolute;
		width: 100rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.profile-img {
		width: 100rpx;
		height: 100rpx;
		border: 2rpx solid #CCCCCC;
		border-radius: 50%;
	}
	.profile-text {
		color: #FFFFFF;
		font-size: 26rpx;
		margin-left: 10rpx;
	}
	.order-title {
		display: flex;
		justify-content: space-between;
	}
	.order-title text {
		margin: 20rpx;
	}
	.order-list {
		display: flex;
		height: 160rpx;
		align-items: center;
		justify-content: center;
		margin: 0 25rpx;
	}
	.order-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}
	.order-img {
		width: 80rpx;
		height: 80rpx;
	}
	.order-text {
		margin-top: 10rpx;
		font-size: 24rpx;
	}
	.my-content-list {
		margin: 20rpx 0;
		padding: 0 20rpx;
	}
	.my-content-item {
		display: flex;
		padding: 20rpx 0;
		justify-content: space-between;
		border-bottom: 2rpx solid #CCCCCC;
	}
</style>
