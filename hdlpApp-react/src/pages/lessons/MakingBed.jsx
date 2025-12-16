import LessonLayout from './LessonLayout';

function MakingBed() {
  return (
    <LessonLayout title="Making Bed">
      <div id="player"></div>
      {/* Video player can be added here */}
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <p className="lead">Watch this video and follow simple steps.</p>
        <video width="75%" controls>
          <source src="/video/Making_my_bed.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </LessonLayout>
  );
}

export default MakingBed;
