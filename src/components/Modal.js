import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useWeb3React } from "@web3-react/core"
import { connectors } from './Connectors'
import metamaskIcon from '../images/metamask-icon.webp'
import coinbaseIcon from '../images/coinbase icon.jpg'
import walletConnectIcon from '../images/wallet-connect icon.png'
import AccountContext from './AccountContext';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function WalletModal({ web3Handler, accounts, setAccount }) {
  const { isError, setIsError, message, setMessage } = useContext(AccountContext);
  const { activate, deactivate, account, active, chainId } = useWeb3React();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(account){
      setAccount(account);
    }
  }, [account, setAccount]);

  useEffect(() => {
    if (chainId === 11155111) { // Sepolia chainId
      setIsError(true);
    } else {
      setMessage("Switch your network to Sepolia in your wallet");
    }
  }, [chainId]);

  const handleDisconnect = () => {
    deactivate()
    setIsError(true)
  };
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  };

  const handleMetamaskConnect = async () => {
      if (isMobileDevice()) {
          window.open('https://metamask.app.link/dapp/la-piscina.on.fleek.co');
          return;
      }
      
      await activate(connectors.injected);
      handleClose();
      setIsError(false)
  };

const handleCoinbaseConnect = async () => {
    try {
        await activate(connectors.coinbaseWallet);
        handleClose();
        setIsError(false);
    } catch (error) {
        console.error("Failed to activate Coinbase Wallet:", error);
        setIsError(true);

    }
};

  return (
    <>
      {account ? (
                <button 
                    onClick={handleDisconnect}
                    className="button nav-button btn-sm mx-4"    
                >
                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
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
              onClick={handleMetamaskConnect}
              style={{
                width: '300px',
                border: '1px solid #333',
                color: 'black', // Make the text black
                fontWeight: 'bold', // Make the text bold
                marginBottom: '5px', // Add spacing between buttons
              }}
            >
              <img src={metamaskIcon} alt="Metamask Logo" width={25} length={25} style={{ marginRight: '5px'}}/>
              MetaMask
            </Button>
        
            <Button 
              variant="outline-light"
              onClick={handleCoinbaseConnect}
              style={{
                width: '300px',
                border: '1px solid #333',
                color: 'black', // Make the text black
                fontWeight: 'bold', // Make the text bold
                marginBottom: '5px', // Add spacing between buttons
              }}
            >
              <img src={coinbaseIcon} alt="Metamask Logo" width={25} length={25} style={{ marginRight: '5px'}}/>
               Coinbase Wallet
            </Button>
        
            <Button 
              variant="outline-light"
              onClick={() => {
              activate(connectors.walletConnect)
              setIsError(false)
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
              <img src={walletConnectIcon} alt="Metamask Logo" width={25} length={25} style={{ marginRight: '5px'}}/>
               Wallet Connect
            </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WalletModal;
