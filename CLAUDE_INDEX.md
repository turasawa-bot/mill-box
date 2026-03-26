# CLAUDE_INDEX

## 1. 書類一覧

### forms/ (テンプレート + フィールド定義)
- `forms/building_construction_result_report.md` - 建築工事施工結果報告書（中間・完了）
- `forms/building_construction_result_report.json` - 同上フィールド定義
- `forms/supervision_status_report.md` - 工事監理状況報告書
- `forms/supervision_status_report.json` - 同上フィールド定義
- `forms/rebar_splice_test_report.md` - 鉄筋継手の試験・検査結果報告
- `forms/rebar_splice_test_report.json` - 同上フィールド定義
- `forms/concrete_test_result_report.md` - コンクリートの試験結果報告
- `forms/concrete_test_result_report.json` - 同上フィールド定義

### schemas/ (JSON Schema バリデーション)
- `schemas/building_construction_result_report.json` - 建築工事施工結果報告書スキーマ
- `schemas/concrete_test_result_report.json` - コンクリート試験結果報告スキーマ
- `schemas/rebar_splice_test_report.json` - 鉄筋継手試験報告スキーマ
- `schemas/supervision_status_report.json` - 工事監理状況報告書スキーマ

### checklists/ (確認項目)
- `checklists/rc_checklist.md` - 基礎・RC造部分等の確認項目（Markdown）
- `checklists/rc_checklist.csv` - 同上（CSV、フィルタ可能）

### docs/ (運用標準・背景資料)
- `docs/00-operation-standard.md` - 行政庁向け運用標準
- `docs/01-inspection-overview.md` - 確認検査の目的
- `docs/02-regulations-and-documents.md` - 法令と書類の関係性
- `docs/03-document-details.md` - 書類ごとの役割
- `docs/04-site-operations.md` - 現場集計方法
- `docs/05-product-spec.md` - プロダクト仕様
- `docs/06-report-format.md` - 施工結果報告書フォーマット

### templates/ (現場台帳テンプレート)
- `templates/施工計画報告書.md`
- `templates/施工結果報告書.md`
- `templates/配合計画書管理票.md`
- `templates/納入書受領管理票.md`
- `templates/フレッシュ試験記録票.md`
- `templates/圧縮強度管理票.md`
- `templates/骨材試験管理票.md`
- `templates/工事監理確認チェック票.md`

### data/ (サンプルCSV台帳)
- `data/打設ロット台帳.csv`
- `data/納入書受領台帳.csv`
- `data/フレッシュ試験台帳.csv`
- `data/圧縮強度台帳.csv`

### app/ (Next.js Webアプリ)
- `app/src/types/ledger.ts` - 台帳のTypeScript型定義

## 2. 代表的な使い方

### 2.1 空テンプレート生成
各 `forms/*.md` のプレースホルダ `{...}` を埋める。

### 2.2 JSONバリデーション
`schemas/` 配下のJSON Schemaに沿って入力データを検証する。

### 2.3 確認項目の抽出
`checklists/rc_checklist.csv` から、`section` や `legal_basis` でフィルタする。

## 3. 命名ルール
- 項目キーは英語スネークケース
- 表示名は日本語
- 法令根拠は配列で保持
- 入力種別は `string | number | enum | text | date | boolean | array`

## 4. 元PDFの論理区分
1. 建築工事施工結果報告書（中間・完了） → page 1
2. 工事監理状況報告書 → page 2
3. 鉄筋継手の試験・検査結果報告 / コンクリートの試験結果報告 → page 3
4. 基礎・鉄筋コンクリート造部分等の確認項目 → pages 4-6

## 5. 確認方法凡例
| 記号 | 確認方法 |
|---|---|
| A | 工事現場で目視又は計測機器により直接確認したもの |
| B | 報告書により確認したもの |
| C | 工場等で検査機器を用いて計測試験し、その結果を工事監理者又は工事施工者が確認したもの |
| D | 第三者機関等が検査機器を用いて計測試験し、その結果を工事監理者又は工事施工者が確認したもの |
| E | 工事監理者（構造担当）が直接確認したもの |
