export const googleSpeechToText = async (base64Data) => {
  const apiKey = process.env.VUE_APP_GOOGLE_SPEECH_API_KEY;

  const body = {
    audio: {
      content: base64Data,
    },
    config: {
      enableAutomaticPunctuation: true,
      encoding: "WEBM_OPUS",
      languageCode: "en-US",
      model: "default",
    },
  };
  try {
    const response = await fetch(
      `https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${apiKey}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");
    } else {
      return "No transcription result.";
    }
  } catch (error) {
    return error.message;
  }
};
