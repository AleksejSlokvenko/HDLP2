import Layout from '../components/Layout/Layout';
import LessonCard from '../components/Cards/LessonCard';
import './ParentsView.css';

function ParentsView() {
  const planningBabyLessons = [
    { image: '/img/power_outlet_not_safe.jpg', title: 'Safe House', likes: 310, link: './' },
    { image: '/img/baby_gear.jpg', title: 'Expenses', likes: 1993, link: './' },
    { image: '/img/healthy_diet_adult.jpg', title: 'Healthy Diet', likes: 887, link: './' },
    { image: '/img/toga_parent.jpg', title: 'Stretching', likes: 2512, link: './' },
  ];

  const newbornBabyLessons = [
    { image: '/img/feeding_baby.jpg', title: 'Feeding', likes: 310, link: './' },
    { image: '/img/newborn_exercises.jpg', title: 'Exercising', likes: 1993, link: './' },
    { image: '/img/child_language.jpg', title: 'Child Language', likes: 887, link: './' },
    { image: '/img/newboarn_bathing.jpg', title: 'Bathing', likes: 2512, link: './' },
  ];

  return (
    <Layout userType="Parent">
      <div className="menu-container">
        <main id="menu">
          <ul>
            <li><a href="#">Planning Baby</a>
              <ul>
                <li><a href="#">Getting ready</a>
                  <ul>
                    <li><a href="#">Safe House</a></li>
                    <li><a href="#">Expenses</a></li>
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
            <li><a href="#">Newborn Baby</a>
              <ul>
                <li><a href="#">Feeding</a></li>
                <li><a href="#">Stretching</a></li>
                <li><a href="#">Communication</a>
                  <ul>
                    <li><a href="#">Child's Language</a></li>
                    <li><a href="#">Sign Language</a></li>
                  </ul>
                </li>
                <li><a href="#">Bathing</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#">Walking Baby</a></li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#">Talking Child</a></li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#">Reading Child</a></li>
          </ul>
        </main>
      </div>

      <section>
        <h1>Planning Baby</h1>
        <div className="cards">
          {planningBabyLessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>
      </section>

      <section className="section2">
        <h2>Newborn Baby</h2>
        <div className="cards">
          {newbornBabyLessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default ParentsView;
