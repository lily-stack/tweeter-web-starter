import { FollowCountResponse } from "./FollowCountResponse";

export interface FollowResponse extends FollowCountResponse {
	secondFollowCount: number
}