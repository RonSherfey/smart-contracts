/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface OwnedUpgradeabilityProxyContract
  extends Truffle.Contract<OwnedUpgradeabilityProxyInstance> {
  "new"(
    _implementation: string,
    meta?: Truffle.TransactionDetails
  ): Promise<OwnedUpgradeabilityProxyInstance>;
}

export interface ProxyOwnershipTransferred {
  name: "ProxyOwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

export interface Upgraded {
  name: "Upgraded";
  args: {
    implementation: string;
    0: string;
  };
}

type AllEvents = ProxyOwnershipTransferred | Upgraded;

export interface OwnedUpgradeabilityProxyInstance
  extends Truffle.ContractInstance {
  implementation(txDetails?: Truffle.TransactionDetails): Promise<string>;

  proxyOwner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  transferProxyOwnership: {
    (_newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  upgradeTo: {
    (_implementation: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _implementation: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _implementation: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _implementation: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    implementation(txDetails?: Truffle.TransactionDetails): Promise<string>;

    proxyOwner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    transferProxyOwnership: {
      (_newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    upgradeTo: {
      (
        _implementation: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _implementation: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _implementation: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _implementation: string,
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