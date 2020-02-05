# vue-tiny-audio
A simple vue audio component build by vue-cli

## Install
```
npm install vue-tiny-audio --save
```

## Usage
```
<template>
  <tiny-audio :src="audioSrc"
    :title="audioTitle"
    ref="tinyAudio"
    @play="onPlay"
    @pause="onPause"
    @end="onEnd"
    @next="onNext"
    @previous="onPrevious">
  </tiny-audio>
</template>

<script>
import tinyAudio from 'vue-tiny-audio';
import 'vue-tiny-audio/lib/tinyAudio.css';

export default {
  components: {
    tinyAudio
  },
  data () {
    return {
      src: 'xxx',
      title: 'xxx',
      step: 10
    }
  }
}
</script>
```

## props
|prop|type|default|required|
|:---:|:---:|:---:|:---:|
|src|String|undefined|true|
|title|String|undefined|false|
|speeds|Array|[1, 1.25, 1.5, 2]|false|
|step|Number|5|false|


## events
|event|description|
|:---:|:---:|
|play|audio start to play|
|pause|audio pause|
|end|audio complete play|
|previous|click previous button|
|next|click next button|

## slots
|slot|description|scopeData|
|:---:|:---:|:---:|
|title|the play material title|title|
|control|the audio all control DOM|audio(all the data you need)|
|time|the part of DOM which is related to time|audio(all the data you need)|
|previous|the previous button|none|
|next|the next button|none|
|back|the back button|none|
|forward|the forward button|none|
|playOrPause|the play/pause button|status(play/pause/waiting)|
|speed|the all DOM related to speed control|none|
|speedLabel|the label of speed control DOM|speed|
