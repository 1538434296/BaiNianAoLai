<template>
	<view class="shop-cart">

		<template v-if="list.length > 0">
			<uniNavBar title="购物车" :right-text="isNavBar?'完成':'编辑'" fixed="true" statusBar="true"
				@clickRight="isNavBar = !isNavBar"></uniNavBar>
			<!-- 商品内容 -->
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in list" :key="index">
					<label class="radio" @tap="checkedFn(index)">
						<radio color="#FF3333" :checked="item.checked"></radio>
					</label>
					<image class="shop-img" :src="item.imgUrl" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color f-color">{{item.color}}</view>
						<view class="shop-price">
							<view>${{item.pprice}}</view>
							<template v-if="!isNavBar">
								<view>*{{item.num}}</view>
							</template>
							<template v-else>
								<UniNumberBox :value="item.num"
									min=1
									@change="changeNum($event, index)"
								></UniNumberBox>
							</template>
						</view>
					</view>
				</view>

				<!-- 底部 -->
				<view class="shop-foot">
					<label class="radio foot-radio" @tap="checkedAllFn">
						<radio color="#FF3333" :checked="checkedAll"></radio><text>全选</text>
					</label>
					<template v-if="!isNavBar">
						<view class="foot-total">
							<view class="foot-count">合计: <text class="f-active-color">${{totalCount.pprice}}</text></view>
							<view class="foot-num" @tap="toConfirmOrder">结算({{totalCount.num}})</view>
						</view>
					</template>
					<template v-else>
						<view class="foot-total">
							<view class="foot-num" style="background-color: #000000;">移入收藏夹</text></view>
							<view class="foot-num" @tap="delGoodsFn">删除</view>
						</view>
					</template>
					</view>
			</view>
		</template>
		
		<template v-else>
			<uniNavBar title="购物车" fixed="true" statusBar="true"></uniNavBar>
				<view class="shop-else-list">
					囧~购物车还是空的~
				</view>
		</template>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
	import {  mapState, mapActions, mapGetters, mapMutations  } from 'vuex'
	import UniNumberBox from "@/components/uni/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				isNavBar: false
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list
			}),
			...mapGetters(['checkedAll', 'totalCount'])
		},
		methods: {
			toConfirmOrder() {
				uni.navigateTo({
					url: '../confirm-order/confirm-order'
				})
			},
			changeNum(value, index)  {
				this.list[index].num = value;
			},
			...mapActions(['checkedAllFn', 'delGoodsFn']),
			...mapMutations(['checkedFn'])
		},
		components: {
			uniNavBar,
			UniNumberBox
		}
	}
</script>

<style scoped>
	.shop-list {
		padding-bottom: 100rpx;
	}
	.shop-else-list {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #F7F7F7;
	}
	.shop-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		margin-bottom: 20rpx;
		background-color: #F7F7F7;
	}

	.shop-img {
		width: 150rpx;
		height: 150rpx;
	}

	.shop-text {
		flex: 1;
		padding: 0 20rpx;
		line-height: 48rpx
	}

	.shop-color {
		font-size: 24rpx;
	}

	.shop-price {
		display: flex;
		justify-content: space-between;
	}

	.shop-foot {
		position: absolute;
		bottom: 0;
		flex: 0;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		border-top: 2rpx solid #F7F7F7;
		justify-content: space-between;
		align-items: center;
	}

	.foot-radio {
		padding-left: 20rpx;
	}

	.foot-total {
		display: flex;
	}

	.foot-count {
		line-height: 100rpx;
		padding: 0 20rpx;
		font-size: 32rpx;
	}

	.foot-num {
		color: #FFFFFF;
		background-color: #49BDFB;
		padding: 0 60rpx;
		line-height: 100rpx;
	}
</style>
