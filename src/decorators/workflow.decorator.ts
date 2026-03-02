import { Injectable } from "@nestjs/common";
import { WORKFLOW_METADATA_KEY } from "../restate.constants";
import type { ComponentMetadata } from "../restate.interfaces";

export function Workflow(name: string): ClassDecorator {
    return (target: Function) => {
        Injectable()(target);
        Reflect.defineMetadata(WORKFLOW_METADATA_KEY, { name } satisfies ComponentMetadata, target);
    };
}
