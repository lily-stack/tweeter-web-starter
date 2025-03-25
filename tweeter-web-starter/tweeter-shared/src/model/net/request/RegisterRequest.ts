import { AuthenticationRequest } from "./AuthenticationRequest";

export interface RegisterRequest extends AuthenticationRequest {
	readonly firstName: string,
	readonly lastName: string,
	readonly userImageBytes: Uint8Array | string,
	readonly imageFileExtension: string
}