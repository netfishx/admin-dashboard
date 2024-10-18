import crypto from "node:crypto";

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
function stringify(obj: unknown) {
  if (typeof obj === "string") {
    return JSON.stringify(obj);
  }
  if (typeof obj === "object" && !!obj) {
    if (Array.isArray(obj)) {
      let str = "[";

      const al = obj.length - 1;

      for (let i = 0; i < obj.length; i++) {
        str += stringify(obj[i]);

        if (i !== al) {
          str += ",";
        }
      }

      return `${str}]`;
    }
    let str = "{";
    const keys = Object.keys(obj).sort();

    const kl = keys.length - 1;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      str += `${JSON.stringify(key)}:${stringify((obj as Record<string, unknown>)[key])}`;

      if (i !== kl) {
        str += ",";
      }
    }

    return `${str}}`;
  }
  return `${obj}`;
}

export function hash(obj: unknown) {
  const data = stringify(obj);

  const hash = crypto.createHash("sha256");

  hash.update(data);

  return hash.digest("hex");
}
