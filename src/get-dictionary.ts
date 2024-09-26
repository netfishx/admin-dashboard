import "server-only";

const messages = {
  zh: () => import("./dictionaries/zh.json").then((module) => module.default),
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
};

export type Lang = keyof typeof messages;

export const getDictionary = async (lang: Lang) => messages[lang]();
