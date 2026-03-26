/** 打設ロット台帳 (6.1) */
export type CastingLot = {
  lotId: string;
  castingDate: string; // YYYY-MM-DD
  zone: string; // 工区
  location: string; // 打設部位
  floor: string; // 階
  mixNo: string; // 配合No
  nominalStrength: number; // 呼び強度
  slump: number; // スランプ (cm)
  airContent: number; // 空気量 (%)
  plant: string; // 製造工場
  plannedVolume: number; // 予定数量 (m3)
  actualVolume: number; // 実績数量 (m3)
  deliverySlipCount: number; // 納入書枚数
  hasFreshTest: boolean;
  hasStrengthTest: boolean;
  hasPhotos: boolean;
  reportReflected: "未" | "済";
  supervisorConfirmed: "未" | "済";
  submissionStatus: "未提出" | "提出済" | "提示済";
  remarks: string;
};

/** 納入書受領台帳 (6.2) */
export type DeliverySlip = {
  slipId: string;
  lotId: string;
  castingDate: string;
  time: string; // 荷卸し時刻
  truckNo: string; // 車番
  mixNo: string;
  volume: number; // m3
  plant: string;
  receivedBy: string;
  digitized: "未" | "済";
  storageLocation: string;
};

/** フレッシュ試験台帳 (6.3) */
export type FreshConcreteTest = {
  testLotNo: string;
  lotId: string;
  testDate: string;
  testTime: string;
  slumpActual: number; // cm
  airContentActual: number; // %
  concreteTemp: number; // ℃
  chlorideContent: number; // kg/m3
  verdict: "適合" | "不適合";
  testCompany: string;
  originalReceived: "未" | "済";
};

/** 圧縮強度台帳 (6.4) */
export type CompressiveStrengthTest = {
  testLotNo: string;
  lotId: string;
  age: "7日" | "28日" | string; // 材齢
  specimenNo: string;
  testDate: string;
  strength1: number; // N/mm2
  strength2: number;
  strength3: number;
  averageStrength: number;
  verdict: "適合" | "不適合";
  laboratory: string;
  originalReceived: "未" | "済";
};

/** 書類分類 */
export type DocumentCategory =
  | "配合計画書"
  | "打設計画書"
  | "フレッシュ試験"
  | "圧縮強度試験"
  | "納入伝票"
  | "受入写真"
  | "骨材試験"
  | "施工計画報告書"
  | "施工結果報告書"
  | "工事監理報告書"
  | "未分類";

/** アップロードファイル */
export type UploadedDocument = {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  category: DocumentCategory;
  lotId?: string; // 紐付けられたロットID
  uploadedAt: string;
  digitized: boolean;
};

/** 提出束の並び順 (セクション8) */
export const SUBMISSION_ORDER: DocumentCategory[] = [
  "工事監理報告書",
  "施工計画報告書",
  "施工結果報告書",
  "配合計画書",
  "納入伝票",
  "フレッシュ試験",
  "圧縮強度試験",
  "骨材試験",
  "受入写真",
];

/** 逆算スケジュール (セクション5) */
export type InspectionSchedule = {
  inspectionDate: string; // T日
  milestones: {
    offset: number; // T-N日
    label: string;
    completed: boolean;
  }[];
};

export const DEFAULT_MILESTONES = [
  { offset: -21, label: "対象打設ロットの確定", completed: false },
  { offset: -14, label: "未回収書類の洗い出し、試験未着の督促", completed: false },
  { offset: -10, label: "施工結果報告書ドラフト作成開始", completed: false },
  { offset: -7, label: "工事監理者へ事前説明、写真帳整理", completed: false },
  { offset: -5, label: "提出束ドラフト完成", completed: false },
  { offset: -3, label: "所長確認、監理者確認、差替え", completed: false },
  { offset: -1, label: "最終版確定、印刷またはPDF化", completed: false },
  { offset: 0, label: "検査対応", completed: false },
];
