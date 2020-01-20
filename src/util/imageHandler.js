module.exports = {
  saveToServer(file) {
    const fd = new FormData();
    fd.append("image", file);
    const xhr = new XMLHttpRequest();
    console.log("uploadImage", this.uploadImage);
    xhr.open(this.uploadImage.method, this.uploadImage.href, true);
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

  setup({ editor, uploadImage }) {
    this.editor = editor;
    this.uploadImage = uploadImage;
  }
};
