/** @format */

import { MapOfType } from "@aitianyu.cn/types";
import { IExtensionEntry } from "src/infra/devtools/Devtools";

export function contributorHandler(): MapOfType<IExtensionEntry> {
    return {
        endpoints: {
            type: "list",
            action: {
                entry: "contributors",
                param: {
                    src: "from",
                    static: null,
                    from: null,
                },
            },
            value: "string",
            input: false,
        },
        contributors: {
            type: "list",
            action: null,
            value: "string:string",
            input: true,
        },
    };
}
