<template>
  <form
    class="blog-comment-form"
    @submit="submitForm"
    :id="formId"
    v-if="open"
    :class="{ 'blog-comment-form--hidden': !open }"
  >
    <div class="blog-comment-form__head">
      <h3>{{ $strings.leaveAComment }}</h3>
    </div>
    <div class="blog-comment-form_name">
      <input
        type="text"
        class="blog-comment-form__name"
        v-model="name"
        @keyup="saveFormState"
        :placeholder="$strings.name"
      />
    </div>
    <div class="blog-comment-form__message">
      <div :id="editorId"></div>
    </div>
    <div class="blog-comment-form__buttons">
      <blog-button :action="submitForm" :text="$strings.postComment" />
    </div>
    <div class="blog-comment-form__captcha">
      {{ $strings.captchaNotice }}
      <div class="blog-comment-form__captcha-links">
        <a
          class="blog-comment-form__captcha-link"
          href="https://policies.google.com/privacy"
        >{{ $strings.privacyPolicy }}</a>
        <a
          class="blog-comment-form__captcha-link"
          href="https://policies.google.com/terms"
        >{{ $strings.termsOfService }}</a>
      </div>
    </div>
  </form>
</template>

<script>
import BlogButton from "@/components/BlogButton.vue";

import { mapGetters, mapActions } from "vuex";

import Quill from "quill";

export default {
  name: "blog-comment-form",

  components: { BlogButton },

  data() {
    return {
      open: true,
      name: "",
      editor: false
    };
  },

  props: ["entry"],

  mounted() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          ["link", "code-block"]
        ]
      }
    });
    if (this.body) {
      this.editor.setContents(JSON.parse(this.body));
    }
    this.editor.on("text-change", () => {
      this.saveFormState();
    });
    if (localStorage.getItem(this.formId)) {
      this.loadFormState();
    }
    this.initialized = true;
  },

  computed: {
    ...mapGetters(["headers"]),

    editorId() {
      return `quilljs-comment-editor${this.entry.id}`;
    },

    formId() {
      return `comment-form${this.entry.id}`;
    },

    comments() {
      return this.$store.getters.commentsByEntry(this.entry.id);
    }
  },

  methods: {
    ...mapActions(["addToast"]),

    async getCaptchaToken() {
      if (!process.env.VUE_APP_RECAPTCHA_CODE) {
        return Promise.resolve();
      }
      return new Promise(resolve => {
        window.grecaptcha.ready(function() {
          window.grecaptcha
            .execute(process.env.VUE_APP_RECAPTCHA_CODE, {
              action: "postComment"
            })
            .then(token => {
              resolve(token);
            });
        });
      });
    },

    async submitForm(e) {
      this.getCaptchaToken().then(captchaToken => {
        fetch(this.entry.api.postComment.href, {
          method: this.entry.api.postComment.method,
          headers: this.headers,
          body: JSON.stringify({
            name: this.name,
            message: this.editor.getContents().ops,
            captchaToken
          })
        })
          .then(response => response.json())
          .then(json => {
            if (!json.errorCode) {
              localStorage.removeItem(this.formId);
            } else {
              this.addToast(this.$strings.errors[`CODE_${json.errorCode}`]);
            }
            this.$store.commit("setComments", {
              id: this.entry.id,
              comments: [{ ...json }, ...this.comments]
            });
            this.open = false;
          });
      });
      e.preventDefault();
    },

    saveFormState() {
      if (!this.initialized) {
        return;
      }
      localStorage.setItem(
        this.formId,
        JSON.stringify({
          name: this.name,
          message: this.editor.getContents().ops
        })
      );
    },

    loadFormState() {
      try {
        const state = JSON.parse(localStorage.getItem(this.formId));
        this.name = state.name;
        this.editor.setContents(state.message);
      } catch (e) {
        console.log("corrupt form data", e);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-comment-form {
  transition: all 0.2s;

  &--hidden {
    opacity: 0;
    height: 0;
  }

  &__message {
    margin: 8px 0;
    border-radius: 4px;
    border: 4px #000 solid;
    background-color: #fff;
    color: #000;
  }

  &__captcha {
    border-top: 1px #444 dotted;
    border-bottom: 1px #444 dotted;
    text-align: center;
    padding: $space-small;
    margin: $space 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );

    &-links {
      margin-top: $space-small;
    }

    &-link {
      margin: 0 $space-small;
    }
  }

  .ql-editor {
    min-height: 5rem;
  }
}
</style>
