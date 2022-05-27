<template>
  <form class="blog-entry-form" @submit="submitForm" :id="formId">
    <blog-tabs>
      <blog-tab :title="$strings.content">
        <div v-if="!initial.id && drafts.length">
          <select @change="loadDraft" class="blog-entry-form__draft">
            <option value>{{ $strings.newEntry }}</option>
            <optgroup :label="$strings.unpublishedDrafts">
              <option v-for="draft in drafts" :value="draft.id" :key="draft.id">
                {{ draft.title }}
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
            @keyup="
              e => {
                updateNewId(e);
                saveFormState();
              }
            "
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
          <blog-tag-manager @tagsUpdated="tagsUpdated" :tags="tags" />
        </div>
      </blog-tab>
      <blog-tab :title="$strings.meta">
        <div class="blog-entry-form__listed">
          <label>
            <input type="checkbox" v-model="listed" />
            {{ $strings.includeEntryInListings }}</label
          >
        </div>
        <div
          class="blog-entry-form__schedule"
          v-if="!entryId || entry.public === 0"
        >
          {{ $strings.publishAtScheduledTime }}
          <div class="blog-entry-form__schedule-calendar">
            <v-date-picker
              v-if="schedulerIsOpen"
              v-model="publishAt"
              mode="dateTime"
              :min-date="new Date()"
            />
          </div>
          <input
            type="hidden"
            :placeholder="$strings.publishAtScheduledTime"
            @focus="showScheduler"
            v-model="publishAt"
          />
        </div>
      </blog-tab>
    </blog-tabs>
    <div>
      <template v-if="!entryId || entry.public === 1">
        <blog-button
          create
          v-if="entry.id"
          :text="$strings.updateEntry"
          :action="submitForm"
        />
        <blog-button
          create
          v-else
          :text="$strings.postEntry"
          :action="submitForm"
        />
        <blog-button
          create
          v-if="!entry.id"
          :text="$strings.saveAsDraft"
          :action="saveDraft"
        />
        <blog-button
          destroy
          type="button"
          v-if="deleteLink"
          :action="showConfirmationDialog"
          :text="$strings.deleteEntry"
        />
      </template>
      <template v-else>
        <blog-button
          create
          :text="$strings.publishDraft"
          :action="publishDraft"
        />
        <blog-button create :text="$strings.updateDraft" :action="saveDraft" />
        <blog-button
          destroy
          type="button"
          v-if="deleteLink"
          :action="showConfirmationDialog"
          :text="$strings.deleteDraft"
        />
      </template>
      <blog-confirmation-dialog
        v-if="deleteLink"
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
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Quill from "quill";
import BlogTabs from "@/components/BlogTabs";
import BlogTab from "@/components/BlogTab";
import BlogEntryFinder from "@/components/BlogEntryFinder";
import BlogTagManager from "@/components/BlogTagManager";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import BlogButton from "@/components/BlogButton";
import imageHandler from "@/util/imageHandler";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-entry-form",

  props: {
    initial: { type: Object }
  },

  components: {
    BlogTabs,
    BlogTab,
    BlogEntryFinder,
    BlogTagManager,
    BlogConfirmationDialog,
    BlogButton
  },

  data() {
    return {
      context: { id: "needs", props: ["uploadImage"] },
      title: this.initial.title ? this.initial.title : "",
      newId: this.initial.id ? this.initial.id : "",
      body: this.initial.body ? this.initial.body : "",
      tags: this.initial.tags ? this.initial.tags : [],
      links: this.initial.links ? this.initial.links : [],
      entry: this.initial ? this.initial : false,
      editor: false,
      initialized: false,
      confirmationDialogOpen: false,
      listed: typeof this.initial.listed === "number" ? this.initial.listed : 1,
      public: this.initial.public ? this.initial.public : 1,
      publishAt: this.initial.publish_at
        ? new Date(this.initial.publish_at * 1000)
        : "",
      entryFinderOpen: false,
      entryFinderRange: null,
      editorSelectionPosition: {},
      schedulerIsOpen: true
    };
  },

  async created() {
    this.addContext(this.context);
  },

  async mounted() {
    await this.getDrafts({ links: this.links });
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
    const toolbar = this.editor.getModule("toolbar");
    if (this.uploadImageLink) {
      this.setupImageUpload();
      toolbar.addHandler("image", () => {
        this.imageHandler.selectLocalImage();
      });
    }
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

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["user", "drafts", "entryFormIsOpen"]),

    ...mapGetters(["headers"]),

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

    deleteLink() {
      return this.link("DELETE", "entry");
    },

    uploadImageLink() {
      return this.link("POST", "uploadImage", this.$store.state.links);
    },

    entryFinderStyle() {
      return {
        top: `calc(${this.editorSelectionPosition.top}px + 2rem)`,
        left: `${this.editorSelectionPosition.left}px`
      };
    }
  },

  methods: {
    ...linkHandlers,

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
      "addToast",
      "apiRequest",
      "addEntryToList",
      "addContext",
      "removeContext"
    ]),

    publishDraft(e) {
      this.public = 1;
      this.submitForm(e);
    },

    saveDraft(e) {
      this.public = 0;
      this.submitForm(e);
    },

    async submitForm(e) {
      const bodyDelta = this.editor.getContents().ops;
      const entry = {
        title: this.title,
        newId: this.newId,
        body: bodyDelta,
        tags: this.tags,
        listed: this.listed ? 1 : 0,
        public: this.public,
        publishAt: this.publishAt
          ? Math.floor(this.publishAt.getTime() / 1000)
          : 0
      };
      this.setLoading({ loading: true });
      const response = await this.apiRequest({
        ...this.link(this.initial.id ? "PUT" : "POST", "entry"),
        body: entry
      });
      if (!response.errorCode) {
        this.setEntryById({ id: response.entry.id, entry: response.entry });
        this.entryId || (await this.addEntryToList({ entry: response.entry }));
        this.setLoading({ loading: false });
        this.hideEntryForm();
        this.setEditMode({ id: response.entry.id, mode: false });
        localStorage.removeItem(this.formId);
        const routeType = this.public === 1 ? "entry" : "draft";
        if (this.entryId && this.entryId !== response.entry.id) {
          this.$emit("idChanged", response.entry.id);
          this[this.public === 1 ? "updateEntryId" : "updateDraftId"]({
            id: this.entryId,
            newId: response.entry.id
          });
        }
        if (window.location.pathname !== `/${routeType}/${response.entry.id}`) {
          if (!this.entryId) {
            this.$router.push({ path: `/${routeType}/${response.entry.id}` });
          } else {
            this.$emit("edited", response.entry.id);
          }
        }
      } else {
        this.addToast(this.$strings.errors[`CODE_${response.errorCode}`]);
      }
      e.preventDefault();
    },

    setTags(tags) {
      this.tags = tags;
      this.saveFormState();
    },

    updateNewId(e) {
      const id = e.target.value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
      this.newId = id;
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
      } else if (!this.editorSelectionPosition.top) {
        const rects = this.editor.root.getClientRects();
        if (rects.length > 0) {
          this.editorSelectionPosition = {
            top:
              rects[0].top +
              parseInt(
                window
                  .getComputedStyle(this.editor.root)
                  .getPropertyValue("padding-top")
              ),
            left:
              rects[0].left +
              parseInt(
                window
                  .getComputedStyle(this.editor.root)
                  .getPropertyValue("padding-left")
              )
          };
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

    showScheduler() {
      this.schedulerIsOpen = true;
    },

    hideScheduler() {
      this.schedulerIsOpen = false;
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
        this.publishAt = new Date(this.entry.publish_at * 1000);
        this.links = this.entry.links;
        this.editor.setContents(JSON.parse(this.entry.body));
      } else {
        this.entry = false;
        this.public = 0;
        this.loadFormState();
      }
    },

    handleDelete() {
      if (this.isPublic) {
        this.deleteEntry({ links: this.links, id: this.entry.id });
      } else {
        this.deleteDraft({ links: this.links, id: this.entry.id });
        this.loadDraft();
        this.hideConfirmationDialog();
      }
      if (this.entryFormIsOpen) {
        this.hideEntryForm();
      } else if (window.location.pathname !== "/") {
        this.$router.push({ path: "/" });
      }
    },

    setupImageUpload() {
      this.imageHandler = new imageHandler({
        setProgress: this.setProgress,
        editor: this.editor,
        uploadImage: this.uploadImageLink,
        headers: this.headers
      });
    },

    tagsUpdated(tags) {
      this.tags = tags;
    }
  }
};
</script>

<style lang="scss">
@import "@theme/variables";

.blog-entry-form {
  margin: 16px 0;

  .blog-entry-form__draft {
    max-width: 90%;
  }

  .blog-entry-form__schedule {
    margin-top: $space;
  }

  input,
  button,
  &__body {
    margin: 8px 0;
    border-radius: 4px;
    border: 4px $color-border-primary solid;
    background-color: $color-input-bg;
    color: $color-input-text;
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
