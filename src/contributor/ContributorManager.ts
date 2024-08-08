/** @format */

import { MapOfType, CallbackActionT, CallbackAction, guid, KeyValuePair } from "@aitianyu.cn/types";
import { IContributeExpose, IContributeFactor, IContributorFwkAPI } from "src/infra/Contributor";
import { IContributorDevtoolsAPI } from "./Types";
import { TianyuAppFwkTypes } from "src/infra/Types";
import { register, unregister } from "src/infra/devtools/DevRegister";
import { generateId } from "src/infra/tools/ExtensionHelper";

export class ContributeManager implements IContributorFwkAPI, IContributorDevtoolsAPI {
    private unifiedId: string;
    private friendName: string;

    private exposeMap: MapOfType<
        MapOfType<{
            description: string;
            factor: IContributeFactor<any>;
        }>
    >;
    private subscribes: MapOfType<MapOfType<CallbackActionT<MapOfType<IContributeFactor<any>>>>>;

    public constructor(id: string) {
        this.unifiedId = generateId(TianyuAppFwkTypes.Contributor);
        this.friendName = id;

        this.exposeMap = {};
        this.subscribes = {};

        register(this);
    }
    destroy(): void {
        this.exposeMap = {};
        this.subscribes = {};
        unregister(this.id);
    }

    // ########################################################################
    // Core part
    // ########################################################################
    exportContribute(expose: IContributeExpose<any>): void {
        if (!this.exposeMap[expose.target]) {
            this.exposeMap[expose.target] = {};
        }

        this.exposeMap[expose.target][expose.id] = {
            description: expose.description,
            factor: expose.factor,
        };

        this.triggerSubscribe(expose.target);
    }
    unexportContribute(target: string, id: string): void {
        if (!this.exposeMap[target]?.[id]) {
            return;
        }

        delete this.exposeMap[target][id];

        this.triggerSubscribe(target);
    }
    getContributes<T>(target: string): MapOfType<IContributeFactor<T>> {
        return this.getExportsInternal(target);
    }
    subscribe<T = any>(target: string, trigger: CallbackActionT<MapOfType<IContributeFactor<T>>>): CallbackAction {
        const id = guid();

        if (!this.subscribes[target]) {
            this.subscribes[target] = {};
        }

        this.subscribes[target][id] = trigger;

        return () => {
            if (this.subscribes[target]?.[id]) {
                delete this.subscribes[target][id];
            }
        };
    }

    // ########################################################################
    // Devtools part
    // ########################################################################
    get id(): string {
        return this.unifiedId;
    }
    get name(): string {
        return this.friendName;
    }
    get type(): TianyuAppFwkTypes {
        return TianyuAppFwkTypes.Contributor;
    }
    endpoints(): string[] {
        return Object.keys(this.exposeMap);
    }
    contributors(target: string): string[][] {
        const exposes = this.exposeMap[target] || {};
        return Object.entries(exposes).map((value) => [value[0], value[1].description]);
    }

    private getExportsInternal(target: string): MapOfType<IContributeFactor<any>> {
        const exports: MapOfType<IContributeFactor<any>> = {};

        const endpoint = this.exposeMap[target];
        if (endpoint) {
            for (const expose of Object.keys(endpoint)) {
                exports[expose] = endpoint[expose].factor;
            }
        }

        return exports;
    }
    private triggerSubscribe(target: string): void {
        const triggers = Object.values(this.subscribes[target] || {});
        if (triggers.length) {
            const exports = this.getExportsInternal(target);
            for (const trigger of triggers) {
                trigger(exports);
            }
        }
    }
}
