<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" :disabled="true" placeholder="通道id"></el-input>
      </el-form-item>
        <el-form-item label="通道名称：" prop="baseUrl">
        <el-input v-model="form.name" placeholder="请输入通道名称"></el-input>
      </el-form-item>
      <el-form-item label="通道状态：" prop="baseUrl">
        <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通道模型：" prop="modelType">
        <el-select  v-model="form.modelType" clearable placeholder="Select">
            <el-option  v-for="item in serviceTypeData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { defineComponent, ref } from 'vue'
import {addChannelConfig, addGptModelConfig, update, updateChannelConfig, updateGptModelConfig} from '@/api/table'
import { selectData, radioData } from './enum'
import Layer from '@/components/layer/index.vue'
export default defineComponent({
  components: {
    Layer
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, ctx) {
    const serviceTypeData =  [
      { value:"gpt-3.5-turbo-16k", label: 'gpt-3.5-turbo-16k' },
      { value:"gpt-3.5-turbo", label: 'gpt-3.5-turbo' },
      { value:"gpt-4-32k", label: 'gpt-4-32k' },
      { value:"gpt-4", label: 'gpt-4' }
    ]

    const statusType =  [
      { value:1, label: '正常' },
      { value:0, label: '封禁' },
    ]
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)
    let form = ref({
        id:null,
        name: null,
      modelType: null,
      status: null

    })
    const rules = {
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      number: [{ required: true, message: '请输入数字', trigger: 'blur' }],
      choose: [{ required: true, message: '请选择', trigger: 'blur' }],
      radio: [{ required: true, message: '请选择', trigger: 'blur' }]
    }
    init()
    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
      } else {
      }
    }
    return {
      form,
      rules,
      layerDom,
      ruleForm,
      selectData,
      radioData,
      statusType,
      serviceTypeData,
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
              let params = {
                id:this.form.id,
                name:this.form.name,
                modelType: this.form.modelType,
                status: this.form.status
              }
            if (this.layer.row) {
              console.log(params)
              this.updateForm(params)
            } else {
              this.addForm(params)
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params: object) {
      addChannelConfig(params)
      .then(res => {
        this.$message({
          type: 'success',
          message: '新增成功'
        })
        this.$emit('getTableData', true)
        this.layerDom && this.layerDom.close()
      })
    },
    // 编辑提交事件
    updateForm(params: object) {
      updateChannelConfig(params)
      .then(res => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.$emit('getTableData', false)
        this.layerDom && this.layerDom.close()
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>