import { Injectable } from "@nestjs/common";
import { VIRTUAL_OBJECT_METADATA_KEY } from "../restate.constants";
import type { ComponentMetadata } from "../restate.interfaces";

export function VirtualObject(name: string): ClassDecorator {
    return (target: Function) => {
        Injectable()(target);
        Reflect.defineMetadata(
            VIRTUAL_OBJECT_METADATA_KEY,
            { name } satisfies ComponentMetadata,
            target,
        );
    };
}
