<template>
<div class="home">
    <tiny-audio :src="src"
        ref="tinyAudio"
        :title="title"
        @play="onPlay"
        @pause="onPause"
        @end="onEnd"
        @previous="previous"
        @next="next">
    </tiny-audio>
</div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            src: 'http://isure.stream.qqmusic.qq.com/C400004VHFaC3pGsiH.m4a?guid=113753400&vkey=BFEB2A17555C9812F8BBE445A6B3950F74C9D504BDDED17DC289A7BC2CBEC03E4049B211FABFC92AFC27FA2348513138F02932D3CAAF8A2B&uin=0&fromtag=38',
            title: 'test'
        }
    },
    mounted() {},
    methods: {
        onPlay() {
            console.log('onplay');
        },
        onPause() {
            console.log('onPause');
        },
        onEnd() {
            console.log('onEnd');
        },
        previous() {
            console.log('previous');
        },
        next() {
            console.log('next');
        }
    },
    components: {}
}
</script>
