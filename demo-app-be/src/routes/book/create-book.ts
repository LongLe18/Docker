import express, { Request, Response } from 'express';

import { Book } from '../../models/book';

const router = express.Router();

router.post('/api/v1/book/create', async (req: Request, res: Response) => {
  try {
    delete req.body._id;
    const item = Book.build({
      ...req.body,
    });
    await item.save();

    res.status(201).send({
      msg: 'Create book successfully',
      data: {
        item,
      },
    });
  } catch (e) {
    res.status(500).send({ msg: e });
  }
});

export { router as createBookRouter };
