<template>
	<view class="search-list">
		<ShopList :keyword="keyword"></ShopList>
	</view>
</template>

<script>
	import ShopList from '@/components/common/ShopList.vue'
	export default {
		components: {
			ShopList
		},
		data() {
			return {
				keyword: '',
				dataList: []
			}
		},
		onLoad(e) {
			this.keyword = e.keyword;
			// #ifdef APP-PLUS 
			var webView = this.$mp.page.$getAppWebview();  
			webView.setTitleNViewSearchInputText(this.keyword); 
			// #endif
		}
	}
</script>

<style scoped>

</style>
