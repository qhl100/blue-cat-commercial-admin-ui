<template>
  <div class="layout-container">
    <div class="layout-container-form">
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
      <div class="layout-container-form-search" label="送审ID">
        <el-form-item  label="用户id">
          <el-input v-model="query.account" :placeholder="$t('message.common.searchTip')" ></el-input>
        </el-form-item>
        <el-form-item label="用户状态" >
          <el-select v-model="query.status" placeholder="请选择" clearable>
            <el-option v-for="item in statusData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
        <el-table-column prop="account" label="用户id" align="center" />
        <el-table-column prop="username" label="用户名称" align="center" />
        <el-table-column prop="status" label="用户状态" align="center" >
          <template #default="scope">
            {{statusMap[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column prop="userLevel" label="用户身份" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="phone" label="手机" align="center" />
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import {getData, del, queryUserLog, queryUserinfo} from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'
import {LayerInterface} from "@/components/layer/index.vue";
const opMap = new Map();
const auditOpListMap = ref([])

export default defineComponent({
  name: 'userInfoTable',
  components: {
    Table,
    Layer
  },

  setup: function () {
      const statusMap = {
          0: '正常',
          1: '封禁',
      };
   const statusData =  [
      { value:0, label: '正常' },
      { value:1, label: '封禁' }
    ]
      // 存储搜索用的数据
    const query = reactive({
      status:null,
      userId:null,
      phone:null,
      userLevel:null,
      account:null,
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
        userId: query.userId,
        account: query.account,
        status: query.status,
        phone: query.phone
      }
      console.log(params)
      queryUserinfo(params)
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
      statusMap,
      tableData,
      chooseData,
      statusData,
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