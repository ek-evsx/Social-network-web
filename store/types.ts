export interface IActionPayload {
    commit: (mutation: string, payload?: any) => void;
}
