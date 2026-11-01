import { profile, stats } from '../data/content.js';
import CopyValue from './CopyValue.jsx';
import {
  ArrowUpRight,
  CapIcon,
  FolderIcon,
  MailIcon,
  PinIcon,
  SparkleIcon,
  WechatIcon,
} from './Icons.jsx';
import { CanopyEdge, LeafCluster } from './PaperScene.jsx';
import Reveal from './Reveal.jsx';

const icons = {
  cap: CapIcon,
  folder: FolderIcon,
  sparkles: SparkleIcon,
};

export default function AboutSection() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__backdrop" aria-hidden="true">
        <CanopyEdge className="about__canopy about__canopy--top" />
        <CanopyEdge className="about__canopy about__canopy--bottom" flip tone="light" />
        <LeafCluster className="about__leaves about__leaves--left" />
        <LeafCluster className="about__leaves about__leaves--right" flip tone="light" />
      </div>

      <div className="about__band">
        <span className="about__fiber about__fiber--one" aria-hidden="true" />
        <span className="about__fiber about__fiber--two" aria-hidden="true" />
        <span className="about__fiber about__fiber--three" aria-hidden="true" />

        <div className="container about__inner">
          <Reveal className="about__portrait">
            <figure className="about__portrait-card">
              <span className="about__portrait-tape" aria-hidden="true" />
              <img
                src="/images/profile/portrait.jpg"
                alt={`${profile.name}的肖像`}
                width="1000"
                height="1250"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span className="about__portrait-name">{profile.name}</span>
                <span className="about__portrait-en">{profile.nameEn}</span>
              </figcaption>
            </figure>
            <p className="about__portrait-role">
              {profile.role}
              <span>{profile.roleEn}</span>
            </p>
          </Reveal>

          <Reveal className="about__left" delay={80}>
            <div className="about__label-row">
              <p className="script-label">About Me</p>
              <p className="section-index">01 <span>/</span> 04</p>
            </div>

            <h2 className="about__title" id="about-title">
              从问题出发，
              <br />
              做诚实的 <em>design</em>
              <span className="about__title-dot" aria-hidden="true" />
            </h2>

            <p className="about__intro">{profile.intro}</p>
            <p className="about__intro about__intro--muted">{profile.introSecondary}</p>

            <ul className="about__contact" aria-label="联系方式">
              <li>
                <MailIcon size={16} />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <WechatIcon size={16} />
                <CopyValue value={profile.wechat} label="微信号" />
              </li>
              <li>
                <PinIcon size={16} />
                <span>{profile.location}</span>
              </li>
            </ul>

            <a className="text-link about__more" href="#projects">
              <span>看看我最近在做的东西</span>
              <ArrowUpRight size={15} />
            </a>
          </Reveal>

          <Reveal className="about__facts" delay={120}>
            <ul className="about__stats">
              {stats.map((stat) => {
                const Icon = icons[stat.icon] ?? SparkleIcon;
                return (
                  <li key={stat.id}>
                    <span className="about__stat-icon">
                      <Icon size={34} />
                    </span>
                    <span className="about__stat-label">{stat.label}</span>
                    <strong>{stat.value}</strong>
                    <span className="about__stat-note">{stat.note}</span>
                  </li>
                );
              })}
            </ul>

            <p className="about__note">
              <span className="about__note-leaf" aria-hidden="true" />
              在每一帧里，练习把故事讲清楚。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
