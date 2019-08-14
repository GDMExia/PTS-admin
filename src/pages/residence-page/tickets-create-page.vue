<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button>
                    <Button @click="handleSave" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;保存</Button>
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <div style="margin-top: 20px;">
                <Form ref="TicketsCreateForm" :model="createForm" :rules="ruleInline">
                    <Row>
                        <Col span="24"> 
                            <FormItem label="名称" v-if="$route.query.type!='view'">
                                <Input v-model="createForm.name" placeholder="请输入" style="width: 200px"/>
                            </FormItem>
                            <FormItem label="名称" v-if="$route.query.type=='view'">
                                <Input v-model="createForm.name" readonly placeholder="请输入" style="width: 200px"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Form :model="formTable" label-position="top">
                    <Row>
                        <Col span="24"> 
                            <FormItem label="设置船票数量" class="ivu-form-item-required">
                                <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-blur="handleSaveParams"/>
                                <div style="margin-top:10px;text-align:right;">
                                    <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                                    show-sizer size="small" :page-size-opts="[1,10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Card>
    </div>
</template>
<script>
import Tables from '_c/tables'
import _ from "lodash"
import pageInfo from "@/libs/page-info"
import { mapMutations } from 'vuex'
import {
    ticketsRecidenceColumn,
    getTicketsInfo,
    setTicketsInfo,
    getTicketsDetail,
    setTicketsInfoEdit
} from './api'
export default {
    components: {
        Tables,
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            createForm: {
                title: ''
            },
            formTable: {},
            ruleInline: {
                name: [
                    { required: true, message: '请输入分票名称', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        ...mapMutations([
            'setPmsTickets',
        ]),
        handleQuery() {
            let tableParams = this.$store.state.app.pmsTickets
            if(tableParams[this.page.index-1]&&tableParams[this.page.index-1].length>0) {
                this.tableData = tableParams[this.page.index-1]
                this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: this.page.total,search: this.page.search})
                return
            } 
            if(this.$route.query.id) {
                getTicketsDetail(this.$route.query.id, this.page).then(res=>{
                    if(res.data.code == 200) {
                        this.createForm.name = res.data.data.dataInfo.date.title
                        this.tableData = res.data.data.dataInfo.date.sortTicketInfoResponses?res.data.data.dataInfo.date.sortTicketInfoResponses.map(item=>{
                            this.$route.query.type!='view'?item.isEdit = true:item.isEdit = false
                            return item
                        }):[]
                        this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.dataInfo.total,search: this.page.search})
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
            } else {
                getTicketsInfo(this.page).then(res=>{
                    if(res.data.code == 200) {
                        this.createForm.name = res.data.data.dataInfo.date.title
                        this.tableData = res.data.data.dataInfo.date.sortTicketInfoResponses?res.data.data.dataInfo.date.sortTicketInfoResponses.map(item=>{
                            item.isEdit = true
                            return item
                        }):[]
                        this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.dataInfo.total,search: this.page.search})
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
            }
        },
        handleSave() {
            let tableParams = this.$store.state.app.pmsTickets
            let sortTicketInfoResponsesList = _.flattenDeep(tableParams)
            if(sortTicketInfoResponsesList.length<this.page.total) {
                sortTicketInfoResponsesList = sortTicketInfoResponsesList.concat(this.tableData)
            }
            let form = {
                title: this.createForm.name,
                sortTicketInfoResponsesList: sortTicketInfoResponsesList
            }
            if(form.title.trim() == '') {
                this.$Message.warning('请输入分票规则名称')
                return
            }
            if(this.$route.query.id) {
                form.id = this.$route.query.id
                setTicketsInfoEdit(form).then(res=>{
                    if(res.data.code == 200) {
                        this.$Message.success('编辑成功')
                        this.$router.back()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
            } else {
                setTicketsInfo(form).then(res=>{
                    if(res.data.code == 200) {
                        this.$Message.success('添加成功')
                        this.$router.back()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
            }
        },
        handleSaveParams(data) {
            this.tableData[data.index].shipNum = data.row.shipNum
            this.setPmsTickets({data: this.tableData, pageIndex: this.page.index-1, total: this.page.total })
        },
        /* 分页查询 */
        handleOnChange(index) {
            this.page.index = index
            this.handleQuery()
        },
        /* 分页大小 */
        handleOnChangeSize(size) {
            this.page.size = size
            this.handleQuery()
        },
    },
    mounted() {
        this.setPmsTickets({data: [], pageIndex: -1, total: 0 })
        this.columns = ticketsRecidenceColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

