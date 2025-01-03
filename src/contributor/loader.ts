/** @format */

import { GlobalContributor } from "./GlobalContributor";

export { Contributor as Object } from "./Contributor";

/**
 * To load a default contributor manager in global scope.
 * contribuor manager based on IContributorFactorProtocolMap protocal definition.
 */
export function loader(): void {
    if (!(global as any).tianyu_app_fwk) {
        (global as any).tianyu_app_fwk = {};
    }

    if (!(global as any).tianyu_app_fwk.contributor) {
        (global as any).tianyu_app_fwk.contributor = new GlobalContributor();
    }
}
