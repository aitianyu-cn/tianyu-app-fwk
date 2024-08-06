/** @format */

import { ITianyuAppFwkAPI, IContributorFwkAPI } from "./Types";

declare global {
    export const tianyu_app_fwk: ITianyuAppFwkAPI;
}

export { type ITianyuAppFwkAPI, type IContributorFwkAPI };
