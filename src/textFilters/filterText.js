// import { Filter } from "bad-words"
// import persianBadWords from "@/textFilters/persianBadWords" // یا مسیر درستش

// function normalizeText(text) {
//   return text
//     .replace(/[\u200C\s]+/g, "") // حذف فاصله و نیم‌فاصله
//     .replace(/[ـ]+/g, "") // حذف کشیده
//     .toLowerCase()
// }

// const filter = new Filter()
// filter.addWords(...persianBadWords.map(normalizeText))

// export function containsBadWords(text) {
//   const normalized = normalizeText(text)
//   return filter.isProfane(normalized)
// }
// src/textFilters/filterText.js
// import { Filter } from "bad-words"
// import persianBadWords from "./persianBadWords"

// function normalizeText(text) {
//   return text
//     .replace(/[\u200C\s]+/g, "") // حذف فاصله و نیم‌فاصله
//     .replace(/[ـ]+/g, "") // حذف کشیده
//     .toLowerCase()
// }

// const filter = new Filter()
// filter.addWords(...persianBadWords.map(normalizeText))

// export function containsBadWords(text) {
//   const normalized = normalizeText(text)
//   return filter.isProfane(normalized)
// }

// // فقط برای تست در کنسول
// if (typeof window !== "undefined") {
//   window.containsBadWords = containsBadWords
// }
import persianBadWords from "../textFilters/persianBadWords"

function normalizeText(text) {
  return text
    .replace(/[\u200C\s]+/g, "") // حذف فاصله و نیم‌فاصله
    .replace(/[ـ]+/g, "") // حذف کشیده‌ها
    .toLowerCase()
}

export function containsBadWords(inputText) {
  const text = normalizeText(inputText)

  return persianBadWords.some((badWord) => {
    const cleanBadWord = normalizeText(badWord)
    return text.includes(cleanBadWord)
  })
}

// فقط برای تست در مرورگر
if (typeof window !== "undefined") {
  window.containsBadWords = containsBadWords
}
