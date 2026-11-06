
export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).send("Chybí OAuth údaje.");
  }

  try {
    const response = await fetch(
      "https://delayed-previous-databases-championships.trycloudflare.com/oauth/receive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-callback-secret": process.env.CALLBACK_SECRET
        },
        body: JSON.stringify({ code, state })
      }
    );

    if (!response.ok) {
      console.error("Bot odpověděl:", response.status);
      return res.status(502).send("Předání botovi se nezdařilo.");
    }

    return res.status(200).send(
      "Roblox údaje byly předány botovi. Toto okno můžete zavřít."
    );

  } catch (error) {
    console.error("Chyba předávání:", error);
    return res.status(502).send("Bot momentálně není dostupný.");
  }
}
