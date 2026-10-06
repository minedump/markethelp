'use client';

import type { ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui';
import { useRequest } from './RequestModal';

/**
 * Кнопка, открывающая окно заявки. Сама форма одна на сайт и живёт
 * в раскладке — кнопка только зовёт её.
 */
export function RequestButton({
  children,
  variant,
  size,
  className,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const open = useRequest();
  return (
    <Button variant={variant} size={size} className={className} onClick={open}>
      {children}
    </Button>
  );
}
