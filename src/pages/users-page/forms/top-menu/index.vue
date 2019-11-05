<template>
  <div style="padding-bottom:10px">
    <Button @click="handleExport">导出</Button>
    <Button @click="handleCreate" style="margin-left:5px">获取积分规则设置</Button>
    <Button @click="handlePrice" style="margin-left:5px">VIP年费设置</Button>
    <Button @click="handleDaysign" style="margin-left:5px">日签设置</Button>
    <Button @click="handleContent" style="margin-left:5px">名片内容设置</Button>
  </div>
</template>

<script>
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
    handleContent(){
      this.$emit("on-content");
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
