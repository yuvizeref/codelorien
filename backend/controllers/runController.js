import { runCode } from "../utils/compilerUtils.js";

export const runRoute = async (req, res) => {
  const code = req.body.code;
  const input = req.body.input;
  const language = req.body.language;

  try {
    const result = await runCode(code, input, language);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
