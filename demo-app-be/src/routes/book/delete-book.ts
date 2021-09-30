import express, { Request, Response } from 'express';
import { NotFoundError } from '../../common/errors/not-found-error';
import { Book } from '../../models/book';

const router = express.Router();

router.delete('/api/v1/book/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Book.findById(id);

    if (!item) {
      throw new NotFoundError();
    }

    await Book.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      data: {
        msg: 'Deleted book',
      },
    });
  } catch (e) {
    res.status(500).send({
      msg: e,
    });
  }
});

export { router as deleteBookRouter };
