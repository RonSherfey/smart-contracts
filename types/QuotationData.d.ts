/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface QuotationDataContract
  extends Truffle.Contract<QuotationDataInstance> {
  "new"(
    _authQuoteAdd: string,
    _kycAuthAdd: string,
    meta?: Truffle.TransactionDetails
  ): Promise<QuotationDataInstance>;
}

export interface CoverDetailsEvent {
  name: "CoverDetailsEvent";
  args: {
    cid: BN;
    scAdd: string;
    sumAssured: BN;
    expiry: BN;
    premium: BN;
    premiumNXM: BN;
    curr: string;
    0: BN;
    1: string;
    2: BN;
    3: BN;
    4: BN;
    5: BN;
    6: string;
  };
}

export interface CoverStatusEvent {
  name: "CoverStatusEvent";
  args: {
    cid: BN;
    statusNum: BN;
    0: BN;
    1: BN;
  };
}

type AllEvents = CoverDetailsEvent | CoverStatusEvent;

export interface QuotationDataInstance extends Truffle.ContractInstance {
  addCover: {
    (
      _coverPeriod: number | BN | string,
      _sumAssured: number | BN | string,
      _userAddress: string,
      _currencyCode: string,
      _scAddress: string,
      premium: number | BN | string,
      premiumNXM: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _coverPeriod: number | BN | string,
      _sumAssured: number | BN | string,
      _userAddress: string,
      _currencyCode: string,
      _scAddress: string,
      premium: number | BN | string,
      premiumNXM: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _coverPeriod: number | BN | string,
      _sumAssured: number | BN | string,
      _userAddress: string,
      _currencyCode: string,
      _scAddress: string,
      premium: number | BN | string,
      premiumNXM: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _coverPeriod: number | BN | string,
      _sumAssured: number | BN | string,
      _userAddress: string,
      _currencyCode: string,
      _scAddress: string,
      premium: number | BN | string,
      premiumNXM: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addHoldCover: {
    (
      from: string,
      scAddress: string,
      coverCurr: string,
      coverDetails: (number | BN | string)[],
      coverPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      from: string,
      scAddress: string,
      coverCurr: string,
      coverDetails: (number | BN | string)[],
      coverPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      from: string,
      scAddress: string,
      coverCurr: string,
      coverDetails: (number | BN | string)[],
      coverPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      from: string,
      scAddress: string,
      coverCurr: string,
      coverDetails: (number | BN | string)[],
      coverPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addInTotalSumAssured: {
    (
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addInTotalSumAssuredSC: {
    (
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  authQuoteEngine(txDetails?: Truffle.TransactionDetails): Promise<string>;

  changeAuthQuoteEngine: {
    (_add: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_add: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _add: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _add: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  changeCoverStatusNo: {
    (
      _cid: number | BN | string,
      _stat: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _cid: number | BN | string,
      _stat: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _cid: number | BN | string,
      _stat: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _cid: number | BN | string,
      _stat: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  changeDependentContractAddress: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  changeMasterAddress: {
    (_masterAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _masterAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _masterAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _masterAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  coverStatus(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getAllCoversOfUser(
    _add: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN[]>;

  getAuthQuoteEngine(txDetails?: Truffle.TransactionDetails): Promise<string>;

  getCoverDetailsByCoverID1(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, string, string, string, BN, BN]>;

  getCoverDetailsByCoverID2(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN, BN, BN, BN]>;

  getCoverLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  getCoverMemberAddress(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getCoverPeriod(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getCoverPremiumNXM(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getCoverStatusNo(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getCoverSumAssured(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getCurrencyOfCover(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getHoldedCoverDetailsByID1(
    _hcid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, string, string, BN]>;

  getHoldedCoverDetailsByID2(
    _hcid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, string, BN[]]>;

  getProductDetails(
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN, BN, BN]>;

  getTotalSumAssured(
    _curr: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getTotalSumAssuredSC(
    _add: string,
    _curr: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getUintParameters(
    code: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[string, BN]>;

  getUserCoverLength(
    _add: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getUserHoldedCoverByIndex(
    _add: string,
    index: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getUserHoldedCoverLength(
    _add: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getValidityOfCover(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getscAddressOfCover(
    _cid: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, string]>;

  holdedCoverIDStatus(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  kycAuthAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

  minDays(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  ms(txDetails?: Truffle.TransactionDetails): Promise<string>;

  nxMasterAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

  pm(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  refundEligible(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  setHoldedCoverIDStatus: {
    (
      holdedCoverID: number | BN | string,
      status: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      holdedCoverID: number | BN | string,
      status: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      holdedCoverID: number | BN | string,
      status: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      holdedCoverID: number | BN | string,
      status: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setKycAuthAddress: {
    (_add: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_add: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _add: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _add: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setRefundEligible: {
    (
      _add: string,
      status: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _add: string,
      status: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _add: string,
      status: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _add: string,
      status: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setTimestampRepeated: {
    (
      _timestamp: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _timestamp: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _timestamp: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _timestamp: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  stl(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  stlp(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  subFromTotalSumAssured: {
    (
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  subFromTotalSumAssuredSC: {
    (
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _add: string,
      _curr: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  timestampRepeated(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  tokensRetained(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  updateUintParameters: {
    (
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      code: string,
      val: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  userHoldedCover(
    arg0: string,
    arg1: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  methods: {
    addCover: {
      (
        _coverPeriod: number | BN | string,
        _sumAssured: number | BN | string,
        _userAddress: string,
        _currencyCode: string,
        _scAddress: string,
        premium: number | BN | string,
        premiumNXM: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _coverPeriod: number | BN | string,
        _sumAssured: number | BN | string,
        _userAddress: string,
        _currencyCode: string,
        _scAddress: string,
        premium: number | BN | string,
        premiumNXM: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _coverPeriod: number | BN | string,
        _sumAssured: number | BN | string,
        _userAddress: string,
        _currencyCode: string,
        _scAddress: string,
        premium: number | BN | string,
        premiumNXM: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _coverPeriod: number | BN | string,
        _sumAssured: number | BN | string,
        _userAddress: string,
        _currencyCode: string,
        _scAddress: string,
        premium: number | BN | string,
        premiumNXM: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    addHoldCover: {
      (
        from: string,
        scAddress: string,
        coverCurr: string,
        coverDetails: (number | BN | string)[],
        coverPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        scAddress: string,
        coverCurr: string,
        coverDetails: (number | BN | string)[],
        coverPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        scAddress: string,
        coverCurr: string,
        coverDetails: (number | BN | string)[],
        coverPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        scAddress: string,
        coverCurr: string,
        coverDetails: (number | BN | string)[],
        coverPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    addInTotalSumAssured: {
      (
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    addInTotalSumAssuredSC: {
      (
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    authQuoteEngine(txDetails?: Truffle.TransactionDetails): Promise<string>;

    changeAuthQuoteEngine: {
      (_add: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(_add: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        _add: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _add: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    changeCoverStatusNo: {
      (
        _cid: number | BN | string,
        _stat: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _cid: number | BN | string,
        _stat: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _cid: number | BN | string,
        _stat: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _cid: number | BN | string,
        _stat: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    changeDependentContractAddress: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    changeMasterAddress: {
      (_masterAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _masterAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _masterAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _masterAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    coverStatus(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getAllCoversOfUser(
      _add: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;

    getAuthQuoteEngine(txDetails?: Truffle.TransactionDetails): Promise<string>;

    getCoverDetailsByCoverID1(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, string, string, string, BN, BN]>;

    getCoverDetailsByCoverID2(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN, BN, BN]>;

    getCoverLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    getCoverMemberAddress(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getCoverPeriod(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getCoverPremiumNXM(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getCoverStatusNo(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getCoverSumAssured(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getCurrencyOfCover(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getHoldedCoverDetailsByID1(
      _hcid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, string, string, BN]>;

    getHoldedCoverDetailsByID2(
      _hcid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, string, BN[]]>;

    getProductDetails(
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN, BN]>;

    getTotalSumAssured(
      _curr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getTotalSumAssuredSC(
      _add: string,
      _curr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getUintParameters(
      code: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[string, BN]>;

    getUserCoverLength(
      _add: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getUserHoldedCoverByIndex(
      _add: string,
      index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getUserHoldedCoverLength(
      _add: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getValidityOfCover(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getscAddressOfCover(
      _cid: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, string]>;

    holdedCoverIDStatus(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    kycAuthAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

    minDays(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    ms(txDetails?: Truffle.TransactionDetails): Promise<string>;

    nxMasterAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

    pm(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    refundEligible(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    setHoldedCoverIDStatus: {
      (
        holdedCoverID: number | BN | string,
        status: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        holdedCoverID: number | BN | string,
        status: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        holdedCoverID: number | BN | string,
        status: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        holdedCoverID: number | BN | string,
        status: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setKycAuthAddress: {
      (_add: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(_add: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        _add: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _add: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setRefundEligible: {
      (
        _add: string,
        status: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _add: string,
        status: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _add: string,
        status: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _add: string,
        status: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setTimestampRepeated: {
      (
        _timestamp: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _timestamp: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _timestamp: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _timestamp: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    stl(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    stlp(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    subFromTotalSumAssured: {
      (
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    subFromTotalSumAssuredSC: {
      (
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _add: string,
        _curr: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    timestampRepeated(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    tokensRetained(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    updateUintParameters: {
      (
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        code: string,
        val: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    userHoldedCover(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
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
