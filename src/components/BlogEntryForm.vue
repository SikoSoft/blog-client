<template>
  <form class="blog-entry-form" @submit="submitForm" :id="formId">
    <div v-if="!initialEntry.id && drafts.length">
      <select @change="loadDraft" class="blog-entry-form__draft">
        <option value>{{ $strings.newEntry }}</option>
        <optgroup :label="$strings.unpublishedDrafts">
          <option v-for="draft in drafts" :value="draft.id" :key="draft.id">
            {{
            draft.title
            }}
          </option>
        </optgroup>
      </select>
    </div>
    <div>
      <h2 v-if="!entry.id">{{ $strings.newEntry }}</h2>
      <h2 v-else>{{ $strings.editEntry }}</h2>
    </div>
    <div>
      <input
        type="text"
        class="blog-entry-form__title"
        v-model="title"
        @keyup="saveFormState"
        :placeholder="$strings.title"
      />
    </div>
    <div v-if="showNewId">
      <input
        type="text"
        class="blog-entry-form__title"
        v-model="newId"
        @keyup="saveFormState"
        :placeholder="$strings.id"
      />
    </div>
    <div class="blog-entry-form__body">
      <div :id="editorId"></div>
      <div class="blog-entry-form__entry-finder" :style="entryFinderStyle">
        <blog-entry-finder
          v-if="entryFinderOpen"
          @entryClicked="insertEntryLink"
          @inputBlurred="hideEntryFinder"
        />
      </div>
    </div>
    <div>
      <blog-tag-manager :tags="tags" :api="api" />
    </div>
    <div>
      <template v-if="!entryId || entry.public === 1">
        <blog-button create v-if="entry.id" :text="$strings.updateEntry" :action="submitForm" />
        <blog-button create v-else :text="$strings.postEntry" :action="submitForm" />
        <blog-button create v-if="!entry.id" :text="$strings.saveAsDraft" :action="saveDraft" />
        <blog-button
          destroy
          type="button"
          v-if="entry.id && user.rights.includes('delete_entry')"
          :action="showConfirmationDialog"
          :text="$strings.deleteEntry"
        />
      </template>
      <template v-else>
        <blog-button create :text="$strings.publishDraft" :action="publishDraft" />
        <blog-button create :text="$strings.updateDraft" :action="saveDraft" />
        <blog-button
          destroy
          type="button"
          v-if="entry.id && user.rights.includes('delete_entry')"
          :action="showConfirmationDialog"
          :text="$strings.deleteDraft"
        />
      </template>
      <blog-confirmation-dialog
        :isOpen="confirmationDialogOpen"
        :title="$strings.deleteEntry"
        :message="$strings.confirmDeleteEntry"
      >
        <blog-button destroy :text="$strings.yes" :action="handleDelete" />
        <blog-button :text="$strings.no" :action="hideConfirmationDialog" />
      </blog-confirmation-dialog>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Quill from "quill";

import BlogEntryFinder from "@/components/BlogEntryFinder.vue";
import BlogTagManager from "@/components/BlogTagManager.vue";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog.vue";
import BlogButton from "@/components/BlogButton.vue";
import imageHandler from "@/util/imageHandler";

export default {
  name: "blog-entry-form",

  props: ["initialEntry"],

  components: {
    BlogEntryFinder,
    BlogTagManager,
    BlogConfirmationDialog,
    BlogButton
  },

  data() {
    return {
      title: this.initialEntry.title ? this.initialEntry.title : "",
      newId: this.initialEntry.id ? this.initialEntry.id : "",
      body: this.initialEntry.body ? this.initialEntry.body : "",
      tags: this.initialEntry.tags ? this.initialEntry.tags : [],
      entry: this.initialEntry ? this.initialEntry : false,
      editor: false,
      initialized: false,
      confirmationDialogOpen: false,
      public: this.initialEntry.public ? this.initialEntry.public : 1,
      entryFinderOpen: false,
      entryFinderRange: null,
      editorSelectionPosition: {}
    };
  },

  mounted() {
    this.getDrafts();
    this.editor = new Quill(`#${this.editorId}`, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ script: "sub" }, { script: "super" }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" }
            ],
            ["link", "image", "video", "code-block"],
            ["entry"],
            ["clean"]
          ],
          handlers: {
            entry: () => {
              this.showEntryFinder();
            }
          }
        }
      }
    });
    if (this.body) {
      this.editor.setContents(JSON.parse(this.body));
    }
    this.imageHandler = new imageHandler({
      setProgress: this.setProgress,
      editor: this.editor,
      uploadImage: this.api.uploadImage,
      headers: this.headers
    });
    const toolbar = this.editor.getModule("toolbar");
    toolbar.addHandler("image", () => {
      this.imageHandler.selectLocalImage();
    });
    this.editor.on("text-change", () => {
      this.updateSelectionPosition();
      this.saveFormState();
    });
    this.editor.on("selection-change", () => {
      this.updateSelectionPosition();
    });
    this.editor.keyboard.addBinding(
      {
        key: "e",
        shiftKey: true,
        ctrlKey: true
      },
      () => {
        this.showEntryFinder();
      }
    );
    if (localStorage.getItem(this.formId)) {
      this.loadFormState();
    }
    this.initialized = true;
  },

  computed: {
    ...mapGetters(["api", "headers", "user", "drafts", "entryFormIsOpen"]),

    entryId() {
      return this.entry && this.entry.id ? this.entry.id : false;
    },

    editorId() {
      return `quilljs-editor${this.entryId ? "-" + this.entryId : ""}`;
    },

    formId() {
      return `entry-form${this.entryId ? "-" + this.entryId : ""}`;
    },

    showNewId() {
      return this.entryId;
    },

    isPublic() {
      return this.public === 1;
    },

    entryFinderStyle() {
      return {
        top: `calc(${this.editorSelectionPosition.top}px + 2rem)`,
        left: `${this.editorSelectionPosition.left}px`
      };
    }
  },

  methods: {
    ...mapMutations(["setLoading", "hideEntryForm"]),

    ...mapActions([
      "getEntry",
      "getDraft",
      "getDrafts",
      "hideEntryForm",
      "setEditMode",
      "setEntryById",
      "setDraftById",
      "updateEntryId",
      "updateDraftId",
      "deleteEntry",
      "deleteDraft",
      "setProgress",
      "addToast"
    ]),

    publishDraft(e) {
      this.public = 1;
      this.submitForm(e);
    },

    saveDraft(e) {
      this.public = 0;
      this.submitForm(e);
    },

    submitForm(e) {
      const bodyDelta = this.editor.getContents().ops;
      const entry = {
        title: this.title,
        newId: this.newId,
        body: bodyDelta,
        tags: this.tags,
        public: this.public
      };
      this.setLoading({ loading: true });
      fetch(this.entry.api.save.href, {
        method: this.entry.api.save.method,
        headers: this.headers,
        body: JSON.stringify(entry)
      })
        .then(response => response.json())
        .then(json => {
          if (!json.errorCode) {
            this[this.public === 1 ? "getEntry" : "getDraft"]({
              id: json.id,
              force: true,
              addToList: !this.entryId ? true : false
            }).then(() => {
              this.setLoading({ loading: false });
              this.hideEntryForm();
              this.setEditMode({ id: json.id, mode: false });
              localStorage.removeItem(this.formId);
              const routeType = this.public === 1 ? "entry" : "draft";
              if (this.entryId && this.entryId !== json.id) {
                this.$emit("idChanged", json.id);
                this[this.public === 1 ? "updateEntryId" : "updateDraftId"]({
                  id: this.entryId,
                  newId: json.id
                });
              }
              if (window.location.pathname !== `/${routeType}/${json.id}`) {
                if (!this.entryId) {
                  this.$router.push({ path: `/${routeType}/${json.id}` });
                } else {
                  this.$emit("edited", json.id);
                }
              }
            });
          } else {
            this.addToast(this.$strings.errors[`CODE_${json.errorCode}`]);
          }
        });
      e.preventDefault();
    },

    setTags(tags) {
      this.tags = tags;
      this.saveFormState();
    },

    saveFormState() {
      if (!this.initialized) {
        return;
      }
      localStorage.setItem(
        this.formId,
        JSON.stringify({
          title: this.title,
          newId: this.newId,
          body: this.editor.getContents().ops,
          tags: this.tags
        })
      );
    },

    loadFormState() {
      try {
        const state = JSON.parse(localStorage.getItem(this.formId));
        this.title = state.title;
        this.newId = state.newId ? state.newId : "";
        this.editor.setContents(state.body);
        this.tags = state.tags;
      } catch (e) {
        this.title = "";
        this.newId = "";
        this.editor.setContents([]);
        console.log("corrupt form data", e);
      }
    },

    showConfirmationDialog() {
      this.confirmationDialogOpen = true;
    },

    hideConfirmationDialog() {
      this.confirmationDialogOpen = false;
    },

    updateSelectionPosition() {
      const range = this.editor.getSelection();
      if (range) {
        const selectionRange = this.editor.root.ownerDocument
          .getSelection()
          .getRangeAt(0);
        if (selectionRange) {
          const rects = selectionRange.getClientRects();
          if (rects.length > 0) {
            this.editorSelectionPosition = {
              top: rects[0].top,
              left: rects[0].left
            };
          }
        }
      }
    },

    showEntryFinder() {
      this.entryFinderRange = this.editor.getSelection();
      this.entryFinderOpen = true;
    },

    hideEntryFinder() {
      this.entryFinderOpen = false;
    },

    insertEntryLink(payload) {
      if (this.entryFinderRange) {
        this.editor.insertText(
          this.entryFinderRange.index,
          payload.title,
          "link",
          `/entry/${payload.id}`
        );
      }
      this.hideEntryFinder();
    },

    loadDraft(e) {
      if (e && e.target && e.target.value) {
        this.entry = this.$store.getters.draftById(e.target.value);
        this.title = this.entry.title;
        this.newId = this.entry.id;
        this.body = this.entry.body;
        this.tags = this.entry.tags;
        this.public = this.entry.public;
        this.editor.setContents(JSON.parse(this.entry.body));
      } else {
        this.entry = false;
        this.public = 0;
        this.loadFormState();
      }
    },

    handleDelete() {
      if (this.isPublic) {
        this.deleteEntry({ id: this.entry.id });
      } else {
        this.deleteDraft({ id: this.entry.id });
        this.loadDraft();
        this.hideConfirmationDialog();
      }
      if (this.entryFormIsOpen) {
        this.hideEntryForm();
      } else if (window.location.pathname !== "/") {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-entry-form {
  margin: 16px 0;

  .blog-entry-form__draft {
    max-width: 90%;
  }

  input,
  button,
  &__body {
    margin: 8px 0;
    border-radius: 4px;
    border: 4px #000 solid;
    background-color: #fff;
    color: #000;
  }

  .blog-entry-form__title {
    font-size: 2rem;
    width: 36rem;
    max-width: 100%;
    box-sizing: border-box;
  }

  .ql-editor {
    min-height: 10rem;
    font-family: $font-family;
    font-size: $font-large;
    position: relative;
  }

  .blog-entry-form__body {
    position: relative;
  }

  .blog-entry-form__entry-finder {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .ql-entry:after {
    content: "entry";
  }
}
</style>
