# コンクリート圧縮強度試験成績書（高強度）

## 文書メタ
- form_type: nittocon_high_strength_test_report
- form_family: compression_strength
- layout: single_page

## テンプレート

### 基本情報
- 受付番号: {receipt_no}
- 受付年月日: {receipt_date}
- 発行年月日: {issue_date}
- 試験機関: {laboratory_name}
- 施工者名: {contractor_name}

### 工事情報
- 工事現場: {site_name}
- 工事名称: {project_name}
- 建築工事施工計画報告書番号: {construction_plan_report_no}
- 建築確認年月日・番号: {confirmation_date} / {confirmation_no}

### 使用材料
- レディーミクストコンクリート工場名: {ready_mixed_concrete_plant}
- 呼び方: {nominal_call}
- 混和剤: {admixture}

### 試験条件
- 試験の目的: {test_purpose}
- 採取年月日: {sampling_date}
- 試料採取地点: {sampling_location}
- 検印: {seal_present}
- 採取試験会社: {sampling_company}
- 採取者名・資格: {sampler_name_and_qualification}
- 打込箇所: {placing_location}
- 採取方法: {sampling_method}
- 欠陥: {defect_present}
- 養生方法: {curing_method}
- 養生温度(℃): {curing_temperature_c}

### 強度管理条件
- 強度管理方法: {method}
- 設計基準強度(Fc): {fc}
- 品質基準強度(Fq): {fq}
- 呼び強度値(FN): {fn}
- 判定基準強度値: {judgment_standard_strength}
- 建築基準法第37条認定番号: {article37_approval_no}
- 強度管理材齢: {management_age_day}
- 試験材齢: {specimen_age_day}
- 試験年月日: {test_date}
- 試験番号: {test_no}

### 試験結果

#### 1回目
| 供試体符号 | スランプフロー(cm) | 空気量(%) | コンクリート温度(℃) | 塩化物(kg/m3) | 直径(mm) | 最大荷重(kN) | 圧縮強度(N/mm2) |
|---|---|---|---|---|---|---|---|
| {g1_s1} | {g1_sf1} | {g1_air1} | {g1_temp1} | {g1_cl1} | {g1_dia1} | {g1_load1} | {g1_strength1} |
| {g1_s2} | {g1_sf2} | {g1_air2} | {g1_temp2} | {g1_cl2} | {g1_dia2} | {g1_load2} | {g1_strength2} |
| {g1_s3} | {g1_sf3} | {g1_air3} | {g1_temp3} | {g1_cl3} | {g1_dia3} | {g1_load3} | {g1_strength3} |
- 1回目平均値: {g1_avg}

#### 2回目
| 供試体符号 | スランプフロー(cm) | 空気量(%) | コンクリート温度(℃) | 塩化物(kg/m3) | 直径(mm) | 最大荷重(kN) | 圧縮強度(N/mm2) |
|---|---|---|---|---|---|---|---|
| {g2_s1} | {g2_sf1} | {g2_air1} | {g2_temp1} | {g2_cl1} | {g2_dia1} | {g2_load1} | {g2_strength1} |
| {g2_s2} | {g2_sf2} | {g2_air2} | {g2_temp2} | {g2_cl2} | {g2_dia2} | {g2_load2} | {g2_strength2} |
| {g2_s3} | {g2_sf3} | {g2_air3} | {g2_temp3} | {g2_cl3} | {g2_dia3} | {g2_load3} | {g2_strength3} |
- 2回目平均値: {g2_avg}

#### 3回目
| 供試体符号 | スランプフロー(cm) | 空気量(%) | コンクリート温度(℃) | 塩化物(kg/m3) | 直径(mm) | 最大荷重(kN) | 圧縮強度(N/mm2) |
|---|---|---|---|---|---|---|---|
| {g3_s1} | {g3_sf1} | {g3_air1} | {g3_temp1} | {g3_cl1} | {g3_dia1} | {g3_load1} | {g3_strength1} |
| {g3_s2} | {g3_sf2} | {g3_air2} | {g3_temp2} | {g3_cl2} | {g3_dia2} | {g3_load2} | {g3_strength2} |
| {g3_s3} | {g3_sf3} | {g3_air3} | {g3_temp3} | {g3_cl3} | {g3_dia3} | {g3_load3} | {g3_strength3} |
- 3回目平均値: {g3_avg}

### 総括
- 単位水量(kg/m3): {unit_water_content_kg_m3}
- 圧縮強度平均 F: {total_average_strength_n_mm2}
- 判定式: {judgment_formula}
- 判定: {judgment}
- 試験機番号: {machine_no}
- 試験担当者: {test_operator}
- 立会者名その他摘要: {witness_name}
