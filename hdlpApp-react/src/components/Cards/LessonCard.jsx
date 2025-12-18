import { Link } from 'react-router-dom';
import './LessonCard.css';

function LessonCard({ image, title, likes, link, isExternal = false }) {
  const ImageWrapper = isExternal ? 'a' : Link;
  const wrapperProps = isExternal ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : { to: link };

  return (
    <div className="card">
      <ImageWrapper {...wrapperProps}>
        <img className="card__image" src={image} alt={title} />
      </ImageWrapper>
      
      <div className="card__info">
        <div>
          <i className="material-icons">thumb_up</i>
          {likes}
        </div>
        <div>
          {isExternal ? (
            <a href={link} className="card__link" target="_blank" rel="noopener noreferrer">{title}</a>
          ) : (
            <Link to={link} className="card__link">{title}</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonCard;
