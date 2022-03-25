declare type Container = HTMLElement | Element | null;
export interface PatternOptions {
    image?: string;
    mask?: boolean;
    background?: string;
    blur?: number;
    size?: number;
    opacity?: number;
}
export interface TWallpaperOptions {
    fps?: number;
    tails?: number;
    colors: string[];
    animate?: boolean;
    scrollAnimate?: boolean;
    pattern?: PatternOptions;
}
export declare class TWallpaper {
    private width;
    private height;
    private phase;
    private tail;
    private tails;
    private scrollTails;
    private timestamp;
    private frametime;
    private scrollDelta;
    private scrollTicking;
    private frames;
    private rgb;
    private curve;
    private positions;
    private phases;
    private interval;
    private raf;
    private container;
    private hc;
    private hctx;
    private canvas;
    private ctx;
    private pattern;
    constructor(container: Container, options: TWallpaperOptions);
    private hexToRgb;
    private getPositions;
    private curPosition;
    private changeTail;
    private onWheel;
    private drawOnWheel;
    private drawNextPositionAnimated;
    private getGradientImageData;
    private drawImageData;
    private drawGradient;
    private requestAnimate;
    private doAnimate;
    init({ fps, tails, colors, pattern, animate, container, scrollAnimate }: TWallpaperOptions & {
        container?: Container;
    }): void;
    dispose(): void;
    updateTails(tails?: number): void;
    updateFrametime(fps?: number): void;
    updatePattern(pattern: PatternOptions): void;
    updateColors(colors: string[]): void;
    toNextPosition(callback?: () => void): void;
    animate(start?: boolean): void;
    scrollAnimate(start?: boolean): void;
}
export {};
