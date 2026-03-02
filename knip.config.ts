import type { KnipConfig } from "knip";

const config: KnipConfig = {
    project: ["src/**/*.ts"],
    ignoreBinaries: ["pkg-pr-new"],
};

export default config;
