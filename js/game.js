; (function () {

  //-------- main game variables-----------
  var $game = $('.game__board');
  var $startBtn = $('.game__btn');
  var area = 8;               // 圓餅區域
  var originalAngle = 1080;   // 起始轉動度數

  //------------ response api [0,7]隨機數字 對應轉盤上1~8格子------------ 
  var result = 2;
  //---------------------------------------------

  var addAngle = 360 - ((360 / area) * result + (360 / area) / 2);
  var angleCount = originalAngle + addAngle;


  function startBtnHandler(e) {
    // 按鈕鎖定 & btn animate，結束後轉盤開始
    e.preventDefault();
    $(this).css('pointer-events', 'none');
    gsap.to($(this), { duration: 0.1, y: '+=10px', repeat: 1, yoyo: true, ease: "power4.out", onComplete: gameStart })
  }

  function gameStart() {
    // 轉盤回起始 0 
    gsap.set($game, { rotation: 0 })
    // call api 等待時連續轉動的動畫
    var tl1 = gsap.timeline();
    tl1.to($game, { duration: 0.3, rotation: 360, repeat: -1, ease: 'none' });
    // 接收到參數後漸停
    tl1.clear();
    gsap.to($game, { duration: 3, rotation: angleCount, ease: Power2.easeOut, onComplete: modalShow });
  }

  // 結果燈箱判斷
  function modalShow() {
    $startBtn.css('pointer-events', 'auto');
    $('#resultActual').modal({ backdrop: 'static' });
  }

  $startBtn.on('click', startBtnHandler)

})()