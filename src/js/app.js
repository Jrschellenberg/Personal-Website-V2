import '../sass/main.scss';

import 'jquery/dist/jquery.slim.min';
import 'popper.js/dist/umd/popper.min';
import 'bootstrap/dist/js/bootstrap.min';
import SmoothScroll from 'smooth-scroll';
import Typed from 'typed.js';

const scroll = new SmoothScroll('a[href*="#"]');

const typed = new Typed('.typedjs', {
  strings: ["Quality.", "Speed Optimization.", "User-Centered Design.", "SEO.", "CRO."],
  shuffle: true,
  loop: true,
  backDelay: 3000,
  backSpeed: 120,
  typeSpeed: 240
});


