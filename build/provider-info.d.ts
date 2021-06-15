import { SignInProvider } from "./signin-provider";
export interface ProviderInfo {
    name: "Microsoft" | "Google" | "Facebook" | "Apple";
    url: string;
    getKey: () => string | null | undefined;
    getSecretKey: () => string | null | undefined;
    getButtonText: () => string;
    getIconUrl: () => string;
    import: (key: string, secret: string | null | undefined) => Promise<SignInProvider>;
    btnClass: string;
    buttonPartName: string;
    iconPartName: string;
    containerPartName: string;
    signIn: () => void;
}
