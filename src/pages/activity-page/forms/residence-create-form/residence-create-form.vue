<template>
    <div>
        <Form ref="ResidenceCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                <FormItem label="标题" prop="id">
                  <Input v-model="formInline.id" placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="分类" prop="id">
                  <Select placeholder="分类" v-model="formInline.enterpriseType" style="width: 150px;" clearable>
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="首页图" prop="photo">
                  <p>在首页-本地生活中展示时，取该图</p>
                  <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                    <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                      <Icon type="ios-person-add-outline" size="50" v-show="formInline.photo==''"/>
                      <img :src="configurl+'/cos/get/'+formInline.photo" v-show="formInline.photo!=''" style="width:50px;height:50px"/>
                    </div>
                    <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                      <input type="file" id="upload" @change="uploadImage" style="width:50px;height:50px;opacity:0;"/>
                    </div>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="封面图" prop="photo">
                  <p>首页-精选推荐/封面图/内页图，取该图</p>
                  <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                    <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                      <Icon type="ios-person-add-outline" size="50" v-show="formInline.photo==''"/>
                      <img :src="configurl+'/cos/get/'+formInline.photo" v-show="formInline.photo!=''" style="width:50px;height:50px"/>
                    </div>
                    <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                      <input type="file" id="upload" @change="uploadImage" style="width:50px;height:50px;opacity:0;"/>
                    </div>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="报名截止时间" prop="id">
                  <Input v-model="formInline.id" placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="报名人数上限" prop="id">
                  <Select placeholder="分类" v-model="formInline.enterpriseType" style="width: 150px;" clearable>
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="参与时间" prop="id">
                  <Input v-model="formInline.id" placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="支付金额(元)" prop="id">
                  <Select placeholder="分类" v-model="formInline.enterpriseType" style="width: 150px;" clearable>
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="积分抵扣" prop="id">
                  <Input v-model="formInline.id" placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="发布者" prop="id">
                  <Select placeholder="分类" v-model="formInline.enterpriseType" style="width: 150px;" clearable>
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <FormItem label="详情" prop="content">
                  <editor ref="editor" v-model="formInline.content" :value = "formInline.content"/>
              </FormItem>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
export default {
  name: 'ResidenceCreateForm',
  components: {
    Editor
  },
  props: {
    formInline: Object,
    ruleInline: Object,
  },
  data() {
    return {
    }
  },
  methods: {
    validate(cb) {
      this.$refs.ResidenceCreateForm.validate(cb)
    },
    handleRichEditor() {
      this.$refs.editor.handleRichEditor(this.formInline.content)
    },
    resetFields() {
      this.$refs.ResidenceCreateForm.resetFields()
    }

  }
}
</script>
