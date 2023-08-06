import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import Countdown from 'react-countdown'
import Web3 from 'web3'

// Import Images + CSS
import twitter from '../images/socials/twitter.svg'
import instagram from '../images/socials/instagram.svg'
import opensea from '../images/socials/opensea.svg'
import collage from '../images/Collage.png'
import '../App.css'

// Import Components
import Navbar from './Navbar'

// Import ABI + Config
import LaPiscina from '../abis/LaPiscina.json'
import config from '../config.json'

function App() {
	const [web3, setWeb3] = useState(null)
	const [laPiscina, setLaPiscina] = useState(null)

	const [supplyAvailable, setSupplyAvailable] = useState(0)

	const [account, setAccount] = useState(null)
	const [networkId, setNetworkId] = useState(null)
	const [ownerOf, setOwnerOf] = useState([])

	const [explorerURL, setExplorerURL] = useState('https://etherscan.io')
	const [openseaURL, setOpenseaURL] = useState('https://opensea.io')

	const [isMinting, setIsMinting] = useState(false)
	const [isError, setIsError] = useState(false)
	const [message, setMessage] = useState(null)

	const [currentTime, setCurrentTime] = useState(new Date().getTime())
	const [revealTime, setRevealTime] = useState(0)

	const [counter, setCounter] = useState(7)
	const [isCycling, setIsCycling] = useState(false)

	const [isPaused, setIsPaused] = useState()

	const [reloadFlag, setReloadFlag] = useState(false)

	const loadBlockchainData = async (_web3, _account, _networkId) => {
		// Fetch Contract, Data, etc.
		try {
			const laPiscina = new _web3.eth.Contract(LaPiscina.abi, LaPiscina.networks[_networkId].address)
			setLaPiscina(laPiscina)

			const maxSupply = await laPiscina.methods.maxSupply().call()
			const totalSupply = await laPiscina.methods.totalSupply().call()
			setSupplyAvailable(maxSupply - totalSupply)

			const allowMintingAfter = await laPiscina.methods.allowMintingAfter().call()
			const timeDeployed = await laPiscina.methods.timeDeployed().call()
			setRevealTime((Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000')

			if (_account) {
				const ownerOf = await laPiscina.methods.walletOfOwner(_account).call()
				setOwnerOf(ownerOf)
			} else {
				setOwnerOf([])
			}

		} catch (error) {
			setIsError(true)
			setMessage("Contract not deployed to current network, please change network in MetaMask")
		}
	}

	const loadWeb3 = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()

			if (accounts.length > 0 && reloadFlag === false) {
				setAccount(accounts[0])
			} else {
				setMessage('Please connect with MetaMask')
			}

			const networkId = await web3.eth.net.getId()
			setNetworkId(networkId)

			if (networkId !== 5777) {
				setExplorerURL(config.NETWORKS[networkId].explorerURL)
				setOpenseaURL(config.NETWORKS[networkId].openseaURL)
			}

			await loadBlockchainData(web3, accounts[0], networkId)

			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
				setMessage(null)
			})

			window.ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			})
		}
	}

	// MetaMask Login/Connect
	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}

	const mintNFTHandler = async () => {
		if (revealTime > new Date().getTime()) {
			window.alert('Minting is not live yet!')
			return
		}

		if (ownerOf.length > 0) {
			window.alert('You\'ve already minted!')
			return
		}

		const isPaused = await laPiscina.methods.isPaused().call()
		setIsPaused(isPaused)

		if (isPaused) {
			console.log('Minting is Paused')
			window.alert('Minting is currently paused. Please try again later')
			return
		}

		// Mint NFT
		if (laPiscina && account) {
			setIsMinting(true)
			setIsError(false)

			await laPiscina.methods.mint(1).send({ from: account, value: 10000000000000000 })
				.on('confirmation', async () => {
					const maxSupply = await laPiscina.methods.maxSupply().call()
					const totalSupply = await laPiscina.methods.totalSupply().call()
					setSupplyAvailable(maxSupply - totalSupply)

					const ownerOf = await laPiscina.methods.walletOfOwner(account).call()
					setOwnerOf(ownerOf)
				})
				.on('error', (error) => {
					window.alert(error)
					setIsError(true)
				})
		}

		setIsMinting(false)
	}

	const cycleImages = async () => {
		const getRandomNumber = () => {
			const counter = (Math.floor(Math.random() * 20)) + 1
			setCounter(counter)
		}

		if (!isCycling) { setInterval(getRandomNumber, 3000) }
		setIsCycling(true)
	}

	const removeAccountHandler = () => {
		setAccount(null)
		setReloadFlag(true)
	}

	useEffect(() => {
		loadWeb3()
		cycleImages()
	}, [account]);

	return (
		<div>
			<Navbar 
				web3Handler={web3Handler} 
				account={account} 
				removeAccount={removeAccountHandler}
			/>
			<main>
				<section id='welcome' className='welcome'>

					<Row className='header my-3 p-0 mb-0 pb-0'>
						<Col xs={12} md={12} lg={8} xxl={8}>
							<h1>La Piscina</h1>
							<p className='sub-header'>Available August 30th, 2023</p>
						</Col>
						<Col className='flex social-icons'>
							<a
								href="https://twitter.com/HollyStCrypto"
								target='_blank'
								className='circle flex button'>
								<img src={twitter} alt="Twitter" />
							</a>
							<a
								href="https://www.instagram.com/hollystcrypto/"
								target='_blank'
								className='circle flex button'>
								<img src={instagram} alt="Instagram" />
							</a>
							<a
								href={`${openseaURL}/collection/${config.PROJECT_NAME}`}
								target='_blank'
								className='circle flex button'>
								<img src={opensea} alt="Opensea" />
							</a>
						</Col>
					</Row>

					<Row className='flex m-3'>
						<Col md={5} lg={2} xl={2} xxl={5} className='text-center'>
							<img
								src={`https://bafybeigd7cqgmegxydsk7vbnwmes3ihs6fg5i52j5jrfca4clnflybpqje.ipfs.nftstorage.link/${counter}.png`}
								alt="La Piscina"
								className='showcase'
							/>
						</Col>
						<Col md={5} lg={4} xl={5} xxl={4} >
							{revealTime !== 0 && <Countdown date={currentTime + (revealTime - currentTime)} className='countdown mx-3' />}
							<p className='text'>
								Connect with Metamask to mint your NFT! <br/><br/>
								Each NFT comes with a unique prize like cocktails, tapas, and swag.<br/><br/>
								NFTs are generated randomly, but one lucky minter will get a complimentary night stay in the Proper Hotel!
							</p>
							<a href="#about" className='button mx-3'>Learn More!</a>
						</Col>
					</Row>

				</section>
				<section id='about' className='about'>

					<Row className='flex m-3'>
						<h2 className='text-center p-3'>About the Collection</h2>
						<Col md={5} lg={4} xl={5} xxl={5} className='text-center'>
							<img src={collage} alt="Multiple Crypto Punks" className='showcase' />
						</Col>
						<Col md={5} lg={4} xl={5} xxl={4}>
							{isError ? (
								<p>{message}</p>
							) : (
								<div>
									<h3>Mint your NFT in</h3>
									{revealTime !== 0 && <Countdown date={currentTime + (revealTime - currentTime)} className='countdown' />}
									<ul>
										<li>20 unique Photography NFTs capturing poolside life</li>
										<li>Minting available on the Sepolia testnet: 0.01 ETH</li>
										<li>Viewable on Opensea shortly after minting</li>
									</ul>

									{isMinting ? (
										<Spinner animation="border" className='p-3 m-2' />
									) : (
										<button onClick={mintNFTHandler} className='button mint-button mt-3'>Mint & Win!</button>
									)}

									{ownerOf.length > 0 &&
										<p><small>View your NFT on
											<a
												href={`${openseaURL}/assets/${laPiscina._address}/${ownerOf[0]}`}
												target='_blank'
												style={{ display: 'inline-block', marginLeft: '3px' }}>
												OpenSea
											</a>
										</small></p>}
								</div>
							)}
						</Col>
					</Row>

					<Row style={{ marginTop: "100px" }}>
						<Col>
							{laPiscina &&
								<a
									href={`${explorerURL}/address/${laPiscina._address}`}
									target='_blank'
									className='text-center'>
									View the Contract: {laPiscina._address.slice(0, 5) + '...' + laPiscina._address.slice(38, 42)}
								</a>
							}
						</Col>
					</Row>

				</section>
			</main>
			<footer>

			</footer>
		</div>
	)
}

export default App
