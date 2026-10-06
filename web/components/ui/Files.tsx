'use client';

import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Загрузка файлов (.drop) и список прикреплённого (.files).
 * Прямо из брифа: «фото и ссылки на товар приветствуем»,
 * «приветствуем технические задания, с видео супер здорово».
 *
 * Прикреплённое показывается списком с размером и крестиком: иначе
 * человек не знает, что именно ушло, и прикрепляет второй раз.
 */
type Props = {
  title?: string;
  hint?: string;
  name?: string;
  accept?: string;
  onFiles?: (files: File[]) => void;
};

function size(bytes: number) {
  if (bytes < 1048576) return Math.round(bytes / 1024) + ' КБ';
  return (bytes / 1048576).toFixed(1).replace('.', ',') + ' МБ';
}

export function FileDrop({
  title = 'Прикрепите фото товара, ТЗ или прайс',
  hint = 'PDF, XLSX, JPG, MP4 — до 25 МБ',
  name,
  accept,
  onFiles,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const input = useRef<HTMLInputElement>(null);

  function pick(e: ChangeEvent<HTMLInputElement>) {
    const next = Array.from(e.target.files ?? []);
    setFiles(next);
    onFiles?.(next);
  }

  function drop(i: number) {
    const next = files.filter((_, k) => k !== i);
    setFiles(next);
    onFiles?.(next);
    /* в поле выбора файлов нельзя убрать одну запись — чистим целиком,
       иначе отправится то, что человек уже снял из списка */
    if (input.current) input.current.value = '';
  }

  return (
    <>
      <label className="drop">
        <Icon name="upload" size="lg" />
        <b className="drop-name">{title}</b>
        <small className="drop-hint">{hint}</small>
        <input ref={input} type="file" multiple name={name} accept={accept} onChange={pick} />
      </label>
      {files.length ? (
        <ul className="files">
          {files.map((f, i) => (
            <li key={f.name + i}>
              <Icon name="file" />
              <span className="name">{f.name}</span>
              <span className="size">{size(f.size)}</span>
              <button
                className="file-drop"
                type="button"
                aria-label="Убрать файл"
                onClick={() => drop(i)}
              >
                <Icon name="x" size="sm" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
