import AboutSection from './components/AboutSection.jsx';
import ContactFooter from './components/ContactFooter.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import SiteHeader from './components/SiteHeader.jsx';

function PaperDefs() {
  return (
    <svg className="svg-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="edge-rough" x="-4%" y="-30%" width="108%" height="170%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.07" numOctaves="3" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="art-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0d1b0e" floodOpacity="0.28" />
        </filter>
        <filter id="deep-shadow" x="-35%" y="-35%" width="170%" height="180%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#081408" floodOpacity="0.38" />
        </filter>
        <clipPath id="paper-band" clipPathUnits="objectBoundingBox">
          <path d="M0.0000 0.0339 L0.0450 0.0135 L0.0730 0.0269 L0.1180 0.0320 L0.1400 0.0260 L0.1620 0.0154 L0.1900 0.0149 L0.2080 0.0325 L0.2300 0.0322 L0.2750 0.0227 L0.3200 0.0185 L0.3380 0.0212 L0.3560 0.0283 L0.3740 0.0271 L0.4190 0.0227 L0.4540 0.0211 L0.4760 0.0287 L0.4980 0.0158 L0.5260 0.0130 L0.5480 0.0139 L0.5930 0.0217 L0.6380 0.0231 L0.6660 0.0171 L0.6880 0.0180 L0.7160 0.0269 L0.7340 0.0232 L0.7790 0.0269 L0.7970 0.0187 L0.8420 0.0203 L0.8600 0.0198 L0.9050 0.0303 L0.9230 0.0201 L0.9580 0.0254 L0.9860 0.0206 L1.0000 0.9650 L0.9780 0.9498 L0.9500 0.9487 L0.9150 0.9568 L0.8870 0.9720 L0.8690 0.9758 L0.8410 0.9700 L0.8130 0.9551 L0.7950 0.9554 L0.7670 0.9760 L0.7390 0.9594 L0.7170 0.9698 L0.6990 0.9618 L0.6770 0.9704 L0.6550 0.9683 L0.6370 0.9715 L0.6020 0.9715 L0.5670 0.9604 L0.5320 0.9496 L0.5040 0.9757 L0.4860 0.9618 L0.4580 0.9751 L0.4130 0.9653 L0.3780 0.9632 L0.3430 0.9649 L0.2980 0.9758 L0.2630 0.9596 L0.2280 0.9582 L0.2100 0.9688 L0.1820 0.9682 L0.1370 0.9503 L0.1190 0.9688 L0.0910 0.9695 L0.0730 0.9615 L0.0450 0.9705 L0.0270 0.9731 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#main">跳到主要内容</a>
      <PaperDefs />
      <div className="page-grain" aria-hidden="true" />
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>
      <ContactFooter />
    </div>
  );
}
