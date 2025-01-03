/** @format */

import { IContributor, IContributorFactorProtocolMap } from "./interface/contributor";

declare global {
    /** Tianyu App Framework global definition */
    export const tianyu_app_fwk: {
        /** contributor for global using */
        contributor: IContributor<IContributorFactorProtocolMap>;
    };
}

export type {
    IContributor,
    IContributorFactorProtocolMap,
    ContributorProtocolWithReturn,
} from "./interface/contributor";
export * as Contributor from "./contributor/loader";
