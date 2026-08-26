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
  var VIEWS = ['home', 'deck', 'flash', 'quiz', 'result', 'list', 'book', 'index', 'passages', 'passage'];

  /* どの画面から戻るとどこへ行くか */
  var PARENT = {
    deck: 'home', flash: 'deck', quiz: 'deck', result: 'deck', list: 'deck',
    book: 'home', index: 'home', passages: 'home', passage: 'passages'
  };
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

    back = '<div class="card__img" id="cardImg"></div>' + back;
    back += '<div class="example"><div class="en">' + esc(word.e) + '</div>' +
            '<div class="ja">' + esc(word.j) + '</div></div>' +
            '<button class="speakbtn" data-speak="' + esc(word.e) + '">🔊 例文を聞く</button>';

    $('cardBack').innerHTML = back;
    $('cardBack').hidden = false;
    VocabImage.render($('cardImg'), word.w, true);
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
  // 見出し語の索引（本文中の単語を引くために使う）
  // ============================================================
  var BY_WORD = {};
  ALL.forEach(function (word) { BY_WORD[word.w.toLowerCase()] = word; });

  /* 不規則変化。本文の broke / brought などを見出し語に結びつける */
  var IRREGULAR = {
    oversee: ['oversaw', 'overseen'], 'break': ['broke', 'broken'], bring: ['brought'],
    'catch': ['caught'], come: ['came'], fall: ['fell'], get: ['got', 'gotten'],
    give: ['gave', 'given'], go: ['went', 'gone'], make: ['made'], run: ['ran'],
    take: ['took', 'taken'], keep: ['kept'], hold: ['held'], deal: ['dealt'],
    'put': ['put'], 'set': ['set'], 'cut': ['cut'], pay: ['paid'], send: ['sent']
  };

  function stemOf(s) { return String(s).toLowerCase().replace(/(e|y)$/, ''); }

  /** 本文の1語が見出し語 head の変化形かどうか */
  function isFormOf(token, head) {
    var t = token.toLowerCase();
    if (t === head) return true;
    var irr = IRREGULAR[head];
    if (irr && irr.indexOf(t) >= 0) return true;
    var st = stemOf(head);
    return st.length > 2 && t.indexOf(st) === 0;
  }

  var BE = ['be', 'am', 'is', 'are', 'was', 'were', 'been', 'being'];

  /**
   * words[from] から項目 item が始まっているか調べる。
   * 語の間には it / them / the などの割り込みを1語まで許す。
   * @returns {number|null} 一致した最後の位置
   */
  function matchAt(words, from, item) {
    var toks = item.split(' ');
    if (toks[0] === 'be') {
      if (BE.indexOf(words[from]) < 0) return null;
      toks = toks.slice(1);
      from++;
      if (from >= words.length) return null;
    }
    if (!isFormOf(words[from], toks[0])) return null;
    var pos = from;
    for (var i = 1; i < toks.length; i++) {
      if (words[pos + 1] === toks[i]) { pos += 1; continue; }
      if (words[pos + 2] === toks[i]) { pos += 2; continue; }  // 1語の割り込みを許す
      return null;
    }
    return pos;
  }

  // ============================================================
  // 単語の詳細シート
  // ============================================================
  function openSheet(word) {
    if (!word) return;
    $('sheetPanel').innerHTML =
      '<div class="sheet__grab"></div>' +
      '<div class="sheet__img" id="sheetImg"></div>' +
      '<div class="sheet__w">' + esc(word.w) + '</div>' +
      (word.p ? '<div class="sheet__p">/' + esc(word.p) + '/</div>' : '') +
      '<div class="sheet__m"><span class="pos">' + esc(word.pos) + '</span>' + esc(word.m) + '</div>' +
      '<div class="example"><div class="en">' + esc(word.e) + '</div><div class="ja">' + esc(word.j) + '</div></div>' +
      '<div class="sheet__btns">' +
        '<button class="linkbtn" data-speak="' + esc(word.w) + '">🔊 単語</button>' +
        '<button class="linkbtn" data-speak="' + esc(word.e) + '">🔊 例文</button>' +
        '<button class="linkbtn" id="sheetClose">閉じる</button>' +
      '</div>' +
      '<p class="sheet__deck">' + esc(word.deckTitle) + '</p>';
    $('wordSheet').hidden = false;
    VocabImage.render($('sheetImg'), word.w, true);
  }

  function closeSheet() { $('wordSheet').hidden = true; }

  // ============================================================
  // 単語帳（英→日 / 日→英 / 熟語帳）
  // ============================================================
  var BOOKS = {
    'book-en2ja':   { title: '英→日 単語帳', mode: 'en2ja',   decks: ['toeic600', 'toeic730', 'toeic860', 'phrases'] },
    'book-ja2en':   { title: '日→英 単語帳', mode: 'ja2en',   decks: ['toeic600', 'toeic730', 'toeic860', 'phrases'] },
    'book-phrases': { title: '熟語帳',       mode: 'en2ja',   decks: ['phrases'] }
  };
  var book = null, bookScope = 'all', bookHidden = false;

  function openBook(key) {
    book = BOOKS[key];
    bookScope = 'all';
    bookHidden = (book.mode === 'ja2en');
    $('bookHide').checked = bookHidden;
    $('bookSearch').value = '';

    var scopes = book.decks.length > 1
      ? [{ id: 'all', label: 'すべて' }].concat(book.decks.map(function (id) {
          var d = deckById(id);
          return { id: id, label: d ? d.title.replace('TOEIC ', '').replace('レベル', '') : id };
        }))
      : [];
    $('bookScope').innerHTML = scopes.map(function (s, i) {
      return '<button data-scope="' + esc(s.id) + '"' + (i === 0 ? ' class="is-active"' : '') + '>' + esc(s.label) + '</button>';
    }).join('');
    $('bookScope').hidden = !scopes.length;

    renderBook();
    show('book', book.title);
  }

  function deckById(id) {
    return DECKS.filter(function (d) { return d.id === id; })[0];
  }

  function bookWords() {
    return ALL.filter(function (w) {
      if (book.decks.indexOf(w.deckId) < 0) return false;
      return bookScope === 'all' || w.deckId === bookScope;
    });
  }

  function renderBook() {
    var q = $('bookSearch').value.trim().toLowerCase();
    var words = bookWords().filter(function (w) {
      return !q || (w.w + ' ' + w.m + ' ' + w.e + ' ' + w.j).toLowerCase().indexOf(q) >= 0;
    });
    $('bookCounter').textContent = words.length + '項目' + (bookHidden ? '（タップで答えを表示）' : '');
    $('bookList').innerHTML = words.length
      ? words.map(function (w) { return bookItem(w, book.mode); }).join('')
      : '<li class="empty">該当する項目がありません</li>';
  }

  function bookItem(word, mode) {
    var emoji = VocabImage.emojiOf(word.w);
    var face = mode === 'ja2en'
      ? '<div class="bk__front"><span class="bk__ja">' + esc(word.m) + '</span></div>' +
        '<div class="bk__back"><span class="bk__w">' + esc(word.w) + '</span>' +
        (word.p ? '<span class="bk__p">/' + esc(word.p) + '/</span>' : '') + '</div>'
      : '<div class="bk__front"><span class="bk__w">' + esc(word.w) + '</span>' +
        (word.p ? '<span class="bk__p">/' + esc(word.p) + '/</span>' : '') + '</div>' +
        '<div class="bk__back"><span class="pos">' + esc(word.pos) + '</span>' + esc(word.m) + '</div>';

    return '<li class="bk' + (bookHidden ? ' is-hidden' : '') + '" data-word="' + esc(word.w) + '">' +
      '<span class="bk__emoji" aria-hidden="true">' + esc(emoji) + '</span>' +
      '<div class="bk__body">' + face +
        '<div class="bk__ex"><span class="en">' + esc(word.e) + '</span><span class="ja">' + esc(word.j) + '</span></div>' +
      '</div></li>';
  }

  // ============================================================
  // 索引
  // ============================================================
  function openIndex() {
    $('indexSearch').value = '';
    renderIndex();
    show('index', '索引');
  }

  function renderIndex() {
    var q = $('indexSearch').value.trim().toLowerCase();
    var words = ALL.filter(function (w) {
      return !q || (w.w + ' ' + w.m).toLowerCase().indexOf(q) >= 0;
    }).slice().sort(function (a, b) {
      return a.w.toLowerCase().localeCompare(b.w.toLowerCase(), 'en');
    });

    var groups = {}, order = [];
    words.forEach(function (w) {
      var k = w.w.charAt(0).toUpperCase();
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(w);
    });

    $('indexCounter').textContent = words.length + '項目';
    $('alphaBar').innerHTML = order.map(function (k) {
      return '<a href="#ix-' + esc(k) + '">' + esc(k) + '</a>';
    }).join('');

    $('indexBody').innerHTML = order.length ? order.map(function (k) {
      return '<section class="ixgroup"><h3 class="ixgroup__h" id="ix-' + esc(k) + '">' + esc(k) + '</h3><ul class="ixlist">' +
        groups[k].map(function (w) {
          return '<li class="ixrow" data-word="' + esc(w.w) + '">' +
            '<span class="ixrow__e">' + esc(VocabImage.emojiOf(w.w)) + '</span>' +
            '<span class="ixrow__w">' + esc(w.w) + '</span>' +
            '<span class="ixrow__m">' + esc(w.m) + '</span></li>';
        }).join('') + '</ul></section>';
    }).join('') : '<p class="empty">該当する項目がありません</p>';
  }

  // ============================================================
  // 丸暗記（長文）
  // ============================================================
  var PASSAGES = window.VOCAB_PASSAGES || [];
  var activePassage = null;

  function openPassages() {
    $('passageList').innerHTML = PASSAGES.map(function (p) {
      var words = p.paras.reduce(function (n, x) { return n + x.en.split(/\s+/).length; }, 0);
      return '<button class="menucard" data-passage="' + esc(p.id) + '">' +
        '<span class="menucard__icon">📄</span>' +
        '<span class="menucard__body">' +
          '<span class="menucard__title">' + esc(p.title) + '</span>' +
          '<span class="menucard__sub">' + esc(p.titleJa) + '　/　' + esc(p.scope) + '</span>' +
          '<span class="menucard__meta">約' + words + '語　覚える項目 ' + p.items.length + '</span>' +
        '</span></button>';
    }).join('');
    show('passages', '丸暗記（長文）');
  }

  function openPassage(id) {
    activePassage = PASSAGES.filter(function (p) { return p.id === id; })[0];
    if (!activePassage) return;
    $('pShowJa').checked = false;
    renderPassage();
    $('passageItemsTitle').textContent = 'この英文で覚える' + activePassage.items.length + '項目';
    $('passageItems').innerHTML = activePassage.items.map(function (it) {
      var w = BY_WORD[it.toLowerCase()];
      return w ? bookItem(w, 'en2ja') : '';
    }).join('');
    show('passage', activePassage.title);
  }

  function renderPassage() {
    var showJa = $('pShowJa').checked;
    $('passageBody').classList.toggle('passage--ja', showJa);
    $('passageBody').innerHTML = activePassage.paras.map(function (para, i) {
      return '<div class="para">' +
        '<p class="para__en">' + markUp(para.en, activePassage.items) + '</p>' +
        '<p class="para__ja">' + esc(para.ja) + '</p>' +
        '<button class="para__speak linkbtn" data-speak="' + esc(para.en) + '">🔊 この段落</button>' +
        '</div>';
    }).join('');
  }

  /** 本文中の見出し語に印をつける（タップで意味が出る） */
  function markUp(text, items) {
    var parts = text.match(/[A-Za-z][A-Za-z'-]*|[^A-Za-z]+/g) || [];
    var isWord = parts.map(function (t) { return /^[A-Za-z]/.test(t); });
    var idx = [], lower = [];
    parts.forEach(function (t, i) { if (isWord[i]) { idx.push(i); lower.push(t.toLowerCase()); } });

    var sorted = items.slice().sort(function (a, b) { return b.split(' ').length - a.split(' ').length; });
    var mark = {};   // 単語位置 -> 項目名
    var span = {};   // 単語位置 -> その項目の何番目か（最後なら 'end'）

    for (var i = 0; i < lower.length; i++) {
      if (mark[i] !== undefined) continue;
      for (var k = 0; k < sorted.length; k++) {
        var end = matchAt(lower, i, sorted[k]);
        if (end !== null) {
          for (var x = i; x <= end; x++) { mark[x] = sorted[k]; span[x] = (x === end ? 'end' : 'mid'); }
          i = end;
          break;
        }
      }
    }

    var wpos = -1;
    return parts.map(function (t, i) {
      if (!isWord[i]) return esc(t);
      wpos++;
      if (mark[wpos] === undefined) return esc(t);
      return '<mark class="tw" data-item="' + esc(mark[wpos]) + '">' + esc(t) + '</mark>';
    }).join('');
  }

  // ============================================================
  // イベント登録
  // ============================================================
  $('backBtn').addEventListener('click', function () {
    var to = PARENT[current];
    if (!to) return;
    if (to === 'home') { renderHome(); show('home'); return; }
    if (to === 'passages') { openPassages(); return; }
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

  // ---- 読む・調べる ----
  $('menuList').addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-go]');
    if (!btn) return;
    var go = btn.dataset.go;
    if (go === 'index') openIndex();
    else if (go === 'passages') openPassages();
    else openBook(go);
  });

  $('bookSearch').addEventListener('input', renderBook);

  $('bookScope').addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-scope]');
    if (!btn) return;
    bookScope = btn.dataset.scope;
    Array.prototype.forEach.call(this.children, function (b) {
      b.classList.toggle('is-active', b === btn);
    });
    renderBook();
  });

  $('bookHide').addEventListener('change', function () {
    bookHidden = this.checked;
    renderBook();
  });

  $('bookList').addEventListener('click', function (ev) {
    var li = ev.target.closest('.bk');
    if (!li) return;
    if (li.classList.contains('is-hidden')) { li.classList.remove('is-hidden'); return; }
    openSheet(BY_WORD[li.dataset.word.toLowerCase()]);
  });

  $('indexSearch').addEventListener('input', renderIndex);

  $('indexBody').addEventListener('click', function (ev) {
    var row = ev.target.closest('[data-word]');
    if (row) openSheet(BY_WORD[row.dataset.word.toLowerCase()]);
  });

  $('passageList').addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-passage]');
    if (btn) openPassage(btn.dataset.passage);
  });

  $('pShowJa').addEventListener('change', renderPassage);

  $('pSpeakBtn').addEventListener('click', function () {
    if (!activePassage) return;
    speak(activePassage.paras.map(function (x) { return x.en; }).join(' '));
  });

  $('passageBody').addEventListener('click', function (ev) {
    var sp = ev.target.closest('[data-speak]');
    if (sp) { speak(sp.dataset.speak); return; }
    var tw = ev.target.closest('.tw');
    if (tw) openSheet(BY_WORD[tw.dataset.item.toLowerCase()]);
  });

  $('passageItems').addEventListener('click', function (ev) {
    var li = ev.target.closest('.bk');
    if (li) openSheet(BY_WORD[li.dataset.word.toLowerCase()]);
  });

  // ---- 単語の詳細シート ----
  $('sheetBackdrop').addEventListener('click', closeSheet);

  $('sheetPanel').addEventListener('click', function (ev) {
    if (ev.target.id === 'sheetClose') { closeSheet(); return; }
    var sp = ev.target.closest('[data-speak]');
    if (sp) speak(sp.dataset.speak);
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && !$('wordSheet').hidden) closeSheet();
  });

  // ---- 写真表示の切り替え ----
  function syncPhotoBtn() {
    $('photoBtn').textContent = '写真を表示：' + (VocabImage.photosEnabled() ? 'オン' : 'オフ');
  }

  $('photoBtn').addEventListener('click', function () {
    VocabImage.setPhotosEnabled(!VocabImage.photosEnabled());
    syncPhotoBtn();
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
  syncPhotoBtn();
  renderHome();
  show('home');
})();
