<template>
  <div class="card-list">
    <Row v-for="row in list" :key="row.id" :row="row"  />
  </div>
</template>

<script lang="ts">
import { defineComponent ,ref,onMounted} from 'vue'
import Row from './row.vue'
import {getUserData} from "@/api/card";

export default defineComponent({
  components: {
    Row
  },
  setup() {
    onMounted(() => {
      getTableData(true)
    })
    const snalist = [
      { id: 1, name: '在线人数', data: '22', color: '#4e73df', icon: 'sfont system-yonghu' },
      { id: 2, name: '今日注册人数', data: '33', color: '#1cc88a', icon: 'sfont system-xiaoxi' },
      { id: 3, name: '今日登录人数', data: '2440000', color: '#36b9cc', icon: 'sfont system-shuliang_mianxing' },
      { id: 4, name: '总人数', data: '220,000', color: '#f6c23e', icon: 'sfont system-jindutiaoshouyidaozhang' },
      { id: 5, name: '总人数', data: '220,000', color:'f6c23e', icon: 'sfont system-yonghu' },
      { id: 6, name: '总人数', data: '220,000', color:'f6c23e', icon: 'sfont system-yonghu' },
      { id: 7, name: '总人数', data: '220,000', color:'f6c23e', icon: 'sfont system-yonghu' }
    ]
    const list =  ref([])
    const getTableData = (init: boolean) => {
      getUserData()
              .then(res => {
                let data = res.data
                for (let listElement of snalist) {
                  listElement.name = data[listElement.id-1].name
                  listElement.data = data[listElement.id-1].data
                  list.value.push(listElement)
                }
              })
              .catch(error => {
              })
    }
    return {
      list,
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped>
  .card-list {
    width: calc(100% + 10px);
    margin-left: -10px;
    display: flex;
    flex-wrap: wrap;
  }
</style>