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
            "https://raw.githubusercontent.com/tarraschk/richelieu/master/french_passwords_top5000.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Books/greatest_books_of_all_time_lowercase.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Books/greatest_books_of_all_time_original.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Books/greatest_books_of_all_time_uppercase.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Books/greatest_books_of_all_time_with_leet_variations.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/Language-Specific/Chinese-common-password-list-top-1000.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/Language-Specific/German_common-password-list-top-1000.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/Language-Specific/Spanish_1000-common-usernames-and-passwords.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/1900-2020.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/best1050.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/medical-devices.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Cracked-Hashes/milw0rm-dictionary.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Default-Credentials/Routers/0ALL-USERNAMES-AND-PASSWORDS.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Honeypot-Captures/multiplesources-passwords-fabian-fingerle.de.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Keyboard-Walks/Keyboard-Combinations.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Software/cain-and-abel.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Software/cain-and-abel.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Software/john-the-ripper.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/WiFi-WPA/probable-v2-wpa-top447.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/WiFi-WPA/probable-v2-wpa-top4800.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/WiFi-WPA/probable-v2-wpa-top62.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Default-Credentials/ftp-betterdefaultpasslist.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Default-Credentials/ssh-betterdefaultpasslist.txt",
            "https://raw.githubusercontent.com/xmendez/wfuzz/refs/heads/master/wordlist/general/big.txt",
            "https://raw.githubusercontent.com/xmendez/wfuzz/refs/heads/master/wordlist/general/catala.txt",
            "https://raw.githubusercontent.com/xmendez/wfuzz/refs/heads/master/wordlist/general/common.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-cantonese-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-crotian-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-danish-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-estonaian-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-finnish-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-french-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-german-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-greek-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-hebrew-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/Language-Specifics/ignis-hindi-150.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/ignis-100K.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/ignis-10K.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/ignis-10M.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/ignis-1K.txt",
            "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Pwdb-Public/Wordlists/ignis-1M.txt",
        ];

        this.algoH = {
            MD5: MD5,
            "SHA-1": SHA1,
            "SHA-256": SHA256,
            "SHA-512": SHA512,
            "RIPEMD-160": RIPEMD160,
            "SHA-3": SHA3,
        };

        this.limitPerChunk = 100;
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
        } catch (donothing) {}
    }

    /**
     * Check if value is contians in chunk
     * @param arr The chunk to browse
     * @return Promise<{{found:null|string}}>
     * */
    async make(arr, method, word) {
        for (let i = 0; i <= arr.length - 1; ++i) {
            const hashed = await this.hashVersionOf(method, arr[i]);

            if (hashed === word) {
                return { found: arr[i] };
            }
        }

        return { found: null };
    }

    /**
     * Create array with this.limitPerChunk chunks
     * @async
     * @param {array} arr The wordlist
     * @return {Promise<{ok:boolean,v:null|string}>}
     * */
    async browse(arr, method, word) {
        for (let i = 0; i <= arr.length - 1; i += this.limitPerChunk) {
            const chunk = arr.slice(i, i + this.limitPerChunk);
            const check = await this.make(chunk, method, word);

            if (check.found !== null) return { ok: true, v: check.found };
        }

        return { ok: false, v: null };
    }

    /**
     * Check in N wordlists if the hashed password is found
     * @param {string} method Hashing method
     * @param {string} word The word to convert
     * @return {boolean}
     * */
    async fire(method, word) {
        for (let link of this.links) {
            try {
                const req = await fetch(link);

                if (req.ok) {
                    let content = await req.text();
                    let transf = content.split("\n");
                    let check = await this.browse(transf, method, word);

                    if (check.ok) {
                        return { ok: true, v: check.v };
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }

        return { ok: false, v: null };
    }
}