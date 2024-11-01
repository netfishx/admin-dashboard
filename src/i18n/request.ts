import { getRequestConfig } from "next-intl/server";

async function now() {
  "use cache";
  return new Date();
}

export default getRequestConfig(async () => {
  return {
    locale: "zh",
    messages: (await import("../../messages/zh.json")).default,
    now: await now(),
  };
});
