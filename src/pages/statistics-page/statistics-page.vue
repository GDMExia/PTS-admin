<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left" style="margin-bottom: 10px;">
                    <span class="span-h2">2019年8月</span>
                </div>
                <div class="pull-right">
                    <Form ref="searchBarForm" :model="queryForm" inline @keydown.native.enter.prevent ="()=>{}">
                        <FormItem>
                            <Row>
                                <Col span="21">
                                    <DatePicker type="month" placeholder="请选择历史月份进行搜索" :options="disabledMonth" style="width: 200px"></DatePicker>
                                </Col>
                                <Col span="2" style="margin-left: 5px;">
                                    <Button size="small" type="primary" shape="circle" icon="ios-search"></Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <Button class="search-btn" type="success" style="margin-right:5px">
                            <Icon type="ios-cloud-download" />&nbsp;&nbsp;导出</Button>
                    </Form>
                </div>
            </div>
            <div style="display: flex;">
                <div class="table-item" v-for="(item, index) in tableData" :key="index">
                    <p class="info">{{item.info}}</p>
                    <p class="num">{{item.num}}</p>
                </div>
            </div>
            <div>
                <Row :gutter="20" style="margin-top: 10px;">
                    <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
                        <Card shadow>
                            <chart-pie style="height: 427px;" :value="pieData" text="预定数据"></chart-pie>
                        </Card>
                    </i-col>
                </Row>
            </div>
        </Card>
    </div>
</template>
<script>
import moment from 'moment'
import { ChartPie } from '_c/charts'
export default {
    components: {
        ChartPie
    },
    data() {
        return {
            disabledMonth: {
                disabledDate (date) {
                    return date && moment(date).format('YYYY-MM') > moment().format('YYYY-MM');
                }
            },
            queryForm: {},
            tableData: [
                {info: '总访客量', num: '9,002'},
                {info: '总订单量', num: '4,000'},
                {info: '总预定人次', num: '5,000'},
                {info: '总交易金额', num: '201,000'},
            ],
            pieData: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
        }
    }
}
</script>
<style>
p.num {
    color: rgba(16, 16, 16, 1);
    font-size: 30px;
    text-align: left;
    font-weight: 600;
    font-family: Roboto;
    margin-top: 22px;
}
p.info {
    height: 20px;
    line-height: 19px;
    color: rgba(16, 16, 16, 1);
    font-size: 13px;
    text-align: left;
    font-family: Roboto;
    margin-top: 27px;
}
.table-item {
    flex: 1;
    left: 282px;
    top: 204px;
    width: 277px;
    height: 153px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid rgba(238, 238, 238, 1);
    text-align: center;
    padding-left: 30px;
}
</style>


