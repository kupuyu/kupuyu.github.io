import { useEffect, useRef } from 'react';
import ForestFoliageLayer from './ForestFoliage.jsx';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let running = false;
    let target = 0;
    let value = 0;

    const apply = (next) => {
      section.style.setProperty('--p', next.toFixed(4));
    };

    const measure = () => {
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      target = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range));
    };

    const tick = () => {
      frame = 0;
      const diff = target - value;

      if (Math.abs(diff) < 0.0006) {
        value = target;
      } else {
        value += diff * 0.14;
      }

      // Soft start/end makes the pinned scene feel less mechanical.
      apply(value * value * (3 - 2 * value));

      if (value !== target) {
        frame = window.requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (reduceMotion.matches) return;
      measure();
      if (!running) {
        running = true;
        frame = window.requestAnimationFrame(tick);
      }
    };

    const syncMotion = () => {
      if (reduceMotion.matches) {
        target = 0;
        value = 0;
        apply(0);
        return;
      }
      measure();
      value = target;
      apply(value * value * (3 - 2 * value));
    };

    syncMotion();
    window.addEventListener('scroll', start, { passive: true });
    window.addEventListener('resize', syncMotion);
    reduceMotion.addEventListener?.('change', syncMotion);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', start);
      window.removeEventListener('resize', syncMotion);
      reduceMotion.removeEventListener?.('change', syncMotion);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;

    const play = () => {
      if (reduceMotion.matches || document.hidden || !inView) return;
      const promise = video.play();
      if (promise) promise.catch(() => {});
    };

    const pause = () => video.pause();

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) play();
        else pause();
      },
      { threshold: 0.01 },
    );

    const syncPlayback = () => {
      if (document.hidden || reduceMotion.matches) pause();
      else play();
    };

    observer.observe(section);
    document.addEventListener('visibilitychange', syncPlayback);
    reduceMotion.addEventListener?.('change', syncPlayback);
    play();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      reduceMotion.removeEventListener?.('change', syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <section className="forest-hero" id="top" ref={sectionRef}>
      <div className="forest-hero__sticky">
        <div className="forest-hero__media">
          <video
            ref={videoRef}
            className="forest-hero__video"
            src="/videos/hero-water.mp4"
            poster="/images/generated/forest/hero-water-poster.jpg"
            width="1920"
            height="1080"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            disablePictureInPicture
            aria-hidden="true"
          />
          <div className="forest-hero__wash" aria-hidden="true" />
          <ForestFoliageLayer layer="canopy" />
          <ForestFoliageLayer layer="left" />
          <ForestFoliageLayer layer="right" />
          <ForestFoliageLayer layer="floor" />
          <div className="forest-hero__dust" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((item) => <i key={item} />)}
          </div>
        </div>

        <div className="container forest-hero__inner">
          <div className="forest-hero__copy">
            <p className="forest-hero__kicker">
              <span className="forest-hero__kicker-line" aria-hidden="true" />
              动画制作设计 · 个人作品集
              <i>PORTFOLIO / 2024—2027</i>
            </p>
            <h1 className="forest-hero__title">
              <span>把好奇</span>
              <span>做成看得见的</span>
              <span>形状<span className="forest-hero__dot" aria-hidden="true" /></span>
            </h1>
            <p className="forest-hero__sub">用层叠的纸，留住一帧会呼吸的画面。</p>
            <p className="forest-hero__sub-en">ANIMATION DESIGN · PENG YUKANG · 2024—2027</p>
          </div>
        </div>

        <div className="forest-hero__foot">
          <a className="forest-hero__scroll" href="#about" aria-label="向下滚动，走进森林">
            <span className="forest-hero__mouse" aria-hidden="true"><i /></span>
            <span>SCROLL</span>
            <small>让树叶让开</small>
          </a>
          <p className="forest-hero__meta">
            <span>ZHUHAI, CN</span>
            <span aria-hidden="true">/</span>
            <span>现开放实习机会</span>
          </p>
          <p className="forest-hero__note">
            <span>THE FOREST MOVES</span>
            <span aria-hidden="true">·</span>
            <span>树影向前，桥在林后</span>
          </p>
        </div>
      </div>
    </section>
  );
}
