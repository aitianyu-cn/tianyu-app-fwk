/** @format */

import { IDevtools } from "./devtools/Devtools";
import { ITianyuAppFwkAPI } from "./Types";

declare global {
    /** tianyu application framework global apis */
    export const tianyu_app_fwk: ITianyuAppFwkAPI;
    /** tianyu application framework development tools api */
    export const __TIANYU_APP_FWK_DEVTOOLS__: IDevtools;
}
