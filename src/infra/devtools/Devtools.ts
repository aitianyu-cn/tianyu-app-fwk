/** @format */

import { MapOfType } from "@aitianyu.cn/types";
import { ICommonDevtoolsAPI } from "../Types";

/** Tianyu Application Framework Devtools API */
export interface IDevtools {
    /**
     * To register a new extension
     *
     * @param id the extension unified id
     * @param extension the extension instance
     */
    register(id: string, extension: ICommonDevtoolsAPI): void;
    /**
     * To unregister an extension
     *
     * @param id the extension unified id
     */
    unregister(id: string): void;
}

/**
 * Devtools Extension Entry Type
 * To indicate the entry result value should be displayed in which ui.
 *
 * - list       : display in a list, all the values will be shown.
 * - selector   : display in a drop down box, will list all the values when dropping and only one value can be selected.
 * - radio      : display in radio buttons, only one value can be selected.
 * - multi      : display in a multi-selection list, will list all the values and call select multi-values.
 * - none       : do not display in UI, this type is used for API only entry.
 */
export type ExtensionEntryType = "list" | "selector" | "radio" | "multi" | "none";

/**
 * Devtools Extension Entry Action Parameter Source Type
 * To indicate the next action, whether has parameter and where to get the parameter
 *
 * - from   : indicate the action entry parameter value should be gotten by an entry result.
 * - static : indicate the action entry parameter is a fixed value, and will be given in the definition.
 * - null   : indicate no parameter should transport to the next action entry.
 */
export type ExtensionEntryActionParamSrc = "from" | "static" | "null";

/** Devtools Extension Entry Action Parameter */
export interface IExtensionEntryActionParam {
    /** To give a fixed value - this will work when the param type set to "static" */
    static: any | null;
    /** To indicate the parameter type */
    src: ExtensionEntryActionParamSrc;
    /**
     * To give a entry where to get the result - this will work when the param type set to "from"
     *
     * - null value: if this part is set to null value, that means the selection value in current entry will be transported to the next action entry as parameter.
     */
    from: {
        /**
         * To give a parameter processor action entry to handle the parameter.
         *
         * - should be noted, selection value in current entry will be transported into this entry directly.
         */
        entry: string;
    } | null;
}

/** Devtools Extension Entry Action */
export interface IExtensionEntryAction {
    /** To indicate the action entry id */
    entry: string;
    /** the parameter configuration */
    param: IExtensionEntryActionParam;
}

/** Devtools Extension Entry */
export interface IExtensionEntry {
    /** To indicate the UI type of entry result */
    type: ExtensionEntryType;
    /**
     * To indicate the entry result UI elements should react the selection.
     *
     * - null value: if the action is not provided, the display result will be view only.
     */
    action: IExtensionEntryAction | null;
    /**
     * To indicate the value displayed value structure.
     *
     * - structure: type[;type[;type ...]]
     * - type: string, boolean, number
     * - mean: the value will be displayed in different columns when displayed as list,
     *         the first type will be set as id (please make sure the first value always be unified).
     *         If displayed without list, the other values (from index 1 - end) will be joined into a single string with split symbol " - "
     */
    value: string;
    /**
     * To indicate the entry can recive value as parameter
     *
     * - true : the entry must to give a parameter.
     * - false: the entry may need a parameter, but the entry can work if not provide parameter.
     */
    input: boolean;
}

/** A function to generate Devtools Extension Entry */
export type DevtoolsExtensionHandler = () => MapOfType<IExtensionEntry>;
