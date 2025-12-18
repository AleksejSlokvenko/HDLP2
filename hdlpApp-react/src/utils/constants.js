export const MenuItems = {
  PARENTS_VIEW: [
    {
      label: "Planning Baby",
      submenu: [
        {
          label: "Getting ready",
          submenu: [{ label: "Safe House" }, { label: "Expenses" }],
        },
        { label: "Healthy Diet" },
        { label: "Healthy Habits" },
      ],
    },
    {
      label: "Newborn Baby",
      submenu: [
        { label: "Feeding" },
        { label: "Stretching" },
        {
          label: "Communication",
          submenu: [{ label: "Child's Language" }, { label: "Sign Language" }],
        },
        { label: "Bathing" },
      ],
    },
    { label: "Walking Baby" },
    { label: "Talking Child" },
    { label: "Reading Child" },
  ],
  CHILDS_VIEW: [
    {
      label: "Self Care",
      link: "#SelfCare",
      submenu: [
        {
          label: "Personal Hygiene",
          submenu: [
            { label: "Washing Face" },
            { label: "Washing Hands", link: "/washing_hands" },
            { label: "Washing Feet" },
            { label: "Cutting Nails" },
            { label: "Brushing Hair" },
            { label: "Brushing Teeth" },
          ],
        },
        { label: "Healthy Diet" },
        { label: "Healthy Habits" },
      ],
    },
    {
      label: "Environmental Care",
      link: "#EnvironmentalCare",
      submenu: [
        {
          label: "Home Care",
          submenu: [
            {
              label: "Bedroom",
              submenu: [
                { label: "Making Bed", link: "/making_bed" },
                { label: "Changing Bedding" },
                { label: "Organizing Clothes" },
                { label: "Organizing Toys" },
              ],
            },
            {
              label: "Kitchen",
              submenu: [
                { label: "Washing Dishes" },
                { label: "Sweeping Floor" },
                { label: "Washing Floor" },
                { label: "Cleaning Table" },
              ],
            },
          ],
        },
        { label: "Helping Others" },
        { label: "Garden Care" },
        { label: "Animal Care" },
      ],
    },
    {
      label: "Physical Development",
      link: "#PhysicalDevelopment",
      submenu: [
        {
          label: "Motor Skills",
          submenu: [
            {
              label: "Fine motor skills",
              submenu: [
                { label: "Exercise 1", link: "/fine_gross_motor_skills" },
                { label: "Exercise 2" },
                { label: "Exercise 3" },
              ],
            },
            {
              label: "Gross Motor Skills",
              submenu: [
                { label: "Exercise 1" },
                { label: "Exercise 2" },
                { label: "Exercise 3" },
              ],
            },
          ],
        },
        { label: "Brain&Brain Coordination" },
      ],
    },
    {
      label: "Personality Development",
      link: "#PersonalityDevelopment",
      submenu: [
        {
          label: "Communication",
          submenu: [
            {
              label: "Interacting with Child",
              submenu: [
                { label: "Making Friend", link: "/making_friend" },
                { label: "Asking for Help" },
                { label: "Apologising" },
              ],
            },
            {
              label: "Interacting with Adults",
              submenu: [
                { label: "Seeking Attention" },
                { label: "Asking for Help" },
                { label: "Asking for Permission" },
              ],
            },
          ],
        },
        { label: "Self-Analysis" },
        { label: "Self-Development" },
      ],
    },
    {
      label: "Intellectual Development",
      link: "#IntellectualDevelopment",
      submenu: [
        {
          label: "Math",
          submenu: [
            {
              label: "Addition",
              submenu: [
                {
                  label: "JetSki Addition",
                  link: "https://www.arcademics.com/games/jet-ski",
                  isExternal: true,
                },
              ],
            },
            { label: "Subtractions" },
            { label: "Division" },
            { label: "Multiplication" },
            { label: "Fractions" },
          ],
        },
        { label: "Reading" },
        { label: "Science" },
      ],
    },
  ],
};
