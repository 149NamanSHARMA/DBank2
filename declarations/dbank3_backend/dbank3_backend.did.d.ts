import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'checkBalance' : ActorMethod<[], number>,
  'createUser' : ActorMethod<[string, string], string>,
  'loginUser' : ActorMethod<[string, string], string>,
  'logoutUser' : ActorMethod<[], undefined>,
  'topUp' : ActorMethod<[number], string>,
  'transferTo' : ActorMethod<[string, number], string>,
  'withdraw' : ActorMethod<[number], string>,
}
