'use client';

import { useRef } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui';
import { asset } from '@/content/site';

/**
 * Слайдер-галерея фото (.photo-gallery). На телефоне листается пальцем,
 * как любая лента со снэп-прокруткой в ките; стрелки рядом — для мыши
 * и трекпада, которым свайп неудобен. Фото первых двух кадров грузятся
 * сразу, остальные — по приближении: лента длинная, и ждать всю сразу
 * незачем.
 */
export function PhotoGallery({
  photos,
}: {
  photos: readonly { pic: string; alt: string }[];
}) {
  const track = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    const step = slide ? slide.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  }

  return (
    <div>
      <div ref={track} className="photo-gallery">
        {photos.map((p, i) => (
          <img
            key={p.pic}
            src={asset(p.pic)}
            alt={p.alt}
            className="aspect-[3/2] object-cover rounded-card"
            loading={i < 2 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      <div className="hidden sm:flex justify-end gap-2 mt-4">
        <Button variant="secondary" size="sm" icon aria-label="Предыдущие фото" onClick={() => scroll(-1)}>
          <Icon name="arrow-left" />
        </Button>
        <Button variant="secondary" size="sm" icon aria-label="Следующие фото" onClick={() => scroll(1)}>
          <Icon name="arrow-right" />
        </Button>
      </div>
    </div>
  );
}
