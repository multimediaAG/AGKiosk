import crypto from "crypto";

export const getHashedPassword = (password: string): string => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
};

export const generateAuthToken = (): string => crypto.randomBytes(30).toString("hex");
