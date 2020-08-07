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

const JYUTPING_TONE_TO_YALE_COMBINING_ACCENT = {
  1: "\u0304",
  2: "\u0301",
  3: "",
  4: "\u0300",
  5: "\u0301",
  6: ""
};

const initials = Object.values(JYUTPING_INITIAL_TO_YALE_INITIAL);
const finals = Object.values(JYUTPING_FINAL_TO_YALE_FINAL);
const tones = [1,2,3,4,5,6];

const output = [];
initials.forEach((initial) => {
  finals.forEach((final) => {
    tones.forEach((tone) => {
      let yaleInitial = initial;
      let yaleFinal = final;

      if (initial.indexOf("y") === 0 && final.indexOf("y") === 0) {
        return;
      }

      if (["m", "ng"].includes(final) && !["", "h"].includes(initial)) {
        return;
      }

      // Identify the position in the strings where we need to make our changes.
      let accentIndex, insertionPoint;
    
      if (yaleFinal === "m") {
        accentIndex = 1;
        insertionPoint = 1;
      } else if (yaleFinal === "ng") {
        accentIndex = 2;
        insertionPoint = 2;
      } else {
        const firstVowelMatch = /[aeiou]/.exec(yaleFinal);
        const lastVowelMatch = /^(.*[aeiou]*[aeiou]{1})/.exec(yaleFinal);
        accentIndex = firstVowelMatch.index + 1;
        insertionPoint = lastVowelMatch[1].length;
      }
    
      // Insert the combining accent directly following the vowel.
      const combiningAccent = JYUTPING_TONE_TO_YALE_COMBINING_ACCENT[tone];
      yaleFinal = yaleFinal.substring(0, accentIndex) + combiningAccent + yaleFinal.substring(accentIndex);
    
      // For low tones, insert the "h" in the correct position.
      if (tone > 3) {
        let adjustedInsertionPoint = insertionPoint + combiningAccent.length;
        yaleFinal = yaleFinal.substring(0, adjustedInsertionPoint) + 'h' + yaleFinal.substring(adjustedInsertionPoint);
      }
    
      output.push(`${yaleInitial}${yaleFinal}`.replace(/[\(\)]/g, '').normalize());
    });
  });
});

const uniques = [...new Set(output).values()].sort();;
const complete = uniques.map((word) => {
  return word + '/A';
});

console.log(complete.length + '\n' + complete.join('\n'));