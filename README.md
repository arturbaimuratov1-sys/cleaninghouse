# HappyHome Clean — демо-лендинг (по мотивам Clearhaus)

Вымышленный бренд клининга в Актобе. Русский язык. Единственный путь обращения — WhatsApp.
Статический сайт без сборки: `index.html` в корне — точка входа.

## Деплой на Cloudflare Pages (2 минуты)

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Import an existing Git repository**.
2. Выберите репозиторий `cleaninghouse` и нажмите **Begin setup**.
3. Настройки сборки:
   - **Framework preset:** `None`
   - **Build command:** оставить пустым
   - **Build output directory:** `/`
4. **Save and Deploy**. Через минуту сайт будет жить на `*.pages.dev`.

Файл `_headers` уже настроен: CSS/JS кэшируются сутки, HTML всегда свежий.
Свой домен подключается там же: Pages project → **Custom domains** → **Set up a custom domain**.

## Запуск (без сборки)

Вариант 1 — Python:

```bash
cd C:\3\happyhome-clean
python -m http.server 8090
# открыть http://localhost:8090/
```

Вариант 2 — Node:

```bash
cd C:\3\happyhome-clean
npx serve -l 8090 .
```

Вариант 3 — напрямую файл `index.html` в браузере (для быстрой проверки).

## Настройка WhatsApp

Файл `config.js`:

```js
window.HAPPYHOME_CONFIG = {
  WHATSAPP_NUMBER: "", // например "77001234567"
  DEFAULT_MESSAGE: "..."
};
```

- Номер пуст → все кнопки `Обсудить уборку` показывают сообщение:
  «Это демонстрационный сайт. WhatsApp будет подключён после согласования контакта.»
- Номер задан → открывается `https://wa.me/<номер>?text=<сообщение>`.
- Случайные номера не подставляются. Backend не нужен.

## Источник дизайна

- Шаблон: Clearhaus by baptiste.fort (Framer Marketplace)
  https://www.framer.com/marketplace/templates/clearhaus/
- Демо: https://fair-support-334488.framer.app/
- Исходники Clearhaus через MCP получить невозможно: это Framer-шаблон
  (Remix внутри Framer, без официального React/HTML-репо).
  Поиск выполнен в 21st.dev (`search`, запрос «Clearhaus» — релевантных нет)
  и Magic UI (`searchRegistryItems`, «Clearhaus»/«cleaning» — 0 результатов).
  Shadcn-реестры в проекте не настроены.
- Реализация собственная: `index.html` + `styles.css` + `app.js` + `config.js`.
  Сохранены: тёплый фон, тёмно-зелёный + лайм, hero «карточка + фото»,
  чередование светлых/тёмных секций, нумерованный список деталей 01–08,
  финальный тёмный CTA-блок. Убраны отзывы, рейтинги, счётчики, гарантии, цены.

## Фотографии (Pexels, бесплатная лицензия Pexels License)

1. Hero — женщина протирает кухонную столешницу — RDNE Stock project
   https://www.pexels.com/photo/a-woman-cleaning-a-kitchen-counter-5591909/ (id 5591909)
2. Поддерживающая уборка — мытьё пола в гостиной — Vitaly Gariev
   https://www.pexels.com/photo/woman-mopping-clean-modern-home-interior-36729566/ (id 36729566)
3. Генеральная — протирание кухни — RDNE Stock project
   https://www.pexels.com/photo/a-man-wiping-a-kitchen-counter-5591854/ (id 5591854)
4. Переезд — пустая светлая комната — Max Vakhtbovych
   https://www.pexels.com/photo/an-empty-room-8146213/ (id 8146213)
5. Что входит — уход за зеркалом — RDNE Stock project
   https://www.pexels.com/photo/a-woman-wiping-a-mirror-5591985/ (id 5591985)
6. Галерея: столовая — Max Vakhtbovych (7061333); зеркало/распылитель — RDNE (5591457);
   швабра на паркете — Liliana Drew (9462140); ручка шкафа — Liliana Drew (9462227)

Подписи о демонстрационном характере — под галереей и в подвале.
Загрузка: hero `fetchpriority=high`, остальные `loading=lazy`, `srcset`/`sizes`, alt на русском.

Видео не добавлялось: у Clearhaus нет видео-hero, это ухудшило бы загрузку.

## Шрифт

Manrope (Google Fonts) — кириллица поддерживается. Заголовки 800, tight tracking.

## Проверка

Playwright MCP: viewport 390×844, 768×1024, 1440×900 + 320px overflow,
мобильное меню, якоря, все CTA WhatsApp, FAQ, фокус, изображения, консоль,
reduced motion. Скриншоты — в `screenshots/`.
