<template>
	<div class="recommend">
		<div class="recommend-content">
			<div v-if="recommends.length > 0" class="slider-wrapper">
				<div class="slider-content">
					<slider ref="slider">
					<div v-for="item in recommends" :key="item.id">
						<a :href="item.linkUrl">
							<img :src="item.picUrl" alt="">
						</a>
					</div>
				</slider>
				</div>
			</div>
			<div class="recommend-list">
				<h1 class="list-title">热门推荐歌单</h1>
				<ul>
					<li></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import slider from '@/base/slider/slider'
export default {
	data() {
		return {
			recommends: []
		}
	},
	created() {
		this._getRecommend()
	},
	methods: {
		_getRecommend() {
			getRecommend().then((res) => {
				if (res.code === ERR_OK) {
					// console.log(res.data.slider)
					this.recommends = res.data.slider
				}
			})
		}
	},
	components: {
		slider
	}
}
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable'
.recommend
	position: fixed
	width: 100%
	top: 88px
	bottom: 0
	.recommend-content
		height: 100%
		overflow: hidden
		.slider-wrapper
			position: relative
			width :100%
			height: 0
			padding-top: 40%
			overflow: hidden
			.slider-content
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
		.recommend-list
			.list-title
				height: 65px
				line-height: 65px
				text-align: center
				font-size: $font-size-medoum
				color: $color-theme
</style>

