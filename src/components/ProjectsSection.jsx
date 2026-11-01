import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { profile, projects } from '../data/content.js';
import { ArrowLeft, ArrowRight, ArrowUpRight, MailIcon } from './Icons.jsx';
import { CanopyEdge, LeafCluster } from './PaperScene.jsx';
import { MushroomPatch, TornEdge } from './PaperArt.jsx';
import Reveal from './Reveal.jsx';

const modalSpring = { type: 'spring', stiffness: 300, damping: 30 };
const cardSpring = { type: 'spring', stiffness: 340, damping: 32 };

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const [activeImage, setActiveImage] = useState(project?.image ?? '');
  const [showVideo, setShowVideo] = useState(false);
  const gallery = project?.gallery?.length ? project.gallery : project ? [project.image] : [];

  useEffect(() => {
    setActiveImage(project?.image ?? '');
    setShowVideo(false);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    lastFocus.current = document.activeElement;
    document.body.classList.add('modal-open');
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKey);
      document.body.classList.remove('modal-open');
      if (lastFocus.current && typeof lastFocus.current.focus === 'function') {
        lastFocus.current.focus({ preventScroll: true });
      }
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="modal-cards"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.23 }}
        >
          <motion.button
            type="button"
            className="modal-cards__backdrop"
            style={{ '--project-accent': project.accent }}
            onClick={onClose}
            tabIndex={-1}
            aria-label="关闭项目详情"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          />

          <div className="modal-cards__center">
            <motion.div
              layoutId={`project-card-${project.id}`}
              className={`modal-cards__panel${showVideo ? ' is-video' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-expand-title"
              transition={modalSpring}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div
                layoutId={`project-visual-${project.id}`}
                className="modal-cards__visual"
                transition={modalSpring}
              >
                {project.video && showVideo ? (
                  <video
                    className="modal-cards__video"
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    poster={project.image}
                    src={project.video}
                  >
                    你的浏览器不支持视频播放。
                  </video>
                ) : (
                  <>
                    <img className="modal-cards__visual-bg" src={activeImage} alt="" aria-hidden="true" />
                    <img className="modal-cards__visual-img" src={activeImage} alt={project.alt} />
                  </>
                )}
                <span className="modal-cards__visual-shade" aria-hidden="true" />
                {project.video && !showVideo ? (
                  <button
                    type="button"
                    className="modal-cards__play"
                    onClick={() => setShowVideo(true)}
                  >
                    <span aria-hidden="true">▶</span>
                    播放短片
                  </button>
                ) : null}
                <p className="modal-cards__visual-meta">
                  <span>{project.categoryEn}</span>
                  <span>{project.year}</span>
                </p>
              </motion.div>

              <div className="modal-cards__body">
                <div className="modal-cards__top">
                  <span className="modal-cards__index">Project {project.index} / {String(projects.length).padStart(2, '0')}</span>
                  <button
                    ref={closeRef}
                    type="button"
                    className="modal-cards__close"
                    onClick={onClose}
                    aria-label="关闭项目详情"
                  >
                    <span />
                    <span />
                  </button>
                </div>

                <motion.h3
                  layoutId={`project-title-${project.id}`}
                  id="project-expand-title"
                  className="modal-cards__title"
                  transition={modalSpring}
                >
                  《{project.title}》
                </motion.h3>
                <p className="modal-cards__en">{project.titleEn}</p>
                <p className="modal-cards__desc">{project.description}</p>

                <dl className="modal-cards__meta">
                  <div>
                    <dt>年份</dt>
                    <dd>{project.year}</dd>
                  </div>
                  <div>
                    <dt>职责</dt>
                    <dd>{project.scope}</dd>
                  </div>
                  <div>
                    <dt>篇幅</dt>
                    <dd>{project.duration}</dd>
                  </div>
                </dl>

                {gallery.length > 1 ? (
                  <div className="modal-cards__gallery">
                    <p className="modal-cards__gallery-label">
                      项目图集
                      <span>{String(gallery.length).padStart(2, '0')} pages</span>
                    </p>
                    <div className="modal-cards__thumbs">
                      {gallery.map((src, index) => (
                        <button
                          key={src}
                          type="button"
                          className={`modal-cards__thumb${activeImage === src && !showVideo ? ' is-active' : ''}`}
                          onClick={() => {
                            setActiveImage(src);
                            setShowVideo(false);
                          }}
                          aria-label={`查看第 ${index + 1} 张项目图`}
                        >
                          <img src={src} alt="" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <p className="modal-cards__note">
                  <span>Note</span>
                  {project.note || '这是一次从文字与草图开始的练习：到色彩、分镜与最终呈现，试着让每一个决定都有来处。'}
                </p>

                <div className="modal-cards__actions">
                  <a
                    className="button button--dark"
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(`想聊聊《${project.title}》`)}`}
                  >
                    <MailIcon size={16} />
                    <span>聊聊这个项目</span>
                  </a>
                  <button type="button" className="text-link" onClick={onClose}>
                    <ArrowLeft size={15} />
                    <span>返回作品集</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <motion.button
      type="button"
      layoutId={`project-card-${project.id}`}
      className="project-card"
      style={{ '--rotate': project.rotate, '--accent': project.accent, '--card-delay': `${index * 70}ms` }}
      onClick={() => onOpen(project)}
      aria-label={`查看项目《${project.title}》，${project.category}，${project.year}`}
      transition={cardSpring}
    >
      <span className="project-card__paper">
        <span className="project-card__tape" aria-hidden="true" />
        <motion.span
          layoutId={`project-visual-${project.id}`}
          className="project-card__image"
          transition={modalSpring}
        >
          <img src={project.image} alt="" loading="eager" decoding="async" />
          <span className="project-card__shade" aria-hidden="true" />
          <span className="project-card__open" aria-hidden="true">
            <span>查看项目</span>
            <ArrowUpRight size={16} />
          </span>
          <span className="project-card__index" aria-hidden="true">{project.index}</span>
        </motion.span>
        <span className="project-card__caption">
          <motion.span
            layoutId={`project-title-${project.id}`}
            className="project-card__title"
            transition={modalSpring}
          >
            《{project.title}》
          </motion.span>
          <span className="project-card__meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </span>
        </span>
      </span>
    </motion.button>
  );
}

export default function ProjectsSection() {
  const railRef = useRef(null);
  const [active, setActive] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanPrev(rail.scrollLeft > 8);
    setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    updateArrows();
    const frame = window.requestAnimationFrame(updateArrows);
    const observer = new ResizeObserver(updateArrows);
    observer.observe(rail);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [updateArrows]);

  const scrollRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.project-card');
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 24;
    const distance = card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    rail.scrollBy({ left: distance * direction, behavior: 'smooth' });
  };

  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <TornEdge fill="var(--forest)" accent="var(--moss)" className="projects__tear" />

      <div className="projects__backdrop" aria-hidden="true">
        <CanopyEdge className="projects__canopy" flip tone="light" />
        <LeafCluster className="projects__leaves projects__leaves--left" />
        <LeafCluster className="projects__leaves projects__leaves--right" flip tone="dark" />
        <span className="projects__glow" />
      </div>

      <div className="container projects__inner">
        <div className="projects__layout">
          <Reveal className="projects__intro">
            <p className="script-label">Featured Projects</p>
            <h2 id="projects-title">精选项目</h2>
            <p className="projects__note">
              这是一部分我的作品，
              <br />
              也是我对世界的观察与想象。
            </p>

            <button type="button" className="button button--paper projects__cta" onClick={() => setActive(projects[0])}>
              <span>查看作品集</span>
              <ArrowRight size={17} />
            </button>

            <div className="projects__arrows">
              <button type="button" className="arrow-button" onClick={() => scrollRail(-1)} disabled={!canPrev} aria-label="上一个项目">
                <ArrowLeft size={18} />
              </button>
              <button type="button" className="arrow-button" onClick={() => scrollRail(1)} disabled={!canNext} aria-label="下一个项目">
                <ArrowRight size={18} />
              </button>
            </div>
          </Reveal>

          <Reveal className="projects__rail-wrap" delay={100}>
            <div
              className="projects__rail"
              ref={railRef}
              onScroll={updateArrows}
              tabIndex={0}
              role="region"
              aria-label="精选项目列表，可横向滚动"
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  scrollRail(1);
                }
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  scrollRail(-1);
                }
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onOpen={setActive} />
              ))}
              <div className="project-card project-card--end" aria-hidden="true">
                <span className="project-card__end-inner">
                  <span>More stories</span>
                  <strong>还在生长。</strong>
                  <a className="text-link text-link--light" href="#contact" tabIndex={-1}>
                    一起把下一页做出来 <ArrowUpRight size={14} />
                  </a>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="projects__foot">
          <p className="projects__foot-note">
            <span className="projects__foot-dot" />
            作品持续更新中 · 2024—2025
          </p>
          <p className="projects__hint">SCROLL / 滑动浏览 <span>→</span></p>
          <a className="text-link text-link--light" href="#contact">
            <span>聊聊你的想法</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <MushroomPatch className="projects__mushrooms" />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
