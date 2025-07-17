export const generateFileObject = (content) => {
  try {
    const fileBuffer = Buffer.from(content, "utf-8");
    return { buffer: fileBuffer };
  } catch (err) {
    throw err;
  }
};
