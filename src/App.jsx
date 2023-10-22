import data from "./assets/data.json"
import Hasher from "./services/Hasher"
import ReactLoading from "react-loading"
import "./styles/App.scss"
import { useState } from "react"

export default function App() {
	const [hasher, _] = useState(new Hasher())
	const [word, setWord] = useState("")
	const [hash, setHash] = useState("MD5")
	const [status, setStatus] = useState({ok: false, v: null})
	const [process, setProcess] = useState(false)
	const [lockDown, setLockDown] = useState(false)

	const [toHashWord, setToHashWord] = useState("")
	const [toHashMethod, setToHashMethod] = useState("MD5")
	const [previzu, setPrevizu] = useState("")

	const handleWord = (event) => {
		setStatus({ok: false, v: null})
		setWord(event.target.value)
	}

	const handleHash = (event) => {
		setStatus({ok: false, v: null})
		setHash(event.target.value)
	}

	const handleToHashWord = (event) => {
		setToHashWord(event.target.value)

		hasher.hashVersionOf(toHashMethod, event.target.value).then((r) => {
			setPrevizu(r)
		})
	}

	const handleToHashMethod = (event) => {
		setToHashMethod(event.target.value)

		hasher.hashVersionOf(event.target.value, toHashWord).then((r) => {
			setPrevizu(r)
		})
	}

	const handleFire = () => {
		setLockDown(true)
		setProcess(true)

		if(localStorage.getItem(word)) {
			setStatus({ok: true, v: localStorage.getItem(word)})
			setProcess(false)
			setLockDown(false)
			return
		}

		hasher.fire(hash, word).then((r) => {
			if(r.ok && !localStorage.getItem(JSON.stringify({hash: hasher.hashVersionOf(r.ok), src: r.ok}))) {
				localStorage.setItem(word, r.v)
			}

			setStatus(r)
			setProcess(false)
			setLockDown(false)
		})
	}

	const handleClear = () => {
		setStatus({ok: false, v: null})
		localStorage.clear()
	}

	return (
		<div id="app-container">
			<div id="title-container">
				<h2>The ZBrute Force</h2>
				<p>
					<i>(The page may freeze if the word in your hash is far away)</i>
				</p>
			</div>

			<div id="hash-container">
				<span className="title-border">Hash converter</span>

				{ toHashWord ?
					<div id="hashed-succes-container">
						<p>{previzu}</p>
					</div>
				: null }

				<div id="hashed-container">
					<input
						type="text"
						placeholder="The word to hash"
						onChange={handleToHashWord}
						disabled={lockDown}
					/>

					{ data.available.length > 0 ?
						<select onChange={handleToHashMethod} disabled={lockDown}>
							{ data.available.map((v, key) => (
								<option key={key}>
									{v}
								</option>
							)) }
						</select>
					: null }
				</div>
			</div>

			<div id="attack-container">
				<span className="title-border">Attack</span>

				<div id="crack-container">
					<input
						type="text"
						placeholder="The hashed word"
						onChange={handleWord}
						disabled={lockDown}
					/>

					{ data.available.length > 0 ?
						<select onChange={handleHash} disabled={lockDown}>
							{ data.available.map((v, key) => (
								<option key={key}>
									{v}
								</option>
							)) }
						</select>
						:
						<p>
							No hash available
						</p>
					}
				</div>

				<div id="button-container">
					<button id="fire" onClick={handleFire} disabled={lockDown}>
						Fire
					</button>

					<button id="clear" onClick={handleClear} disabled={lockDown}>
						<nobr>Clear Cache</nobr>
					</button>
				</div>

				{ process ?
					<div id="process-container">
						<ReactLoading type="spin" color="white"/>
					</div>
				: null}

				{ status.v !== null && status.ok ?
					<div id="success-container">
						<p>
							<span>Found</span> : {status.v}
						</p>
					</div>
				: null }

			</div>
		</div>
	)
}
