#!/usr/bin/env node

const JYUTPING_INITIAL_TO_YALE_INITIAL = {
  "-": "",
  "b": "b",
  "p": "p",
  "m": "m",
  "f": "f",
  "d": "d",
  "t": "t",
  "n": "n",
  "l": "l",
  "g": "g",
  "k": "k",
  "ng": "ng",
  "h": "h",
  "gw": "gw",
  "kw": "kw",
  "w": "w",
  "z": "j",
  "c": "ch",
  "s": "s",
  "j": "y"
};

const JYUTPING_FINAL_TO_YALE_FINAL = {
  "aa": "a",
  "aai": "aai",
  "aau": "aau",
  "aam": "aam",
  "aan": "aan",
  "aang": "aang",
  "aap": "aap",
  "aat": "aat",
  "aak": "aak",
  "ai": "ai",
  "au": "au",
  "am": "am",
  "an": "an",
  "ang": "ang",
  "ap": "ap",
  "at": "at",
  "ak": "ak",
  "e": "e",
  "ei": "ei",
  "eu": "(eu)",
  "em": "(em)",
  "eng": "eng",
  "ep": "(ep)",
  "ek": "ek",
  "i": "i",
  "iu": "iu",
  "im": "im",
  "in": "in",
  "ing": "ing",
  "ip": "ip",
  "it": "it",
  "ik": "ik",
  "o": "o",
  "oi": "oi",
  "ou": "ou",
  "on": "on",
  "ong": "ong",
  "ot": "ot",
  "ok": "ok",
  "oe": "eu",
  "oeng": "eung",
  "oek": "euk",
  "eoi": "eui",
  "eon": "eun",
  "eot": "eut",
  "u": "u",
  "ui": "ui",
  "un": "un",
  "ung": "ung",
  "ut": "ut",
  "uk": "uk",
  "yu": "yu",
  "yun": "yun",
  "yut": "yut",
  "m": "m",
  "ng": "ng"
};

const initials = Object.keys(JYUTPING_INITIAL_TO_YALE_INITIAL);
const finals = Object.keys(JYUTPING_FINAL_TO_YALE_FINAL);
const tones = [1,2,3,4,5,6];

const output = [];
initials.forEach((initial) => {
  finals.forEach((final) => {
    tones.forEach((tone) => {
      if (["m", "ng"].includes(final) && !["-", "h"].includes(initial)) {
        return;
      }
    
      output.push(`${initial}${final}${tone}`.replace(/[\-\(\)]/g, ''));
    });
  });
});

const uniques = [...new Set(output).values()].sort();;
const complete = uniques.map((word) => {
  return word + '/A';
});

console.log(complete.length + '\n' + complete.join('\n'));