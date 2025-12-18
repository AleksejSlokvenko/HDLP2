import { useState, useRef, useEffect } from 'react';
import LessonLayout from './LessonLayout';

function MakingFriend() {
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
        playerRef.current = new window.YT.Player('player-making-friend', {
          height: '531',
          width: '940',
          videoId: 'awvjBn8mE3A',
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
          playerRef.current = new window.YT.Player('player-making-friend', {
            height: '531',
            width: '940',
            videoId: 'awvjBn8mE3A',
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
    <LessonLayout title="Making a Friend">
      <section>
        <h1>Making a Friend</h1>
        <div id="player-making-friend"></div>
      </section>

      <section className="lesson-content">
        <div className="audio-section">
          <img src="/img/listen-1.jpg" width="10%" height="10%" alt="Listen" />
          
          <audio ref={audioRef} id="myAudio">
            <source src="/sounds/makingFriend.mp3" type="audio/mpeg" />
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
              <br />How to make a friend.<br />
              <br />
              1. Imagine making a new friend. Imagine the whole situation from start to finish in your thoughts: the way you will approach that person, the way you introduce yourself and start a conversation. Think what kind of conversation topics you have in common. Imagine having conversation and the way you say good bye.<br />
              2. Practice with people you know. Ask your relatives to simulate the situation.<br />
              3. Take the first step. Look for an eye contact, approach a person. Very important to make sure if a person willing to communicate. Ask if he has time, if he is not busy.<br />
              4. Introduce yourself. Ask if that person would like to become your friend.<br />
              5. Be open, be yourself, act the same way as you act with your relatives and friends.<br />
              6. Listen carefully! Don't interrupt! It is important to let person finish talking and then proceed with your own thoughts.<br />
              7. Get to know your friend, ask questions.<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What does he/she do?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What are his/her hobbies?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What has he/she been up to recently?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What are his/her upcoming priorities/goals?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What does he/she value the most?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What are his/her values?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What motivates/drives him/her?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;What are his/her passions in life? Goals? Dreams?<br />
              8. Thank your new friend for a great conversation. Let him/her know that you enjoyed it and would like to meet your new friend again in the future.<br />
              <br />
              9. Offer to stay in touch. Very important to ask if a person wants to exchange information. If person agrees then you may ask to exchange the contact information such as: telephone number, email, calling card. Remember! In some cultures calling cards accepted with both hands. Handshake or highfive each other and say goodbye!<br />
              10. After the conversation, think about it. Think what could be done better. That way you can improve your communication skills.<br />
              And remember! Stay positive!<br />
              Practice makes it perfect!<br />
              Good Luck!<br />
            </p>
          </div>
        </div>
      </section>
    </LessonLayout>
  );
}

export default MakingFriend;
