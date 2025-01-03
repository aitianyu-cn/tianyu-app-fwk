/** @format */

import { getBoolean, guid } from "@aitianyu.cn/types";
import { Contributor } from "app-fwk";

describe("aitianyu-cn.node-module.tianyu-app-fwk.test.Contributor", () => {
    beforeAll(() => {
        Contributor.loader();
    });

    it("set a new endpoint", () => {
        tianyu_app_fwk.contributor.registerEndpoint("test_endpoint" as never);

        expect(tianyu_app_fwk.contributor.hasEndpoint("test_endpoint" as never)).toBeTruthy();
    });

    it("delete an endpoint", () => {
        tianyu_app_fwk.contributor.unregisterEndpoint("test_endpoint" as never);

        expect(tianyu_app_fwk.contributor.hasEndpoint("test_endpoint" as never)).toBeFalsy();
    });

    describe("sequence", () => {
        beforeAll(() => {
            tianyu_app_fwk.contributor.registerEndpoint("test_endpoint" as never);
        });

        const moduleId = guid();
        const module = async (data: string): Promise<string> => data;

        it("export module", () => {
            tianyu_app_fwk.contributor.exportModule("test_endpoint" as never, moduleId, module as any);

            expect(
                getBoolean((tianyu_app_fwk.contributor as any)["_map"].get("test_endpoint")?.has(moduleId)),
            ).toBeTruthy();
        });

        it("find module", async () => {
            const find_module = tianyu_app_fwk.contributor.findModule("test_endpoint" as never, moduleId);

            expect(find_module).toBeDefined();

            if (find_module) {
                const res1 = await find_module("test_module" as never);
                expect(res1).toEqual("test_module");
            }
        });

        it("all modules", () => {
            const find_modules = tianyu_app_fwk.contributor.allModules("test_endpoint" as never);

            expect(Object.keys(find_modules).length).toEqual(1);
            expect(find_modules[moduleId]).toBeDefined();
        });

        it("export module", () => {
            tianyu_app_fwk.contributor.unexportModule("test_endpoint" as never, moduleId);

            expect(
                getBoolean((tianyu_app_fwk.contributor as any)["_map"].get("test_endpoint")?.has(moduleId)),
            ).toBeFalsy();
        });
    });

    it("test for export object", () => {
        const obj = new Contributor.Object<{}>();
        expect(obj).toBeDefined();
    });
});
