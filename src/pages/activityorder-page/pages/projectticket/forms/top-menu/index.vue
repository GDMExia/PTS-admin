<template>
  <div style="padding-bottom:10px">
    <Button @click="handleBack">返回</Button>
    <!-- <Button @click="handleExportBill" style="margin-left:5px">出帐</Button>
    <Button @click="handleImport" style="margin-left:5px">导入</Button> -->
    <Button @click="handleExport" style="margin-left:5px">导出</Button>
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
    handleBack() {
      this.$emit("on-back");
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
