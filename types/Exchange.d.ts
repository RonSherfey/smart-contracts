/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ExchangeContract extends Truffle.Contract<ExchangeInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<ExchangeInstance>;
}

type AllEvents = never;

export interface ExchangeInstance extends Truffle.ContractInstance {
  ethToTokenSwapInput: {
    (
      minTokens: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      minTokens: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      minTokens: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      minTokens: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  ethToTokenTransferInput: {
    (
      minTokens: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      minTokens: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      minTokens: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      minTokens: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getEthToTokenInputPrice(
    ethSold: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getTokenToEthInputPrice(
    tokensSold: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  tokenToEthSwapInput: {
    (
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  tokenToEthTransferInput: {
    (
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      tokensSold: number | BN | string,
      minEth: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  tokenToTokenSwapInput: {
    (
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  tokenToTokenTransferInput: {
    (
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      tokensSold: number | BN | string,
      minTokensBought: number | BN | string,
      minEthBought: number | BN | string,
      deadline: number | BN | string,
      recipient: string,
      tokenAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    ethToTokenSwapInput: {
      (
        minTokens: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        minTokens: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        minTokens: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        minTokens: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    ethToTokenTransferInput: {
      (
        minTokens: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        minTokens: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        minTokens: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        minTokens: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getEthToTokenInputPrice(
      ethSold: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getTokenToEthInputPrice(
      tokensSold: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    tokenToEthSwapInput: {
      (
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    tokenToEthTransferInput: {
      (
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        tokensSold: number | BN | string,
        minEth: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    tokenToTokenSwapInput: {
      (
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        tokenAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        tokenAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        tokenAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        tokenAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    tokenToTokenTransferInput: {
      (
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        tokenAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        tokenAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        tokenAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        tokensSold: number | BN | string,
        minTokensBought: number | BN | string,
        minEthBought: number | BN | string,
        deadline: number | BN | string,
        recipient: string,
        tokenAddress: string,
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
