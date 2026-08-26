/* ============================================================
   TOEIC単語帳 — フラッシュカード・4択クイズ・復習管理
   学習状況は localStorage に保存する（サーバーは使わない）
   ============================================================ */
(function () {
  'use strict';

  var DECKS = window.VOCAB_DECKS || [];
  var STORAGE_KEY = 'toeic-tango.progress.v1';
  var SOUND_KEY = 'toeic-tango.sound.v1';
  var FLASH_SIZE = 20;   // フラッシュカード1セッションの語数
  var QUIZ_SIZE = 10;    // クイズ1回の問題数
  var MASTER_BOX = 4;    // このボックス以上で「マスター」とみなす
  var INTERVALS = [0, 0, 1, 3, 7, 21]; // ボックス番号 → 次の復習までの日数

  // ---- 全単語にIDを振ってフラットな配列にしておく ----
  var ALL = [];
  DECKS.forEach(function (deck) {
    deck.words.forEach(function (word) {
      ALL.push({
        id: deck.id + ':' + word.w,
        deckId: deck.id,
        deckTitle: deck.title,
        color: deck.color,
        w: word.w,
        p: word.p,
        pos: word.pos,
        m: word.m,
        e: word.e,
        j: word.j
      });
    });
  });

  // ============================================================
  // 学習データ
  // ============================================================
  var progress = load();

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : null;
      if (data && data.words) return data;
    } catch (err) {
      /* 壊れていたら作り直す */
    }
    return { version: 1, words: {} };
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      /* プライベートモードなどで保存できない場合は黙って続ける */
    }
  }

  function recordOf(id) {
    return progress.words[id] || null;
  }

  function today() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }

  function isDue(rec) {
    return !rec || rec.due <= today();
  }

  function isMastered(rec) {
    return !!rec && rec.box >= MASTER_BOX;
  }

  function isWeak(rec) {
    return !!rec && rec.wrong > rec.correct;
  }

  /** 正誤を記録してライトナー式のボックスを更新する */
  function grade(id, correct) {
    var rec = progress.words[id] || { box: 1, correct: 0, wrong: 0, due: 0, last: 0 };
    if (correct) {
      rec.correct++;
      rec.box = Math.min(rec.box + 1, INTERVALS.length - 1);
    } else {
      rec.wrong++;
      rec.box = 1;
    }
    rec.last = Date.now();
    rec.due = today() + INTERVALS[rec.box] * 86400000;
    progress.words[id] = rec;
    save();
  }

  // ============================================================
  // 音声（Web Speech API。非対応ブラウザでは何もしない）
  // ============================================================
  var soundOn = localStorage.getItem(SOUND_KEY) !== 'off';

  function speak(text) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (err) {
      /* 再生できない環境では無視する */
    }
  }

  function autoSpeak(text) {
    if (soundOn) speak(text);
  }

  // ============================================================
  // 小さなユーティリティ
  // ============================================================
  function $(id) { return document.getElementById(id); }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ============================================================
  // 画面切り替え
  // ============================================================
  var VIEWS = ['home', 'deck', 'flash', 'quiz', 'result', 'list'];
  var current = 'home';

  function show(name, title) {
    VIEWS.forEach(function (v) { $('view-' + v).hidden = (v !== name); });
    current = name;
    $('appTitle').textContent = title || 'TOEIC単語帳';
    $('backBtn').hidden = (name === 'home');
    window.scrollTo(0, 0);
  }

  // ============================================================
  // ホーム画面
  // ============================================================
  function renderHome() {
    var learned = 0, mastered = 0, due = 0, weak = 0;
    ALL.forEach(function (word) {
      var rec = recordOf(word.id);
      if (rec) {
        learned++;
        if (isMastered(rec)) mastered++;
        if (isDue(rec)) due++;
        if (isWeak(rec)) weak++;
      }
    });

    $('homeStats').innerHTML =
      stat(ALL.length, '収録単語') +
      stat(learned, '学習した') +
      stat(mastered, 'マスター');

    $('quickCards').innerHTML =
      quickCard('review', '🔁', '復習する', '期限がきた単語をおさらい', due) +
      quickCard('weak', '⚠️', '苦手を克服', '間違いが多い単語だけ', weak);

    $('deckList').innerHTML = DECKS.map(function (deck) {
      var total = deck.words.length;
      var done = 0;
      deck.words.forEach(function (word) {
        if (isMastered(recordOf(deck.id + ':' + word.w))) done++;
      });
      var pct = Math.round(done / total * 100);
      return '<button class="deckcard" data-deck="' + esc(deck.id) + '" style="--dc:' + esc(deck.color) + '">' +
        '<div class="deckcard__title">' + esc(deck.title) + '</div>' +
        '<div class="deckcard__sub">' + esc(deck.subtitle) + '</div>' +
        '<div class="progressbar"><div class="progressbar__fill" style="width:' + pct + '%"></div></div>' +
        '<div class="deckcard__meta"><span>' + total + '語</span><span>マスター ' + done + '語（' + pct + '%）</span></div>' +
        '</button>';
    }).join('');
  }

  function stat(num, label) {
    return '<div class="stat"><span class="stat__num">' + num + '</span><span class="stat__label">' + label + '</span></div>';
  }

  function quickCard(kind, icon, title, sub, count) {
    return '<button class="quickcard" data-quick="' + kind + '"' + (count ? '' : ' disabled') + '>' +
      '<span class="quickcard__icon">' + icon + '</span>' +
      '<span class="quickcard__body"><span class="quickcard__title">' + title + '</span><br>' +
      '<span class="quickcard__sub">' + sub + '</span></span>' +
      '<span class="quickcard__count">' + count + '</span></button>';
  }

  // ============================================================
  // デッキ詳細
  // ============================================================
  var activeDeck = null;   // 選択中のデッキ（復習・苦手の場合は擬似デッキ）
  var direction = 'en2ja';

  function openDeck(deck) {
    activeDeck = deck;
    $('deckHead').innerHTML =
      '<div class="deckhead__title">' + esc(deck.title) + '</div>' +
      '<div class="deckhead__sub">' + esc(deck.subtitle) + '</div>' +
      '<div class="deckhead__sub">' + deck.words.length + '語</div>';
    document.documentElement.style.setProperty('--dc', deck.color || '#2f8f6b');
    show('deck', deck.title);
  }

  /** 復習・苦手などの絞り込みから擬似デッキを作る */
  function makeVirtualDeck(id, title, subtitle, filter) {
    var words = ALL.filter(function (word) { return filter(recordOf(word.id)); });
    return { id: id, title: title, subtitle: subtitle, color: '#3f6fbf', words: words, virtual: true };
  }

  /** 擬似デッキの単語はすでにID付き。通常デッキはここでID付きに変換する */
  function wordsOf(deck) {
    if (deck.virtual) return deck.words;
    return deck.words.map(function (word) {
      return {
        id: deck.id + ':' + word.w,
        deckId: deck.id, deckTitle: deck.title, color: deck.color,
        w: word.w, p: word.p, pos: word.pos, m: word.m, e: word.e, j: word.j
      };
    });
  }

  /** 未学習と復習期限のきた単語を先に、残りをあとに並べる */
  function pickSession(deck, size) {
    var words = wordsOf(deck);
    var priority = [], rest = [];
    words.forEach(function (word) {
      var rec = recordOf(word.id);
      if (!rec || isDue(rec)) priority.push(word); else rest.push(word);
    });
    return shuffle(priority).concat(shuffle(rest)).slice(0, size);
  }

  // ============================================================
  // フラッシュカード
  // ============================================================
  var flashQueue = [], flashIndex = 0, flashFlipped = false, flashStats = null;

  function startFlash() {
    flashQueue = pickSession(activeDeck, FLASH_SIZE);
    if (!flashQueue.length) return;
    flashIndex = 0;
    flashStats = { known: 0, again: 0, missed: [] };
    show('flash', activeDeck.title);
    renderFlash();
  }

  function renderFlash() {
    var word = flashQueue[flashIndex];
    flashFlipped = false;

    var front = direction === 'en2ja'
      ? '<div class="term">' + esc(word.w) + '</div>' +
        (word.p ? '<div class="phonetic">/' + esc(word.p) + '/</div>' : '')
      : '<div class="term">' + esc(word.m) + '</div>';

    $('cardFront').innerHTML = front;
    $('cardBack').hidden = true;
    $('cardHint').hidden = false;
    $('answerBtns').hidden = true;
    $('flashCounter').textContent = (flashIndex + 1) + ' / ' + flashQueue.length + '　（' + word.deckTitle + '）';
    $('flashProgress').style.width = (flashIndex / flashQueue.length * 100) + '%';

    if (direction === 'en2ja') autoSpeak(word.w);
  }

  function flipCard() {
    if (flashFlipped) return;
    flashFlipped = true;
    var word = flashQueue[flashIndex];

    var back = direction === 'en2ja'
      ? '<div class="meaning"><span class="pos">' + esc(word.pos) + '</span>' + esc(word.m) + '</div>'
      : '<div class="meaning">' + esc(word.w) + (word.p ? ' <span class="phonetic">/' + esc(word.p) + '/</span>' : '') + '</div>';

    back += '<div class="example"><div class="en">' + esc(word.e) + '</div>' +
            '<div class="ja">' + esc(word.j) + '</div></div>' +
            '<button class="speakbtn" data-speak="' + esc(word.e) + '">🔊 例文を聞く</button>';

    $('cardBack').innerHTML = back;
    $('cardBack').hidden = false;
    $('cardHint').hidden = true;
    $('answerBtns').hidden = false;

    if (direction === 'ja2en') autoSpeak(word.w);
  }

  function answerFlash(known) {
    if (!flashFlipped) return;
    var word = flashQueue[flashIndex];
    grade(word.id, known);
    if (known) flashStats.known++; else { flashStats.again++; flashStats.missed.push(word); }

    flashIndex++;
    if (flashIndex >= flashQueue.length) {
      showResult('フラッシュカード', flashStats.known, flashQueue.length, flashStats.missed, startFlash);
    } else {
      renderFlash();
    }
  }

  // ============================================================
  // 4択クイズ
  // ============================================================
  var quizQueue = [], quizIndex = 0, quizStats = null, quizLocked = false;

  function startQuiz() {
    quizQueue = pickSession(activeDeck, QUIZ_SIZE);
    if (!quizQueue.length) return;
    quizIndex = 0;
    quizStats = { correct: 0, missed: [] };
    show('quiz', activeDeck.title);
    renderQuiz();
  }

  function renderQuiz() {
    var word = quizQueue[quizIndex];
    quizLocked = false;

    // 同じデッキの単語から誤答の選択肢を作る（足りなければ全体から補う）
    var pool = ALL.filter(function (x) { return x.deckId === word.deckId && x.id !== word.id; });
    if (pool.length < 3) pool = ALL.filter(function (x) { return x.id !== word.id; });
    var options = shuffle(pool).slice(0, 3).concat([word]);
    options = shuffle(options);

    $('quizQuestion').innerHTML = direction === 'en2ja'
      ? esc(word.w) + (word.p ? '<span class="phonetic">/' + esc(word.p) + '/</span>' : '')
      : esc(word.m);

    $('quizChoices').innerHTML = options.map(function (opt) {
      var label = direction === 'en2ja' ? opt.m : opt.w;
      return '<button class="choice" data-id="' + esc(opt.id) + '">' + esc(label) + '</button>';
    }).join('');

    $('quizFeedback').textContent = '';
    $('quizCounter').textContent = (quizIndex + 1) + ' / ' + quizQueue.length + '問';
    $('quizProgress').style.width = (quizIndex / quizQueue.length * 100) + '%';

    if (direction === 'en2ja') autoSpeak(word.w);
  }

  function answerQuiz(chosenId) {
    if (quizLocked) return;
    quizLocked = true;

    var word = quizQueue[quizIndex];
    var correct = chosenId === word.id;
    grade(word.id, correct);
    if (correct) quizStats.correct++; else quizStats.missed.push(word);

    Array.prototype.forEach.call($('quizChoices').children, function (btn) {
      btn.disabled = true;
      if (btn.dataset.id === word.id) btn.classList.add('is-correct');
      else if (btn.dataset.id === chosenId) btn.classList.add('is-wrong');
    });

    var fb = $('quizFeedback');
    if (correct) {
      fb.textContent = '⭕ 正解';
      fb.style.color = 'var(--known)';
    } else {
      fb.textContent = '❌ ' + word.w + '：' + word.m;
      fb.style.color = 'var(--danger)';
    }
    if (direction === 'ja2en') autoSpeak(word.w);

    setTimeout(function () {
      quizIndex++;
      if (quizIndex >= quizQueue.length) {
        showResult('クイズ', quizStats.correct, quizQueue.length, quizStats.missed, startQuiz);
      } else {
        renderQuiz();
      }
    }, correct ? 700 : 1600);
  }

  // ============================================================
  // 結果画面
  // ============================================================
  var retryFn = null;

  function showResult(label, score, total, missed, again) {
    retryFn = again;
    var pct = Math.round(score / total * 100);
    var msg = pct === 100 ? '全問正解！お見事です' :
              pct >= 80 ? 'いい調子です' :
              pct >= 50 ? 'あと少し。復習しましょう' :
                          '間違えた単語をもう一度確認しましょう';

    $('resultBox').innerHTML =
      '<div class="result__label">' + esc(label) + 'の結果</div>' +
      '<div class="result__score">' + score + ' / ' + total + '</div>' +
      '<div class="result__label">正答率 ' + pct + '%</div>' +
      '<div class="result__msg">' + msg + '</div>';

    $('missedList').innerHTML = missed.length
      ? '<h3>間違えた単語（' + missed.length + '）</h3><ul class="wordlist">' +
        missed.map(function (word) { return listItem(word); }).join('') + '</ul>'
      : '';

    show('result', activeDeck.title);
  }

  // ============================================================
  // 単語一覧
  // ============================================================
  function startList() {
    $('searchBox').value = '';
    renderList('');
    show('list', activeDeck.title);
  }

  function renderList(query) {
    var q = query.trim().toLowerCase();
    var words = wordsOf(activeDeck).filter(function (word) {
      if (!q) return true;
      return (word.w + ' ' + word.m + ' ' + word.e).toLowerCase().indexOf(q) >= 0;
    });

    $('listCounter').textContent = words.length + '語';
    $('wordList').innerHTML = words.length
      ? words.map(function (word) { return listItem(word); }).join('')
      : '<li class="empty">該当する単語がありません</li>';
  }

  function listItem(word) {
    var rec = recordOf(word.id);
    var badge = isMastered(rec) ? '<span class="badge badge--mastered">マスター</span>'
              : rec ? '<span class="badge badge--learning">学習中</span>'
              : '<span class="badge">未学習</span>';
    return '<li class="worditem" data-speak="' + esc(word.w) + '">' +
      '<div class="worditem__head">' +
        '<span class="worditem__w">' + esc(word.w) + '</span>' +
        (word.p ? '<span class="worditem__p">/' + esc(word.p) + '/</span>' : '') +
        badge +
      '</div>' +
      '<div class="worditem__m">' + esc(word.pos) + '　' + esc(word.m) + '</div>' +
      '<div class="worditem__e">' + esc(word.e) + '<br>' + esc(word.j) + '</div>' +
      '</li>';
  }

  // ============================================================
  // データの書き出し・読み込み
  // ============================================================
  function exportData() {
    var blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'toeic-tango-progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function importData(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || typeof data.words !== 'object') throw new Error('形式が違います');
        progress = { version: 1, words: data.words };
        save();
        renderHome();
        alert('学習データを読み込みました。');
      } catch (err) {
        alert('読み込めませんでした。書き出したJSONファイルを選んでください。');
      }
    };
    reader.readAsText(file);
  }

  // ============================================================
  // イベント登録
  // ============================================================
  $('backBtn').addEventListener('click', function () {
    if (current === 'home') return;
    if (current === 'deck') { renderHome(); show('home'); return; }
    openDeck(activeDeck);
  });

  $('soundBtn').addEventListener('click', function () {
    soundOn = !soundOn;
    localStorage.setItem(SOUND_KEY, soundOn ? 'on' : 'off');
    this.setAttribute('aria-pressed', String(soundOn));
  });

  $('deckList').addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-deck]');
    if (!btn) return;
    var deck = DECKS.filter(function (d) { return d.id === btn.dataset.deck; })[0];
    if (deck) openDeck(deck);
  });

  $('quickCards').addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-quick]');
    if (!btn || btn.disabled) return;
    var deck = btn.dataset.quick === 'review'
      ? makeVirtualDeck('review', '復習', '期限がきた単語', function (rec) { return rec && isDue(rec); })
      : makeVirtualDeck('weak', '苦手な単語', '間違いが正解より多い単語', isWeak);
    if (!deck.words.length) return;
    openDeck(deck);
  });

  $('view-deck').addEventListener('click', function (ev) {
    var modeBtn = ev.target.closest('[data-mode]');
    if (modeBtn) {
      if (modeBtn.dataset.mode === 'flash') startFlash();
      else if (modeBtn.dataset.mode === 'quiz') startQuiz();
      else startList();
      return;
    }
    var dirBtn = ev.target.closest('#dirPick button');
    if (dirBtn) {
      direction = dirBtn.dataset.dir;
      Array.prototype.forEach.call($('dirPick').children, function (b) {
        b.classList.toggle('is-active', b === dirBtn);
      });
    }
  });

  $('flashCard').addEventListener('click', function (ev) {
    var speakBtn = ev.target.closest('[data-speak]');
    if (speakBtn) { ev.stopPropagation(); speak(speakBtn.dataset.speak); return; }
    flipCard();
  });

  $('flashCard').addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') flipCard();
  });

  $('answerBtns').addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-known]');
    if (btn) answerFlash(btn.dataset.known === '1');
  });

  $('quizChoices').addEventListener('click', function (ev) {
    var btn = ev.target.closest('.choice');
    if (btn) answerQuiz(btn.dataset.id);
  });

  $('againBtn').addEventListener('click', function () { if (retryFn) retryFn(); });

  $('homeBtn').addEventListener('click', function () { renderHome(); show('home'); });

  $('searchBox').addEventListener('input', function () { renderList(this.value); });

  $('wordList').addEventListener('click', function (ev) {
    var item = ev.target.closest('[data-speak]');
    if (item) speak(item.dataset.speak);
  });

  $('missedList').addEventListener('click', function (ev) {
    var item = ev.target.closest('[data-speak]');
    if (item) speak(item.dataset.speak);
  });

  $('exportBtn').addEventListener('click', exportData);
  $('importBtn').addEventListener('click', function () { $('importFile').click(); });
  $('importFile').addEventListener('change', function () {
    if (this.files && this.files[0]) importData(this.files[0]);
    this.value = '';
  });

  $('resetBtn').addEventListener('click', function () {
    if (!confirm('学習データをすべて消します。よろしいですか？')) return;
    progress = { version: 1, words: {} };
    save();
    renderHome();
  });

  document.addEventListener('keydown', function (ev) {
    if (current !== 'flash') return;
    if (ev.key === ' ') { ev.preventDefault(); flipCard(); }
    else if (ev.key === '1') answerFlash(false);
    else if (ev.key === '2') answerFlash(true);
  });

  // ---- 起動 ----
  $('soundBtn').setAttribute('aria-pressed', String(soundOn));
  renderHome();
  show('home');
})();
