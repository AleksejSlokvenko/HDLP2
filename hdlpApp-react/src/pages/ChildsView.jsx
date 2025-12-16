import Layout from '../components/Layout/Layout';
import LessonCard from '../components/Cards/LessonCard';
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
      <div className="menu-container">
        <main id="menu">
          <ul>
            <li><a href="#SelfCare">Self Care</a>
              <ul>
                <li><a href="#">Personal Hygiene</a>
                  <ul>
                    <li><a href="#">Washing Face</a></li>
                    <li><a href="/washing_hands">Washing Hands</a></li>
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
            <li><a href="#EnvironmentalCare">Environmental Care</a>
              <ul>
                <li><a href="#">Home Care</a>
                  <ul>
                    <li><a href="#">Bedroom</a>
                      <ul>
                        <li><a href="/making_bed">Making Bed</a></li>
                        <li><a href="#">Changing Bedding</a></li>
                        <li><a href="#">Organizing Clothes</a></li>
                        <li><a href="#">Organizing Toys</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Kitchen</a>
                      <ul>
                        <li><a href="#">Washing Dishes</a></li>
                        <li><a href="#">Sweeping Floor</a></li>
                        <li><a href="#">Washing Floor</a></li>
                        <li><a href="#">Cleaning Table</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><a href="#">Helping Others</a></li>
                <li><a href="#">Garden Care</a></li>
                <li><a href="#">Animal Care</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#PhysicalDevelopment">Physical Development</a>
              <ul>
                <li><a href="#">Motor Skills</a>
                  <ul>
                    <li><a href="#">Fine motor skills</a>
                      <ul>
                        <li><a href="/fine_gross_motor_skills">Exercise 1</a></li>
                        <li><a href="#">Exercise 2</a></li>
                        <li><a href="#">Exercise 3</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Gross Motor Skills</a>
                      <ul>
                        <li><a href="#">Exercise 1</a></li>
                        <li><a href="#">Exercise 2</a></li>
                        <li><a href="#">Exercise 3</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><a href="#">Brain&amp;Brain Coordination</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#PersonalityDevelopment">Personality Development</a>
              <ul>
                <li><a href="#">Communication</a>
                  <ul>
                    <li><a href="#">Interacting with Child</a>
                      <ul>
                        <li><a href="/making_friend">Making Friend</a></li>
                        <li><a href="#">Asking for Help</a></li>
                        <li><a href="#">Apologising</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Interacting with Adults</a>
                      <ul>
                        <li><a href="#">Seeking Attention</a></li>
                        <li><a href="#">Asking for Help</a></li>
                        <li><a href="#">Asking for Permission</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><a href="#">Self-Analysis</a></li>
                <li><a href="#">Self-Development</a></li>
              </ul>
            </li>
          </ul>
        </main>

        <main id="menu">
          <ul>
            <li><a href="#IntellectualDevelopment">Intellectual Development</a>
              <ul>
                <li><a href="#">Math</a>
                  <ul>
                    <li><a href="#">Addition</a>
                      <ul>
                        <li><a href="https://www.arcademics.com/games/jet-ski" target="_blank" rel="noopener noreferrer">JetSki Addition</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Subtractions</a></li>
                    <li><a href="#">Division</a></li>
                    <li><a href="#">Multiplication</a></li>
                    <li><a href="#">Fractions</a></li>
                  </ul>
                </li>
                <li><a href="#">Reading</a></li>
                <li><a href="#">Science</a></li>
              </ul>
            </li>
          </ul>
        </main>
      </div>

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
