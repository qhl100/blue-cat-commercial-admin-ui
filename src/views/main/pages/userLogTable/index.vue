<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <div class="layout-container-form-search">
        <div>
          <el-form-item  label="选择日期">
            <el-date-picker style="width: 40%"
                            v-model="query.createTime"
                            type="date"
                            :disabled-date="disabledDateStart"
                            placeholder="选择日期" />
            -
            <el-date-picker style="width: 40%"
                            v-model="query.endTime"
                            type="date"
                            :disabled-date="disabledDate"
                            placeholder="选择日期" />
          </el-form-item>
        </div>
        <el-form-item  label="操作">
          <el-input v-model="query.op" :placeholder="$t('message.common.searchTip')" ></el-input>
        </el-form-item>
        <el-button type="primary" :icon="Search" class="search-btn" @click="getTableData(true)">{{ $t('message.common.search') }}</el-button>
      </div>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :showIndex="true"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="appName" label="产品名称" align="center" />
        <el-table-column prop="ip" label="登录ip" align="center" />
        <el-table-column prop="biz" label="业务id" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
              {{opMap[scope.row.op]}}
          </template>
        </el-table-column>
        <el-table-column prop="browserName" label="登录浏览器" align="center" />
        <el-table-column prop="createUser" label="用户" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import {getData, del, queryUserLog} from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'
import {LayerInterface} from "@/components/layer/index.vue";
const opMap = new Map();
const auditOpListMap = ref([])

export default defineComponent({
  name: 'userLogTable',
  components: {
    Table,
    Layer
  },

  setup: function () {
      const opMap = {
          1: '登录',
          2: '注册',
          3: '异常',
      };
      // 存储搜索用的数据
    const query = reactive({
      op:null,
      // createTime:1689868969000,
      // endTime:1690473769000,
      createTime:'',
      endTime:''
    })
    // 弹窗控制器
    const layer: LayerInterface = reactive({
      show: false,
      title: '新增',
      showButton: true
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])
    const handleSelectionChange = (val: []) => {
      chooseData.value = val
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        startTime : query.createTime,
        endTime: query.endTime,
        op: query.op
      }
      console.log(query)
      console.log(params)
      queryUserLog(params)
              .then(res => {
                let data = res.data.records
                if (Array.isArray(data)) {
                  data.forEach(d => {
                    const select = selectData.find(select => select.value === d.choose)
                    select ? d.chooseName = select.label : d.chooseName = d.choose
                    const radio = radioData.find(select => select.value === d.radio)
                    radio ? d.radioName = radio.label : d.radio
                  })
                }
                tableData.value = res.data.records
                page.total = Number(res.data.total)
              })
              .catch(error => {
                tableData.value = []
                page.index = 1
                page.total = 0
              })
              .finally(() => {
                loading.value = false
              })
    }
    // 删除功能
    const handleDel = (data: object[]) => {
      let params = {
        ids: data.map((e: any) => {
          return e.id
        }).join(',')
      }
      del(params)
              .then(res => {
                ElMessage({
                  type: 'success',
                  message: '删除成功'
                })
                getTableData(tableData.value.length === 1 ? true : false)
              })
    }
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = '新增数据'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row: object) => {
      layer.title = '编辑数据'
      layer.row = row
      layer.show = true
    }
    getTableData(true)
    return {
      Plus,
      Search,
      Delete,
      query,
      opMap,
      tableData,
      chooseData,
      loading,
      page,
      layer,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleDel,
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>