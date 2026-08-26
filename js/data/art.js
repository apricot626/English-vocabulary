/* ============================================================
   単語のイメージ図（自作SVG）
   ・外部への通信は一切しない。オフラインでもそのまま出る。
   ・120×80 のキャンバスに、下の4色クラスだけで描く。
       a1 … 主役の面   a2 … 補助の面   a3 … 差し色   ln … 線
     色は CSS 変数なので、ダークモードでは自動で反転する。
   ============================================================ */
window.VOCAB_ART = {};

window.VOCAB_ART.scenes = {

/* ---- 場所・建物 ---- */
building:
  '<rect class="a2" x="14" y="18" width="40" height="50" rx="2"/>' +
  '<rect class="a1" x="58" y="8" width="34" height="60" rx="2"/>' +
  '<g class="a3"><rect x="20" y="24" width="8" height="8"/><rect x="34" y="24" width="8" height="8"/>' +
  '<rect x="20" y="38" width="8" height="8"/><rect x="34" y="38" width="8" height="8"/>' +
  '<rect x="64" y="16" width="9" height="9"/><rect x="78" y="16" width="9" height="9"/>' +
  '<rect x="64" y="31" width="9" height="9"/><rect x="78" y="31" width="9" height="9"/>' +
  '<rect x="64" y="46" width="9" height="9"/><rect x="78" y="46" width="9" height="9"/></g>' +
  '<rect class="ln" x="8" y="68" width="104" height="2"/>',

shop:
  '<rect class="a2" x="18" y="26" width="84" height="42" rx="2"/>' +
  '<path class="a1" d="M14 26 L106 26 L100 12 L20 12 Z"/>' +
  '<g class="a3"><rect x="26" y="38" width="26" height="30"/><rect x="64" y="38" width="30" height="18"/></g>' +
  '<rect class="ln" x="8" y="68" width="104" height="2"/>',

factory:
  '<rect class="a1" x="20" y="36" width="60" height="32"/>' +
  '<path class="a1" d="M80 68 V22 h14 v46 z"/>' +
  '<path class="a2" d="M20 36 l14-12 v12 z M34 36 l14-12 v12 z M48 36 l14-12 v12 z M62 36 l14-12 v12 z"/>' +
  '<g class="a3"><rect x="26" y="48" width="10" height="20"/><rect x="46" y="48" width="10" height="20"/><rect x="66" y="48" width="8" height="20"/></g>' +
  '<circle class="a3" cx="87" cy="14" r="5" opacity=".5"/><circle class="a3" cx="96" cy="8" r="4" opacity=".35"/>' +
  '<rect class="ln" x="8" y="68" width="104" height="2"/>',

warehouse:
  '<path class="a2" d="M12 30 L60 12 L108 30 V68 H12 Z"/>' +
  '<g class="a1"><rect x="22" y="40" width="24" height="12"/><rect x="50" y="40" width="24" height="12"/>' +
  '<rect x="22" y="56" width="24" height="12"/><rect x="50" y="56" width="24" height="12"/>' +
  '<rect x="78" y="48" width="20" height="20"/></g>' +
  '<g class="ln" stroke-width="1.5"><path d="M22 40h52M22 56h52"/></g>' +
  '<rect class="ln" x="8" y="68" width="104" height="2"/>',

hotel:
  '<rect class="a2" x="16" y="40" width="88" height="24" rx="3"/>' +
  '<rect class="a1" x="16" y="28" width="30" height="16" rx="4"/>' +
  '<rect class="a1" x="16" y="52" width="88" height="12" rx="2"/>' +
  '<rect class="a3" x="52" y="34" width="46" height="10" rx="4"/>' +
  '<rect class="ln" x="10" y="64" width="100" height="2"/>' +
  '<rect class="ln" x="14" y="64" width="3" height="8"/><rect class="ln" x="103" y="64" width="3" height="8"/>',

/* ---- 物流 ---- */
box:
  '<path class="a2" d="M24 28 L60 16 L96 28 V60 L60 72 L24 60 Z"/>' +
  '<path class="a1" d="M24 28 L60 40 L96 28 L60 16 Z"/>' +
  '<path class="a3" d="M60 40 L96 28 V60 L60 72 Z" opacity=".55"/>' +
  '<path class="ln" stroke-width="2" fill="none" d="M60 40 V72"/>',

truck:
  '<rect class="a1" x="14" y="26" width="50" height="30" rx="2"/>' +
  '<path class="a2" d="M66 34 h18 l12 12 v10 H66 Z"/>' +
  '<rect class="a3" x="70" y="38" width="12" height="9"/>' +
  '<rect class="ln" x="8" y="60" width="104" height="2"/>' +
  '<circle class="a1" cx="32" cy="60" r="7"/><circle class="a1" cx="84" cy="60" r="7"/>' +
  '<circle class="a3" cx="32" cy="60" r="3"/><circle class="a3" cx="84" cy="60" r="3"/>',

ship:
  '<path class="a1" d="M14 46 h92 l-10 18 H24 Z"/>' +
  '<g class="a2"><rect x="30" y="30" width="18" height="16"/><rect x="52" y="30" width="18" height="16"/><rect x="41" y="14" width="18" height="16"/></g>' +
  '<rect class="a3" x="76" y="26" width="16" height="20"/>' +
  '<path class="ln" stroke-width="2" fill="none" d="M8 70 q10-5 20 0t20 0 20 0 20 0 16 0"/>',

plane:
  '<path class="a1" d="M12 42 L96 30 l12 4 -12 8 -16 4 -22 2 -6 12 -8 1 1-12 -18 2 -6 8 -6-1 3-9 -6-3 z"/>' +
  '<circle class="a3" cx="88" cy="35" r="3"/>' +
  '<path class="ln" stroke-width="1.5" fill="none" opacity=".5" d="M14 58 q22 8 44 4"/>',

suitcase:
  '<rect class="a1" x="26" y="26" width="68" height="44" rx="5"/>' +
  '<path class="a2" d="M48 26 v-8 a4 4 0 0 1 4-4 h16 a4 4 0 0 1 4 4 v8 h-6 v-6 h-12 v6 z"/>' +
  '<rect class="a3" x="26" y="42" width="68" height="8"/>' +
  '<rect class="a3" x="56" y="60" width="8" height="6" rx="1"/>',

/* ---- 人・オフィス ---- */
desk:
  '<rect class="a2" x="16" y="44" width="88" height="5" rx="2"/>' +
  '<rect class="a2" x="22" y="49" width="5" height="19"/><rect class="a2" x="93" y="49" width="5" height="19"/>' +
  '<rect class="a1" x="34" y="24" width="34" height="20" rx="2"/>' +
  '<rect class="a3" x="38" y="28" width="26" height="12"/>' +
  '<rect class="a1" x="74" y="34" width="18" height="10" rx="1"/>' +
  '<rect class="ln" x="8" y="68" width="104" height="2"/>',

meeting:
  '<ellipse class="a2" cx="60" cy="52" rx="42" ry="12"/>' +
  '<g class="a1"><circle cx="26" cy="34" r="7"/><circle cx="60" cy="28" r="7"/><circle cx="94" cy="34" r="7"/></g>' +
  '<g class="a3"><path d="M16 50 a10 10 0 0 1 20 0 z"/><path d="M50 46 a10 10 0 0 1 20 0 z"/><path d="M84 50 a10 10 0 0 1 20 0 z"/></g>',

presentation:
  '<rect class="a2" x="30" y="12" width="76" height="44" rx="2"/>' +
  '<g class="a3"><rect x="38" y="22" width="34" height="4"/><rect x="38" y="32" width="46" height="4"/><rect x="38" y="42" width="26" height="4"/></g>' +
  '<circle class="a1" cx="18" cy="32" r="7"/>' +
  '<path class="a1" d="M8 62 a10 12 0 0 1 20 0 z"/>' +
  '<rect class="ln" x="60" y="56" width="2" height="12"/>',

people:
  '<g class="a1"><circle cx="30" cy="26" r="9"/><circle cx="60" cy="22" r="10"/><circle cx="90" cy="26" r="9"/></g>' +
  '<path class="a2" d="M14 62 a16 18 0 0 1 32 0 z"/>' +
  '<path class="a3" d="M42 66 a18 20 0 0 1 36 0 z"/>' +
  '<path class="a2" d="M74 62 a16 18 0 0 1 32 0 z"/>',

person:
  '<circle class="a1" cx="60" cy="24" r="12"/>' +
  '<path class="a2" d="M34 68 a26 28 0 0 1 52 0 z"/>' +
  '<path class="a3" d="M52 44 h16 v24 h-16 z" opacity=".6"/>',

handshake:
  '<path class="a1" d="M10 38 h26 l14 10 -14 10 H10 z"/>' +
  '<path class="a2" d="M110 38 H84 L70 48 l14 10 h26 z"/>' +
  '<rect class="a3" x="44" y="42" width="32" height="12" rx="6"/>',

/* ---- 書類 ---- */
document:
  '<path class="a2" d="M32 10 h40 l16 16 v46 a2 2 0 0 1-2 2 H32 a2 2 0 0 1-2-2 V12 a2 2 0 0 1 2-2 z"/>' +
  '<path class="a1" d="M72 10 l16 16 h-16 z"/>' +
  '<g class="a3"><rect x="40" y="34" width="38" height="4"/><rect x="40" y="44" width="38" height="4"/><rect x="40" y="54" width="24" height="4"/></g>',

contract:
  '<path class="a2" d="M28 8 h48 l16 16 v50 H28 z"/>' +
  '<path class="a1" d="M76 8 l16 16 h-16 z"/>' +
  '<g class="a3"><rect x="36" y="30" width="42" height="3"/><rect x="36" y="38" width="42" height="3"/><rect x="36" y="46" width="28" height="3"/></g>' +
  '<circle class="a1" cx="76" cy="60" r="10"/>' +
  '<path class="ln" stroke-width="2" fill="none" d="M34 62 q8-8 14 0t14-4"/>',

invoice:
  '<path class="a2" d="M30 8 h60 v64 l-10-6 -10 6 -10-6 -10 6 -10-6 -10 6 z"/>' +
  '<g class="a3"><rect x="38" y="22" width="30" height="4"/><rect x="38" y="32" width="44" height="3"/><rect x="38" y="40" width="44" height="3"/></g>' +
  '<path class="a1" d="M64 48 h18 v14 H64 z"/>',

papers:
  '<rect class="a3" x="20" y="20" width="52" height="52" rx="2" transform="rotate(-8 46 46)"/>' +
  '<rect class="a2" x="34" y="14" width="52" height="52" rx="2" transform="rotate(5 60 40)"/>' +
  '<rect class="a1" x="30" y="24" width="52" height="52" rx="2"/>' +
  '<g class="a3" opacity=".8"><rect x="38" y="36" width="36" height="3"/><rect x="38" y="45" width="36" height="3"/><rect x="38" y="54" width="22" height="3"/></g>',

clipboard:
  '<rect class="a2" x="30" y="12" width="60" height="62" rx="4"/>' +
  '<rect class="a1" x="48" y="6" width="24" height="12" rx="3"/>' +
  '<g class="a3"><rect x="52" y="32" width="30" height="4"/><rect x="52" y="44" width="30" height="4"/><rect x="52" y="56" width="30" height="4"/></g>' +
  '<g class="ln" stroke-width="3" fill="none" stroke-linecap="round"><path d="M38 34 l3 3 6-7"/><path d="M38 46 l3 3 6-7"/><path d="M38 58 l3 3 6-7"/></g>',

form:
  '<rect class="a2" x="24" y="12" width="60" height="60" rx="3"/>' +
  '<g class="a3"><rect x="32" y="24" width="44" height="4"/><rect x="32" y="36" width="44" height="4"/><rect x="32" y="48" width="26" height="4"/></g>' +
  '<path class="a1" d="M78 58 l18-18 8 8 -18 18 -10 2 z"/>',

book:
  '<path class="a2" d="M10 18 q24-8 48 0 v48 q-24-8-48 0 z"/>' +
  '<path class="a1" d="M110 18 q-24-8-48 0 v48 q24-8 48 0 z"/>' +
  '<rect class="a3" x="57" y="18" width="6" height="48"/>' +
  '<g class="ln" stroke-width="1.5" fill="none" opacity=".7"><path d="M20 32h28M20 42h28M70 32h28M70 42h28"/></g>',

/* ---- 時間 ---- */
clock:
  '<circle class="a2" cx="60" cy="42" r="30"/>' +
  '<circle class="a1" cx="60" cy="42" r="24"/>' +
  '<g class="ln" stroke-width="3" fill="none" stroke-linecap="round"><path d="M60 42 V26"/><path d="M60 42 l13 8"/></g>' +
  '<circle class="a3" cx="60" cy="42" r="3"/>',

calendar:
  '<rect class="a2" x="20" y="16" width="80" height="58" rx="4"/>' +
  '<rect class="a1" x="20" y="16" width="80" height="14" rx="4"/>' +
  '<rect class="ln" x="34" y="8" width="4" height="14" rx="2"/><rect class="ln" x="82" y="8" width="4" height="14" rx="2"/>' +
  '<g class="a3"><rect x="28" y="38" width="10" height="9"/><rect x="44" y="38" width="10" height="9"/><rect x="60" y="38" width="10" height="9"/><rect x="76" y="38" width="10" height="9"/>' +
  '<rect x="28" y="54" width="10" height="9"/><rect x="44" y="54" width="10" height="9"/><rect x="76" y="54" width="10" height="9"/></g>' +
  '<rect class="ln" x="60" y="54" width="10" height="9"/>',

hourglass:
  '<path class="a2" d="M34 10 h52 v10 L66 42 l20 22 v10 H34 v-10 l20-22 -20-22 z"/>' +
  '<path class="a1" d="M40 16 h40 v4 L60 40 40 20 z"/>' +
  '<path class="a3" d="M60 46 l16 18 v4 H44 v-4 z"/>' +
  '<rect class="ln" x="30" y="6" width="60" height="4" rx="2"/><rect class="ln" x="30" y="70" width="60" height="4" rx="2"/>',

/* ---- お金 ---- */
money:
  '<rect class="a2" x="16" y="24" width="70" height="40" rx="4"/>' +
  '<circle class="a3" cx="51" cy="44" r="12"/>' +
  '<circle class="a1" cx="88" cy="52" r="16"/>' +
  '<circle class="a3" cx="88" cy="52" r="10" opacity=".6"/>',

card:
  '<rect class="a2" x="14" y="22" width="92" height="52" rx="6"/>' +
  '<rect class="a1" x="14" y="34" width="92" height="10"/>' +
  '<rect class="a3" x="24" y="52" width="24" height="12" rx="2"/>' +
  '<g class="a3"><rect x="60" y="58" width="36" height="4" rx="2"/></g>',

chartup:
  '<g class="a2"><rect x="20" y="52" width="14" height="20"/><rect x="40" y="42" width="14" height="30"/></g>' +
  '<g class="a1"><rect x="60" y="30" width="14" height="42"/><rect x="80" y="16" width="14" height="56"/></g>' +
  '<path class="a3" d="M18 48 L44 34 L66 24 L96 8 l-14 0 4 8 z" opacity=".9"/>',

chartdown:
  '<g class="a1"><rect x="20" y="16" width="14" height="56"/><rect x="40" y="30" width="14" height="42"/></g>' +
  '<g class="a2"><rect x="60" y="44" width="14" height="28"/><rect x="80" y="54" width="14" height="18"/></g>' +
  '<path class="a3" d="M20 12 L50 30 L74 42 L100 58 l-2-12 -10 6 z" opacity=".9"/>',

scales:
  '<rect class="ln" x="58" y="14" width="4" height="52"/>' +
  '<rect class="ln" x="40" y="66" width="40" height="4" rx="2"/>' +
  '<rect class="ln" x="20" y="18" width="80" height="4" rx="2"/>' +
  '<path class="a1" d="M8 30 h32 l-8 14 h-16 z"/>' +
  '<path class="a2" d="M80 30 h32 l-8 14 h-16 z"/>' +
  '<g class="ln" stroke-width="1.5" fill="none"><path d="M24 22v8M96 22v8"/></g>',

/* ---- 伝達 ---- */
megaphone:
  '<path class="a1" d="M20 34 h20 l40-18 v52 l-40-18 h-20 z"/>' +
  '<rect class="a2" x="40" y="52" width="12" height="20" rx="3"/>' +
  '<g class="a3"><path d="M86 30 h14v5H86z"/><path d="M86 42 h18v5H86z"/><path d="M86 54 h14v5H86z"/></g>',

bell:
  '<path class="a1" d="M60 12 a22 22 0 0 1 22 22 v16 l8 10 H30 l8-10 V34 a22 22 0 0 1 22-22 z"/>' +
  '<circle class="a2" cx="60" cy="10" r="5"/>' +
  '<path class="a3" d="M50 60 a10 10 0 0 0 20 0 z"/>',

mail:
  '<rect class="a2" x="16" y="20" width="88" height="52" rx="4"/>' +
  '<path class="a1" d="M16 24 L60 52 L104 24 v-4 H16 z"/>' +
  '<path class="ln" stroke-width="2" fill="none" d="M16 70 L48 46 M104 70 L72 46"/>',

magnifier:
  '<rect class="a2" x="24" y="12" width="52" height="56" rx="3"/>' +
  '<g class="a3"><rect x="32" y="24" width="30" height="3"/><rect x="32" y="32" width="30" height="3"/><rect x="32" y="40" width="18" height="3"/></g>' +
  '<circle class="a1" cx="72" cy="46" r="20" opacity=".85"/>' +
  '<circle class="ln" cx="72" cy="46" r="20" fill="none" stroke-width="4"/>' +
  '<rect class="ln" x="84" y="60" width="20" height="6" rx="3" transform="rotate(40 84 60)"/>',

/* ---- 判断 ---- */
check:
  '<circle class="a1" cx="60" cy="40" r="30"/>' +
  '<path class="ln" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" d="M46 41 l10 11 20-23"/>',

cross:
  '<circle class="a2" cx="60" cy="40" r="30"/>' +
  '<path class="ln" stroke-width="7" fill="none" stroke-linecap="round" d="M48 28 l24 24 M72 28 l-24 24"/>',

warning:
  '<path class="a1" d="M60 8 L108 70 H12 Z"/>' +
  '<rect class="ln" x="56" y="28" width="8" height="22" rx="3"/>' +
  '<circle class="ln" cx="60" cy="58" r="4"/>',

lock:
  '<rect class="a1" x="28" y="34" width="64" height="40" rx="6"/>' +
  '<path class="ln" stroke-width="7" fill="none" d="M42 34 V24 a18 18 0 0 1 36 0 v10"/>' +
  '<circle class="a3" cx="60" cy="50" r="7"/><rect class="a3" x="57" y="52" width="6" height="12" rx="3"/>',

shield:
  '<path class="a1" d="M60 6 l38 14 v22 c0 18-16 30-38 36 -22-6-38-18-38-36 V20 z"/>' +
  '<path class="a3" d="M60 16 l26 10 v16 c0 12-11 21-26 26 z" opacity=".55"/>',

/* ---- 作業 ---- */
gear:
  '<path class="a1" d="M52 6 h16 l3 11 8 4 10-6 11 11 -6 10 4 8 11 3 v16 l-11 3 -4 8 6 10 -11 11 -10-6 -8 4 -3 11 h-16 l-3-11 -8-4 -10 6 -11-11 6-10 -4-8 -11-3 v-16 l11-3 4-8 -6-10 11-11 10 6 8-4 z"/>' +
  '<circle class="a3" cx="60" cy="40" r="14"/>',

tools:
  '<path class="a1" d="M18 62 L52 28 a14 14 0 0 1 18-18 l-10 10 6 6 10-10 a14 14 0 0 1-18 18 L24 68 z"/>' +
  '<path class="a2" d="M92 8 l12 12 -30 30 -12-12 z"/>' +
  '<rect class="a3" x="62" y="52" width="14" height="14" rx="2" transform="rotate(45 69 59)"/>',

crane:
  '<rect class="ln" x="24" y="12" width="6" height="56"/>' +
  '<rect class="a1" x="14" y="10" width="76" height="6"/>' +
  '<path class="ln" stroke-width="2" fill="none" d="M74 16 v20"/>' +
  '<rect class="a2" x="62" y="36" width="24" height="20" rx="2"/>' +
  '<path class="a3" d="M14 68 h30 l-15-16 z"/>' +
  '<rect class="ln" x="8" y="68" width="104" height="2"/>',

barrier:
  '<rect class="a1" x="14" y="30" width="92" height="14" rx="2"/>' +
  '<g class="a3"><rect x="20" y="30" width="12" height="14"/><rect x="44" y="30" width="12" height="14"/><rect x="68" y="30" width="12" height="14"/><rect x="92" y="30" width="12" height="14"/></g>' +
  '<path class="a2" d="M24 44 l-8 24 h10 l8-24 z M96 44 l8 24 h-10 l-8-24 z"/>' +
  '<rect class="ln" x="8" y="68" width="104" height="2"/>',

/* ---- 変化・関係 ---- */
arrows:
  '<path class="a1" d="M8 40 h44 v-12 l24 20 -24 20 v-12 H8 z"/>' +
  '<path class="a2" d="M84 14 h14 v52 h-14 z" opacity=".5"/>' +
  '<circle class="a3" cx="103" cy="40" r="9"/>',

cycle:
  '<path class="a1" d="M60 10 a30 30 0 0 1 28 40 l-10-4 a20 20 0 0 0-18-26 z"/>' +
  '<path class="a2" d="M60 70 a30 30 0 0 1-28-40 l10 4 a20 20 0 0 0 18 26 z"/>' +
  '<path class="a3" d="M56 4 l14 6 -14 6 z"/><path class="a3" d="M64 76 l-14-6 14-6 z"/>',

puzzle:
  '<path class="a1" d="M14 14 h30 v8 a6 6 0 0 0 12 0 v-8 h0 v30 h-8 a6 6 0 0 0 0 12 h8 v0 H14 z"/>' +
  '<path class="a2" d="M62 20 h30 v46 H62 v-8 a6 6 0 0 0-12 0 v8 H50 V36 h8 a6 6 0 0 0 0-12 h-8 v-4 z" opacity=".9"/>',

bulb:
  '<circle class="a1" cx="60" cy="34" r="24"/>' +
  '<rect class="a2" x="50" y="56" width="20" height="12" rx="2"/>' +
  '<rect class="a3" x="52" y="68" width="16" height="5" rx="2"/>' +
  '<g class="ln" stroke-width="3" stroke-linecap="round" fill="none"><path d="M60 4 v6M22 34 h-6M98 34 h6M32 12 l-4-4M88 12 l4-4"/></g>',

target:
  '<circle class="a2" cx="56" cy="42" r="30"/>' +
  '<circle class="a1" cx="56" cy="42" r="20"/>' +
  '<circle class="a3" cx="56" cy="42" r="9"/>' +
  '<path class="ln" stroke-width="3" fill="none" d="M56 42 L106 8"/>' +
  '<path class="a1" d="M96 6 h14 v14 z"/>',

sprout:
  '<path class="a2" d="M34 66 h52 l-6 8 H40 z"/>' +
  '<rect class="ln" x="58" y="30" width="4" height="36"/>' +
  '<path class="a1" d="M58 44 q-26-4-26-24 q22 0 26 24 z"/>' +
  '<path class="a3" d="M62 38 q26-6 26-26 q-22 2-26 26 z"/>'
};

/* ============================================================
   項目 → 絵柄の割り当て
   ============================================================ */
window.VOCAB_ART.map = {
  /* ---- TOEIC 600点レベル ---- */
  'announce': 'megaphone', 'apply': 'form', 'appointment': 'calendar', 'approve': 'check',
  'arrange': 'clipboard', 'assemble': 'puzzle', 'assign': 'clipboard', 'attach': 'papers',
  'attend': 'meeting', 'available': 'check', 'branch': 'shop', 'brochure': 'book',
  'budget': 'money', 'cancel': 'cross', 'catalog': 'book', 'client': 'handshake',
  'colleague': 'people', 'complaint': 'warning', 'conference': 'presentation', 'confirm': 'check',
  'contract': 'contract', 'customer': 'shop', 'deadline': 'clock', 'delay': 'hourglass',
  'deliver': 'truck', 'department': 'desk', 'deposit': 'money', 'discount': 'money',
  'display': 'shop', 'employee': 'person', 'equipment': 'gear', 'estimate': 'invoice',
  'expense': 'invoice', 'facility': 'building', 'furniture': 'desk', 'handle': 'tools',
  'headquarters': 'building', 'install': 'tools', 'instruction': 'book', 'interview': 'meeting',
  'invoice': 'invoice', 'issue': 'warning', 'luggage': 'suitcase', 'maintenance': 'tools',
  'manufacture': 'factory', 'negotiate': 'handshake', 'notify': 'bell', 'offer': 'handshake',
  'order': 'box', 'package': 'box', 'paperwork': 'papers', 'passenger': 'plane',
  'permit': 'lock', 'postpone': 'hourglass', 'promote': 'chartup', 'provide': 'handshake',
  'purchase': 'card', 'receipt': 'invoice', 'recruit': 'people', 'refund': 'money',
  'register': 'form', 'renew': 'cycle', 'replace': 'cycle', 'request': 'mail',
  'require': 'clipboard', 'reserve': 'calendar', 'resume': 'document', 'retail': 'shop',
  'review': 'magnifier', 'schedule': 'calendar', 'shipment': 'ship', 'staff': 'people',
  'submit': 'form', 'supervisor': 'person', 'supply': 'warehouse', 'survey': 'clipboard',
  'transfer': 'arrows', 'vendor': 'shop', 'warehouse': 'warehouse', 'workshop': 'presentation',

  /* ---- TOEIC 730点レベル ---- */
  'accommodate': 'hotel', 'adjacent': 'building', 'affordable': 'money', 'alternative': 'arrows',
  'anticipate': 'bulb', 'appropriate': 'check', 'approximately': 'scales', 'assess': 'magnifier',
  'authorize': 'lock', 'beneficial': 'sprout', 'collaborate': 'handshake', 'commence': 'arrows',
  'competitive': 'target', 'complimentary': 'money', 'comply': 'clipboard', 'comprehensive': 'book',
  'confidential': 'lock', 'consecutive': 'calendar', 'considerable': 'chartup', 'consult': 'meeting',
  'coordinate': 'gear', 'deduct': 'chartdown', 'demonstrate': 'presentation', 'designate': 'clipboard',
  'distribute': 'truck', 'duplicate': 'papers', 'efficient': 'gear', 'eligible': 'check',
  'endorse': 'megaphone', 'enhance': 'chartup', 'ensure': 'shield', 'evaluate': 'scales',
  'exceed': 'chartup', 'exclusive': 'lock', 'expand': 'crane', 'expertise': 'bulb',
  'extensive': 'book', 'finalize': 'check', 'flexible': 'arrows', 'generate': 'gear',
  'implement': 'tools', 'incorporate': 'puzzle', 'initiate': 'arrows', 'inquiry': 'mail',
  'inventory': 'warehouse', 'itinerary': 'plane', 'mandatory': 'warning', 'modify': 'form',
  'objective': 'target', 'obtain': 'handshake', 'outstanding': 'target', 'overhaul': 'tools',
  'oversee': 'magnifier', 'participant': 'people', 'permanent': 'shield', 'personnel': 'people',
  'potential': 'sprout', 'preliminary': 'document', 'prior': 'hourglass', 'procedure': 'clipboard',
  'prohibit': 'cross', 'prospective': 'sprout', 'qualify': 'check', 'regarding': 'mail',
  'reimburse': 'money', 'relevant': 'puzzle', 'reliable': 'shield', 'relocate': 'truck',
  'remind': 'bell', 'renovation': 'crane', 'revise': 'form', 'subsequent': 'arrows',
  'sufficient': 'scales', 'tentative': 'hourglass', 'terminate': 'cross', 'transaction': 'card',
  'utilize': 'tools', 'vacancy': 'desk', 'verify': 'magnifier', 'warranty': 'shield',

  /* ---- TOEIC 860点レベル ---- */
  'accrue': 'chartup', 'acquisition': 'handshake', 'adhere': 'clipboard', 'alleviate': 'sprout',
  'allocate': 'scales', 'ambiguous': 'warning', 'appraisal': 'scales', 'arbitrary': 'cross',
  'ascertain': 'magnifier', 'attribute': 'arrows', 'coincide': 'puzzle', 'commensurate': 'scales',
  'compelling': 'megaphone', 'compensate': 'money', 'compile': 'papers', 'concise': 'document',
  'conform': 'clipboard', 'consolidate': 'puzzle', 'contingency': 'shield', 'culminate': 'target',
  'curtail': 'chartdown', 'defer': 'hourglass', 'delegate': 'people', 'deploy': 'arrows',
  'deteriorate': 'chartdown', 'deviate': 'arrows', 'disclose': 'megaphone', 'discrepancy': 'scales',
  'diversify': 'arrows', 'elicit': 'magnifier', 'endeavor': 'target', 'entail': 'puzzle',
  'exempt': 'cross', 'expedite': 'truck', 'feasible': 'check', 'forfeit': 'chartdown',
  'hinder': 'barrier', 'imperative': 'warning', 'inadvertently': 'warning', 'incentive': 'money',
  'incur': 'chartdown', 'indispensable': 'lock', 'inherent': 'puzzle', 'innovative': 'bulb',
  'integrate': 'puzzle', 'intermittent': 'cycle', 'jeopardize': 'warning', 'lucrative': 'chartup',
  'meticulous': 'magnifier', 'mitigate': 'shield', 'negligible': 'chartdown', 'nominal': 'money',
  'obsolete': 'cross', 'offset': 'scales', 'optimal': 'target', 'outsource': 'handshake',
  'pertinent': 'puzzle', 'preclude': 'barrier', 'preliminarily': 'document', 'proficiency': 'target',
  'prolong': 'hourglass', 'proximity': 'building', 'prudent': 'shield', 'reciprocal': 'cycle',
  'rectify': 'tools', 'redundant': 'cross', 'replenish': 'warehouse', 'scrutinize': 'magnifier',
  'stipulate': 'contract', 'streamline': 'arrows', 'substantial': 'chartup', 'supersede': 'cycle',
  'surplus': 'warehouse', 'sustainable': 'sprout', 'tangible': 'box', 'thorough': 'magnifier',
  'unanimous': 'people', 'versatile': 'gear', 'viable': 'check', 'waive': 'cross',

  /* ---- 句動詞・熟語 ---- */
  'account for': 'scales', 'ahead of schedule': 'clock', 'as of': 'calendar', 'at the latest': 'clock',
  'be about to': 'hourglass', 'be aware of': 'bulb', 'be entitled to': 'check', 'be in charge of': 'person',
  'be responsible for': 'clipboard', 'be subject to': 'lock', 'be supposed to': 'clipboard', 'break down': 'tools',
  'bring in': 'arrows', 'bring up': 'megaphone', 'call off': 'cross', 'carry out': 'tools',
  'catch up on': 'clock', 'check in': 'hotel', 'come across': 'bulb', 'come up with': 'bulb',
  'count on': 'handshake', 'cut back on': 'chartdown', 'deal with': 'tools', 'drop by': 'shop',
  'drop off': 'truck', 'due to': 'arrows', 'end up': 'target', 'fall behind': 'chartdown',
  'figure out': 'puzzle', 'fill in for': 'people', 'fill out': 'form', 'follow up on': 'mail',
  'free of charge': 'money', 'get back to': 'mail', 'get in touch with': 'mail', 'get rid of': 'cross',
  'give out': 'papers', 'go ahead with': 'arrows', 'go over': 'magnifier', 'hand in': 'form',
  'hand out': 'papers', 'hold off': 'hourglass', 'in addition to': 'puzzle', 'in advance': 'calendar',
  'in the meantime': 'hourglass', 'keep in mind': 'bulb', 'keep track of': 'chartup', 'lay off': 'chartdown',
  'look forward to': 'sprout', 'look into': 'magnifier', 'make sure': 'check', 'make up for': 'scales',
  'no later than': 'clock', 'on behalf of': 'person', 'on schedule': 'calendar', 'on short notice': 'bell',
  'out of stock': 'warehouse', 'pick up': 'truck', 'point out': 'megaphone', 'put off': 'hourglass',
  'put together': 'puzzle', 'refer to': 'book', 'result in': 'arrows', 'run into': 'barrier',
  'run out of': 'warehouse', 'set aside': 'box', 'set up': 'tools', 'sign up for': 'form',
  'sort out': 'clipboard', 'take advantage of': 'target', 'take care of': 'shield', 'take over': 'handshake',
  'take place': 'calendar', 'turn down': 'cross', 'turn in': 'form', 'up to date': 'cycle',
  'upon request': 'mail', 'with regard to': 'mail', 'work out': 'check', 'wrap up': 'box'
};

