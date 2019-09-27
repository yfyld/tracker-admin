import { Action } from "redux";
import {
  ActionPattern,
  call as rawCall,
  cancelled as rawCancelled,
  SagaReturnType,
  select as rawSelect,
  Tail,
  Effect,
  take as rawTake,
} from "redux-saga/effects";
import { RootState } from "@/types";


// tslint:disable: readonly-array

export declare type SagaIterator<RT = any> = Generator<Effect<any>, RT, any>;

export function* take<A extends Action>(
  pattern?: ActionPattern<A>,
): SagaIterator<A> {
  return yield rawTake(pattern);
}

export function* call<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): SagaIterator<SagaReturnType<Fn>> {
  return yield rawCall(fn, ...args);
}

export function* select<Fn extends (state: RootState, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
): SagaIterator<ReturnType<Fn>> {
  return yield rawSelect(selector, ...args);
}

export function* cancelled(): SagaIterator<boolean> {
  return yield rawCancelled();
}



