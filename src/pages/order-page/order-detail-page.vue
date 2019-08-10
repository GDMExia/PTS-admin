<template>
    <div style="backround: #fff;">
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button> 
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <tables ref="tables" stripe v-model="orderData" :columns="orderColumn" />
            <div v-if="pedestriansData&&pedestriansData.length>0">
                <div class="table-title">出行人</div>
                <tables ref="tables" stripe v-model="pedestriansData" :columns="pedestriansColumn" />
            </div>
            <div v-if="residenceData&&residenceData.length>0">
                <div class="table-title">民宿</div>
                <tables ref="tables" stripe v-model="residenceData" :columns="residenceColumn" />
            </div>
            <div v-if="busTicketData&&busTicketData.length>0">
                <div class="table-title">大巴车票</div>
                <tables ref="tables" stripe v-model="busTicketData" :columns="busTicketColumn" />
            </div>
            <div v-if="routineTicketsData&&routineTicketsData.length>0">
                <div class="table-title">常规船票</div>
                <tables ref="tables" stripe v-model="routineTicketsData" :columns="routineTicketsColumn" />
            </div>
            <div v-if="temporaryTicketsData&&temporaryTicketsData.length>0">
                <div class="table-title">临时船票</div>
                <tables ref="tables" stripe v-model="temporaryTicketsData" :columns="temporaryTicketsColumn" />
            </div>
            <div v-if="entranceTicketsData&&entranceTicketsData.length>0">
                <div class="table-title">门票</div>
                <tables ref="tables" stripe v-model="entranceTicketsData" :columns="entranceTicketsColumn" />
            </div>
            <div v-if="trafficTicketsData&&trafficTicketsData.length>0">
                <div class="table-title">交通车票</div>
                <tables ref="tables" stripe v-model="trafficTicketsData" :columns="trafficTicketsColumn" />
            </div>
            <div v-if="ItemTicketsData&&ItemTicketsData.length>0">
                <div class="table-title">项目票</div>
                <tables ref="tables" stripe v-model="ItemTicketsData" :columns="ItemTicketsColumn" />
            </div>
            <div v-if="evaluationsData&&evaluationsData.length>0">
                <div class="table-title">评价</div>
                <tables ref="tables" stripe v-model="evaluationsData" :columns="evaluationsColumn" />
            </div>
        </Card>
        
    </div>
</template>
<script>
import Tables from '_c/tables'
import {
    orderColumn,
    pedestriansColumn,
    residenceColumn,
    busTicketColumn,
    routineTicketsColumn,
    temporaryTicketsColumn,
    entranceTicketsColumn,
    trafficTicketsColumn,
    ItemTicketsColumn,
    evaluationsColumn,
    getOrderDetail
} from './api'
export default {
    components: {
        Tables
    },
    data() {
        return {
            orderColumn: [],
            pedestriansColumn: [],
            residenceColumn: [],
            busTicketColumn: [],
            routineTicketsColumn: [],
            temporaryTicketsColumn: [],
            entranceTicketsColumn: [],
            trafficTicketsColumn: [],
            ItemTicketsColumn: [],
            evaluationsColumn: [],
            orderData: [],
            pedestriansData: [],
            residenceData: [],
            busTicketData: [],
            routineTicketsData: [],
            temporaryTicketsData: [],
            entranceTicketsData: [],
            trafficTicketsData: [],
            ItemTicketsData: [],
            evaluationsData: [],
            status: '',
            orderId: ''
        }
    },
    methods: {
        handleQuery() {
            getOrderDetail(this.orderId).then(res=>{
                this.orderData = res.data.data.dataInfo.orderDetail.map(item=>{
                    item.useTime = (item.beginDate==item.finishDate)?item.beginDate:`${item.beginDate}~${item.finishDate}`
                    return item
                })
                this.entranceTicketsData = res.data.data.dataInfo.islandTicket
                // 出行人
                this.pedestriansData = res.data.data.dataInfo.userFollowing 
                // 民宿
                this.residenceData = res.data.data.dataInfo.bnb 
                // 大巴车票 
                this.busTicketData = res.data.data.dataInfo.busTicket
                // 常规船票
                this.routineTicketsData = res.data.data.dataInfo.routineShipTicket
                // 临时船票
                this.temporaryTicketsData = res.data.data.dataInfo.temporaryShipTicket
                // 交通车票
                this.trafficTicketsData = res.data.data.dataInfo.trafficTicket.map(item=>{
                    item.useTime = (item.startDate==item.endDate)?item.startDate:`${item.startDate}~${item.endDate}`
                    return item
                })
                // 项目票
                this.ItemTicketsData = res.data.data.dataInfo.amusementTicket.map(item=>{
                    item.useTime = `${item.reserveDate} ${item.beginTime}~${item.endTime}`
                    return item
                })
            })
        }
    },
    mounted() {
        this.orderId = this.$route.query.orderId
        this.orderColumn = orderColumn
        this.pedestriansColumn = pedestriansColumn
        this.residenceColumn = residenceColumn
        this.busTicketColumn = busTicketColumn
        this.routineTicketsColumn = routineTicketsColumn
        this.temporaryTicketsColumn = temporaryTicketsColumn
        this.entranceTicketsColumn = entranceTicketsColumn
        this.trafficTicketsColumn = trafficTicketsColumn
        this.ItemTicketsColumn = ItemTicketsColumn
        this.evaluationsColumn = evaluationsColumn
        this.handleQuery()
    }
}
</script>
