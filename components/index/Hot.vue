<template>
	<view class="hot">
		<Commodity :dataList="dataList" itemW="250rpx" imgH="250rpx"></Commodity>
	</view>
</template>

<script>
	import Commodity from "@/components/common/Commodity.vue"
	export default {
		name:"Hot",
		props:{
			dataList: Array,
		},
		components: {
			Commodity
		}
	}
</script>

<style>

</style>
