import express, { Request, Response } from 'express';
import { NotFoundError } from '../../common/errors/not-found-error';

import { Book } from '../../models/book';

const router = express.Router();

router.get('/api/v1/book/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Book.findById(id);

    if (!item) {
      throw new NotFoundError();
    }
    res.status(200).send({
      msg: 'Get book successfully',
      data: {
        item,
      },
    });
  } catch (e) {
    res.status(500).send({ msg: e });
  }
});

export { router as getBookRouter };
