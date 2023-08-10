<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <div>
        <el-form-item  label="生效日期">
          <el-date-picker style="width: 60%"
                          v-model="query.createTime"
                          type="date"
                          :disabled-date="disabledDateStart"
                          placeholder="选择日期" />
        </el-form-item>
      </div>
      <div>
        <el-form-item  label="失效日期">
          <el-date-picker style="width: 60%"
                          v-model="query.endTime"
                          type="date"
                          :disabled-date="disabledDate"
                          placeholder="选择日期" />
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button @click="handleAdd()">新增</el-button>
        </el-form-item>
      </div>
      <div class="layout-container-form-search" >
        <el-form-item  label="模型名称">
          <el-input v-model="query.name" :placeholder="$t('message.common.searchTip')" ></el-input>
        </el-form-item>
        <el-form-item label="模型" >
          <el-select v-model="query.model"  placeholder="请选择" clearable>
            <el-option  v-for="item in serviceTypeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        <el-table-column prop="id" label="id" align="center" />
        <el-table-column prop="baseUrl" label="访问地址" align="center" />
        <el-table-column prop="token" label="访问token" align="center" />
        <el-table-column prop="model" label="模型标识" align="center"/>
        <el-table-column prop="weight" label="权重" align="center" />
        <el-table-column prop="status" label="状态" align="center" />
        <el-table-column prop="name" label="名字" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="createUser" label="创建人" align="center" />
        <el-table-column prop="updateTime" label="更新时间" align="center" />
        <el-table-column prop="updateUser" label="更新人" align="center" />
        <el-table-column label="绑定通道" align="center" >
          <template #default="scope">
            <li v-for="item in scope.row.channelIds"
                :key="item"
            >
              <span>{{channelMap.get(item)}}</span>
            </li>
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">{{ $t('message.common.update') }}</el-button>
            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">{{ $t('message.common.del') }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
      <Layer :layer="layer" :channelMap="channelMap" :options="options" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import {getData, del, queryUserAccess, queryGptModelConfig, queryChannelConfig, delGptModelConfig} from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'
import {LayerInterface} from "@/components/layer/index.vue";
const opMap = new Map();
const auditOpListMap = ref([])

export default defineComponent({
  name: 'userLevelTable',
  components: {
    Table,
    Layer
  },

  setup: function () {
      // 存储搜索用的数据
    const query = reactive({
      name:null,
      model:null,
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
    const serviceTypeData =  [
      { value:"gpt-3.5-turbo-16k", label: 'gpt-3.5-turbo-16k' },
      { value:"gpt-3.5-turbo", label: 'gpt-3.5-turbo' },
      { value:"gpt4", label: 'gpt4' }
    ]
    const channelMap = ref(new Map());
    let options = ref(new Array())
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
        name:query.name ==='' ? null:query.name,
        model:query.model ==='' ? null:query.model,
        page: page.index,
        pageSize: page.size
      }
      queryGptModelConfig(params)
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
    const getChannelData = (init: boolean) => {
      loading.value = true
      let params = {
        status: 1
      }
      queryChannelConfig(params)
              .then(res => {
                options.value = res.data.records.map(item => {
                  return {
                    value: item.id,
                    label: item.name
                  }
                });
                const map = res.data.records.reduce((acc, obj) => {
                  acc.set(obj.id, obj.name);
                  return acc;
                }, new Map());
                channelMap.value = map
              })
              .catch(error => {
              })
              .finally(() => {
                loading.value = false
              })
    };


    // 删除功能
    const handleDel = (data: object[]) => {
      let params = {
        id: data.map((e: any) => {
          return e.id
        }).join(',')
      }
      delGptModelConfig(params)
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
    getChannelData(true)
    return {
      Plus,
      Search,
      Delete,
      query,
      opMap,
      tableData,
      chooseData,
      serviceTypeData,
      loading,
      page,
      layer,
      channelMap,
      options,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleDel,
      getTableData,
      getChannelData
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>