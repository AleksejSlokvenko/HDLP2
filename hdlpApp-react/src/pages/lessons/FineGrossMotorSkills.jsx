import { useEffect } from 'react';
import LessonLayout from './LessonLayout';

function FineGrossMotorSkills() {
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
        videoId: 'yuVkkhpiHTA',
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
    <LessonLayout title="Fine and Gross Motor Skills">
      <section>
        <h1>Fine and Gross Motor Skills</h1>
        <div id="player"></div>
      </section>
    </LessonLayout>
  );
}

export default FineGrossMotorSkills;
