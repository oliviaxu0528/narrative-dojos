import React, { useEffect, useState } from 'react';


function BookList(props) {
  return (
    <div className="atable table-striped">
        <h1>All Books</h1>
            <table
                className="table table-striped table-hover"
                style={{
                    backgroundColor: "#f5f5f5",
                    marginBottom: "1000px",
                    borderRadius: 20,
                }}
                >
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>id</th>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Created_on</th>
                    </tr>
                </thead>
                <tbody>
                    {props.book.map(book => {
                        return (
                            <tr key={props.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.id}</td>
                                <td>{book.Image_url}</td>
                                <td>{book.created_on}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    </div>
  );
}

export default BookList;