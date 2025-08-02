import { getReview } from "../utils/aiUtils.js";

export const getReviewRoute = async (req, res) => {
  const { description, code } = req.body;
  try {
    const review = await getReview(description, code);
    res.status(200).json({ review });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
