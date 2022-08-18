export interface Cert {
    key: string;
    cert: string;
    expiry: string;
}
export declare function generateCert(expireInDays?: number): Promise<Cert>;
export declare function loadOrCreateCert(): Promise<Cert>;
