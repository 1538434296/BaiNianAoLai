<template>
	<view class="banner">
		<view  v-for="(item,index) in dataList" :key="index">
			<image class="banner-img" :src="item.imgUrl" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Banner",
		props:{
			dataList:Array
		}
	}
</script>

<style scoped>
	.banner{
		width: 100%;
		height: 300rpx;
	}
	.banner-img{
		width: 100%;
		height: 300rpx;
	}
</style>
