
import React, { useEffect, useState } from 'react';

function Form() {
    const [name, setname] = useState('');
    const [datetime, setdatetime] = useState('');
    const [desc, setdesc] = useState('');
    const [transactions, setTransactions] = useState('');
    useEffect(() => {
        getTransactions().then(setTransactions)
    }, []);

    async function getTransactions() {
        const url = process.env.REACT_APP_API_URL + '/transactions';
        const response = await fetch(url);
        return await response.json();
    }

    function addNewTransaction(ev) {
        ev.preventDefault();
        const url = process.env.REACT_APP_API_URL + '/transaction';

        const price = name.split(' ')[0];

        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                price,
                name: name.substring(price.length + 1),
                datetime,
                desc,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                setname('');
                setdatetime('');
                setdesc('');
                console.log("result", json);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div>
            <h1 className='balance'>BALANCE : <span className='amount'>$ 1000.<span>00</span></span></h1>
            {/* Wrap your form with <form> element */}
            <form className='form' onSubmit={addNewTransaction}>
                <div className='basic'>
                    <input
                        type='text'
                        placeholder='enter the expense'
                        value={name}
                        onChange={ev => setname(ev.target.value)}
                    />

                    <input
                        type='datetime-local'
                        value={datetime}
                        onChange={ev => setdatetime(ev.target.value)}
                    />
                </div>
                <div className='desc'>
                    <input
                        type='text'
                        placeholder='enter the description of your expense'
                        value={desc}
                        onChange={ev => setdesc(ev.target.value)}
                    />
                </div>
                <button type='submit'>Add New Transaction</button>

            </form>

            <div className='transactions'>
                {transactions && transactions.length > 0 && transactions.map(transaction => (
                    <div className='transaction'>
                        <div className='left'>
                            <div className='name'>{transaction.name}</div>
                            <div className='description'>{transaction.desc}</div>
                        </div>
                        <div className='right'>
                            <div className={`price ${parseInt(transaction.price) < 0 ? 'red' : 'green'}`}>
                                {transaction.price}
                            </div>


                            <div className='date-time'>{transaction.datetime}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Form;