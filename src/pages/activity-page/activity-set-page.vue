<template>
    <div style="background: #fff; padding: 20px;">
        <div @click="setRecommend" class="box" style="margin-bottom: 20px">
            设置精选推荐
        </div>
        <div @click="setTime" class="box">
            设置退订时长
        </div>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <TimeSetForm ref="TimeSetForm"
                    :formInline="timeForm.formInline"
                    :ruleInline="timeForm.ruleInline"
                    v-if="modelStatus.name=='TimeSetForm'"/>
                <RecommendSetForm ref="RecommendSetForm"
                    :formInline="recommendForm.formInline"
                    :ruleInline="recommendForm.ruleInline"
                    v-if="modelStatus.name=='RecommendSetForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>
<script>
import ModelDialog from '_c/model-dialog'
import TimeSetForm from './forms/time-set-form'
import TimeSetModel from './model/time-set-model'
import RecommendSetForm from './forms/recommend-set-form'
import RecommendSetModel from './model/recommend-set-model'
import {
    setTimeInfo,
    getTimeInfo
} from './api'
import {
    getArticleInfo,
    setArticle
} from '_p/tour-page/api'
export default {
    components: {
        ModelDialog,
        TimeSetForm,
        RecommendSetForm
    },
    data() {
        return {
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            timeForm: {},
            recommendForm: {}
        }
    },
    methods: {
        setRecommend() {
            getArticleInfo(4).then(res=>{
                if(res.data.code == 200) {
                    const form = {
                        article_id: res.data.data.articleBind.map(item=>{
                            return item.id
                        })
                    }
                    this.setDialogProperty(600, '设置精选推荐', 'RecommendSetForm')
                    this.recommendForm = RecommendSetModel.init(form)
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleSetSubmit() {
            const form = RecommendSetModel.converter(this.recommendForm.formInline)
            setArticle(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('设置成功')
                    this.modelStatus.show = false
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        setTime() {
            getTimeInfo().then(res=>{
                if(res.data.code == 200) {
                    const form = {
                        date: res.data.data.dataTime.date_time
                    }
                    this.setDialogProperty(600, '设置退订时长', 'TimeSetForm')
                    this.timeForm = TimeSetModel.init(form)
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleTimeSubmit() {
            setTimeInfo(this.timeForm.formInline).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('设置成功')
                    this.modelStatus.show = false
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 弹出框设置
        setDialogProperty(width, title, name) {
            this.modelStatus.show = true
            this.modelStatus.loading = true
            this.modelStatus.width = width
            this.modelStatus.title = title
            this.modelStatus.name = name
        },
        /* 对话框确认 */
        handlerModelDialogOk(name) {
            if(name == 'TimeSetForm') {
                this.$refs.TimeSetForm.validate(valid=>{
                    if(valid) {
                        this.handleTimeSubmit()
                    }
                })
            } else if (name==='RecommendSetForm') {
                this.$refs.RecommendSetForm.validate(valid=>{
                    if(valid) {
                        this.handleSetSubmit()
                    }
                })
            }
            this.modelStatus.loading = false
            this.$nextTick(() => {
                this.modelStatus.loading = true
            })
        },
        /* 对话框取消 */
        handlerModelDialogCancel() {
            // 确保关闭对话框
            this.modelStatus.show = false
            // 对话框显示footer恢复
            this.modelStatus.hide = false
        },
    },
    mounted() {
    }
}
</script>
<style scoped>
.box {
    width: 309px;
    height: 204px;
    line-height: 204px;
    border-radius: 6px;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(217, 217, 217, 1);
    margin: auto;
}
</style>>
