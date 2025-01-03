/** @format */

import { MapOfType } from "@aitianyu.cn/types";

/**
 * Default Contributor factor protocal map, Extendable by user.
 *
 * @example
 * declare module "@aitianyu.cn/tianyu-app-fwk" {
 *      interface IContributorFactorProtocolMap {
 *          // here to define the contributor endpoint name and its parameter and return type
 *
 *          // simple endpoint definition case with string parameter and string return value
 *          "simple parameter and return endpoint": string,
 *
 *          // general endpoint definition case with string type parameter and an object return value
 *          "general endpoint": ContributorProtocolWithReturn<string, Record<string, string>>,
 *      }
 * }
 */
export interface IContributorFactorProtocolMap {}

/**
 * Contributor General Protocal Type
 *
 * @template DATA the parameter type of protocal endpoint
 * @template RETURN the return type of protocal endpoint
 */
export interface ContributorProtocolWithReturn<DATA, RETURN> {
    payload: DATA;
    return: RETURN;
}

export type ContributorFactor<DATA, RETURN> = (payload: DATA) => RETURN;

export type ContributorFactorKey<Protocol> = keyof Protocol;

export type ContributorFactorPayloadType<
    K extends ContributorFactorKey<Protocol>,
    Protocol = IContributorFactorProtocolMap,
> = K extends keyof Protocol
    ? Protocol[K] extends ContributorProtocolWithReturn<infer Data, any>
        ? Data
        : Protocol[K]
    : undefined;

export type ContributorFactorReturnType<
    K extends ContributorFactorKey<Protocol>,
    Protocol = IContributorFactorProtocolMap,
> = K extends keyof Protocol
    ? Protocol[K] extends ContributorProtocolWithReturn<any, infer Return>
        ? Return
        : Protocol[K]
    : void;

/**
 * Contributor public interface
 *
 * @template Protocal endpoint protocal map
 */
export interface IContributor<Protocol> {
    /**
     * To register an endpoint which defined in protocal map
     *
     * @param endpoint the key name of endpoint
     */
    registerEndpoint(endpoint: ContributorFactorKey<Protocol>): void;
    /**
     * To unregister an endpoint which defined in protocal map and remove all modules of this endpoint
     *
     * @param endpoint the key name of endpoint
     */
    unregisterEndpoint(endpoint: ContributorFactorKey<Protocol>): void;
    /**
     * Get a boolean indicates the endpoint is registered or not
     *
     * @param endpoint the key name of endpoint
     *
     * @returns return true if exist, otherwise false
     */
    hasEndpoint(endpoint: ContributorFactorKey<Protocol>): boolean;

    /**
     * To export a module for an endpoint
     *
     * @param endpoint the key name of endpoint
     * @param id the id of exported module
     * @param factor the protocal factor function
     */
    exportModule<ENDPOINT extends ContributorFactorKey<Protocol>>(
        endpoint: ENDPOINT,
        id: string,
        factor: ContributorFactor<
            ContributorFactorPayloadType<ENDPOINT, Protocol>,
            ContributorFactorReturnType<ENDPOINT, Protocol>
        >,
    ): void;

    /**
     * To remove a module for an endpoint
     *
     * @param endpoint the key name of endpoint
     * @param id the id of exported module
     */
    unexportModule<ENDPOINT extends ContributorFactorKey<Protocol>>(endpoint: ENDPOINT, id: string): void;

    /**
     * Get a boolean indicates the given module is exported in a specified endpoint
     *
     * @param endpoint the key name of endpoint
     * @param id the id of exported module
     *
     * @returns return true if exist, otherwise false
     */
    findModule<ENDPOINT extends ContributorFactorKey<Protocol>>(
        endpoint: ENDPOINT,
        id: string,
    ):
        | ContributorFactor<
              ContributorFactorPayloadType<ENDPOINT, Protocol>,
              ContributorFactorReturnType<ENDPOINT, Protocol>
          >
        | undefined;

    /**
     * Get all modules as a map which are exported in the endpoint
     *
     * @param endpoint the key name of endpoint
     *
     * @returns return a modules map of all exported modules
     */
    allModules<ENDPOINT extends ContributorFactorKey<Protocol>>(
        endpoint: ENDPOINT,
    ): MapOfType<
        ContributorFactor<
            ContributorFactorPayloadType<ENDPOINT, Protocol>,
            ContributorFactorReturnType<ENDPOINT, Protocol>
        >
    >;
}
