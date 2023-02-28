import React, {useEffect, useState} from 'react'

function ViewBookById(salerecord) {
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    return (
    <>
        <h1>Sales Person History</h1>
        <div className="mb-3">
            <select value={name} onChange={handleNameChange} required id="name" name="name" className="form-select">
                <option value="">Choose a Salesman</option>
                {salerecord.salesman.map(salesman => {
                        return (
                            <option key={salesman.name} value={salesman.name}>
                                {salesman.name}
                            </option>
                        );
                    })}
            </select>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {salerecord.salerecord.filter(salerecord => salerecord.salesman.name === name)
                .map(sale => {
                return (
                    <tr key={sale.automobile.vin}>
                        <td>{sale.salesman.name}</td>
                        <td>{sale.customer.name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>${sale.sale_price}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>

    </>
      )
}

export default ViewBookById;