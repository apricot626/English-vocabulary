/* ============================================================
   単語のイメージ図を描く
   ・全部その場で作る自作SVG。外部への通信は一切しない。
   ・絵柄は js/data/art.js、絵文字は js/data/images.js から取る。
   ・絵柄ごとに色味を変えて、並べたときに見分けがつくようにしている。
   ============================================================ */
window.VocabImage = (function () {
  'use strict';

  var ART = window.VOCAB_ART || { scenes: {}, map: {} };
  var EMOJI = window.VOCAB_IMAGES || {};
  var TINTS = 5;   // css 側に .wimg--t0 〜 .wimg--t4 がある

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /** 絵柄の名前から色味を決める（同じ絵柄はいつも同じ色になる） */
  function tintOf(scene) {
    var h = 0;
    for (var i = 0; i < scene.length; i++) h = (h * 31 + scene.charCodeAt(i)) % 9973;
    return h % TINTS;
  }

  function emojiOf(word) {
    var meta = EMOJI[word];
    return (meta && meta.e) || '';
  }

  function sceneOf(word) {
    return ART.map[word] || '';
  }

  /** 絵柄そのものの SVG 文字列（一覧などで使い回す） */
  function svgFor(word) {
    var scene = sceneOf(word);
    var body = ART.scenes[scene];
    if (!body) return '';
    return '<svg class="wimg__art" viewBox="0 0 120 80" role="img" aria-hidden="true" ' +
      'preserveAspectRatio="xMidYMid meet">' + body + '</svg>';
  }

  /**
   * 単語のイメージを描く。
   * @param {HTMLElement} el   描画先（中身は置き換えられる）
   * @param {string} word      見出し語
   */
  function render(el, word) {
    if (!el) return;
    var scene = sceneOf(word);
    var emoji = emojiOf(word);
    var svg = svgFor(word);

    el.className = 'wimg' + (scene ? ' wimg--t' + tintOf(scene) : '');

    if (!svg) {
      // 絵柄が割り当てられていない語（通常はここには来ない）
      el.innerHTML = '<span class="wimg__solo">' + esc(emoji || word.charAt(0).toUpperCase()) + '</span>';
      return;
    }

    el.innerHTML = svg +
      (emoji ? '<span class="wimg__badge" aria-hidden="true">' + esc(emoji) + '</span>' : '');
  }

  /** 一覧に並べる小さいイメージを HTML 文字列で返す */
  function thumbHtml(word) {
    var scene = sceneOf(word);
    var emoji = emojiOf(word);
    var svg = svgFor(word);
    if (!svg) {
      return '<span class="wimg wimg--thumb"><span class="wimg__solo">' + esc(emoji) + '</span></span>';
    }
    return '<span class="wimg wimg--thumb wimg--t' + tintOf(scene) + '">' + svg +
      (emoji ? '<span class="wimg__badge" aria-hidden="true">' + esc(emoji) + '</span>' : '') +
      '</span>';
  }

  return {
    render: render,
    thumbHtml: thumbHtml,
    svgFor: svgFor,
    emojiOf: emojiOf,
    sceneOf: sceneOf
  };
})();
