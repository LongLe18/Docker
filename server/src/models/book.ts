import mongoose from 'mongoose';

// An interface that describes the properties
// that a Book Model has
interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: any): BookDoc;
}

// An interface that describes the properties
// that a Book Document has
interface BookDoc extends mongoose.Document {
  name: string;
  publisher: string;
  type: string;
  author: string;
  nation: string;
}

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    require: true,
  },
  publisher: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
  nation: {
    type: String,
    default: '',
  },
});

bookSchema.statics.build = (attrs: any) => {
  return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };
