<template>
  <div style="padding-bottom:10px">
    <Button @click="handleBack">返回</Button>
    <!-- <Button @click="handleExportBill" style="margin-left:5px">出帐</Button> -->
    <Button @click="handleCreate" style="margin-left:5px" v-if="role=='导游'">创建团队票</Button>
    <Button @click="handleCreate" style="margin-left:5px" v-else>生成定制游票务</Button>
    <!-- <Button @click="handleExport" style="margin-left:5px">导出</Button> -->
  </div>
</template>

<script>
import { exportFormat } from "@/mock/data.js";
export default {
  name: "top-menu",
  data() {
    return {};
  },
  props: {
    role:String
  },
  methods: {
    // handleExport() {
    //   this.$emit("on-export", exportFormat);
    // },
    handleBack() {
      this.$emit("on-back");
    },
    handleCreate(){
      this.$emit("on-create")
    }
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
