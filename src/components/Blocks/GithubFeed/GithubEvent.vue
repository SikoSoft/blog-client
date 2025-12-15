<template>
  <li class="blog-github-event">
    <a class="blog-github-event__link" :href="url">
      <span class="blog-github-event__icon" v-html="octiconSvg"></span>
      {{ message }}
    </a>
  </li>
</template>

<script>
import octicons from "@primer/octicons";
import { parseVars } from "@/util/strings.js";

export default {
  name: "blog-github-event",

  props: {
    id: { type: String },
    type: { type: String },
    repo: { type: Object },
    payload: { type: Object }
  },

  computed: {
    octicon() {
      switch (this.type) {
        case "IssuesEvent":
          return "issue-opened";
        case "IssueCommentEvent":
          return "comment";
        case "PushEvent":
          return "git-commit";
        case "CreateEvent":
          return "git-branch";
        case "DeleteEvent":
          return "trashcan";
        case "PullRequestEvent":
          return "git-pull-request";
        default:
          return "alert";
      }
    },

    octiconSvg() {
      return octicons[this.octicon].toSVG({ width: 24, height: 24 });
    },

    repoName() {
      return this.repo.name.replace(/.*\//, "");
    },

    repoUrl() {
      return `https://github.com/${this.repo.name}`;
    },

    refName() {
      return this.payload.ref ? this.payload.ref : "";
    },

    refType() {
      return this.payload.ref_type;
    },

    action() {
      if (this.payload.action === "closed") {
        return this.$strings.closed;
      } else {
        return this.$strings.opened;
      }
    },

    title() {
      return this.payload.pull_request ? this.payload.pull_request.title : "";
    },

    message() {
      return parseVars(this.$strings.githubEventTypes[this.type], {
        repo: this.repoName,
        issue: this.issueName,
        desc: this.commitDesc,
        refName: this.refName,
        refType: this.refType,
        action: this.action,
        title: this.title
      });
    },

    issueName() {
      if (this.type === "IssuesEvent" || this.type === "IssueCommentEvent") {
        return this.payload.issue.title;
      }
      return "";
    },

    commitDesc() {
      if (this.type === "PushEvent") {
        return this.payload.commits[0].message;
      }
      return "";
    },

    url() {
      switch (this.type) {
        case "CreateEvent":
          return this.repoUrl;
        case "IssuesEvent":
          return this.payload.issue.html_url;
        case "IssueCommentEvent":
          return this.payload.issue.html_url;
        case "PushEvent":
          return `${this.repoUrl}/commit/${this.payload.head}`;
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@theme/variables";

.blog-github-event {
  padding: $space-xsmall 0;
  border: 1px;

  &__icon {
    border: 1px $color-secondary-border solid;
    background-color: $color-secondary-bg-highlight;
    border-radius: 4px;
    vertical-align: middle;
    height: 24px;
    display: inline-block;
    margin: 0 8px 8px 0;

    path {
      fill: #fff;
    }
  }

  &__link {
    color: $color-secondary-link;
  }
}
</style>
