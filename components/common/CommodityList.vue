<template>
	<view>
		<commodity :dataList="dataList" class="commodity"></commodity>
	</view>
</template>

<script>
	import Commodity from "./Commodity.vue"
	export default {
		name:"CommodityList",
		props:{
			dataList: {
				type: Array,
				default: []
			},
		},
		components: {
			Commodity
		}
	}
</script>

<style>

</style>
