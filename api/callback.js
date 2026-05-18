export default function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No OAuth code");
  }

  res.send(`OAuth success: ${code}`);
}
