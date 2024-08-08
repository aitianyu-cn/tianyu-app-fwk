/** @format */

import { ICommonDevtoolsAPI } from "src/infra/Types";

export interface IContributorDevtoolsAPI extends ICommonDevtoolsAPI {
    endpoints(): string[];
    contributors(target: string): string[][];
}
