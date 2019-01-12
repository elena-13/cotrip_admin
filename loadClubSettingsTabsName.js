const initialState = {
  data: {
    main_info_tab: 'Основные данные',
    photo_tab: 'Фото',
    video_tab: 'Видео',
    additional_sections_tab: 'Доп. разделы',
    location_tab: 'Расположение',
    photo_report_tab: 'Фото-отчеты',
    about_tab: 'О нас',
    social_tab: 'Соц-сети',
    events_tab: 'Мероприятия',
    domains_tab: 'Домены',
    participants_tab: 'Члены клуба',
    seo_tab: 'SEO',
    settings_tab: 'Настройки',
  },
};

export default function loadClubSettingsTabsName(state = initialState, action) {
  return initialState;
}
