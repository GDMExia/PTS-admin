<template>
  <div>
    <Modal
      :title="status.title"
      :loading="status.loading"
      :footer-hide="status.hide"
      :width ="status.width ? status.width : 550"
      v-model="status.show"
      :mask-closable = "false"
      @on-ok="$emit('handlerModelDialogOk',status.name)"
      @on-cancel="$emit('handlerModelDialogCancel',status.name)">
      <slot>form</slot>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'ModelDialog',
  props: { status: Object }
}
</script>
