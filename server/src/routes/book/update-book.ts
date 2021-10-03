import express, { Request, Response } from 'express';
import { NotFoundError } from '../../common/errors/not-found-error';

import { Book } from '../../models/book';

const router = express.Router();

router.put('/api/v1/book/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Book.findById(id);

    if (!item) {
      throw new NotFoundError();
    }

    item.set(req.body);
    item.save();

    res.status(200).send({
      msg: 'Update book successfully',
      data: {
        item,
      },
    });
  } catch (e) {
    res.status(500).send({ msg: e });
  }
});

export { router as updateBookRouter };
