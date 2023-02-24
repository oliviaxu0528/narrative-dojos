import React from 'react'

export default function BookList(props) {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Image</th>
            <th>Created on</th>
          </tr>
        </thead>
        <tbody>
          {props.books.map(book => {
            return (
              <tr key={book.book_id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                    <img src={book.image_url} alt="" width="250px" height="150px"/>
                </td>
                <td>{book.created_on}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
