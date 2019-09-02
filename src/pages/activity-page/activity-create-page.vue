<template>
    <div style="background: #fff;">
        <Card>
            <div class="clearfix" style="margin-bottom: 20px">
                <div class="pull-left">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button>
                    <Button @click="handleSave" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;保存</Button>
                </div>
                <div class="pull-right"></div>
            </div>
            <div>
                <Form ref="ResidenceCreateForm" :model="formInline" :rules="ruleInline" :label-width="120" label-position="left">
                    <Row>
                        <Col span="12">
                            <FormItem label="标题" prop="goods_name">
                                <Input v-model="formInline.goods_name" placeholder="请输入" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="分类" prop="cid">
                            <Select placeholder="分类" v-model="formInline.cid" style="width: 150px;" >
                                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.cate_name}}</Option>
                            </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                    <Col span="12">
                        <FormItem label="首页图" prop="cover" class="ivu-form-item-required">
                        <p>在首页-本地生活中展示时，取该图，建议上传图片尺寸【690×300】</p>
                        <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                            <Icon type="ios-person-add-outline" size="50" v-show="formInline.cover==''"/>
                            <img :src="formInline.cover" v-show="formInline.cover!=''" style="width:50px;height:50px"/>
                            </div>
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                            <input type="file" id="upload" @change="uploadImage" style="width:50px;height:50px;opacity:0;"/>
                            </div>
                        </div>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="封面图" prop="banner" class="ivu-form-item-required">
                        <p>首页-精选推荐/封面图/内页图，取该图，建议上传图片尺寸【200×200】</p>
                        <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                            <Icon type="ios-person-add-outline" size="50" v-show="formInline.banner==''"/>
                            <img :src="formInline.banner" v-show="formInline.banner!=''" style="width:50px;height:50px"/>
                            </div>
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                            <input type="file" id="upload" @change="uploadImageBanner" style="width:50px;height:50px;opacity:0;"/>
                            </div>
                        </div>
                        </FormItem>
                    </Col>
                    </Row>
                    <Row>
                    <Col span="12">
                        <FormItem label="报名截止时间" prop="registration_time" class="ivu-form-item-required">
                            <DatePicker v-model="formInline.registration_time" type="datetime" placeholder="请选择日期+时间" style="width: 200px"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报名人数上限" prop="registration_number">
                            <Input v-model="formInline.registration_number" style="width: 200px" placeholder="请输入" />
                        </FormItem>
                    </Col>
                    </Row>
                    <Row>
                    <Col span="12">
                        <FormItem label="参与时间" prop="join_time" class="ivu-form-item-required">
                            <DatePicker v-model="formInline.join_time" type="datetime" placeholder="请选择日期+时间" style="width: 200px"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="支付金额(元)" prop="goods_price">
                            <Input v-model="formInline.goods_price" style="width: 200px" placeholder="请输入" />
                        </FormItem>
                    </Col>
                    </Row>
                    <Row>
                    <Col span="12">
                        <FormItem label="积分抵扣" prop="discount_price">
                            <Input v-model="formInline.discount_price" style="width: 200px" placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="发布者" prop="create_name">
                            <Input v-model="formInline.create_name" style="width: 200px" placeholder="请输入" />                        
                        </FormItem>
                    </Col>
                    </Row>
                    <Row>
                        <FormItem label="商家" prop="merchants_id">
                            <Select placeholder="商家" v-model="formInline.merchants_id" style="width: 150px;" clearable>
                                <Option v-for="item in storeList" :value="item.mid" :key="item.mid">{{item.real_name}}</Option>
                            </Select>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="详情" prop="content">
                            <editor ref="editor" v-model="formInline.content" :value="formInline.content"/>
                        </FormItem>
                    </Row>
                </Form>
            </div>
        </Card>
        
    </div>
</template>
<script>
import Editor from "_c/editor";
import moment from 'moment'
import {
    setResidenceCreate,
    getCategoryList
} from './api'
import {
    getStoreList
} from '_p/store-page/api'
import {
    setUpload
} from '_p/banner-page/api'
export default {
  name: 'ResidenceCreateForm',
  components: {
    Editor
  },
  data() {
    return {
        formInline: {
            goods_name: '',
            cid: '',
            cover: '',
            banner: '',
            registration_time: '',
            join_time: '',
            goods_price: '',
            discount_price: '',
            create_name: '',
            content: '',
            merchants_id: ''
        },
        ruleInline: {
            goods_name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
            create_name: [{ required: true, message: '请输入发布者', trigger: 'blur' }],
            cid: [{ required: true, message: '请选择分类', trigger: 'change' }],
            registration_number: [{ required: true, message: '请输入报名人数上限', trigger: 'blur' },
            {validator: (rule, value, callback) => {
                if (!/^[1-9]\d*$/.test(value)&&value!='') {
                    callback(new Error('只能输入数字'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'}],
            goods_price: [{ required: true, message: '请输入支付金额', trigger: 'blur' },
                {validator: (rule, value, callback) => {
                if (!/^[￥|$]\d*(\.\d{0,2})?$/.test(value)&&value!='') {
                callback(new Error('请输入带有￥或者$单位的最多包含两位小数的金额'))
                } else {
                callback()
                }
            },
            trigger: 'blur'}],
            discount_price: [{ required: true, message: '请输入积分抵扣', trigger: 'blur' },
                {validator: (rule, value, callback) => {
                if (!/^[1-9]\d*$/.test(value)&&value!='') {
                callback(new Error('只能输入数字'))
                } else {
                callback()
                }
            },
            trigger: 'blur'}],
            cover: [
                { required: true, message: '请上传首页图', trigger: 'blur' }
            ],
            banner: [
                { required: true, message: '请上传封面图', trigger: 'blur' }
            ],
            content: [
                { required: true, message: '请输入详情', trigger: 'blur' }
            ]
        },
        typeList: [],
        storeList: []
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
    },
    handleSave() {
        const form = this.formInline
        if(form.cover=='') {
            this.$Message.error('请上传首页图')
            return
        }
        if(form.banner=='') {
            this.$Message.error('请上传封面图')
            return
        }
        if(!form.registration_time) {
            this.$Message.error('请选择报名截止时间')
            return
        }
        if(!form.join_time) {
            this.$Message.error('请选择参与时间')
            return
        }
        form.merchants_id = form.merchants_id?form.merchants_id:''
        form.registration_time = form.registration_time?moment(form.registration_time).format('YYYY-MM-DD HH:mm:ss'):''
        form.join_time = form.join_time?moment(form.join_time).format('YYYY-MM-DD HH:mm:ss'):''
        this.$refs.ResidenceCreateForm.validate((valid) => {
            if (valid) {
                setResidenceCreate(form).then(res=>{
                    if(res.data.code == 200) {
                        this.$Message.success('操作成功')
                        this.$router.back()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
            } 
        })
    },
    uploadImageBanner(event) {
      var file = event.target.files[0]
      if(file.size > 5*1024*1024) {
        this.$Message.warning('上传图片不得大于5兆，请重新上传')
        return
      }
      var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
      if(!imgStr.test(file.name)) {
          alert("文件不是图片类型");
          return
      } 
      var formData = new FormData();
      formData.append('file_image', file)
      setUpload(formData).then(res=>{
          event.target.value=''
          if(res.data.code == 200) {
            this.$Message.info('上传成功')
            this.formInline.banner = `${res.data.data.fileUrl}`
          }
      })
    },
    uploadImage(event) {
      var file = event.target.files[0]
      if(file.size > 5*1024*1024) {
        this.$Message.warning('上传图片不得大于5兆，请重新上传')
        return
      }
      var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
      if(!imgStr.test(file.name)) {
          alert("文件不是图片类型");
          return
      } 
      var formData = new FormData();
      formData.append('file_image', file)
      setUpload(formData).then(res=>{
          event.target.value=''
          if(res.data.code == 200) {
            this.$Message.info('上传成功')
            this.formInline.cover = `${res.data.data.fileUrl}`
          }
      })
    },
    handleStoreList() {
        getStoreList({index: 1, size: 1000}).then(res=>{
            this.storeList = res.data.data.userList
        })
    },
    handleCategory() {
        getCategoryList().then(res=>{
            if(res.data.code==200) {
                this.typeList = res.data.data.cateTree?res.data.data.cateTree:[]
            } else {
                this.$Message.error(res.data.message)
            }
        })
    },
  },
  mounted() {
    this.handleStoreList()
    this.handleCategory()
    let that = this
    const form = localStorage.getItem('activityDetail')
    if(form) {
        this.formInline = JSON.parse(form)
        this.handleRichEditor()
    }
  },
  beforeDestroy() {
    localStorage.removeItem('activityDetail')
  }
}
</script>
