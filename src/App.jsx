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

	const handleWord = (event) => {
		setStatus({ok: false, v: null})
		setWord(event.target.value)
	}

	const handleHash = (event) => {
		setStatus({ok: false, v: null})
		setHash(event.target.value)
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
	)
}
