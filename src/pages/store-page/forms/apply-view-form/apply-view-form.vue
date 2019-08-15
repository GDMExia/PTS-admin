<template>
    <div>
        <Form ref="ApplyViewForm" :model="formInline" :rules="ruleInline" :label-width="150" label-position="left">
            <Row>
              <Col span="12">
                <FormItem label="商家ID" prop="id">
                  {{id}}
                </FormItem>
                <FormItem label="商家名称" prop="merchants_name">
                  {{data.merchants_name}}
                </FormItem>
                <FormItem label="联系人" prop="merchant_applicant">
                  {{data.merchant_applicant}}
                </FormItem>
                <FormItem label="联系方式" prop="merchant_applicant_phone">
                  {{data.merchant_applicant_phone}}
                </FormItem>
                <FormItem label="地址" prop="address">
                  {{data.address}}
                </FormItem>
                <FormItem label="服务热线" prop="hotline_phone">
                  {{data.hotline_phone}}
                </FormItem>
                <FormItem label="推介人姓名" prop="recommended_real_name">
                  {{data.recommended_real_name}}
                </FormItem>
                <FormItem label="推介人手机号" prop="recommended_phone">
                  {{data.recommended_phone}}
                </FormItem>
                <FormItem label="营业时间段" prop="hours_time">
                  {{data.hours_time}}
                </FormItem>
                <FormItem label="支付方式" prop="payment">
                  {{data.payment}}
                </FormItem>
                <FormItem label="商户简介" prop="merchants_content">
                  {{data.merchants_content}}
                </FormItem>
                <FormItem label="资质文件" prop="document_pic">
                  <div v-for="(item,index) of data.document_pic" :key="index" style="width:40px;height:40px;display:inline-block">
                    <img :src="item.img_url" alt="" style="width:40px;height:40px">
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="创建人或实际经营人简介" prop="operator_content">
                  {{data.operator_content}}
                </FormItem>
                <FormItem label="个人形象照及个人相关证书" prop="photo">
                  <div v-for="(item,index) of data.photo" :key="index" style="width:40px;height:40px;display:inline-block">
                    <img :src="item.img_url" alt="" style="width:40px;height:40px">
                  </div>
                </FormItem>
                <FormItem label="店铺实景" prop="shop_picture">
                  <div v-for="(item,index) of data.shop_picture" :key="index" style="width:40px;height:40px;display:inline-block">
                    <img :src="item.img_url" alt="" style="width:40px;height:40px">
                  </div>
                </FormItem>
                <FormItem label="产品图片" prop="goods_pic">
                  <div v-for="(item,index) of data.goods_pic" :key="index" style="overflow:hidden;vertical-align:top;">
                    <img :src="item.pic" alt="" style="width:40px;height:40px;display:inline-block">{{item.content}}
                    <!-- <p style="display:inline-block;vertical-align:top;float:right">{{item.content}}</p> -->
                  </div>
                </FormItem>
                <!-- <FormItem label="第一种产品描述" prop="goods_content">
                  {{data.goods_content}}
                </FormItem> -->
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import { getApplyDetail } from '../../api'
export default {
  name: 'ApplyViewForm',
  components: {

  },
  props: {
    formInline: Object,
    ruleInline: Object,
    id: String
  },
  data() {
    return {
      data:{}
    }
  },
  methods: {
    validate(cb) {
      this.$refs.StoreCreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.StoreCreateForm.resetFields()
    },
    getDetail(id){
      getApplyDetail(id).then(res=>{
        console.log(res.data.data.merchantsInfo.goods_pic)
        // res.data.data.merchantsInfo.goods_pic.splice(res.data.data.merchantsInfo.goods_pic.length-1,1)
        this.data=res.data.data.merchantsInfo
        this.data.goods_pic.splice(res.data.data.merchantsInfo.goods_pic.length-1,1)
        // this.data.goods_pic=this.data.goods_pic.pop()
        this.$nextTick(()=>{
        this.data=res.data.data.merchantsInfo
        // this.data.goods_pic=this.data.goods_pic.pop()
        })
        // console.log(this.data.goods_pic.pop())
        
        console.log(this.data,111)
      })
    }
  },
  mounted(){
    this.getDetail(this.id)
  }
}
</script>
