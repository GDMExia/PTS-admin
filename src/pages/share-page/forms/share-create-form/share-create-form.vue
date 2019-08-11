<template>
    <div>
        <Form ref="ShareCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                    <FormItem label="标题" prop="title">
                        <Input v-model="formInline.title" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="封面图" prop="photo">
                        <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                                <Icon type="ios-person-add-outline" size="50" v-show="formInline.photo==''"/>
                                <img :src="configurl+'/cos/get/'+formInline.photo" v-show="formInline.photo!=''" style="width:50px;height:50px"/>
                            </div>
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                                <input type="file" id="upload" @change="uploadImage" style="width:50px;height:50px;opacity:0;"/>
                            </div>
                        </div>
                        <p style="height:0">（仅限一张图，尺寸为345*150）</p>
                    </FormItem>
                </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="关联活动" prop="id">
                  <Select v-model="formInline" multiple @on-change="handleResidence">
                    <Option v-for="item in ruleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
                <FormItem label="正文" prop="content">
                    <editor ref="editor" v-model="formInline.content" :value = "formInline.content"/>
                </FormItem>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from '_c/editor'
export default {
  name: 'ShareCreateForm',
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
      this.$refs.ShareCreateForm.validate(cb)
    },
    handleRichEditor() {
      this.$refs.editor.handleRichEditor(this.formInline.details)
    },
    resetFields() {
      this.$refs.ShareCreateForm.resetFields()
    }

  }
}
</script>
