<template>
    <div>
        <tables ref="expand-tables" stripe v-model="tableData" :columns="columns"/>
    </div>
</template>
<script>
import Tables from '_c/tables'
import {
    residenceNameColumn
} from '_p/residence-page/api'
export default {
    components: {
        Tables
    },
    data () {
        return {
            columns: [],
            tableData: []
        }
    },
    props: {
        row: Array
    },
    methods: {
    },
    mounted () {
        // 加载表格列
        this.columns = residenceNameColumn
        this.tableData = this.row 
    }
};
</script>

<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>