import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  action?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  action,
  as: Tag = 'h2'
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={`flex flex-col gap-6 ${
      align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`
      }>
      
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow &&
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.24em] ${
          dark ? 'text-accent-light' : 'text-accent'}`
          }>
          
            {eyebrow}
          </p>
        }
        <Tag
          className={`mt-3 font-display text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-white' : 'text-ink-900'}`
          }>
          
          {title}
        </Tag>
        {description &&
        <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-steel-300' : 'text-steel-600'}`}>
            {description}
          </p>
        }
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}