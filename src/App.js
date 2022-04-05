import React from "react";
import Web3 from "web3";

function App() {
  const [account, setAccount] = React.useState(null)
  const [balance, setBalance] = React.useState(0)
  const [web3, setWeb3] = React.useState(null)

  React.useEffect(() => {
    if(window.ethereum) {
      //nếu như có đăng nhập vào metamask thì set cái provider là địa chỉ mạng blockchain local (ganache)
      setWeb3(new Web3('HTTP://127.0.0.1:7545'))
      // setWeb3(new Web3(window.ethereum))
    }
  }, [window.ethereum])

  const onConnectWallet = async() => {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      //lấy balance (số dư) của tài khoản đã connect
      const balanceOfAccount = await web3.eth.getBalance(accounts[0])
      // console.log(accounts[0]);
      console.log(balanceOfAccount);
      setAccount(accounts[0])
      setBalance(balanceOfAccount)
    }
    else {
      alert('Please sign in Metamask')
    }
  }

  const onDonate = async() => {
    if(web3 && account) {
      const abi =  [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "funders",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "lutFunders",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "numOfFunders",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "stateMutability": "payable",
          "type": "receive",
          "payable": true
        },
        {
          "inputs": [],
          "name": "addFunds",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getFundersIndex",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "getAllFunders",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "withdrawAmount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      //web3 sẽ kết nối file json cái mà biên dịch từ file .sol
      const addressDeploy = '0xcAb7DF1d9378D6267B7Ad1425B66E4578080548b'
      const contract = await new web3.eth.Contract(abi, addressDeploy)
      console.log({contract});
    }
    else {
      alert('Please sign in Metamask and connent wallet')
    }
  }

  return (
    <div className="d-flex" style={{width: '100vw', height: '100vh'}}>
      <div className="m-auto">
        <h3 className="text-center">Current Balance: <span className="text-danger">{balance} ETH</span></h3>
        <div className="d-flex justify-content-center w-100">
          <button 
            className="btn btn-success"
            onClick={onConnectWallet}
          >Connect wallet</button>
          <button 
            className="btn btn-danger d-inline-block mx-2"
            onClick={onDonate}
          >Donate</button>
          <button 
            className="btn btn-primary">Withdraw</button>
        </div>
        <h6 className="d-inline-block me-2 mt-2">Acconut Address: </h6>
        <span className="text-danger">{account || 'null'}</span>
      </div>
    </div>
  );
}

export default App;