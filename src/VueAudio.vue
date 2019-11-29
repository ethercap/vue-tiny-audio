<template>
<div class="tiny-audio-container">
    <audio :src="src"
        ref="audio"
        class="tiny-radio"
        @pause="onPause"
        @play="onPlay"
        @ended="onEnd"
        @waiting="onWaiting"
        @playing="onPlaying"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata">
    </audio>
    <div class="tiny-radio-title">
        <slot name="title" v-bind:title="title">{{ title }}</slot>
    </div>
    <slot name="control" v-bind:audio="audio">
        <div class="tiny-radio-control">
            <slot name="time" v-bind:audio="audio">
                <div class="tiny-radio-time-container">
                    <span class="tiny-radio-time">{{ audio.currentTime | formatSecond }}</span>
                    <VueSlider v-model="sliderTime"
                        v-bind="sliderOptions"
                        class="tiny-radio-slider"
                        :tooltip-formatter="tooltip">
                    </VueSlider>
                    <span class="tiny-radio-time">{{ audio.maxTime | formatSecond }}</span>
                </div>
            </slot>
            <div class="tiny-radio-btn-select">
                <div class="tiny-radio-btns">
                    <div class="tiny-radio-previous" @click="previous">
                        <slot name="previous"><button class="btn btn-previous">上一曲</button></slot>
                    </div>
                    <div class="tiny-radio-play-pause"  @click="playOrPause">
                        <slot name="playOrPause" v-bind:status="audio.status">
                            <button class="btn btn-play-pause">{{ audio.status | transPlayPause }}</button>
                        </slot>
                    </div>
                    <div class="tiny-radio-next" @click="next">
                        <slot name="next"><button class="btn btn-next">下一曲</button></slot>
                    </div>
                </div>
                <div class="tiny-radio-speed-container">
                    <slot name="speed">
                        <label class="tiny-radio-speed-label">
                            <slot name="speedLabel" v-bind:speed="audio.speed">倍速 {{ audio.speed }}x</slot>
                        </label>
                        <select v-model="audio.speed" @change="changeSpeed" class="tiny-radio-speed">
                            <option v-for="item in speeds" :value="item" :key="item">{{ item }}x</option>
                        </select>
                    </slot>
                </div>
            </div>
        </div>
    </slot>
</div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

function realFormatSecond(second) {
    const secondType = typeof second;
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);
        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2);
    } else {
        return '0:00:00';
    }
}

export default {
    name: 'tiny-audio',
    props: {
        src: {
            type: String,
            required:true
        },
        title: String,
        speeds: {
            type: Array,
            default: () => [1, 1.25, 1.5, 2]
        }
    },
    data() {
        return {
            audio: {
                status: 'pause',
                currentTime: 0,
                maxTime: 0,
                speed: 1
            },
            sliderOptions: {
                lazy: true,
                contained: true
            }
        }
    },
    computed: {
        sliderTime: {
            get() {
                return this.audio.maxTime ? Math.min(parseInt(this.audio.currentTime / this.audio.maxTime * 100), 100) : 0;
            },
            set(newValue) {
                this.$refs.audio.currentTime = parseInt(newValue / 100 * this.audio.maxTime);
            }
        }
    },
    methods: {
        playOrPause() {
            switch(this.audio.status) {
                case 'waiting':
                    break;
                case 'play':
                    this.pause();
                    break;
                case 'pause':
                    this.play();
                    break;
                default:
                    break;
            }
        },
        // 预播放：处理浏览器无法自动播放问题
        async prePlay() {
            await this.play();
            this.pause();
        },
        play() {
            return this.$refs.audio.play();
        },
        pause() {
            this.$refs.audio.pause();
        },
        onPlay() {
            this.audio.status = 'play';
            this.changeSpeed();
            this.$emit('play');
        },
        onPause() {
            this.audio.status = 'pause';
            this.$emit('pause');
        },
        onEnd() {
            this.$emit('end');
        },
        onWaiting() {
            this.audio.status = 'waiting';
        },
        // 标识缓冲数据的结束，与onWaiting一起使用
        onPlaying() {
            this.audio.status = 'play';
        },
        onTimeupdate(res) {
            this.audio.currentTime = res.target.currentTime;
        },
        onLoadedmetadata(res) {
            this.audio.maxTime = parseInt(res.target.duration);
        },
        tooltip(index) {
            return realFormatSecond(index / 100 * this.audio.maxTime);
        },
        changeSpeed() {
            this.$refs.audio.playbackRate = this.audio.speed;
        },
        previous() {
            this.pause();
            this.$emit('previous');
        },
        next() {
            this.pause();
            this.$emit('next');
        }
    },
    filters: {
        transPlayPause(value) {
            const obj = {
                'play': '暂停',
                'pause': '播放',
                'waiting': '等待'
            };
            return obj[value];
        },
        formatSecond(second = 0) {
            return realFormatSecond(second);
        }
    },
    components: {
        VueSlider
    }
}
</script>

<style scoped lang="less">
.tiny-radio {
    &-time-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-slider {
        flex: 1;
        margin: 0 10px;
    }
    &-btn-select {
        position: relative;
    }
    &-btns {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-speed-container {
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translateY(-50%);
    }
    &-speed {
        border: 1px solid #eee;
        outline: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.btn {
    border: 1px solid #eee;
    background-color: transparent;
}
</style>
