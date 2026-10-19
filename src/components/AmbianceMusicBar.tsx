import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface AmbianceMusicBarProps {
  language: Language;
}

export const AmbianceMusicBar: React.FC<AmbianceMusicBarProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [useFallbackSynth, setUseFallbackSynth] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Royalty-free ambient calm lounge audio streams
  const audioSources = [
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
  ];

  // Web Audio API ambient chime generator (ultra-reliable fallback that never fails)
  const startAmbientSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // Warm C major / A minor pentatonic

      const playChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        const targetVol = isMuted ? 0 : volume * 0.15;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(targetVol, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 6.0);
      };

      // Play initial chord notes
      playChime();
      setTimeout(playChime, 800);
      setTimeout(playChime, 1800);

      // Repeat soothing chimes gently
      synthIntervalRef.current = window.setInterval(playChime, 2500);
    } catch {
      // Audio context suppressed
    }
  };

  const stopAmbientSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      if (audioRef.current && !useFallbackSynth) {
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If external stream fails or is blocked by CORS/sandbox, switch gracefully to ambient synth!
            setUseFallbackSynth(true);
            startAmbientSynth();
            setIsPlaying(true);
          });
      } else {
        startAmbientSynth();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopAmbientSynth();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  return (
    <div
      className={`fixed top-24 ${isAr ? 'left-4' : 'right-4'} z-40 flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full bg-[#111111]/90 border border-[#d4af37]/40 shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all text-xs`}
    >
      <audio
        ref={audioRef}
        loop
        preload="none"
        src={audioSources[0]}
        onError={() => {
          setUseFallbackSynth(true);
        }}
      />

      {/* Music Icon & Label */}
      <div className="flex items-center gap-1.5 text-[#d4af37]">
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span className="hidden sm:inline font-semibold text-white tracking-wider text-[11px]">
          {isAr ? 'أجواء فخمة' : 'Royal Lounge'}
        </span>
      </div>

      {/* Sound Visualizer Equalizer Bar (when playing) */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-3 px-1">
          <span className="w-0.5 bg-[#d4af37] h-2 animate-pulse" />
          <span className="w-0.5 bg-[#d4af37] h-3 animate-ping duration-700" />
          <span className="w-0.5 bg-[#d4af37] h-1.5 animate-pulse duration-500" />
        </div>
      )}

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88c22] text-black font-bold text-[11px] flex items-center gap-1 hover:brightness-110 transition-all cursor-pointer shadow-sm"
        title={isPlaying ? (isAr ? 'إيقاف الموسيقى' : 'Pause Music') : (isAr ? 'تشغيل الموسيقى' : 'Play Music')}
      >
        {isPlaying ? (
          <>
            <Pause className="w-3 h-3 fill-current" />
            <span className="hidden md:inline">{isAr ? 'إيقاف' : 'Pause'}</span>
          </>
        ) : (
          <>
            <Play className="w-3 h-3 fill-current" />
            <span>{isAr ? 'تشغيل' : 'Play'}</span>
          </>
        )}
      </button>

      {/* Volume Button */}
      <button
        onClick={toggleMute}
        className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
        title={isMuted ? (isAr ? 'كتم الصوت' : 'Unmute') : (isAr ? 'صامت' : 'Mute')}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
        )}
      </button>

      {/* Slim Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="w-12 h-1 bg-neutral-700 accent-[#d4af37] rounded-lg cursor-pointer hidden md:inline-block"
      />
    </div>
  );
};
