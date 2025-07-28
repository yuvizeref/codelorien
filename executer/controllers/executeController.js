import { runCode } from "../utils/compilerUtils.js";

export const executeRoute = async (req, res) => {
  console.log(req.body);
  try {
    const result = await runCode(
      req.body.code,
      req.body.input,
      req.body.language
    );
    return res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
