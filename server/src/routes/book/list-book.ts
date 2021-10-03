import express from 'express';

import { Book } from '../../models/book';

const router = express.Router();

router.get('/api/v1/book/list', async (req, res) => {
  try {
    const items = await Book.find({});

    res.status(200).send({
      msg: 'Get list book successfully',
      data: {
        items,
      },
    });
  } catch (e) {
    res.status(500).send({ msg: e });
  }
});

export { router as listBookRouter };
