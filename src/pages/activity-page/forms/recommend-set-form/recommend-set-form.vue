<template>
  <div>
    <Form ref="RecommendSetForm" :model="formInline" :rules="ruleInline" :label-width="110" label-position="left">
      <Row>
        <Col span="24">
          <FormItem label="选择活动" prop="article_id">
            <Select placeholder="选择活动" multiple filterable remote :remote-method="remoteQuery"
                :loading="loading1" v-model="formInline.article_id">
                <Option v-for="item in activityList" :key="item.id" :value="item.id">{{item.goods_name}}</Option>
            </Select>
            <!-- <v-select :placeholder="placeholder" 
              multiple 
              :activityList="activityList"
              label="name"
              @input="selecte_student"
              :value.sync="student_obj"></v-select> -->
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import {
  getResidenceSearchList
} from '../../api'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
export default {
  name: 'RecommendSetForm',
  components: {
    vSelect
  },
  props: {
    formInline: Object,
    ruleInline: Object,
  },
  data() {
    return {
      loading1: false,
      activityList: [],
      placeholder: '',
      article_id: [],
      student_obj: []
    }
  },
  methods: {
    validate(cb) {
      this.$refs.RecommendSetForm.validate(cb)
    },
    resetFields() {
      this.$refs.RecommendSetForm.resetFields()
    },
    selecte_student(values) {
      this.formInline.article_id =values.map(function(obj){
        return obj.id
      })
      this.student_obj = values
    },
    remoteQuery(val) {
      this.loading1 = true;
      getResidenceSearchList({index: 1, size: 10, search: val}).then(res=>{
        this.loading1 = false;
        if(res.data.code==200) {
          this.activityList = res.data.data.goodsList?res.data.data.goodsList.map(item=>{
            item.label = item.goods_name
            item.value = item.id
            return item
          }):[]
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
  },
  mounted: function() {
    this.remoteQuery('')
    // var student_filter = function (obj) {
    //   return this.article_id.indexOf(obj.student_id) > -1
    // }
    // this.student_obj = this.activityList.filter(student_filter, this)
  },
}
</script>
