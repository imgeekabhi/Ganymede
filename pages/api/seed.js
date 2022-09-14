import nc from 'next-connect';

const handler = nc();
handler.get(async (req, res) => {
  return res.send({ message: 'already seeded' });
});

export default handler;
