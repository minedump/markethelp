/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт: сборка кладёт готовые html в out/ — их и
  // забирает обычный хостинг, серверная часть сайту не нужна.
  output: 'export',
  // Адреса со слешем на конце: nginx отдаёт страницу как папку с
  // index.html, и ссылка без слеша не превращается в редирект.
  trailingSlash: true,
  // В статике оптимизатор картинок не работает — отдаём как есть,
  // поэтому все фото кладём уже пережатыми.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
