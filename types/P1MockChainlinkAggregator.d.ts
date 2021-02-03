/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface P1MockChainlinkAggregatorContract
  extends Truffle.Contract<P1MockChainlinkAggregatorInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<P1MockChainlinkAggregatorInstance>;
}

type AllEvents = never;

export interface P1MockChainlinkAggregatorInstance
  extends Truffle.ContractInstance {
  latestAnswer(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  setLatestAnswer: {
    (
      rate: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      rate: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      rate: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      rate: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    latestAnswer(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    setLatestAnswer: {
      (
        rate: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        rate: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        rate: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        rate: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
