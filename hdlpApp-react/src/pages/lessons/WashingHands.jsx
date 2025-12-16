import { useEffect } from 'react';
import LessonLayout from './LessonLayout';

function WashingHands() {
  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('player', {
        height: '531',
        width: '940',
        videoId: 'T98gqC-yanU',
        playerVars: {
          autoplay: 1,
          rel: 0,
        },
      });
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  return (
    <LessonLayout title="Washing Hands">
      <section>
        <h1>Washing Hands</h1>
        <div id="player"></div>
      </section>
    </LessonLayout>
  );
}

export default WashingHands;
