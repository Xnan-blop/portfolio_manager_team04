import React, {useState} from "react";
import './Account.css';


const Account = () => {
    const [balance, setBalance] = useState("1,000,000");
    return(
        <div className="account-container">
            <h3 className="dark-mode title">Account Balance</h3>
            <h1 className="dark-mode balance-amt">${balance}</h1>
        </div>
    )
}

export default Account;