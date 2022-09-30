const getUid = () =>
  'id' + Date.now().toString(36) + Math.random().toString(36).substr(2);

export const placesTbilisi = [
  {
    id: 'Ori Suli',
    name: 'Ori Suli',
    long: 44.789196,
    lat: 41.70724,
    city: {
      value: 'Tbilisi',
      country: 'Georgia',
    },
  },
  {
    id: 'Koshini Bar',
    name: 'Koshini Bar',
    long: 44.807142,
    lat: 41.688727,
    city: {
      value: 'Tbilisi',
      country: 'Georgia',
    },
  },
];

export const eventsTbilisi = [
  {
    id: getUid(),
    place: 'Ori Suli',
    name: 'Julia Duck DJ Playing',
    eventDate: '2022-09-25T03:24:00',
    type: 'exhibitions',
    price: 15.0,
    description: undefined,
    city: {
      value: 'Tbilisi',
      country: 'Georgia',
    },
  },
  {
    id: getUid(),
    place: 'Ori Suli',
    name: 'New Cider is coming this evening!',
    eventDate: '2022-09-08T19:30:00',
    type: 'parties',
    price: 20.0,
    description: undefined,
    city: {
      value: 'Tbilisi',
      country: 'Georgia',
    },
  },
  {
    id: getUid(),
    place: 'Koshini Bar',
    name: 'German Industrial Techno Evening',
    eventDate: '2022-09-08T19:30:00',
    type: 'exhibitions',
    price: 250.0,
    description:
      "My biggest love 'n friend DJ Dictator's death comes to us to make coolest techno evening in this city this week.",
    city: {
      value: 'Tbilisi',
      country: 'Georgia',
    },
  },
  {
    id: getUid(),
    isAccurateAddress: false,
    coordinates: '41.684524, 44.838258',
    name: 'КУЛИНАРНЫЙ КЛАСС КИТАЙСКОЙ КУХНИ',
    eventDate: '2022-09-18T19:30:00',
    type: 'lectures',
    price: 45.0,
    description: `В это воскресенье мы виртуально перенесёмся в Китай и  мы будем учиться готовить блюда китайской кухни вместе с Бао.

      Бао расскажет вам о китайской еде, научит вас Готовить базовые блюда китайской кухни и  научит есть палочками 🥢
      
      Вместе мы приготовим несколько блюд классической китайской кухни:
      
      - Китайскую Лапшу(жареный рис с овощами)
      - Джа доуфу пи (жареное Тофу)
      - Фансие Джаодан (жареные яйца с томатами)
      
      Приходите, будет вкусно😋
      
      В стоимость включены :
      - мастер класс 
      - все продукты 
      - ужин 
      - вино🍷В это воскресенье мы виртуально перенесёмся в Китай и  мы будем учиться готовить блюда китайской кухни вместе с Бао.

      Бао расскажет вам о китайской еде, научит вас Готовить базовые блюда китайской кухни и  научит есть палочками 🥢
      
      Вместе мы приготовим несколько блюд классической китайской кухни:
      
      - Китайскую Лапшу(жареный рис с овощами)
      - Джа доуфу пи (жареное Тофу)
      - Фансие Джаодан (жареные яйца с томатами)
      
      Приходите, будет вкусно😋
      
      В стоимость включены :
      - мастер класс 
      - все продукты 
      - ужин 
      - вино🍷
      
      💌Чтобы записаться на мероприятие пишите в телеграм @kristina_lao
      `,
    city: {
      value: 'Tbilisi',
      country: 'Georgia',
    },
  },
];

export const cities = [
  { value: 'Tbilisi', country: 'Georgia', id: 'Tbilisi' },
  { value: 'Moscow', country: 'Russia', id: 'Moscow' },
];
