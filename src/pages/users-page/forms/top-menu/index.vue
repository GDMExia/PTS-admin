<template>
  <div style="padding-bottom:10px">
    <Button @click="handleExport">导出</Button>
    <Button @click="handleCreate" style="margin-left:5px">获取积分规则设置</Button>
    <Button @click="handlePrice" style="margin-left:5px">VIP年费设置</Button>
    <Button @click="handleDaysign" style="margin-left:5px">日签设置</Button>
    <!-- <Button @click="handleExportBill" style="margin-left:5px">出帐</Button>
    <Button @click="handleImport" style="margin-left:5px">导入</Button>-->
  </div>
</template>

<script>
import { exportFormat } from "@/mock/data.js";
export default {
  name: "top-menu",
  data() {
    return {};
  },
  props: [],
  methods: {
    handleExport() {
      this.$emit("on-export");
    },
    handleCreate() {
      this.$emit("on-create");
    },
    handlePrice() {
      this.$emit("on-price");
    },
    handleDaysign() {
      this.$emit("on-sign");
    },
    // handleExportBill(){
    //   this.$emit("on-export-bill")
    // },
    // handleImport(){
    //   this.$emit('on-import')
    // }
  }
};
</script>

<style>
</style>
