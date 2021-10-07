import { useEffect, useState } from 'react';

import { FaPlusCircle } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import './index.scss';
import { ModalComponent, showConfirm } from '../../components';

import { APIServices } from '../../utils';

const defaultBook = {
  _id: '',
  name: '',
  publisher: '',
  author: '',
  nation: '',
  type: '',
};

export const BookPage = () => {
  const [listBook, setListBook] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [currentBook, setCurrentBook] = useState(defaultBook);

  useEffect(() => {
    _getBook();
  }, []);

  const _renderModelBook = () => {
    if (!currentBook) return;

    return (
      <div className='ModalBook'>
        <div className='RowInfo'>
          <div className='RowTitle'>Name</div>
          <input
            type='text'
            className='RowContent'
            value={currentBook.name}
            onChange={(e) => {
              setCurrentBook({
                ...currentBook,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className='RowInfo'>
          <div className='RowTitle'>Publisher</div>
          <input
            type='text'
            className='RowContent'
            value={currentBook.publisher}
            onChange={(e) => {
              setCurrentBook({
                ...currentBook,
                publisher: e.target.value,
              });
            }}
          />
        </div>
        <div className='RowInfo'>
          <div className='RowTitle'>Type</div>
          <input
            type='text'
            className='RowContent'
            value={currentBook.type}
            onChange={(e) => {
              setCurrentBook({
                ...currentBook,
                type: e.target.value,
              });
            }}
          />
        </div>
        <div className='RowInfo'>
          <div className='RowTitle'>Author</div>
          <input
            type='text'
            className='RowContent'
            value={currentBook.author}
            onChange={(e) => {
              setCurrentBook({
                ...currentBook,
                author: e.target.value,
              });
            }}
          />
        </div>
        <div className='RowInfo'>
          <div className='RowTitle'>Nation</div>
          <input
            type='text'
            className='RowContent'
            value={currentBook.nation}
            onChange={(e) => {
              setCurrentBook({
                ...currentBook,
                nation: e.target.value,
              });
            }}
          />
        </div>
      </div>
    );
  };

  const _getBook = async () => {
    try {
      const res = await APIServices.Book.GetListBook();
      if (res.data) setListBook(res.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const _createBook = async () => {
    try {
      const res = await APIServices.Book.CreateBook(currentBook);
      if (res.data) {
        _getBook();
        setModalState(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _updateBook = async () => {
    try {
      const res = await APIServices.Book.UpdateBook(currentBook._id, currentBook);
      if (res.data) {
        _getBook();
        setModalState(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _deleteBook = async (book: any) => {
    try {
      const res = await APIServices.Book.RemoveBook(book._id);
      if (res.data) {
        _getBook();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='BookPage'>
      <h1>Book Page 2</h1>
      <div
        className='AddButton'
        style={{
          backgroundColor: '#3399ff',
          color: 'white',
        }}
        onClick={() => {
          setCurrentBook(defaultBook);
          setModalState(true);
        }}
      >
        <FaPlusCircle className='Icon' />
        Create book
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Publisher</th>
            <th>Author</th>
            <th>Type</th>
            <th>Nation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listBook &&
            listBook.map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.publisher}</td>
                  <td>{item.author}</td>
                  <td>{item.type}</td>
                  <td>{item.nation}</td>
                  <td>
                    <div className='ListActions'>
                      <div
                        className='Button'
                        style={{
                          backgroundColor: '#3399ff',
                          color: 'white',
                        }}
                        onClick={() => {
                          setCurrentBook(item);
                          setModalState(true);
                        }}
                      >
                        <FaRegEdit className='Icon' />
                        Update
                      </div>
                      <div
                        className='Button'
                        style={{
                          backgroundColor: '#ff3300',
                          color: 'white',
                        }}
                        onClick={() => {
                          showConfirm({
                            title: 'Are you sure about your action?',
                            content: '',
                            onOk: () => {
                              _deleteBook(item);
                            },
                            onCancel: () => {},
                          });
                        }}
                      >
                        <FiTrash2 className='Icon' />
                        Delete
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          {listBook.length === 0 && (
            <tr>
              <th colSpan={6}>No data</th>
            </tr>
          )}
        </tbody>
      </table>

      <ModalComponent
        title={'Book Detail'}
        isModalVisible={modalState}
        onOk={() => {
          currentBook._id ? _updateBook() : _createBook();
        }}
        onCancel={() => {
          setModalState(false);
        }}
        cancelText='Cancel'
        okText='Save'
      >
        {_renderModelBook()}
      </ModalComponent>
    </div>
  );
};
