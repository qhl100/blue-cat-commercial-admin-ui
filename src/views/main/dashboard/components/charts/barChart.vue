<template>
  <div class="box">
    <Chart :option="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive } from 'vue'
import Chart from '@/components/charts/index.vue'
import option from './modules/bar'
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    let timer:any = null;
    const datar = [100,200,300,400,500,600,700,1800,900,1000,1100,1200]
    const datar2 = [100,200,300,400,500,600,700,1800,900,1000,1100,1200]
    const names = ['20理费用', '2019222年预算费用', '2020年实际使用预算']
    const options = reactive(option)
    // 模拟异步请求
    timer = setTimeout(() => {
      options.series[0].data = datar
      options.series[1].data = datar2
      options.series[2].data = datar2
      options.series[0].name = "20122228年实际管理费用"
      options.series[1].name = "20122228年实际管理费用"
      options.series[2].name = "20122228年实际管理费用"
      // options.legend.data = names

    },1000)
    // 组件销毁时清除定时器
    onBeforeUnmount(() => {
      clearInterval(timer)
      timer = null;
    })
    return {
      options
    }
  }
})
</script>

<style lang="scss" scoped>
  .box {
    margin: 10px auto 0;
    width: calc(100% - 40px);
    height: 400px;
    background: var(--system-page-background);
    padding: 20px;
    overflow: hidden;
  }
</style>