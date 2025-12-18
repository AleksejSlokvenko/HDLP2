import Layout from '../components/Layout/Layout';
import LessonCard from '../components/Cards/LessonCard';
import MenuContainer from '../components/Menu/MenuContainer';
import { MenuItems } from '../utils/constants';
import './ChildsView.css';

function ChildsView() {
  const selfCareLessons = [
    { image: '/img/website_images.jpg', title: 'Washing Hands', likes: 310, link: '/washing_hands' },
    { image: '/img/brushing_teeth.jpg', title: 'Brushing Teeth', likes: 1993, link: './' },
    { image: '/img/washing_face.jpg', title: 'Washing Face', likes: 887, link: './' },
    { image: '/img/brushing_hair.jpg', title: 'Brushing Hair', likes: 2512, link: './' },
    { image: '/img/cutting_nails.jpg', title: 'Cutting Nails', likes: 140, link: './' },
  ];

  const environmentalCareLessons = [
    { image: '/img/helping_others.jpg', title: 'Offering Help', likes: 310, link: './' },
    { image: '/img/helping_siblings.jpg', title: 'Helping Siblings', likes: 1993, link: './' },
    { image: '/img/helping_homework.jpg', title: 'Helping Homework', likes: 887, link: './' },
    { image: '/img/helping_grandparents.jpg', title: 'Helping Grandparents', likes: 2512, link: './' },
    { image: '/img/helping_community.jpg', title: 'Helping Community', likes: 140, link: './' },
    { image: '/img/planting_tress.jpg', title: 'Planting Trees', likes: 140, link: './' },
    { image: '/img/Making_my_bed_Moment_Pillow.jpg', title: 'Making Bed', likes: 1993, link: '/making_bed' },
  ];

  const physicalDevelopmentLessons = [
    { image: '/img/fine_motor_skills.jpg', title: 'Fine Motor Skills Ex.1', likes: 310, link: '/fine_gross_motor_skills' },
  ];

  const personalityDevelopmentLessons = [
    { image: '/img/making_a_friend_Moment_HighFive.jpg', title: 'Making Friends', likes: 310, link: '/making_friend' },
  ];

  const intellectualDevelopmentLessons = [
    { image: '/img/jetskiAddition.jpg', title: 'JetSki Addition', likes: 310, link: 'https://www.arcademics.com/games/jet-ski', isExternal: true },
  ];

  return (
    <Layout userType="Child">
      <MenuContainer menuItems={MenuItems.CHILDS_VIEW} />

      <section id="SelfCare">
        <h1>Self Care</h1>
        <div className="cards">
          {selfCareLessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>
      </section>

      <section className="section2" id="EnvironmentalCare">
        <h1>Environmental Care</h1>
        <div className="cards">
          {environmentalCareLessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>
      </section>

      <section className="section3" id="PhysicalDevelopment">
        <h1>Physical Development</h1>
        <div className="cards">
          {physicalDevelopmentLessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>
      </section>

      <section className="section4" id="PersonalityDevelopment">
        <h1>Personality Development</h1>
        <div className="cards">
          {personalityDevelopmentLessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>
      </section>

      <section className="section5" id="IntellectualDevelopment">
        <h1>Intellectual Development</h1>
        <div className="cards">
          {intellectualDevelopmentLessons.map((lesson, index) => (
            <LessonCard key={index} isExternal={lesson.isExternal} {...lesson} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default ChildsView;
