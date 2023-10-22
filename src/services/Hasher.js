import { MD5, SHA1, SHA256, SHA512, RIPEMD160, SHA3 } from 'crypto-js';

/**
 * Class for managing encryption
 * @name Hasher
 * @version 1.0
 * @dependency crypto-js
 * @license MIT
 * @author General Zod (lalBi94)
 * @link https://github.com/lalBi94
 * @copyright © 2023 Boudjemline
 * @contact : bilal@boudjemline.fr
 * Many thanks to berzerk0 and danielmiessler for their wordlists.
 */
export default class Hasher {
    constructor() {
        this.links = [
            "https://raw.githubusercontent.com/berzerk0/Probable-Wordlists/master/Real-Passwords/Top12Thousand-probable-v2.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-100.txt",
            "https://raw.githubusercontent.com/suhasks123/hak5-MD5-Hashes/master/hak5.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000.txt",
            "https://raw.githubusercontent.com/tarraschk/richelieu/master/french_passwords_top1000.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-10000.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-100000.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/100k-most-used-passwords-NCSC.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/cirt-default-passwords.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/darkweb2017-top10000.txt",
            "https://raw.githubusercontent.com/tarraschk/richelieu/master/french_passwords_top20000.txt",
            "https://raw.githubusercontent.com/tarraschk/richelieu/master/french_passwords_top5000.txt"
        ]

        this.algoH = {
            "MD5": MD5,
            "SHA-1": SHA1,
            "SHA-256": SHA256,
            "SHA-512": SHA512,
            "RIPEMD-160": RIPEMD160,
            "SHA-3": SHA3
        };

        this.limitPerChunk = 100
    }

    /**
     * Get the hash version of one word
     * @param {string} method Hashing method
     * @param {string} word The word to convert
     * @return {Promise<string>}
     * */
    async hashVersionOf(method, word) {
        try {
            return this.algoH[method](word).toString();
        } catch(donothing) {}
    }

    /**
     * Check in N wordlists if the hashed password is found
     * @param {string} method Hashing method
     * @param {string} word The word to convert
     * @return {boolean}
     * */
    async fire(method, word) {
        /**
         * Check if value is contians in chunk
         * @param arr The chunk to browse
         * @return Promise<{{found:null|string}}>
         * */
        const make = async (arr) => {
            for(let i = 0; i <= arr.length-1; ++i) {
                const hashed = await this.hashVersionOf(method, arr[i])

                if(hashed === word) {
                    return {found: arr[i]}
                }
            }

            return {found: null}
        }

        /**
         * Create array with this.limitPerChunk chunks
         * @async
         * @param {array} arr The wordlist
         * @return {Promise<{ok:boolean,v:null|string}>}
         * */
        const browse = async (arr) => {
            for(let i = 0; i <= arr.length-1; i += this.limitPerChunk) {
                const chunk = arr.slice(i, i + this.limitPerChunk)
                const check = await make(chunk)

                if(check.found !== null)
                    return {ok: true, v: check.found}
            }

            return {ok: false, v: null}
        }

        for(let link of this.links) {
            try {
                const req = await fetch(link)

                if(req.ok) {
                    let content = await req.text()
                    let transf = content.split('\n')
                    let check = await browse(transf)

                    if(check.ok) {
                        return {ok: true, v: check.v}
                    }
                }
            } catch (donothing) {}
        }

        return {ok: false, v: null}
    }
}