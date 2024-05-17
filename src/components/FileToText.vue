<template>
  <section>
    <h2>File to Text</h2>
    <div class="recorder_wrapper">
      <div class="recorder">
        <label class="record_btn file" for="file"> </label>
        <input
          id="file"
          type="file"
          @change="selectFile"
          accept=".webm,.weba,audio/webm,audio/weba"
        />
      </div>
    </div>
    <div>
      <div class="transcript" v-text="transcription"></div>
    </div>
  </section>
</template>

<script>
import { googleSpeechToText } from "@/api";

export default {
  data() {
    return {
      soundExtensions: ["audio/webm", "audio/weba"],
      file: null,
      transcription: "",
    };
  },
  methods: {
    async selectFile(e) {
      this.file = e.target.files[0];
      console.log(this.file);
      if (this.soundExtensions.includes(this.file.type)) this.convertToBase64();
      else
        this.transcription = "Please choose a file with weba or webm extension";
    },
    convertToBase64() {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result.split(",")[1];
        this.sendToGoogleSpeechToText(base64Data);
      };
      reader.readAsDataURL(this.file);
    },

    async sendToGoogleSpeechToText(base64Data) {
      this.transcription = await googleSpeechToText(base64Data);
    },
  },
  mounted() {},
};
</script>
