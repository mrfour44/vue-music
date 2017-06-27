<template>
    <div class="singer" ref="singer">
        <list-view ref="list" :data="singers" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer'
import ListView from '@/base/listview/listview'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10   // 定义数据的前10条为热门
export default {
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            })
        },
        _getSingerList() {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = this._normalizeSinger(res.data.list)
                    // console.log(this._normalizeSinger(this.singers))
                }
            })
        },
        // 拿到数据格式个页面需要的数据格式不一致，需要重新处理一下格式
        // 需要的数据格式如下：
        // [{title:'热门',items: [Singer,Singer,.....]},{title:'A',items:[Singer,Singer,.....]},{title:'B',items:[Singer,Singer,.....]}]
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }

            list.forEach((item, index) => {
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                }
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
            })

            // 为了得到有序列表, 需要处理map
            let hot = []
            let ret = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        }
    },
    components: {
        ListView
    }
}
</script>

<style scoped lang="stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
 