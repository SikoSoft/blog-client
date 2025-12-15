<template>
  <ul
    class="blog-sortable-list"
    :class="{ 'blog-sortable-list--dragging': isDragging }"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: "blog-sortable-list",

  props: {
    nodes: Array
  },

  data() {
    return {
      isDragging: false,
      draggedNode: false,
      droppedNode: false,
      sortableNodes: this?.content || [],
      orderedNodeIds: []
    };
  },

  created() {
    const events = [
      "dragEnter",
      "dragLeave",
      "dragOver",
      "dragStart",
      "dragEnd",
      "drop"
    ];
    events.forEach(eventName => {
      this.$on(eventName, e => {
        this[eventName](e);
      });
    });
  },

  methods: {
    dragEnter(e) {
      e.currentTarget.classList.add("sortable-item--over");
    },

    dragLeave(e) {
      e.currentTarget.classList.remove("sortable-item--over");
    },

    dragOver(e) {
      e.preventDefault();
    },

    dragStart(e) {
      this.isDragging = true;
      this.draggedNode = e.target;
      e.target.classList.add("sortable-item--moving");
      this.orderedNodeIds = this.$children.map(node => node.id.toString());
    },

    dragEnd() {
      const draggedId = this.draggedNode.getAttribute("data-id");
      const draggedIndex = this.orderedNodeIds.indexOf(draggedId);
      const droppedIndex = this.orderedNodeIds.indexOf(
        this.droppedNode.getAttribute("data-id")
      );
      this.draggedNode.classList.remove("sortable-item--moving");
      const orderedNodeIds =
        draggedIndex === droppedIndex
          ? this.orderedNodeIds
          : this.orderedNodeIds.filter(nodeId => nodeId !== draggedId);
      if (draggedIndex !== droppedIndex) {
        orderedNodeIds.splice(droppedIndex, 0, draggedId);
      }
      this.droppedNode.classList.remove("sortable-item--over");
      this.isDragging = false;
      if (
        JSON.stringify(this.orderedNodeIds) !== JSON.stringify(orderedNodeIds)
      ) {
        this.$emit("orderChanged", orderedNodeIds);
      }
    },

    drop(e) {
      this.droppedNode = e.target;
    }
  }
};
</script>

<style lang="scss">
@import "@theme/variables";

.blog-sortable-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  transform: all 0.3s;

  &--dragging li * {
    pointer-events: none;
  }

  li {
    transition: all 0.3s;
    cursor: move;
    border: 0.25rem transparent solid;
    border-radius: 1rem;

    &.sortable-item--moving {
      transform: scale(0.9);
      opacity: 0.25;
    }

    &.sortable-item--over {
      border: 0.25rem $color-secondary-border dashed;
      opacity: 0.9;
      box-shadow: 0 0 $space-large $color-box-glow;
    }
  }
}
</style>
