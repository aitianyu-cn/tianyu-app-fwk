/** @format */

import { MapOfType, CallbackActionT, CallbackAction } from "@aitianyu.cn/types";
import { IContributeExpose, IContributeFactor, IContributorFwkAPI } from "src/infra/Contributor";
import { ContributeManager } from "./ContributorManager";
import { initTianyuAppFwk } from "src/infra/tools/APIInitor";

export function init(): void {
    initTianyuAppFwk();

    if (!(global as any).tianyu_app_fwk.contributor) {
        (global as any).tianyu_app_fwk = {
            ...(global as any).tianyu_app_fwk,
            contributor: new ContributeManager("Tianyu Application Fwk - Contributor"),
        };
    }
}

export function create(id: string): IContributorFwkAPI {
    return new ContributeManager(id);
}

export function exportContribute(expose: IContributeExpose<any>): void {
    if (!(global as any).tianyu_app_fwk.contributor) {
        throw new Error(/** todo: error msg */);
    }

    tianyu_app_fwk.contributor.exportContribute(expose);
}
export function unexportContribute(target: string, id: string): void {
    if (!(global as any).tianyu_app_fwk.contributor) {
        throw new Error(/** todo: error msg */);
    }

    tianyu_app_fwk.contributor.unexportContribute(target, id);
}
export function getContributes<T>(target: string): MapOfType<IContributeFactor<T>> {
    if (!(global as any).tianyu_app_fwk.contributor) {
        throw new Error(/** todo: error msg */);
    }

    return tianyu_app_fwk.contributor.getContributes(target);
}
export function subscribe<T = any>(
    target: string,
    trigger: CallbackActionT<MapOfType<IContributeFactor<T>>>,
): CallbackAction {
    if (!(global as any).tianyu_app_fwk.contributor) {
        throw new Error(/** todo: error msg */);
    }

    return tianyu_app_fwk.contributor.subscribe(target, trigger);
}
