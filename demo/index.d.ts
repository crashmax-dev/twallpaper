/** fullscreen */
declare global {
    interface Element {
        webkitRequestFullscreen?(): void;
        mozRequestFullScreen?(): void;
        msRequestFullscreen?(): void;
    }
}
export {};
