# コンクリート圧縮強度試験成績書（普通強度）

## 文書メタ
- form_type: nittocon_normal_strength_test_report
- form_family: compression_strength
- layout: single_page

## テンプレート

### 基本情報
- 受付番号: {receipt_no}
- 受付日: {receipt_date}
- 報告日: {report_date}
- 試験機関: {laboratory_name}
- 依頼者: {contractor_name}

### 工事情報
- 工事現場: {site_name}
- 工事名称: {project_name}
- 建築工事施工計画報告書番号: {construction_plan_report_no}
- 建築確認年月日: {confirmation_date}
- 建築確認番号: {confirmation_no}
- 計画通知年月日番号: {notification_date}

### 使用材料
- レディーミクストコンクリート工場名: {ready_mixed_concrete_plant}
- 呼び方: {nominal_call}
- 混和剤: {admixture}
- 混和材: {mixture_material}

### 試験条件
- 試験の目的: {test_purpose}
- 試験体採取会社名: {sampling_company}
- 試験体採取責任者名: {sampling_responsible_person}
- 検印: {seal_present}
- 欠陥: {defect_present}
- 試験体の採取地点: {sampling_location}
- 打ち込み箇所: {placing_location}
- 強度管理方法: {method}
- 養生温度(℃): {curing_temperature_c}
- 養生方法: {curing_method}
- 強度管理材齢: {management_age_day}
- 試験材齢: {specimen_age_day}
- 試験体採取年月日: {sampling_date}
- 試験体採取方法等: {sampling_method}
- 試験年月日・番号: {test_date} / {test_report_no}

### 試験結果
| 試験体の符号 | スランプ(cm) | 空気量(%) | コンクリート温度(℃) | 塩化物(kg/m3) | 直径(mm) | 最大荷重(N) | 圧縮強度(N/mm2) | 備考 |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| {specimen_1} | {slump_1} | {air_1} | {temp_1} | {chloride_1} | {diameter_1} | {load_1} | {strength_1} | {remarks_1} |
| {specimen_2} | {slump_2} | {air_2} | {temp_2} | {chloride_2} | {diameter_2} | {load_2} | {strength_2} | {remarks_2} |
| {specimen_3} | {slump_3} | {air_3} | {temp_3} | {chloride_3} | {diameter_3} | {load_3} | {strength_3} | {remarks_3} |

### 平均・判定
- 圧縮強度の平均 F: {average_strength_n_mm2}
- 設計基準強度 Fc: {fc}
- 耐久設計基準強度 Fd: {fd}
- 品質基準強度 Fq: {fq}
- 構造体強度補正値 S: {s}
- 調合管理強度 Fm: {fm}
- 呼び強度値 FN: {fn}
- 試験結果の判定式: {judgment_formula}
- 判定: {judgment}

### 署名等
- 立会者所属氏名: {witness_affiliation_name}
- 試験担当者: {test_operator}
- 試験機番号: {testing_machine_no}
- 署名者: {signer}

### 備考
{free_text}
