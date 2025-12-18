import { useState, useRef, useEffect } from 'react';
import LessonLayout from './LessonLayout';

function MakingBed() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    const loadYouTubePlayer = () => {
      // Check if API is already loaded
      if (window.YT && window.YT.Player) {
        // API is already loaded, create player directly
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        playerRef.current = new window.YT.Player('player-making-bed', {
          height: '531',
          width: '940',
          videoId: 'uuZXbSSgbP0',
          playerVars: {
            autoplay: 1,
            rel: 0,
          },
        });
      } else {
        // Load YouTube IFrame API
        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
          playerRef.current = new window.YT.Player('player-making-bed', {
            height: '531',
            width: '940',
            videoId: 'uuZXbSSgbP0',
            playerVars: {
              autoplay: 1,
              rel: 0,
            },
          });
        };
      }
    };

    loadYouTubePlayer();

    return () => {
      // Cleanup player on unmount
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <LessonLayout title="Making Bed">
      <section>
        <h1>Making Bed</h1>
        <div id="player-making-bed"></div>
      </section>

      <section className="lesson-content">
        <div className="audio-section">
          <img src="/img/listen-1.jpg" width="10%" height="10%" alt="Listen" />
          
          <audio ref={audioRef} id="myAudio">
            <source src="/sounds/making_a_bed.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          
          <p>Click the buttons to play or pause the audio.</p>
          
          <button onClick={playAudio} type="button" className="audio-button">
            Play Audio
          </button>
          <button onClick={pauseAudio} type="button" className="audio-button">
            Pause Audio
          </button>
          
          <div className="lesson-instructions">
            <p>
              <br />How to Make Your Bed.<br />
              You've probably heard it from your mother a million times, but making your bed every morning is a must.<br />
              It makes the entire bedroom look neater and more organized, and It may be hard to believe, but making your bed everyday will actually boost your happiness levels!<br />
              First. Fix your Pillow. Make sure you give it a good shake!<br />
              Second. Straighten a blanket. Take your time. One step at a time! Start from any corner and continue clockwise until you are done.<br />
              Awesome job!<br />
              Now let's get washed up!<br />
            </p>
          </div>
        </div>
      </section>
    </LessonLayout>
  );
}

export default MakingBed;
