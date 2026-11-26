export interface Channel {
  id: number;
  name: string;
  topic: string;
  subscribersCount: number;
  averageReach: number;
  adPrice: number;
  description: string;
  coverUrl?: string | null;
  videoUrl?: string | null;
}

export const channels: Channel[] = [
  {
    id: 1,
    name: 'Код на прокачку',
    topic: 'Технологии',
    subscribersCount: 42800,
    averageReach: 12400,
    adPrice: 1500,
    description:
      'Короткие разборы кода, новости из мира IT и полезные трюки для каждого кодера на каждый день. Практические советы, которые помогут быстрее писать чистый и эффективный код.',
    coverUrl: '/cover1.jpg',
    videoUrl: '/video1.mp4',
  },
  {
    id: 2,
    name: 'Новости дня',
    topic: 'Новости',
    subscribersCount: 124000,
    averageReach: 38900,
    adPrice: 1900,
    description:
      'Самые важные новости за день, кратко и по делу без воды. Следим за главными событиями в стране и мире, чтобы вы всегда были в курсе последних изменений.',
    coverUrl: '/cover2.jpg',
    videoUrl: '/video2.mp4',
  },
  {
    id: 3,
    name: 'Мемная берлога',
    topic: 'Юмор',
    subscribersCount: 27600,
    averageReach: 9200,
    adPrice: 2800,
    description:
      'Свежие мемы каждый час, поднимаем настроение после пар. Очень забавные картинки, жизненные ситуации и юмор, который точно заставит улыбнуться.',
    coverUrl: null,
    videoUrl: null,
  },
  {
    id: 4,
    name: 'Бизнес без галстука',
    topic: 'Бизнес',
    subscribersCount: 18700,
    averageReach: 6400,
    adPrice: 1590,
    description:
      'Реальные кейсы малого бизнеса, разборы маркетинговых фишек и рабочие схемы заработка. Делимся полезным опытом предпринимателей и проверенными инструментами для роста.',
    coverUrl: '/cover4.jpg',
    videoUrl: '/video4.mp4',
  },
  {
    id: 5,
    name: 'Путешествия из Химок',
    topic: 'Путешествия',
    subscribersCount: 9400,
    averageReach: 3100,
    adPrice: 100,
    description:
      'Бюджетные путешествия из России, проверенные маршруты и лайфхаки в поездках. Показываем, как интересно отдыхать, экономить деньги и открывать новые места.',
    coverUrl: null,
    videoUrl: null,
  },
];