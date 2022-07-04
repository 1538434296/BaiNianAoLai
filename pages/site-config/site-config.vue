<template>
	<view class="my-site-list">
		<view class="site-list"
		v-for="(item,index) in list"
		:key="index">
			<view class="site-item" @tap="goAddSite(index)">
				<view>
					<text>{{item.name}}</text>
					<text>{{item.tel}}</text>
				</view>
				<view>
					<text class="site-default" v-if="item.isDefault">默认</text>
					<text>{{item.cityName + item.detailSite}}</text>
				</view>
			</view>
		</view>
		<view class="add-site">
			<view class="add-site-btn" @tap="toAddSite">新增地址</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		computed: {
			...mapState({
				list: state => state.site.list
			})
		},
		methods: {
			// 修改
			goAddSite(index) {
				let siteObj = JSON.stringify({ 
					index, 
					item: this.list[index]
				})
				uni.navigateTo({
					url: "../my-add-site/my-add-site?data="+siteObj+""
				})
			},
			// 添加
			toAddSite() {
				uni.navigateTo({
					url: "../my-add-site/my-add-site"
				})
			}
		}
	}
</script>

<style scoped>
	.add-site {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.add-site-btn {
		margin-top: 20rpx;
		padding: 10rpx 100rpx;
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 30rpx;
	}
	.site-item {
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}
	.site-item text {
		margin:10rpx 10rpx 0 0;
	}
	.site-default {
		background-color: #49BDFB;
		color: #FFFFFF;
		padding: 0 10rpx;
		border-radius: 20rpx;
	}
</style>
