/** @format */

import { contributorHandler } from "src/contributor/DevtoolsHandler";
import { TianyuAppFwkTypes } from "../Types";
import { DevtoolsExtensionHandler } from "./Devtools";

export const ExtensionHandler = {
    [TianyuAppFwkTypes.Contributor]: contributorHandler,
};

ExtensionHandler as {
    [type in TianyuAppFwkTypes]: DevtoolsExtensionHandler;
};
