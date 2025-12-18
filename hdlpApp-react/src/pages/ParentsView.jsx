import Layout from '../components/Layout/Layout';
import LessonCard from '../components/Cards/LessonCard';
import MenuContainer from '../components/Menu/MenuContainer';
import { MenuItems } from '../utils/constants';
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
      <MenuContainer menuItems={MenuItems.PARENTS_VIEW} />

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
