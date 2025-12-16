import Layout from '../../components/Layout/Layout';
import './LessonLayout.css';

function LessonLayout({ children, title }) {
  return (
    <Layout userType="Child">
      <div className="menu-container">
        <main id="menu">
          <ul>
            <li><a href="#">Self Care</a>
              <ul>
                <li><a href="#">Personal Hygiene</a>
                  <ul>
                    <li><a href="#">Washing Face</a></li>
                    <li><a href="#">Washing Hands</a></li>
                    <li><a href="#">Washing Feet</a></li>
                    <li><a href="#">Cutting Nails</a></li>
                    <li><a href="#">Brushing Hair</a></li>
                    <li><a href="#">Brushing Teeth</a></li>
                  </ul>
                </li>
                <li><a href="#">Healthy Diet</a></li>
                <li><a href="#">Healthy Habits</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#">Environmental Care</a>
              <ul>
                <li><a href="#">Helping Others</a></li>
                <li><a href="#">Garden Care</a></li>
                <li><a href="#">Animal Care</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#">Physical Development</a>
              <ul>
                <li><a href="#">Motor Skills</a></li>
                <li><a href="#">Brain&amp;Brain Coordination</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#">Personality Development</a>
              <ul>
                <li><a href="#">Communication</a></li>
                <li><a href="#">Self-Analysis</a></li>
                <li><a href="#">Self-Development</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#">Intellectual Development</a>
              <ul>
                <li><a href="#">Math</a></li>
                <li><a href="#">Reading</a></li>
                <li><a href="#">Science</a></li>
              </ul>
            </li>
          </ul>
        </main>
      </div>

      <section>
        <h1>{title}</h1>
        {children}
      </section>
    </Layout>
  );
}

export default LessonLayout;
