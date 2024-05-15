<template>
  <section>
    <h2>Speech to Text</h2>

    <div class="recorder_wrapper">
      <div class="recorder">
        <button
          class="record_btn sound"
          v-if="!isRecording"
          @click="startRecording"
        ></button>
        <button
          class="record_btn sound-off"
          v-else
          @click="stopRecording"
        ></button>
        <audio v-if="recordedAudio" :src="recordedAudio" controls></audio>
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
      isRecording: false,
      recordedAudio: null,
      recorder: null,
      transcription: null,
    };
  },
  methods: {
    async startRecording() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = (e) => {
        this.recordedAudio = URL.createObjectURL(e.data);
        this.convertToBase64(e.data);
      };
      this.recorder.start();
      this.isRecording = true;
    },
    convertToBase64(data) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(arrayBuffer))
        );
        this.encodedAudio = base64String;
        this.sendToGoogleSpeechToText(base64String);
      };
    },
    async sendToGoogleSpeechToText(base64String) {
      const apiKey = process.env.VUE_APP_GOOGLE_SPEECH_API_KEY;

      const body = {
        audio: {
          content: base64String,
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
    stopRecording() {
      this.recorder.stop();
      this.isRecording = false;
    },
  },
};
</script>

<style scoped>
.recorder_wrapper {
  border-left: 1px solid #eee;
}
</style>
