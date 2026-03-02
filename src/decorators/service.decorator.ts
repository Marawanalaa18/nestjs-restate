import { Injectable } from "@nestjs/common";
import { SERVICE_METADATA_KEY } from "../restate.constants";
import type { ComponentMetadata } from "../restate.interfaces";

export function Service(name: string): ClassDecorator {
    return (target: Function) => {
        Injectable()(target);
        Reflect.defineMetadata(SERVICE_METADATA_KEY, { name } satisfies ComponentMetadata, target);
    };
}
