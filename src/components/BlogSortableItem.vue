<template>
  <li
    :data-id="id"
    draggable="true"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @dragover="dragOver"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @drop="drop"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: "sortable-list-item",

  props: {
    id: [Number, String]
  },

  methods: {
    dragEnter(e) {
      this.$parent.$emit("dragEnter", e);
    },

    dragLeave(e) {
      this.$parent.$emit("dragLeave", e);
    },

    dragOver(e) {
      this.$parent.$emit("dragOver", e);
    },

    dragStart(e) {
      this.$parent.$emit("dragStart", e);
    },

    dragEnd(e) {
      this.$parent.$emit("dragEnd", e);
    },

    drop(e) {
      this.$parent.$emit("drop", e);
    }
  }
};
</script>
