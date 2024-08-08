/** @format */

import { Log } from "@aitianyu.cn/types";
import { ICommonDevtoolsAPI } from "../Types";

export function register(obj: ICommonDevtoolsAPI): void {
    try {
        __TIANYU_APP_FWK_DEVTOOLS__?.register(obj.id, obj);
    } catch (e) {
        Log.debug(`[Tianyu APP FWK] register object ${obj.id} failed: ${(e as any).message || {}}`);
    }
}

export function unregister(id: string): void {
    try {
        __TIANYU_APP_FWK_DEVTOOLS__?.unregister(id);
    } catch (e) {
        Log.debug(`[Tianyu APP FWK] unregister object ${id} failed: ${(e as any).message || ""}`);
    }
}
