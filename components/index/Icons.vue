<template>
	<view class="icons">
		<view class="icons-item" v-for="(item,index) in dataList" :key="index">
			<image class="icons-img" :src="item.imgUrl" mode=""></image>
			<text class="f-color">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"icons",
		props:{
			dataList:Array
		}
	}
</script>

<style scoped>
	.icons{
		display: flex;
		flex-wrap: wrap;
	}
	.icons-item{
		flex: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
	}
	.icons-img{
		width: 120rpx;
		height: 120rpx;
	}
</style>
