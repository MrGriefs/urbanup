import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface Options {
    agent?: string;
    page?: number;
    cb?: ((r: AxiosResponse) => Promise<Record<string, unknown>>);
    axiosOptions?: AxiosRequestConfig;
}

export type APIResponse = Promise<Record<string, unknown>|Error|null>;

export default class Base {
    options: Options;
    constructor(options: Options = {}) {
        this.options = options;
    }

    static get defaultAgent(): string {
        return `Urbanup | Node ${process.version} @ ${process.platform}`
    }

    get agent(): string {
        return this.options.agent || Base.defaultAgent;
    }

    async query(endpoint: string, cb?: ((r: AxiosResponse) => Promise<Record<string, unknown>>)): APIResponse {
        if (!cb) this.options.cb ? cb = this.options.cb : cb = r => r.data?.list;

        // Set axios options
        const ops: AxiosRequestConfig = this.options?.axiosOptions || {};
        if (!ops.headers) ops.headers = {}
        ops.headers['User-Agent'] = this.options?.agent || Base.defaultAgent
        if (!ops.timeout) ops.timeout = 10000;

        // Request the API
        return await axios.get("https://api.urbandictionary.com/" + endpoint, ops)
            .then(cb)
    }
}