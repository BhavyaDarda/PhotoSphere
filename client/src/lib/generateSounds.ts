// Function to generate and download sound effects
async function generateSounds() {
  const audioContext = new AudioContext();

  // Hover sound - subtle high frequency ping
  async function generateHoverSound() {
    const duration = 0.1;
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < audioBuffer.length; i++) {
      const t = i / audioContext.sampleRate;
      channelData[i] = Math.sin(2 * Math.PI * 2000 * t) * Math.exp(-15 * t);
    }
    
    return audioBuffer;
  }

  // Click sound - quick low frequency thump
  async function generateClickSound() {
    const duration = 0.15;
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < audioBuffer.length; i++) {
      const t = i / audioContext.sampleRate;
      channelData[i] = Math.sin(2 * Math.PI * 150 * t) * Math.exp(-20 * t);
    }
    
    return audioBuffer;
  }

  // Success sound - ascending pleasant chime
  async function generateSuccessSound() {
    const duration = 0.5;
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < audioBuffer.length; i++) {
      const t = i / audioContext.sampleRate;
      const freq = 500 + 1000 * t;
      channelData[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-5 * t);
    }
    
    return audioBuffer;
  }

  // Transition sound - smooth sweep
  async function generateTransitionSound() {
    const duration = 0.3;
    const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < audioBuffer.length; i++) {
      const t = i / audioContext.sampleRate;
      const freq = 800 - 400 * t;
      channelData[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-8 * t);
    }
    
    return audioBuffer;
  }

  // Generate all sounds
  const sounds = {
    hover: await generateHoverSound(),
    click: await generateClickSound(),
    success: await generateSuccessSound(),
    transition: await generateTransitionSound(),
  };

  // Convert and download sounds
  for (const [name, buffer] of Object.entries(sounds)) {
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.mp3`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Helper function to convert AudioBuffer to WAV format
function audioBufferToWav(buffer: AudioBuffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  
  const buffer32 = new Int32Array(44 + buffer.length * bytesPerSample);
  const view = new DataView(buffer32.buffer);
  
  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + buffer.length * bytesPerSample, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, format, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * blockAlign, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, blockAlign, true);
  /* bits per sample */
  view.setUint16(34, bitDepth, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, buffer.length * bytesPerSample, true);
  
  const samples = new Float32Array(buffer.length);
  buffer.copyFromChannel(samples, 0, 0);
  
  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    const sample = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
    offset += 2;
  }
  
  return buffer32;
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export { generateSounds };
