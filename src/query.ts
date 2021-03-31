import Base, { Options, APIResponse } from './Base';
import { AxiosResponse } from "axios";

/**
 * Searches the defintions for a word via the Urban API {@link https://api.urbandictionary.com/v0/define}
 * @param options - Library options
 * @returns - The response from the API
 */
async function Query(word: string, options?: Options): APIResponse {
    const base = new Base(options);
    return await base.query(`v0/define?page=${options?.page || 1}&term=${encodeURI(word.trim())}`);
}

/**
 * Searches the definitions for a word and returns the first result.
 * @param options - Library options
 * @returns - The response from the API
 */
async function one(word: string, options: Options = {}): APIResponse {
    options.cb = (r: AxiosResponse) => r.data?.list?.[0];
    return await Query(word, options);
}

async function random(options?: Options): APIResponse {
    const base = new Base(options);
    return await base.query('v0/random');
}

/**
 * Request random definitions from the Urban API and returns the first result.
 * @param options - Library options
 * @returns - The response from the API containing a random entry
 */
async function randomOne(options: Options = {}): APIResponse {
    options.cb = (r: AxiosResponse) => r.data?.list?.[0];
    return await random(options);
}

Object.defineProperty(random, 'one', { value: randomOne })
Object.defineProperties(Query, {
    query: { value: Query },
    one: { value: one },
    random: { value: random }
})

export declare interface Query {
    /**
     * Searches the defintions for a word via the Urban API {@link https://api.urbandictionary.com/v0/define}
     * @param options - Library options
     * @returns - The response from the API
     */
    (word: string, options?: Options): APIResponse;
    query: typeof Query;
    one: typeof one;
    random: {
        /**
         * Request random definitions from the Urban API.
         * @param options - Library options
         * @returns - The response from the API containing a random entries
         */
        (options?: Options): APIResponse;
        one: typeof randomOne;
    };
}

export default <Query>Query