import axios from 'axios';
import React, { useState } from 'react'

export default function CustomerForm() {

    const [name, setName] = useState("");

    async function saveCustomer(e) {
        e.preventDefault();

        try {
            
        } catch (err) {
            console.error(err);
            
        }
        const customer = {name};
        axios.post("http://localhost:5005/customer/", customer);
        console.log(customer);
    }



    return (
        <div>
            <form onSubmit={saveCustomer}>
                <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">save customer</button>
            </form>
        </div>
    )
}
