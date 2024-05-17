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
import { googleSpeechToText } from "@/api";

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
    async sendToGoogleSpeechToText(base64Data) {
      this.transcription = await googleSpeechToText(base64Data);
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
