/** @format */

export function initTianyuAppFwk(): void {
    if ((global as any).tianyu_app_fwk) {
        return;
    }

    (global as any).tianyu_app_fwk = {};
}
