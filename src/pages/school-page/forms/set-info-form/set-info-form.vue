<template>
    <div>
        <Form ref="SetInfoForm" :model="formInline" :rules="ruleInline" :label-width="110" label-position="left">
            <Row>
                <Col span="12">
                    <FormItem label="名称" prop="type">
                        <Input v-model="formInline.type" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="轮播图" prop="type">
                        <div class="demo-upload-list" v-for="(item, index) in formInline.filePath" :key="index">
                            <template>
                                <img :src="item">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                                </div>
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="formInline.filePath"
                            :format="['jpg', 'png', 'jpeg']"
                            :before-upload="beforeUpload"
                            multiple
                            action
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="房型" prop="limit">
                        <Select v-model="formInline.type" multiple style="width:260px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="风格" prop="limit">
                        <Select v-model="formInline.style" multiple style="width:260px">
                            <Option v-for="item in styleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="详情" prop="limit">
                        <Input type="textarea" :rows="4" v-model="formInline.limit" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    name: 'SetInfoForm',
    components: {
    },
    props: {
        formInline: Object,
        ruleInline: Object,
    },
    data() {
        return {
            typeList: [
                {value: '单间', label: '单间'},
                {value: '大床房', label: '大床房'},
                {value: '标间', label: '标间'},
                {value: '家庭房', label: '家庭房'},
                {value: '4人间', label: '4人间'},
                {value: '5人间', label: '5人间'},
                {value: '独栋民宿', label: '独栋民宿'},
            ],
            styleList: [
                {value: '地中海', label: '地中海'},
                {value: '本地海岛', label: '本地海岛'},
                {value: '酒店', label: '酒店'},
            ],
        }
    },
    methods: {
        validate(cb) {
            this.$refs.SetInfoForm.validate(cb)
        },
        resetFields() {
            this.$refs.SetInfoForm.resetFields()
        }
    },
}
</script>
