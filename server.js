const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/send-likes', async (req, res) => {
  const { uid, region, accessToken } = req.body;

  if (!uid || !region || !accessToken) {
    return res.status(400).json({ success: false, message: 'UID, região e accessToken são obrigatórios.' });
  }
  if (!/^\d+$/.test(uid)) {
    return res.status(400).json({ success: false, message: 'UID deve ser numérico.' });
  }
  const validRegions = ['BR', 'NA', 'SA', 'EU', 'AS', 'OC'];
  if (!validRegions.includes(region.toUpperCase())) {
    return res.status(400).json({ success: false, message: 'Região inválida. Use BR, NA, etc.' });
  }

  const apiUrl = `https://localhost:3000/free-fire/send-likes?uid=${uid}&apikey=${process.env.API_KEY}&region=${region.toUpperCase()}&access_token=${accessToken}`;

  try {
    const response = await axios.get(apiUrl, { timeout: 10000 });
    const data = response.data;
    if (data.success) {
      res.json({ success: true, message: `Likes enviados para UID ${uid} na região ${region.toUpperCase()}.` });
    } else {
      res.status(400).json({ success: false, message: data.message || 'Erro na API externa.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `Erro ao conectar à API: ${error.message}` });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});