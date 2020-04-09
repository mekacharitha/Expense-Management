import React from 'react'
import { Redirect } from 'react-router-dom'
import { addAccount } from '../../../services/Accounts';
import './AddAccount.css';

class Accounts extends React.Component {
    state = {
        accountName: '',
        accountAdded: false,
        accountBalance: 0,

    }
    handleAddAccount = async () => {
        addAccount(this.state.accountName, this.state.accountBalance)
        await this.setState({
            accountAdded: true,
        })
        await this.setState({
            accountAdded: false,
        })

    }
    handleAccountName = (e) => {
        this.setState({ accountName: e.target.value })
    }

    handleAccountBalance = (e) => {
        this.setState({ accountBalance: e.target.value })
    }

    render() {
        let redirect = "";
        if (this.state.accountAdded) {
            redirect = <Redirect to="/accounts" />
        }

        return (
            <div style={{ marginTop: "18%", textAlign: "left", marginLeft: "100px" }}>
                <div  >
                    <label style={{ fontSize: "22px", fontWeight: "bold" }} >NEW ACCOUNT</label>
                    <br />
                </div>
                <div style={{ margin: "15px" }}>
                    <label>Account Name</label>
                    <br />
                    <input type="text" onChange={this.handleAccountName} className="InputField"></input>
                </div>
                <div style={{ margin: "15px" }}>
                    <label>Starting Balance</label>
                    <br />
                    <input type="text" onChange={this.handleAccountBalance} className="InputField"></input>
                </div>
                <div style={{ margin: "15px", marginLeft: "60px" }}>
                    <button onClick={this.handleAddAccount} className="AddAccButton">Add Account</button>
                </div>
                {redirect}
            </div>
        )
    }
}
export default Accounts