import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useWeb3React } from "@web3-react/core"
import { connectors } from './Connectors'
import metamaskIcon from '../images/metamask-icon.webp'
import coinbaseIcon from '../images/coinbase icon.jpg'
import walletConnectIcon from '../images/wallet-connect icon.png'

function WalletModal({ web3Handler, removeAccount, account }) {
  const { activate } = useWeb3React();
  const [show, setShow] = useState(false);

  const handleDisconnect = () => {
    removeAccount()
  };
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
    web3Handler()
  };

  return (
    <>
      {account ? (
                <button 
                    onClick={handleDisconnect}
                    className="button nav-button btn-sm mx-4"    
                >
                    Disconnect Wallet
                </button>
            ) : (
                <button 
                    onClick={handleShow}
                    className="button nav-button btn-sm mx-4"
                >
                    Connect Wallet
                </button>
                
            )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
            <Button 
              variant="outline-light"
              onClick={() => {
                activate(connectors.injected)
                handleClose()
              }}
              style={{
                width: '300px',
                border: '1px solid #333',
                color: 'black', // Make the text black
                fontWeight: 'bold', // Make the text bold
                marginBottom: '5px', // Add spacing between buttons
              }}
            >
              <img src={metamaskIcon} alt="Metamask Logo" width={25} length={25} />
              MetaMask
            </Button>
        
            <Button 
              variant="outline-light"
              onClick={() => {
              activate(connectors.coinbaseWallet)
              handleClose()
              }}
              style={{
                width: '300px',
                border: '1px solid #333',
                color: 'black', // Make the text black
                fontWeight: 'bold', // Make the text bold
                marginBottom: '5px', // Add spacing between buttons
              }}
            >
              <img src={coinbaseIcon} alt="Metamask Logo" width={25} length={25} />
              Coinbase Wallet
            </Button>
        
            <Button 
              variant="outline-light"
              onClick={() => {
              activate(connectors.walletConnect)
              handleClose()
              }}
              style={{
                width: '300px',
                border: '1px solid #333',
                color: 'black', // Make the text black
                fontWeight: 'bold', // Make the text bold
                marginBottom: '5px', // Add spacing between buttons
              }}
            >
              <img src={walletConnectIcon} alt="Metamask Logo" width={25} length={25} />
              Wallet Connect
            </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WalletModal;