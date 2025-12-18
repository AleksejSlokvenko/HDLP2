import { useEffect, useRef } from 'react';
import LessonLayout from './LessonLayout';

function WashingHands() {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadYouTubePlayer = () => {
      // Check if API is already loaded
      if (window.YT && window.YT.Player) {
        // API is already loaded, create player directly
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        playerRef.current = new window.YT.Player('player-washing-hands', {
          height: '531',
          width: '940',
          videoId: 'T98gqC-yanU',
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
          playerRef.current = new window.YT.Player('player-washing-hands', {
            height: '531',
            width: '940',
            videoId: 'T98gqC-yanU',
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

  return (
    <LessonLayout title="Washing Hands">
      <section>
        <h1>Washing Hands</h1>
        <div id="player-washing-hands"></div>
      </section>
    </LessonLayout>
  );
}

export default WashingHands;
