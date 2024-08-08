/** @format */

import { IContributorFwkAPI } from "./Contributor";

/** Tianyu Application Framework API */
export interface ITianyuAppFwkAPI {
    /** Contributor Extension */
    contributor: IContributorFwkAPI;
}

/** Tianyu Application Framework extension types */
export enum TianyuAppFwkTypes {
    /** Contributor Extension Type */
    Contributor,
}

/** Tianyu Application Framework extension devtools interface */
export interface ICommonDevtoolsAPI {
    /** The unified id of extension */
    id: string;
    /** The friendly name of extension */
    name: string;
    /** The extension type */
    type: TianyuAppFwkTypes;
}
