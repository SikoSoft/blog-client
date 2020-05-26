export default {
  saveToServer(file) {
    const fd = new FormData();
    fd.append("image", file);
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        this.setProgress({ progress: e.loaded / e.total });
      }
    };
    xhr.open(this.uploadImage.method, this.uploadImage.href, true);
    Object.keys(this.headers).forEach(header => {
      xhr.setRequestHeader(header, this.headers[header]);
    });
    xhr.onload = () => {
      if (xhr.status === 200) {
        const url = JSON.parse(xhr.responseText).url;
        this.insertToEditor(url);
      }
    };
    xhr.send(fd);
  },

  insertToEditor(url) {
    const range = this.editor.getSelection();
    this.editor.insertEmbed(range.index, "image", url);
  },

  selectLocalImage() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        this.saveToServer(file);
      }
    };
  },

  setup({ setProgress, editor, uploadImage, headers }) {
    this.setProgress = setProgress;
    this.editor = editor;
    this.uploadImage = uploadImage;
    this.headers = headers;
  }
};
