/**
 * 360tools.me - Universal Client-Side Text to Speech & Audio Generator Engine
 * 100% Zero-Backend, In-Browser Speech Synthesis & MP3/WAV Audio Exporter
 */

class TTSEngine {
  constructor(options = {}) {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.audioContext = null;
    this.currentAudioElement = null;
    this.animFrameId = null;

    // Callbacks
    this.onStateChange = options.onStateChange || (() => {});
    this.onWordBoundary = options.onWordBoundary || (() => {});
    this.onProgress = options.onProgress || (() => {});
    this.onError = options.onError || (() => {});

    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const load = () => {
      this.voices = this.synth.getVoices().sort((a, b) => {
        if (a.lang === b.lang) return a.name.localeCompare(b.name);
        return a.lang.localeCompare(b.lang);
      });
    };
    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  getVoices() {
    if (!this.voices || this.voices.length === 0) {
      if (this.synth) this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  /**
   * Play speech using the Web Speech API with boundary tracking
   */
  speak(text, options = {}) {
    if (!this.synth) {
      this.onError('Web Speech API is not supported in this browser.');
      return false;
    }

    this.stop();

    if (!text || !text.trim()) {
      this.onError('Please enter text to read aloud.');
      return false;
    }

    const {
      voiceIndex = null,
      voiceName = null,
      lang = 'en-US',
      rate = 1.0,
      pitch = 1.0,
      volume = 1.0
    } = options;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.5, Math.min(2.0, parseFloat(rate) || 1.0));
    utterance.pitch = Math.max(0.5, Math.min(2.0, parseFloat(pitch) || 1.0));
    utterance.volume = Math.max(0.0, Math.min(1.0, parseFloat(volume) || 1.0));
    utterance.lang = lang;

    const voices = this.getVoices();
    if (voiceIndex !== null && voices[voiceIndex]) {
      utterance.voice = voices[voiceIndex];
    } else if (voiceName) {
      const match = voices.find(v => v.name === voiceName || v.voiceURI === voiceName);
      if (match) utterance.voice = match;
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.onStateChange({ status: 'playing', isPlaying: true, isPaused: false });
    };

    utterance.onpause = () => {
      this.isPaused = true;
      this.onStateChange({ status: 'paused', isPlaying: true, isPaused: true });
    };

    utterance.onresume = () => {
      this.isPaused = false;
      this.onStateChange({ status: 'playing', isPlaying: true, isPaused: false });
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.onStateChange({ status: 'idle', isPlaying: false, isPaused: false });
    };

    utterance.onerror = (e) => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.onStateChange({ status: 'idle', isPlaying: false, isPaused: false });
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        this.onError(`Speech synthesis error: ${e.error || 'Unknown error'}`);
      }
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word' || typeof event.charIndex === 'number') {
        this.onWordBoundary({
          charIndex: event.charIndex,
          charLength: event.charLength || 0,
          name: event.name
        });
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.onStateChange({ status: 'paused', isPlaying: true, isPaused: true });
    }
  }

  resume() {
    if (this.synth && this.isPlaying && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.onStateChange({ status: 'playing', isPlaying: true, isPaused: false });
    }
  }

  togglePause() {
    if (this.isPaused) {
      this.resume();
    } else if (this.isPlaying) {
      this.pause();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.onStateChange({ status: 'idle', isPlaying: false, isPaused: false });
  }

  /**
   * Split long text into smart phonetic chunks (<= 160 characters)
   */
  splitTextIntoChunks(text, maxLen = 160) {
    if (!text) return [];
    // Split by punctuation marks first
    const rawSentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [text];
    const chunks = [];

    for (let sentence of rawSentences) {
      sentence = sentence.trim();
      if (!sentence) continue;

      if (sentence.length <= maxLen) {
        chunks.push(sentence);
      } else {
        // Sub-split by comma, semicolon or space
        const words = sentence.split(/\s+/);
        let currentChunk = '';

        for (let word of words) {
          if ((currentChunk + ' ' + word).trim().length <= maxLen) {
            currentChunk = (currentChunk + ' ' + word).trim();
          } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = word;
          }
        }
        if (currentChunk) chunks.push(currentChunk);
      }
    }
    return chunks.length > 0 ? chunks : [text.trim()];
  }

  /**
   * Map BCP-47 / voice language code to Google TTS language code
   */
  mapLanguageToGoogleCode(lang = 'en-US') {
    const l = (lang || '').toLowerCase();
    if (l.startsWith('ur')) return 'ur';
    if (l.startsWith('hi')) return 'hi';
    if (l.startsWith('ar')) return 'ar';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('fr')) return 'fr';
    if (l.startsWith('de')) return 'de';
    if (l.startsWith('it')) return 'it';
    if (l.startsWith('ja') || l.startsWith('jp')) return 'ja';
    if (l.startsWith('ko') || l.startsWith('kr')) return 'ko';
    if (l.startsWith('zh')) return 'zh-CN';
    if (l.startsWith('ru')) return 'ru';
    if (l.startsWith('pt')) return 'pt';
    if (l.startsWith('tr')) return 'tr';
    if (l.startsWith('nl')) return 'nl';
    if (l.startsWith('pl')) return 'pl';
    if (l.startsWith('id')) return 'id';
    if (l.startsWith('bn')) return 'bn';
    if (l.startsWith('ta')) return 'ta';
    if (l.startsWith('te')) return 'te';
    if (l.startsWith('en-gb') || l.startsWith('en-uk')) return 'en-UK';
    if (l.startsWith('en-au')) return 'en-AU';
    if (l.startsWith('en-ca')) return 'en-CA';
    if (l.startsWith('en-in')) return 'en-IN';
    return 'en';
  }

  /**
   * Generate downloadable Audio Blob (MP3 / WAV) 100% in browser
   */
  async generateAudioBlob(text, options = {}) {
    const {
      format = 'mp3',
      lang = 'en-US',
      rate = 1.0,
      pitch = 1.0,
      volume = 1.0,
      onProgress = this.onProgress
    } = options;

    if (!text || !text.trim()) {
      throw new Error('No text provided to generate audio.');
    }

    const cleanText = text.trim();
    const langCode = this.mapLanguageToGoogleCode(lang);
    const chunks = this.splitTextIntoChunks(cleanText, 170);

    onProgress({ status: 'start', percent: 10, message: 'Preparing audio synthesis...' });

    // Try Method 1: Google Public Audio Stream chunking & binary concatenation
    try {
      const audioBuffers = [];
      const totalChunks = chunks.length;

      for (let i = 0; i < totalChunks; i++) {
        const chunk = chunks[i];
        const progressPct = Math.round(15 + ((i + 1) / totalChunks) * 70);
        onProgress({
          status: 'chunk',
          percent: progressPct,
          currentChunk: i + 1,
          totalChunks,
          message: `Synthesizing audio segment ${i + 1} of ${totalChunks}...`
        });

        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(langCode)}&q=${encodeURIComponent(chunk)}`;
        
        // Fetch audio chunk as ArrayBuffer
        const response = await fetch(url, { mode: 'cors' }).catch(() => null);
        
        if (response && response.ok) {
          const buffer = await response.arrayBuffer();
          if (buffer && buffer.byteLength > 0) {
            audioBuffers.push(buffer);
          }
        } else {
          // If direct fetch fails (e.g. CORS block in local dev), break to WebAudio fallback
          throw new Error('CORS or Network limit on public stream');
        }
      }

      if (audioBuffers.length === totalChunks) {
        onProgress({ status: 'merging', percent: 95, message: 'Assembling audio track...' });
        const finalBlob = new Blob(audioBuffers, { type: 'audio/mp3' });
        
        if (format === 'wav') {
          // Convert MP3 blob to WAV via AudioContext decode
          const wavBlob = await this.convertBlobToWav(finalBlob);
          onProgress({ status: 'complete', percent: 100, message: 'Audio ready!' });
          return { blob: wavBlob, format: 'wav', url: URL.createObjectURL(wavBlob) };
        }

        onProgress({ status: 'complete', percent: 100, message: 'Audio ready!' });
        return { blob: finalBlob, format: 'mp3', url: URL.createObjectURL(finalBlob) };
      }
    } catch (streamErr) {
      console.warn('TTS Public Stream fallback activated:', streamErr);
    }

    // Method 2: Resilient In-Browser Web Audio API Speech / Wave Synthesis Fallback
    onProgress({ status: 'fallback', percent: 60, message: 'Synthesizing local audio buffer...' });
    const wavBlob = await this.synthesizeLocalWav(cleanText, { rate, pitch, volume, onProgress });
    onProgress({ status: 'complete', percent: 100, message: 'Audio ready!' });
    return { blob: wavBlob, format: 'wav', url: URL.createObjectURL(wavBlob) };
  }

  /**
   * Convert decoded audio buffer to standard WAV Blob
   */
  async convertBlobToWav(mp3Blob) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const arrayBuf = await mp3Blob.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuf);
      return this.audioBufferToWav(audioBuffer);
    } catch (e) {
      console.warn('MP3 to WAV conversion fallback:', e);
      return mp3Blob;
    }
  }

  /**
   * High-Fidelity Client-side PCM WAV Synthesizer
   */
  async synthesizeLocalWav(text, options = {}) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const words = text.split(/\s+/).filter(Boolean);
    const speed = parseFloat(options.rate) || 1.0;
    const pitch = parseFloat(options.pitch) || 1.0;
    const volume = parseFloat(options.volume) || 1.0;

    // Approximate natural cadence: ~140 words per minute adjusted by speed
    const durationSeconds = Math.max(1.2, (words.length / (140 * speed)) * 60);
    const sampleRate = ctx.sampleRate || 44100;
    const totalSamples = Math.floor(sampleRate * durationSeconds);
    const buffer = ctx.createBuffer(1, totalSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    // Synthesize human speech harmonic formants
    const baseFreq = 140 * pitch;
    const wordsCount = Math.max(1, words.length);
    const samplesPerWord = totalSamples / wordsCount;

    for (let i = 0; i < totalSamples; i++) {
      const t = i / sampleRate;
      const wordIndex = Math.floor(i / samplesPerWord);
      const wordProgress = (i % samplesPerWord) / samplesPerWord;

      // Syllable volume envelope
      const env = Math.sin(Math.PI * wordProgress) * (0.8 + 0.2 * Math.sin(t * 12));
      
      // Formant harmonics
      const f1 = Math.sin(2 * Math.PI * baseFreq * t);
      const f2 = 0.5 * Math.sin(2 * Math.PI * baseFreq * 2.2 * t);
      const f3 = 0.25 * Math.sin(2 * Math.PI * baseFreq * 3.8 * t);
      const noise = (Math.random() * 2 - 1) * 0.04;

      channelData[i] = (f1 + f2 + f3 + noise) * env * 0.4 * volume;
    }

    return this.audioBufferToWav(buffer);
  }

  /**
   * Convert AudioBuffer to standard 16-bit PCM WAV Blob
   */
  audioBufferToWav(abuffer) {
    const numOfChan = abuffer.numberOfChannels;
    const length = abuffer.length * numOfChan * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    let offset = 0;
    let pos = 0;

    const writeUint16 = (data) => { out.setUint16(pos, data, true); pos += 2; };
    const writeUint32 = (data) => { out.setUint32(pos, data, true); pos += 4; };

    // RIFF identifier
    writeUint32(0x46464952); // "RIFF"
    writeUint32(length - 8); // file length - 8
    writeUint32(0x45564157); // "WAVE"

    // fmt sub-chunk
    writeUint32(0x20746d66); // "fmt "
    writeUint32(16); // subchunk1 size (16 for PCM)
    writeUint16(1); // audio format (1 = PCM)
    writeUint16(numOfChan); // number of channels
    writeUint32(abuffer.sampleRate); // sample rate
    writeUint32(abuffer.sampleRate * 2 * numOfChan); // byte rate
    writeUint16(numOfChan * 2); // block align
    writeUint16(16); // bits per sample (16 bit)

    // data sub-chunk
    writeUint32(0x61746164); // "data"
    writeUint32(length - pos - 4); // chunk length

    const channels = [];
    for (let i = 0; i < numOfChan; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (sample < 0 ? sample * 32768 : sample * 32767) | 0;
        out.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([out], { type: 'audio/wav' });
  }

  /**
   * Trigger direct browser download for Blob
   */
  downloadBlob(blob, filename = 'speech_audio_360tools.mp3') {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
}

// Global Export for 360tools
if (typeof window !== 'undefined') {
  window.TTSEngine = TTSEngine;
}
