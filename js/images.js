/* ============================================================
   単語のイメージ画像ローダー
   ・まず絵文字タイルを即座に描く（オフラインでもここは必ず出る）
   ・q が設定されていれば Wikimedia Commons から写真を取りに行き、
     取れたら差し替える。失敗しても絵文字のまま何も壊れない。
   ・結果は localStorage にキャッシュして、次回以降は通信しない。
   ============================================================ */
window.VocabImage = (function () {
  'use strict';

  var CACHE_KEY = 'toeic-tango.imgcache.v2';
  var PREF_KEY = 'toeic-tango.photos.v1';
  var API = 'https://commons.wikimedia.org/w/api.php';
  var CACHE_DAYS = 30;
  var MAX_PARALLEL = 3;

  var DATA = window.VOCAB_IMAGES || {};
  var cache = loadCache();
  var inflight = {};   // word -> Promise
  var running = 0;
  var queue = [];

  function loadCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      var data = raw ? JSON.parse(raw) : null;
      return data && typeof data === 'object' ? data : {};
    } catch (err) {
      return {};
    }
  }

  var saveTimer = null;
  function saveCache() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      } catch (err) {
        /* 容量オーバーなどでは古いものを捨ててから諦める */
        cache = {};
        try { localStorage.removeItem(CACHE_KEY); } catch (e) {}
      }
    }, 400);
  }

  /** 写真を出すかどうか（既定はオン） */
  function photosEnabled() {
    return localStorage.getItem(PREF_KEY) !== 'off';
  }

  function setPhotosEnabled(on) {
    localStorage.setItem(PREF_KEY, on ? 'on' : 'off');
  }

  function fresh(entry) {
    return entry && (Date.now() - entry.ts) < CACHE_DAYS * 86400000;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /** タグから中身だけ取り出す（Commons の説明文は HTML で返ってくる） */
  function plain(html) {
    var d = document.createElement('div');
    d.innerHTML = String(html || '');
    return (d.textContent || '').trim();
  }

  function fetchPhoto(word) {
    var meta = DATA[word];
    if (!meta || !meta.q) return Promise.resolve(null);
    if (inflight[word]) return inflight[word];

    var url = API +
      '?action=query&format=json&origin=*' +
      '&generator=search&gsrnamespace=6&gsrlimit=1' +
      '&gsrsearch=' + encodeURIComponent(meta.q + ' filetype:bitmap') +
      '&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=480';

    var p = new Promise(function (resolve) {
      var done = false;
      var timer = setTimeout(function () { if (!done) { done = true; resolve(null); } }, 8000);

      fetch(url, { mode: 'cors', credentials: 'omit' })
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (json) {
          if (done) return;
          var pages = json && json.query && json.query.pages;
          var page = pages && pages[Object.keys(pages)[0]];
          var info = page && page.imageinfo && page.imageinfo[0];
          if (!info || !info.thumburl) { finish(null); return; }
          var ex = info.extmetadata || {};
          finish({
            src: info.thumburl,
            page: info.descriptionurl || '',
            license: plain(ex.LicenseShortName && ex.LicenseShortName.value) || '',
            author: plain(ex.Artist && ex.Artist.value).slice(0, 60)
          });
        })
        .catch(function () { finish(null); });

      function finish(v) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(v);
      }
    });

    inflight[word] = p;
    return p;
  }

  /** 同時接続を絞って順番に取りにいく */
  function schedule(word) {
    return new Promise(function (resolve) {
      queue.push({ word: word, resolve: resolve });
      pump();
    });
  }

  function pump() {
    while (running < MAX_PARALLEL && queue.length) {
      var job = queue.shift();
      running++;
      fetchPhoto(job.word).then(function (r) {
        running--;
        job.resolve(r);
        pump();
      });
    }
  }

  /**
   * 単語のイメージを描く。
   * @param {HTMLElement} el   描画先（中身は置き換えられる）
   * @param {string} word      見出し語
   * @param {boolean} allowPhoto 写真を取りに行くか（一覧では false にして通信を抑える）
   */
  function render(el, word, allowPhoto) {
    var meta = DATA[word] || {};
    var emoji = meta.e || word.charAt(0).toUpperCase();
    el.className = 'wimg';
    el.innerHTML = '<span class="wimg__emoji">' + esc(emoji) + '</span>';

    if (!allowPhoto || !photosEnabled() || !meta.q) return;

    var hit = cache[word];
    if (fresh(hit)) {
      if (hit.src) paint(el, hit, emoji);
      return;
    }

    schedule(word).then(function (r) {
      cache[word] = r ? {
        src: r.src, page: r.page, license: r.license, author: r.author, ts: Date.now()
      } : { src: null, ts: Date.now() };
      saveCache();
      if (r) paint(el, r, emoji);
    });
  }

  function paint(el, info, emoji) {
    var img = new Image();
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.onload = function () {
      el.classList.add('wimg--photo');
      el.innerHTML = '';
      el.appendChild(img);
      if (info.license) {
        var cap = document.createElement('a');
        cap.className = 'wimg__credit';
        cap.href = info.page || '#';
        cap.target = '_blank';
        cap.rel = 'noopener noreferrer';
        cap.textContent = (info.author ? info.author + ' / ' : '') + info.license + ' — Wikimedia Commons';
        el.appendChild(cap);
      }
    };
    img.onerror = function () {
      el.innerHTML = '<span class="wimg__emoji">' + esc(emoji) + '</span>';
    };
    img.src = info.src;
  }

  function clearCache() {
    cache = {};
    try { localStorage.removeItem(CACHE_KEY); } catch (err) {}
  }

  return {
    render: render,
    photosEnabled: photosEnabled,
    setPhotosEnabled: setPhotosEnabled,
    clearCache: clearCache,
    emojiOf: function (word) {
      var meta = DATA[word];
      return (meta && meta.e) || '';
    }
  };
})();
