import data from "./assets/data.json"
import Hasher from "./services/Hasher"
import ReactLoading from "react-loading"
import "./styles/App.scss"
import Favicon from "./assets/favicon.png"
import { useState } from "react"

export default function App() {
	const [hasher, _] = useState(new Hasher())
	const [word, setWord] = useState("")
	const [hash, setHash] = useState("MD5")
	const [status, setStatus] = useState({ ok: null, v: null });
	const [process, setProcess] = useState(false)
	const [lockDown, setLockDown] = useState(false)
	const [toHashWord, setToHashWord] = useState("")
	const [toHashMethod, setToHashMethod] = useState("MD5")
	const [previzu, setPrevizu] = useState("")

	const handleWord = (event) => {
		setWord(event.target.value)
	}

	const handleHash = (event) => {
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
		if (word.length === 0) {
			return
		}
		
		setLockDown(true);
		setProcess(true)

		if(localStorage.getItem(word)) {
			setStatus({ok: true, v: localStorage.getItem(word)})
			setProcess(false)
			setLockDown(false)
			return
		}

		hasher.fire(hash, word).then((r) => {
            setStatus({ ok: false, v: null });

			if(r.ok && !localStorage.getItem(JSON.stringify({hash: hasher.hashVersionOf(r.ok), src: r.ok}))) {
				localStorage.setItem(word, r.v)
			} else if(!r.ok) {
                setStatus({ok: false, v: null});
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
            <nav id="title-container">
                <h2>ZBrute Force</h2>

                <img src={Favicon} alt="" />

                <p>
                    <i>Page may freeze if the word is too far away</i>
                </p>
            </nav>

            <div id="hash-container">
                <span className="title-border">➤ Hash Converter</span>

                {toHashWord ? (
                    <div id="hashed-succes-container">
                        <p>{previzu}</p>
                    </div>
                ) : null}

                <div id="hashed-container">
                    <input
                        type="text"
                        placeholder="The word to hash"
                        onChange={handleToHashWord}
                        disabled={lockDown}
                    />

                    {data.available.length > 0 ? (
                        <select
                            onChange={handleToHashMethod}
                            disabled={lockDown}
                        >
                            {data.available.map((v, key) => (
                                <option key={key}>{v}</option>
                            ))}
                        </select>
                    ) : null}
                </div>
            </div>

            <div id="attack-container">
                <span className="title-border">
                    ➤ Attack{" "}
                    <a
                        href="https://github.com/lalBi94/ZBrutF#disclaimer-%EF%B8%8F"
                        target="_blank"
                        rel="noreferrer"
                    >
                        before use
                    </a>
                </span>

                <div id="crack-container">
                    <input
                        type="text"
                        placeholder="The hashed word"
                        onChange={handleWord}
                        disabled={lockDown}
                    />

                    {data.available.length > 0 ? (
                        <select onChange={handleHash} disabled={lockDown}>
                            {data.available.map((v, key) => (
                                <option key={key}>{v}</option>
                            ))}
                        </select>
                    ) : (
                        <p>No hash available</p>
                    )}
                </div>

                <div id="button-container">
                    <button id="fire" onClick={handleFire} disabled={lockDown}>
                        Fire
                    </button>

                    <button
                        id="clear"
                        onClick={handleClear}
                        disabled={lockDown}
                    >
                        <nobr>Clear Cache</nobr>
                    </button>
                </div>

                {process ? (
                    <div id="process-container">
                        <ReactLoading type="spin" color="white" />
                    </div>
                ) : null}

                {status.ok === true ? (
                    <div id="success-container" className="res-content">
                        <p>
                            <span>Found</span> : {status.v}
                        </p>
                    </div>
                ) : status.ok === false ? (
                    <div id="error-container" className="res-content">
                        <p>
                            <span>Not Found</span>
                        </p>
                    </div>
                ) : null}
            </div>

            <footer>
                <div id="footer-head">
                    <p>by General Zod (lalBi94)</p>
                </div>

                <div id="footer-content">
                    <a href="https://www.linkedin.com/in/bilal-boudjemline-54365b228/">
                        Linkedin
                    </a>
                    <a href="https://github.com/lalBi94">GitHub</a>
                    <a href="https://github.com/lalBi94/ZBrutF">Source code</a>
                </div>
            </footer>
        </div>
    );
}
