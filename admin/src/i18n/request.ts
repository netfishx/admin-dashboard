import { getRequestConfig } from "next-intl/server";
import messages from "../../messages/zh.json";

async function now() {
  "use cache";
  return new Date();
}

export default getRequestConfig(async () => {
  return {
    locale: "zh",
    messages,
    now: await now(),
  };
});
