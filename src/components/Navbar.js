import logo from '../images/HStC_Logo_788x747.png'
import WalletModal from './Modal'

const Navbar = ({ web3Handler, accounts, setAccount }) => {


    return (
        <div>
        <nav className="navbar fixed-top mx-0">
            <a
                className="navbar-brand col-sm-2 col-md-2 mr-0 mx-4"
                href="https://twitter.com/HollyStCrypto"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={logo} className="App-logo" alt="logo" />
                Holly St Crypto
            </a>
            
            <WalletModal 
                web3Handler={web3Handler}
                account={accounts}
                setAccount={setAccount}
            />
        </nav>
        
        </div>

    )
}

export default Navbar;