<template>
  <div>
<!--    <input-->
<!--      v-imask="mask"-->
<!--      @accept="onAccept"-->
<!--      @complete="onComplete">-->
    <BaseInput
      v-model="data"
      class="base-input"
      :mask="mask"
      @complete="onComplete"
    />
    <p>{{data}}</p>
  </div>
</template>

<script>
import BaseInput from "~/components/BaseInput";
// import { IMaskDirective } from 'vue-imask';

export default {
  name: 'PageIndex',
  components: {
    BaseInput
  },
  // directives: {
  //   imask: IMaskDirective
  // },
  data () {
    return {
      data: '',
      mask: {
        mask: '+7 (#00) 000-00-00',
        definitions: {
          '#': /[3489]/,
        },
      }
    }
  },
  methods: {
    onComplete (e) {
      console.log('complete', e);
    },
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  border-radius: 5px;
  border-color: #eee;
}
</style>
