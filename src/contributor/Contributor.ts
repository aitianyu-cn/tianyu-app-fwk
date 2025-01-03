/** @format */

import { MapOfType } from "@aitianyu.cn/types";
import {
    ContributorFactor,
    ContributorFactorKey,
    ContributorFactorPayloadType,
    ContributorFactorReturnType,
    IContributor,
} from "src/interface/contributor";

/**
 * Generic Contributor based on custom Protocal
 *
 * @template Protocal endpoint protocal map
 */
export class Contributor<Protocol> implements IContributor<Protocol> {
    private _map: Map<ContributorFactorKey<Protocol>, Map<string, ContributorFactor<any, any>>>;

    public constructor() {
        this._map = new Map<ContributorFactorKey<Protocol>, Map<string, ContributorFactor<any, any>>>();
    }

    public registerEndpoint(endpoint: ContributorFactorKey<Protocol>): void {
        if (!this._map.has(endpoint)) {
            this._map.set(endpoint, new Map<string, ContributorFactor<any, any>>());
        }
    }
    public unregisterEndpoint(endpoint: ContributorFactorKey<Protocol>): void {
        this._map.delete(endpoint);
    }
    public hasEndpoint(endpoint: ContributorFactorKey<Protocol>): boolean {
        return this._map.has(endpoint);
    }

    public exportModule<ENDPOINT extends ContributorFactorKey<Protocol>>(
        endpoint: ENDPOINT,
        id: string,
        factor: ContributorFactor<
            ContributorFactorPayloadType<ENDPOINT, Protocol>,
            ContributorFactorReturnType<ENDPOINT, Protocol>
        >,
    ): void {
        this.registerEndpoint(endpoint);
        this._map.get(endpoint)?.set(id, factor);
    }
    public unexportModule<ENDPOINT extends ContributorFactorKey<Protocol>>(endpoint: ENDPOINT, id: string): void {
        this._map.get(endpoint)?.delete(id);
    }
    public findModule<ENDPOINT extends ContributorFactorKey<Protocol>>(
        endpoint: ENDPOINT,
        id: string,
    ):
        | ContributorFactor<
              ContributorFactorPayloadType<ENDPOINT, Protocol>,
              ContributorFactorReturnType<ENDPOINT, Protocol>
          >
        | undefined {
        return this._map.get(endpoint)?.get(id);
    }
    public allModules<ENDPOINT extends ContributorFactorKey<Protocol>>(
        endpoint: ENDPOINT,
    ): MapOfType<
        ContributorFactor<
            ContributorFactorPayloadType<ENDPOINT, Protocol>,
            ContributorFactorReturnType<ENDPOINT, Protocol>
        >
    > {
        const map: MapOfType<
            ContributorFactor<
                ContributorFactorPayloadType<ENDPOINT, Protocol>,
                ContributorFactorReturnType<ENDPOINT, Protocol>
            >
        > = {};

        this._map.get(endpoint)?.forEach((factor, key) => {
            map[key] = factor;
        });

        return map;
    }
}
