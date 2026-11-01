import { useEffect, useRef, useState } from 'react';
import { navItems, profile } from '../data/content.js';
import { ArrowUpRight, BrandMark } from './Icons.jsx';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container site-header__bar">
        <a className="brand" href="#top" aria-label={`${profile.name}的作品集，回到首页`} onClick={() => setOpen(false)}>
          <span className="brand__mark">
            <BrandMark size={38} />
          </span>
          <span className="brand__text">
            <span className="brand__title">My Portfolio</span>
            <span className="brand__sub">Peng Yukang · 作品集</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="主导航">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a className="button button--light header-cta" href="#contact">
            <span>联系我</span>
            <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu" ref={menuRef} aria-hidden={!open} inert={!open}>
        <div className="mobile-menu__inner">
          <p className="mobile-menu__label">Menu / 目录</p>
          <nav aria-label="移动端导航">
            <ul>
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    <span className="mobile-menu__index">0{index + 1}</span>
                    <span>{item.label}</span>
                    <ArrowUpRight size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>{profile.availability}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
