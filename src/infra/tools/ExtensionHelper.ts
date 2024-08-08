/** @format */

import { guid } from "@aitianyu.cn/types";
import { TianyuAppFwkTypes } from "../Types";

export function formatFwkType(type: TianyuAppFwkTypes): string {
    switch (type) {
        case TianyuAppFwkTypes.Contributor:
            return "tianyu.app-fwk.contributor";
    }
}

export function generateId(type: TianyuAppFwkTypes): string {
    const baseId = guid();
    return `${formatFwkType(type)}.${baseId}`;
}
