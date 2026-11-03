export interface Channel {
    id: number
    name: string
    topic: string
    subscribersCount: number
    averageReach: number
    adPrice: number
    coverUrl: string | null
    videoUrl: string | null
}

export const channels: Channel[] = [
    { id: 1, name: 'Код на прокачку', topic: 'Технологии', subscribersCount: 42800, averageReach: 12400,adPrice: 1500, coverUrl: 'cover1.jpg', videoUrl: 'video1.mp4' },
    { id: 2, name: 'Новости дня', topic: 'Новости', subscribersCount: 124000, averageReach: 38900,adPrice: 1900, coverUrl: 'cover2.jpg', videoUrl: 'video2.mp4' },
    { id: 3, name: 'Мемная берлога', topic: 'Юмор', subscribersCount: 27600, averageReach: 9200,adPrice: 2800, coverUrl: null, videoUrl: null },
    { id: 4, name: 'Бизнес без галстука', topic: 'Бизнес', subscribersCount: 18700, averageReach: 6400,adPrice: 1590, coverUrl: 'cover4.jpg', videoUrl: 'video4.mp4' },
    { id: 5, name: 'Путешествия из Химок', topic: 'Путешествия', subscribersCount: 9400, averageReach: 3100,adPrice: 100, coverUrl: null, videoUrl: null },
]