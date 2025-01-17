<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <div class="layout-container-form-search">
        <el-form-item label="状态" >
          <el-select v-model="query.status"  placeholder="Select"  clearable  multiple>
            <el-option v-for="item in statusData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="任务id">
          <el-input v-model="query.taskId" :placeholder="$t('message.common.searchTip')" ></el-input>
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
        <el-table-column prop="id" label="id" align="center" />
        <el-table-column prop="taskId" label="模型" align="center" />
        <el-table-column prop="userId" label="userId" align="center" />
        <el-table-column prop="status" label="状态" align="center" >
          <template #default="scope">
            {{statusMap[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column prop="taskUrl" label="taskUrl" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="updateTime" label="更新时间" align="center" />
        <el-table-column prop="finishTime" label="建立时间" align="center" />
        <el-table-column prop="action" label="action" align="center" />
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import {getData, del, queryUserLog, queryPromptRecord, queryMjRecord} from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'
import {LayerInterface} from "@/components/layer/index.vue";
const auditOpListMap = ref([])

export default defineComponent({
  name: 'userLogTable',
  components: {
    Table,
    Layer
  },

  setup: function () {
    const statusMap = {
      1: '生成中',
      2: '已完成',
      3: '删除',
      "-1": '失败'
    };
    const opMap = {
      1: '登录',
      2: '注册',
      3: '退出',
    };
    // 存储搜索用的数据
    const query = reactive({
      taskId: null,
      status: []
    })
    const statusData =  [
      { value:1, label: '生成中' },
      { value:2, label: '完成' },
      { value:3, label: '删除' },
      { value:-1, label: '失败' }
    ]

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
        taskId:query.taskId,
        status:query.status ? query.status: [2]
      }

      queryMjRecord(params)
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
      statusData,
      statusMap,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped>

</style>