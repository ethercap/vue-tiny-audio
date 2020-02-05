<template>
<div class="home">
    <tiny-audio :src="src"
        ref="tinyAudio"
        :title="title"
        :step="step"
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
            src: 'http://ws.stream.qqmusic.qq.com/C400002xi4L728t6pg.m4a?guid=113753400&vkey=83AAD35DBA0C9CB963A9CA5B409CCD32E07FBF0B24C651623E68EEC854934F8914A95F3D9A26D00ECE608D3A222318A79D44425A9011646C&uin=0&fromtag=38',
            title: 'test',
            step: 10
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
