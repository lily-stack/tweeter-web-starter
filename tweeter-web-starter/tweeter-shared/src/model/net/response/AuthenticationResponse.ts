import { AuthToken } from "../../domain/AuthToken";
import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface AuthenticationResponse extends TweeterResponse {
	checkedUser: UserDto,
	authToken: AuthToken
}