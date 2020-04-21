<template>
  <div class="scrollcom-container" ref="scrollfa" v-if="isshow" @click="isshow=!isshow">
    <div class="scrollcom-content">
      <slot>{{notify}}</slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        isshow: true
    }
  },
  props:['notify'],
  mounted() {
    let fa = this.$refs.scrollfa;
    let son = fa.children[0];
    let text = son.innerHTML;
    son.insertAdjacentHTML("beforeend", text);

    let d = fa.scrollWidth - son.offsetWidth - 10;
    let timer = setInterval(() => {
      if (fa.scrollLeft >= d) fa.scrollLeft = 0;
      fa.scrollLeft += 8;
    }, 320);
  }
};
</script>

<style lang="less" scoped>
.scrollcom-container {
    position: relative;
  margin-top: -10px;
  padding: 2px 5px;
  background-color: #00cc66;
  color: #464c5b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
