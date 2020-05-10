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
  backDelay: 2000,
  backSpeed: 100,
  typeSpeed: 100
});


const getStr = (arr) => {
  return arr.join('');
}

grecaptcha.ready(function() {
  grecaptcha.execute('6LcawLYUAAAAAEFtdXwAeCEbDPc3pQOvqkHHcm7d', {action: 'homepage'}).then(function(token) {

    const arr = ['jr','schell','enberg@', 'gm', 'ail.c', 'om'];
    const addressArr = ['191 Li', 'ndmere Drive<br>', 'Win', 'nipeg, M', 'B R3P 2R5<', 'br>Canada'];
    const phoneArr = ['(20', '4) 2', '90-0', '973'];

    const formSpree = document.querySelector('#hidden_form')
    formSpree.setAttribute('action', `https://formspree.io/${getStr(arr)}`);

    const emailAddress = document.querySelector('#emailAddress');

    emailAddress.setAttribute('href', `mailto:${getStr(arr)}`)
    emailAddress.innerText = getStr(arr);

    const address = document.querySelector('#address');
    address.innerHTML = getStr(addressArr);

    const phone = document.querySelector('#phone');
    phone.innerText = getStr(phoneArr);
  });
});



