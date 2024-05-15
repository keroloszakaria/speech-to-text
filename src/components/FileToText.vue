<template>
  <section>
    <h2>File to Text</h2>
    <div class="recorder_wrapper">
      <div class="recorder">
        <label class="record_btn file" for="file"> </label>
        <input id="file" type="file" @change="selectFile" />
      </div>
    </div>
    <div>
      <div class="transcript" v-text="transcription"></div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      transcription: "",
    };
  },
  methods: {
    async selectFile(e) {
      this.file = e.target.files[0];
      this.convertToBase64();
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
      const apiKey = process.env.VUE_APP_GOOGLE_SPEECH_API_KEY;

      const body = {
        audio: {
          content: base64Data,
        },
        config: {
          enableAutomaticPunctuation: true,
          encoding: "LINEAR16",
          languageCode: "en-US",
          model: "default",
        },
      };
      try {
        const response = await fetch(
          `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.transcription = data.results;
      } catch (error) {
        console.error("Error:", error.message);
        this.transcription = error.message;
      }
    },
  },
  mounted() {},
};
</script>
