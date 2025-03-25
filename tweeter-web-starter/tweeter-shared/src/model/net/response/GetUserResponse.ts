import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface GetUserResponse extends TweeterResponse {
	returnedUser: UserDto | null
}