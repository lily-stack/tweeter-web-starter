//domain classes
export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

// All classes that should be avaialble to other modules need to exported here. export * does not work when 
// uploading to lambda. Instead we have to list each export.

//dtos
export type {UserDto} from "./model/dto/UserDto";
export type {StatusDto} from "./model/dto/StatusDto"

//requests
export type {PagedUserItemRequest} from "./model/net/request/PagedUserItemRequest"
export type {TweeterRequest} from "./model/net/request/TweeterRequest"
export type {PagedStatusItemRequest} from "./model/net/request/PagedStatusItemRequest"
export type {PostStatusRequest} from "./model/net/request/PostStatusRequest"
export type { GetUserRequest } from "./model/net/request/GetUserRequest"
export type { RegisterRequest } from "./model/net/request/RegisterRequest"
export type { AuthenticationRequest } from "./model/net/request/AuthenticationRequest"
export type { FollowRequest } from "./model/net/request/FollowRequest"
export type { IsFollowerRequest } from "./model/net/request/IsFollowerRequest"

//responses
export type { PagedUserItemResponse} from "./model/net/response/PagedUserItemResponse"
export type { TweeterResponse } from "./model/net/response/TweeterResponse"
export type { PagedStatusItemResponse} from "./model/net/response/PagedStatusItemResponse"
export type { GetUserResponse } from "./model/net/response/GetUserResponse"
export type { AuthenticationResponse } from "./model/net/response/AuthenticationResponse"
export type { FollowResponse } from "./model/net/response/FollowResponse"
export type { FollowCountResponse } from "./model/net/response/FollowCountResponse"
export type { IsFollowerResponse } from "./model/net/response/IsFollowerResponse"

//Other
export { FakeData } from "./util/FakeData";
