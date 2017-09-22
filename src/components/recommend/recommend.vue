<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" :data="discList" class="recommend-content">
			<div>
				<div v-if="recommends.length > 0" class="slider-wrapper">
					<div class="slider-content">
						<slider ref="slider">
							<div v-for="item in recommends" :key="item.id">
								<a :href="item.linkUrl">
									<img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
								</a>
							</div>
						</slider>
					</div>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门推荐歌单</h1>
					<ul>
						<li v-for="item in discList" class="item" :key="item.id">
							<div class="icon">
								<img v-lazy="item.imgurl" alt="" width="60" height="60">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name">}</h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!discList.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import slider from '@/base/slider/slider'
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
import { playlistMixin } from '@/common/js/mixin'
export default {
	data() {
		return {
			recommends: [],
			discList: []
		}
	},
	mixins: [playlistMixin],
	created() {
		this._getRecommend()
		this._getDiscList()
	},
	methods: {
		handlePlaylist(playlist) {
			const bottom = playlist.length > 0 ? '60px' : ''
			this.$refs.recommend.style.bottom = bottom
			this.$refs.scroll.refresh()
		},
		_getRecommend() {
			getRecommend().then((res) => {
				if (res.code === ERR_OK) {
					// console.log(res.data.slider)
					this.recommends = res.data.slider
				}
			})
		},
		_getDiscList() {
			getDiscList().then((res) => {
				if (res.code === ERR_OK) {
					this.discList = res.data.list
				}
			})
		},
		loadImage() {
			if (!this.checkloaded) {
				this.$refs.scroll.refresh()
				this.checkloaded = true
			}
		}
	},
	components: {
		slider,
		scroll,
		loading
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
			.item
				display: flex
				box-sizing: border-box
				align-items: center
				padding: 0 20px 20px 20px
				.icon
					flex: 0 0 60px
					width: 60px
					padding-right: 20px
				.text
					display: flex
					flex-direction: column
					justify-content: center
					flex: 1
					line-height: 20px
					overflow: hidden
					font-size: $font-size-medium
					.name
						margin-bottom: 10px
						color: $color-text
					.desc
						color: $color-text-d
		.loading-container
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)
</style>

