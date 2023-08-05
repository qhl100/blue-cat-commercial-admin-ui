<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" :disabled="form.id" placeholder="请输入模型标识"></el-input>
      </el-form-item>
        <el-form-item label="访问地址：" prop="baseUrl">
        <el-input v-model="form.baseUrl" placeholder="请输入访问地址"></el-input>
      </el-form-item>
      <el-form-item label="访问token：" prop="token">
        <el-input v-model="form.token"  placeholder="请输入访问token"></el-input>
      </el-form-item>
      <el-form-item label="模型标识：" prop="baseUrl">
        <el-input v-model="form.model" placeholder="请输入模型标识"></el-input>
      </el-form-item>
      <el-form-item label="权重：" prop="token">
        <el-input v-model="form.weight"  placeholder="请输入权重"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-input v-model="form.status"  placeholder="请输入访问token"></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { defineComponent, ref } from 'vue'
import { addGptModelConfig, update, updateGptModelConfig} from '@/api/table'
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
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)
    let form = ref({
        id:null,
        baseUrl: null,
      token: null,
      model: null,
      weight: null,
      status: null,
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