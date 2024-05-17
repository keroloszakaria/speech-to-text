<template>
  <main class="flex">
    <FileToText />

    <SpeechToText />
  </main>
</template>

<script>
import FileToText from "@/components/FileToText.vue";
import SpeechToText from "@/components/SpeechToText.vue";
export default {
  components: { SpeechToText, FileToText },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background: #281936;
  color: #fff;
}
main {
  display: flex;
  height: 100vh;
}
main > section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

input {
  display: none;
}

audio {
  margin-top: 2rem;
}

@import "https://fonts.googleapis.com/icon?family=Material+Icons";

.recorder_wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recorder {
  display: inline-block;
  text-align: center;
  width: 500px;
  max-width: 100%;
}

.record_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100px;
  height: 100px;
  font-family: "Material Icons";
  font-size: 48px;
  color: #e74c3c;
  background: none;
  border: 2px solid #e74c3c;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.15s linear;
}

.record_btn:hover {
  transition: 0.15s linear;
  transform: scale(1.05);
}

.record_btn:active {
  background: #f5f5f5;
}

.record_btn.sound:after {
  content: "\E029";
}
.record_btn.file:after {
  content: "\f09b";
}

.record_btn[disabled] {
  border: 2px solid #ccc;
}

.record_btn.sound-off:after {
  content: "\e034";
}
.record_btn.sound[disabled]:after {
  content: "\E02B";
  color: #ccc;
}
.record_btn.file[disabled]:after {
  content: "\f886";
  color: #ccc;
}

.record_btn[disabled]:hover {
  transition: 0.15s linear;
  transform: none;
}

.record_btn[disabled]:active {
  background: none;
}

.recording {
  animation: recording 2s infinite ease-in-out;
  position: relative;
}

.recording:before {
  content: "";
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0px;
  height: 0px;
  margin: 0px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  animation: recording_before 2s infinite ease-in-out;
}

@keyframes recording {
  from {
    transform: scale(1.1);
  }

  50% {
    transform: none;
  }

  to {
    transform: scale(1.1);
  }
}

@keyframes recording_before {
  80% {
    width: 200px;
    height: 200px;
    margin: -100px;
    opacity: 0;
  }

  to {
    opacity: 0;
  }
}
</style>
