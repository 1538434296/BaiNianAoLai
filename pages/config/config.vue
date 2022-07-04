<template>
	<view class="config">
		<Lines></Lines>
		<view class="config-item" @tap="toSiteConfig">
			<view>地址管理</view>
			<view> > </view>
		</view>
		<view class="config-item">
			<view>地址管理</view>
			<view> > </view>
		</view>
		<view class="config-item">
			<view>地址管理</view>
			<view> > </view>
		</view>
		<view class="config-item">
			<view>地址管理</view>
			<view> > </view>
		</view>
		<view class="config-item">
			<view>地址管理</view>
			<view> > </view>
		</view>
		<view class="my-exit">退出</view>
	</view>
</template>

<script>
	import Lines from '../../components/common/Line.vue'
	export default {
		components: {
			Lines
		},
		methods: {
			toSiteConfig() {
				uni.navigateTo({
					url: '../site-config/site-config'
				})
			}
		}
	}
</script>

<style scoped>
	.config-item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 10rpx 20rpx 20rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}
	.my-exit {
		background-color: #49BDFB;
		width: 100%;
		color: #FFFFFF;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		margin-top: 10rpx;
	}
</style>
