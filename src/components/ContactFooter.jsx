import { useEffect, useState } from 'react';
import { footerLinks, profile } from '../data/content.js';
import CopyValue from './CopyValue.jsx';
import {
  ArrowUpRight,
  BookIcon,
  BrandMark,
  CalendarIcon,
  CapIcon,
  MailIcon,
  PaperPlane,
  PinIcon,
  WechatIcon,
} from './Icons.jsx';
import { ContactNook, MushroomPatch, Rabbit, TornEdge } from './PaperArt.jsx';
import { CanopyEdge, LeafCluster, PaperBird } from './PaperScene.jsx';
import Reveal from './Reveal.jsx';

function useZhuhaiTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
    setTime(format());
    const timer = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

export default function ContactFooter() {
  const zhuhaiTime = useZhuhaiTime();

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <TornEdge fill="var(--paper)" accent="var(--paper-deep)" className="contact__tear" />

      <div className="contact__backdrop" aria-hidden="true">
        <CanopyEdge className="contact__canopy" tone="light" />
        <LeafCluster className="contact__leaves contact__leaves--left" tone="dark" />
        <LeafCluster className="contact__leaves contact__leaves--right" flip tone="light" />
        <PaperBird className="contact__bird contact__bird--one" />
        <PaperBird className="contact__bird contact__bird--two" tone="teal" />
        <span className="contact__glow" />
        <ContactNook />
        <Rabbit className="contact__rabbit" sleeping />
        <MushroomPatch className="contact__mushrooms" />
        <span className="contact__seed contact__seed--one" />
        <span className="contact__seed contact__seed--two" />
        <span className="contact__seed contact__seed--three" />
      </div>

      <div className="container contact__inner">
        <div className="contact__top">
          <p className="script-label">Contact</p>
          <p className="contact__place">
            <span className="contact__live-dot" />
            Zhuhai, CN {zhuhaiTime ? <time>{zhuhaiTime}</time> : null}
          </p>
        </div>

        <div className="contact__main">
          <Reveal className="contact__pitch">
            <h2 id="contact-title">
              期待一次
              <br />
              <em>认真的</em>开始。
              <PaperPlane className="contact__plane" />
            </h2>
            <p className="contact__copy">
              如果你也在做动画、角色或场景，或者只是想聊聊一个还没成形的想法，欢迎写信给我。我会认真读完，也认真回复。
            </p>
            <div className="contact__cta">
              <a
                className="button button--paper"
                href={`mailto:${profile.email}?subject=${encodeURIComponent('想和你聊聊一个项目')}`}
              >
                <span>现开放实习机会</span>
                <ArrowUpRight size={17} />
              </a>
              <span className="contact__mail">
                或写信至
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </span>
            </div>
          </Reveal>

          <Reveal className="contact__details" delay={120}>
            <div className="contact__block">
              <h3>
                <span className="script-label">Contact</span>
                <i />
              </h3>
              <ul>
                <li>
                  <MailIcon size={19} />
                  <span className="contact__detail-label">邮箱</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <WechatIcon size={19} />
                  <span className="contact__detail-label">微信</span>
                  <CopyValue value={profile.wechat} label="微信号" />
                </li>
                <li>
                  <PinIcon size={19} />
                  <span className="contact__detail-label">所在地</span>
                  <span>{profile.location}</span>
                </li>
              </ul>
            </div>

            <div className="contact__block">
              <h3>
                <span className="script-label">Education</span>
                <i />
              </h3>
              <ul>
                <li>
                  <CapIcon size={19} />
                  <span className="contact__detail-label">就读院校</span>
                  <span>{profile.school}</span>
                </li>
                <li>
                  <CalendarIcon size={19} />
                  <span className="contact__detail-label">学习年限</span>
                  <span>{profile.years}</span>
                </li>
                <li>
                  <BookIcon size={19} />
                  <span className="contact__detail-label">专业</span>
                  <span>{profile.major}</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="contact-footer">
        <div className="container contact-footer__inner">
          <a className="contact-footer__brand" href="#top" aria-label="回到首页">
            <span className="contact-footer__mark">
              <BrandMark size={32} />
            </span>
            <span>
              <strong>My Portfolio</strong>
              <small>Anime Design Student · © 2026 {profile.name}</small>
            </span>
          </a>

          <nav className="contact-footer__nav" aria-label="页脚导航">
            {footerLinks.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="button button--dark contact-footer__cta" href={`mailto:${profile.email}`}>
            <span>联系我</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
