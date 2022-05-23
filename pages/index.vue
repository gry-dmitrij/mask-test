<template>
  <div>
<!--    <input-->
<!--      v-imask="mask"-->
<!--      @accept="onAccept"-->
<!--      @complete="onComplete">-->
    <BaseInput2
      v-model="data"
      class="base-input"
      :mask="mask"
    />
    <p>{{data}}</p>
  </div>
</template>

<script>
import BaseInput2 from "~/components/BaseInput2";
// import { IMaskDirective } from 'vue-imask';

export default {
  name: 'PageIndex',
  components: {
    BaseInput2
  },
  // directives: {
  //   imask: IMaskDirective
  // },
  data () {
    return {
      data: '952',
      mask: {
        mask: '+7 (#00) 000-00-00',
        definitions: {
          '#': /[3489]/,
        },
      }
    }
  },
  mounted() {
    // this.data = '7952'
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.base-input {
  border-radius: 5px;
  border-color: #eee;
}
</style>
