import Layout from '../../components/Layout/Layout';
import MenuContainer from '../../components/Menu/MenuContainer';
import './LessonLayout.css';

function LessonLayout({ children, title }) {
  const menuItems = [
    {
      label: 'Self Care',
      submenu: [
        {
          label: 'Personal Hygiene',
          submenu: [
            { label: 'Washing Face' },
            { label: 'Washing Hands' },
            { label: 'Washing Feet' },
            { label: 'Cutting Nails' },
            { label: 'Brushing Hair' },
            { label: 'Brushing Teeth' }
          ]
        },
        { label: 'Healthy Diet' },
        { label: 'Healthy Habits' }
      ]
    },
    {
      label: 'Environmental Care',
      submenu: [
        { label: 'Helping Others' },
        { label: 'Garden Care' },
        { label: 'Animal Care' }
      ]
    },
    {
      label: 'Physical Development',
      submenu: [
        { label: 'Motor Skills' },
        { label: 'Brain&Brain Coordination' }
      ]
    },
    {
      label: 'Personality Development',
      submenu: [
        { label: 'Communication' },
        { label: 'Self-Analysis' },
        { label: 'Self-Development' }
      ]
    },
    {
      label: 'Intellectual Development',
      submenu: [
        { label: 'Math' },
        { label: 'Reading' },
        { label: 'Science' }
      ]
    }
  ];

  return (
    <Layout userType="Child">
      <MenuContainer menuItems={menuItems} />

      <section>
        <h1>{title}</h1>
        {children}
      </section>
    </Layout>
  );
}

export default LessonLayout;
