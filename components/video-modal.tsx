"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoUrl?: string; // YouTube ID or direct link
}

export default function VideoModal({ isOpen, onClose, videoTitle, videoUrl }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1.5;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  // Check if it is a youtube video or standard
  const isYouTube = videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"));
  const embedUrl = isYouTube 
    ? `https://www.youtube.com/embed/${videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}` 
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 flex flex-col z-10">
        
        {/* Header Overlay */}
        <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between z-20">
          <h3 className="text-white font-medium text-sm md:text-base tracking-wide drop-shadow-md">
            {videoTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="flex-1 w-full max-h-[80vh] relative flex items-center justify-center bg-zinc-950 p-2 sm:p-4">
          {embedUrl ? (
            <iframe
              className="w-full h-full min-h-[350px] sm:min-h-[500px]"
              src={embedUrl}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : videoUrl ? (
            <div className={`relative flex items-center justify-center overflow-hidden rounded-lg ${
              videoUrl.toUpperCase().endsWith(".MOV") ? "h-[75vh] aspect-[9/16]" : "w-full max-h-[78vh]"
            }`}>
              {videoUrl.toUpperCase().endsWith(".MOV") ? (
                <div className="absolute top-1/2 left-1/2 w-[177.78%] h-[56.25%] -translate-x-1/2 -translate-y-1/2 -rotate-90">
                  <video
                    ref={(el) => {
                      if (el && isOpen) {
                        el.play().catch(() => {});
                      }
                    }}
                    className="w-full h-full object-cover rounded-lg"
                    src={videoUrl}
                    autoPlay
                    controls
                    playsInline
                  />
                </div>
              ) : (
                <video
                  ref={(el) => {
                    if (el && isOpen) {
                      el.play().catch(() => {});
                    }
                  }}
                  className="w-full max-h-[78vh] object-contain rounded-lg"
                  src={videoUrl}
                  autoPlay
                  controls
                  playsInline
                />
              )}
            </div>
          ) : (
            // Simulated Player Screen
            <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
              {/* Animated abstract farm/churning visual to represent pure ghee process */}
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-40">
                <div className="w-96 h-96 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />
                <div className="w-80 h-80 rounded-full bg-sky-500/20 blur-3xl animate-pulse delay-700" />
              </div>

              <div className="z-10 text-center space-y-4 max-w-md">
                {/* Custom animation of dairy churning */}
                <div className="flex justify-center items-center gap-3">
                  <div className={`w-3.5 h-16 bg-amber-400 rounded-full ${isPlaying ? "animate-bounce" : ""}`} />
                  <div className={`w-3.5 h-20 bg-amber-300 rounded-full ${isPlaying ? "animate-bounce delay-150" : ""}`} />
                  <div className={`w-3.5 h-24 bg-amber-500 rounded-full ${isPlaying ? "animate-bounce delay-300" : ""}`} />
                  <div className={`w-3.5 h-20 bg-sky-300 rounded-full ${isPlaying ? "animate-bounce delay-450" : ""}`} />
                  <div className={`w-3.5 h-16 bg-sky-400 rounded-full ${isPlaying ? "animate-bounce delay-600" : ""}`} />
                </div>
                
                <h4 className="text-zinc-400 text-sm font-medium tracking-wide">
                  {isPlaying ? "Streaming Process Video..." : "Video Paused"}
                </h4>
                <p className="text-zinc-500 text-xs px-6">
                  Experience standard organic churning methods. Handcrafted by Dadi Kamlesh Gurjari at Greater Noida.
                </p>
              </div>

              {/* Simulated video controls overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-16 z-20 space-y-3">
                {/* Progress bar */}
                <div 
                  className="w-full h-1 bg-zinc-700 rounded-full cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}
                >
                  <div 
                    className="h-full bg-sky-500 transition-all duration-350" 
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white/95 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 hover:text-sky-400 transition"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setProgress(0)}
                      className="p-1 hover:text-sky-400 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span>
                      {Math.floor((progress / 100) * 45)}s / 45s
                    </span>
                  </div>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-sky-400 transition flex items-center gap-1.5"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4" /> <span>Muted</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" /> <span>Volume ON</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
