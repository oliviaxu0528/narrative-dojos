import React, { useEffect, useState } from 'react';


function BookList(props) {
  return (
    <div className="atable table-striped">
        <h1>All Books</h1>
            <table
            className="table table-striped table-hover"
            style={{
                backgroundColor: "#f5f5f5",
                marginBottom: "50px",
                borderRadius: 10,
            }}
            >
            <thead>
                <tr>
                <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {props.bookout.map(bookout => {
                    return (
                        <tr key={props.id}>
                            <td>{bookout.title}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
}

export default BookList;