<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" :disabled="form.id" ></el-input>
      </el-form-item>
        <el-form-item label="用户id：" prop="userId">
        <el-input v-model="form.userId" :disabled="form.id"></el-input>
      </el-form-item>
      <el-form-item label="访问token：" prop="token">
        <el-input v-model="form.token"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="name">
        <el-input v-model="form.name"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="访问次数：" prop="visitNumber">
        <el-input v-model="form.visitNumber" placeholder="请输入访问次数"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="form.status" placeholder="请输入状态" clearable>
          <el-option v-for="item in serviceTypeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定通道：">
<!--        <el-select v-model="form.channelIds" placeholder="请输入通道" clearable>-->
         <el-input v-model="form.channelIds"></el-input>
<!--          <el-option-->
<!--                  v-for="option in channelIds"-->
<!--                  :key="option"-->
<!--                  :label="option"-->
<!--                  :value="option"-->
<!--          >{{channelMap.get(option)}}</el-option>-->

<!--        </el-select>-->
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addGptModelConfig, update, updateGptModelConfig} from '@/api/table'
import {selectData, radioData} from './enum'
import Layer from '@/components/layer/index.vue'

export interface apiObject {
    id: number,
    userId: string,
    name: string,
    token: string,
    channelIds: Array<number>,
    visitNumber: number,
    balance: number,
    endTime: string,
    createUser: string,
    createTime: string,
    updateUser: string,
    updateTime: string,
    status: number
}
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
          showButton: true,

        }
      }
    },
      channelMap:{

      }
  },
  setup(props, ctx) {
      const channelMap = props.channelMap
    let form = ref({
        id:null,
      token: null,
      model: null,
      weight: null,
      status: null,
        channelIds:null
    })

      const serviceTypeData = [
          { value:1, label: '有效' },
          { value:0, label: '无效' }
      ]
    const rules = {
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      number: [{ required: true, message: '请输入数字', trigger: 'blur' }],
      choose: [{ required: true, message: '请选择', trigger: 'blur' }],
      radio: [{ required: true, message: '请选择', trigger: 'blur' }]
    }
    init()
    function init() {
          // 用于判断新增还是编辑功能
      if (props.layer.row) {
          form.value = props.layer.row
          console.log(form.value)
      } else {
      }
    }
    return {
      form,
      rules,
      selectData,
      serviceTypeData,
      channelMap,
      radioData
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
              let params = {
                id:this.form.id,
                baseUrl:this.form.baseUrl,
                token: this.form.token,
                model: this.form.model,
                weight: this.form.weight,
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
      addGptModelConfig(params)
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
      updateGptModelConfig(params)
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