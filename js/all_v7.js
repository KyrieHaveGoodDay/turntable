$(function () {
  // section video bg
  $('#section-video').YTPlayer({
    fitTosection: true,
    videoId: 'lu_m46VcWM4',
    playerVars: {
      modestbranding: 0,
      playsinline: 1,
      autoplay: 0,
      controls: 1,
      showinfo: 0,
      branding: 0,
      rel: 0,
      autohide: 0,
      // start: 0,
      // end: 2,
    },
    callback: function () {
      var player = $('#section-video').data('ytPlayer').player;
      player.playVideo();
    },
  });

  // image load
  var imgs = document.images,
    len = imgs.length,
    counter = 0;
  [].forEach.call(imgs, function (img) {
    if (img.complete) incrementCounter();
    else img.addEventListener('load', incrementCounter, false);
  });
  function incrementCounter() {
    counter++;
    if (counter === len) {
      console.log('all load');
    }
  }
  var loadingtime = 1500;
  function countDown() {
    loadingtime -= 200;
    if (loadingtime < 0 || counter === len) {
      clearInterval(timer);
      setTimeout(function () {
        $('.loading_mask').fadeOut(200);
        bannerAni();
      }, 500);
    }
  }
  var timer = setInterval(countDown, 200);

  // 錨點 --// 無side nav
  $('area[href^="#"], a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    targetTop = $(target).offset().top - 20;
    $('html, body').stop().animate(
      {
        scrollTop: targetTop,
      },
      300
    );
  });

  // [右邊GoTop]--// 滾動出現
  function rightBox() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop >= 1) {
      $('.right__box').fadeIn(300);
    } else {
      $('.right__box').fadeOut(300);
    }
  }

  // [右邊GoTop]--// gotop
  $('.gotop').click(function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // scroll event
  $(window).on('scroll', function () {
    rightBox();
  });

  // banner animation
  var $gameBoard = $('.game__board');
  var $sectioeTitle = $('.section__title');
  var $item = $('.banner-item .item');
  var $videoBg = $('#section-video');

  function bannerAni() {
    var tl = gsap.timeline({ delay: 1 });
    tl.from($sectioeTitle, { duration: 1.5, y: -270, ease: 'bounce.out' }).to(
      $gameBoard,
      { duration: 1.5, rotation: 1058, ease: 'power2.out', onStart: itemUp, onComplete: eventAuto },
      0.6
    );
  }

  function itemUp() {
    var delayTime = $(window).width() >= 1400 ? 0.3 : 1;
    gsap.to($videoBg, { duration: 1, opacity: 1, delay: delayTime });
    if ($(window).width() < 768) return;
    $item.each(function (index) {
      var duration = R(1, 2) / 2;
      var delay = index / 20 + 0.1;
      gsap.to($(this), { duration: 0.2, opacity: 1, delay: delay });
      gsap.from($(this), { duration: duration, y: 0, delay: delay, ease: 'back.out(1.7)' });
    });
  }

  function eventAuto() {
    $('.game__btn').css('pointer-events', 'auto');
  }

  function R(min, max) {
    return min + Math.random() * (max - min);
  }
});
