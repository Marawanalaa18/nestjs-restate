import type { KnipConfig } from "knip";

const config: KnipConfig = {
    entry: ["src/index.ts"],
    project: ["src/**/*.ts"],
    ignore: ["test/**"],
    ignoreDependencies: ["reflect-metadata", "rxjs"],
};

export default config;
