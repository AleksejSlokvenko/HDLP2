import './Footer.css';

function Footer() {
  return (
    <>
      <footer className="footer1">
        <div className="copyright">
          <small className="d-block mb-3 text-muted">Human Development and Learning Platform &copy;2020</small>
        </div>
      </footer>
        
      <footer className="footer_content">
        <div className="footer_links">
          <div>
            <h5>Friends</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="https://halcyonhouse.org/incubator" target="_blank" rel="noopener noreferrer">Halcyon Incubator</a></li>
              <li><a className="text-muted" href="https://edlazarchuk.com/" target="_blank" rel="noopener noreferrer">Ed Lazarchuk</a></li>
            </ul>
          </div>

          <div>
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">w3scools</a></li>
              <li><a className="text-muted" href="#">Another resource</a></li>
              <li><a className="text-muted" href="#">Final resource</a></li>
            </ul>
          </div>

          <div>
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="#">Team</a></li>
              <li><a className="text-muted" href="#">Privacy</a></li>
              <li><a className="text-muted" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
