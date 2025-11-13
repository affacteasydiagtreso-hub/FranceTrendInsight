import googleTrends from 'google-trends-api';

export default async function handler(req, res) {
  try {
    const keyword = req.query.keyword || 'affacturage';

    const results = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)), // 30 jours
      geo: 'FR'
    });

    res.status(200).json({
      motClef: keyword,
      donnees: JSON.parse(results),
      region: 'FR',
      periode: '30 jours'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
