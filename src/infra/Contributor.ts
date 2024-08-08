/** @format */

import { CallbackAction, CallbackActionT, MapOfType } from "@aitianyu.cn/types";
import { IFwkExtension } from "./FwkExtension";

/** The Contribute properties generation function */
export type IContributeFactor<T> = () => T | Promise<T>;

/** Contributor Expose Data */
export interface IContributeExpose<T> {
    /** The name of expose (should be unified) */
    id: string;
    /** The description of expose */
    description: string;
    /** The target endpoint of current expose */
    target: string;
    /** Contribute properties generation function */
    factor: IContributeFactor<T>;
}

/** Tianyu Application Framework Contribution Extension API */
export interface IContributorFwkAPI extends IFwkExtension {
    /**
     * To export a public factor into target endpoint.
     *
     * @param expose expose data
     */
    exportContribute(expose: IContributeExpose<any>): void;
    /**
     * To remove an export which is registered in target endpoint by id.
     *
     * @param target the removed target endpoint
     * @param id the name of removed export
     */
    unexportContribute(target: string, id: string): void;
    /**
     * To get a list of all exports in the indicated target endpoint
     *
     * @param target the target endpoint which should be gotten.
     *
     * @returns return a export id and factor map
     */
    getContributes<T>(target: string): MapOfType<IContributeFactor<T>>;
    /**
     * To subscribe a endpoint export change.
     *
     * @param target the target endpoint which will be subscribed.
     * @param trigger the trigger when the target endpoint exports is changed
     *
     * @returns return a unsubscribe callback function
     */
    subscribe<T = any>(target: string, trigger: CallbackActionT<MapOfType<IContributeFactor<T>>>): CallbackAction;
}
