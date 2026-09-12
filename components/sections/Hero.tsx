import Image from 'next/image';
import Link from 'next/link';

import type { HeroSection } from '@/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface HeroProps {
  data: HeroSection;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Hero({ data }: HeroProps) {
  const {
    media,
    eyebrow,
    headline,
    subcopy,
    ctas,
    align = 'left',
    overlayOpacity = 0.45,
  } = data;

  const isVideo = media.type === 'video';

  return (
    <section
      className={`hero ${align === 'center' ? 'hero--center' : ''}`}
      aria-label={headline}
    >
      {/* ---- Background media ---- */}
      <div className="hero__media" aria-hidden="true">
        {isVideo ? (
          <HeroVideo media={media} />
        ) : (
          <HeroImage media={media} />
        )}
      </div>

      {/* ---- Gradient overlay ---- */}
      <div
        className="hero__overlay"
        style={{
          '--hero-overlay-opacity': overlayOpacity,
        } as React.CSSProperties}
      />

      {/* ---- Content ---- */}
      <div className="hero__content">
        <div className="hero__text">
          {eyebrow && (
            <p className="hero__eyebrow">{eyebrow}</p>
          )}

          <h1 className="hero__headline">{headline}</h1>

          {subcopy && (
            <p className="hero__subcopy">{subcopy}</p>
          )}

          {ctas.length > 0 && (
            <div className="hero__ctas">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={`hero__cta hero__cta--${cta.variant}`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function HeroImage({ media }: { media: HeroSection['media'] }) {
  return (
    <>
      {/* Desktop image */}
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="100vw"
        preload
        className="hero__img hero__img--desktop"
        style={{ objectFit: 'cover' }}
      />

      {/* Mobile image (if separate crop provided) */}
      {media.mobileSrc && (
        <Image
          src={media.mobileSrc}
          alt={media.alt}
          fill
          sizes="100vw"
          preload
          className="hero__img hero__img--mobile"
          style={{ objectFit: 'cover' }}
        />
      )}
    </>
  );
}

function HeroVideo({ media }: { media: HeroSection['media'] }) {
  return (
    <>
      {/* Poster image for reduced-motion and pre-play */}
      {media.poster && (
        <Image
          src={media.poster}
          alt={media.alt}
          fill
          sizes="100vw"
          preload
          className="hero__img hero__poster"
          style={{ objectFit: 'cover' }}
        />
      )}

      {/* Desktop video */}
      <video
        className="hero__video hero__video--desktop"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.poster || undefined}
      >
        <source src={media.src} type="video/mp4" />
      </video>

      {/* Mobile video (if separate crop provided) */}
      {media.mobileSrc && (
        <video
          className="hero__video hero__video--mobile"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster || undefined}
        >
          <source src={media.mobileSrc} type="video/mp4" />
        </video>
      )}
    </>
  );
}
