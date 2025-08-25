import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
const CustomVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowButton(false);
      setVideoEnded(false);
    }
  };

  const handleRestartClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
      setIsPlaying(true);
      setShowButton(false);
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Prevent all pause attempts once playing
    const preventPause = (e: Event) => {
      if (isPlaying) {
        e.preventDefault();
        e.stopPropagation();
        if (video.paused) {
          video.play();
        }
      }
    };

    // Prevent keyboard controls
    const preventKeyboard = (e: KeyboardEvent) => {
      if (isPlaying) {
        // Prevent spacebar, K, arrow keys, etc.
        if (e.code === 'Space' || e.code === 'KeyK' || e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'KeyM' || e.code === 'KeyF' || e.code === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    // Prevent right-click context menu
    const preventContextMenu = (e: Event) => {
      if (isPlaying) {
        e.preventDefault();
      }
    };

    // Auto-resume if paused externally
    const handlePause = () => {
      if (isPlaying && video.paused) {
        setTimeout(() => {
          if (video.paused) {
            video.play();
          }
        }, 50);
      }
    };

    // Prevent seeking
    const handleSeeking = () => {
      if (isPlaying) {
        video.currentTime = video.currentTime;
      }
    };

    // Handle video end
    const handleVideoEnd = () => {
      setVideoEnded(true);
      setIsPlaying(false);
    };
    // Always listen for video end
    video.addEventListener('ended', handleVideoEnd);

    if (isPlaying) {
      // Add all event listeners to prevent control
      video.addEventListener('pause', handlePause);
      video.addEventListener('click', preventPause);
      video.addEventListener('contextmenu', preventContextMenu);
      video.addEventListener('seeking', handleSeeking);
      document.addEventListener('keydown', preventKeyboard, true);

      // Disable video controls completely
      video.controls = false;
      video.setAttribute('controlsList', 'nodownload noplaybackrate');
      video.setAttribute('disablePictureInPicture', 'true');
    }
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('click', preventPause);
      video.removeEventListener('contextmenu', preventContextMenu);
      video.removeEventListener('seeking', handleSeeking);
      document.removeEventListener('keydown', preventKeyboard, true);
    };
  }, [isPlaying]);
  return <section className="py-12 sm:py-16 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 gradient-text">
            Assista este vídeo para saber o que nosso<br />
            sistema oferece para nossos clientes
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Decorative border/frame */}
          <div className="relative p-2 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 rounded-2xl shadow-2xl">
            <div className="relative bg-background/90 rounded-xl overflow-hidden">
              <video ref={videoRef} className="w-full h-auto aspect-video bg-black rounded-xl" preload="metadata" playsInline webkit-playsinline="true" controls={false} controlsList="nodownload noplaybackrate" disablePictureInPicture onContextMenu={e => isPlaying && e.preventDefault()} style={{
              pointerEvents: isPlaying ? 'none' : 'auto'
            }}>
                {/* Test video - replace with your actual video */}
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>

              {/* Custom play button overlay */}
              {showButton && <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                  <Button onClick={handlePlayClick} className="hero-button text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Play className="w-6 h-6 mr-3 fill-current" />
                    Assistir agora
                  </Button>
                </div>}

              {/* Video ended restart message */}
              {videoEnded && <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                  <Button onClick={handleRestartClick} className="hero-button text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Play className="w-6 h-6 mr-3 fill-current" />
                    Se deseja assistir novamente, pressione aqui!
                  </Button>
                </div>}

              {/* Video playing overlay to prevent interaction */}
              {isPlaying && !videoEnded && <div className="absolute inset-0 bg-transparent rounded-xl" />}
            </div>
          </div>

          {/* Info text below video */}
          
        </div>
      </div>
    </section>;
};
export default CustomVideoPlayer;