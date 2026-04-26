
import { useEffect, useRef, useState } from 'react';

function AudioPlayer({
  src,
  title = 'Listen carefully',
  description = 'Play the sound and choose the best answer.',
  accentClassName = 'from-indigo-500 to-sky-500'
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    // Debug: check src
    console.log("Audio src:", src);

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleError = () => {
      console.error("Audio failed to load. Check src:", src);
    };

    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('error', handleError);

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('error', handleError);
    };
  }, [src]);

  const toggleAudio = async () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    try {
      if (isPlaying) {
        audioElement.pause();
      } else {
        await audioElement.play();
      }
    } catch (err) {
      console.error("Audio play error:", err);
    }
  };

  return (
    <div className={`rounded-[2rem] bg-gradient-to-r ${accentClassName} p-[3px] shadow-lg`}>
      <div className="flex flex-col gap-4 rounded-[1.85rem] bg-white/95 p-5 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="space-y-1">
          <p className="text-sm font-black uppercase tracking-[0.26em] text-indigo-500">Audio</p>
          <h3 className="text-2xl font-black text-ink">{title}</h3>
          <p className="text-lg leading-8 text-slate-600">{description}</p>
        </div>

        <button
          className="inline-flex min-w-40 items-center justify-center rounded-full bg-indigo-500 px-6 py-4 text-xl font-black text-white shadow-lg transition hover:bg-indigo-600"
          onClick={toggleAudio}
          type="button"
        >
          {isPlaying ? 'Pause Audio' : 'Play Audio'}
        </button>

        {/* FIXED AUDIO ELEMENT */}
        <audio ref={audioRef}>
          {src && <source src={src} type="audio/mpeg" />}
          Your browser does not support the audio element.
        </audio>

      </div>
    </div>
  );
}

export default AudioPlayer;

