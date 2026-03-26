import { NextRequest } from "next/server";

// Mock OCR results for demo (used when no API key is configured)
const MOCK_RESULTS: Record<string, OcrResult> = {
  fresh: {
    documentType: "フレッシュコンクリート試験成績表",
    confidence: 0.95,
    fields: {
      試験日: "2024-06-15",
      工事名: "○○ビル新築工事",
      打設箇所: "2F スラブ",
      配合記号: "30-18-20N",
      工場名: "△△生コン",
      スランプ値: "18.0 cm",
      空気量: "4.5 %",
      コンクリート温度: "26.5 ℃",
      外気温: "28.0 ℃",
      塩化物含有量: "0.18 kg/m³",
      単位水量推定値: "168 kg/m³",
    },
    rawText:
      "フレッシュコンクリート試験成績表\n試験日: 2024年6月15日\n工事名: ○○ビル新築工事...",
  },
  strength: {
    documentType: "コンクリート圧縮強度試験成績表",
    confidence: 0.92,
    fields: {
      試験日: "2024-07-13",
      工事名: "○○ビル新築工事",
      打設日: "2024-06-15",
      材齢: "28日",
      配合記号: "30-18-20N",
      設計基準強度Fc: "30 N/mm²",
      呼び強度: "33 N/mm²",
      供試体1: "35.2 N/mm²",
      供試体2: "34.8 N/mm²",
      供試体3: "36.1 N/mm²",
      平均強度: "35.4 N/mm²",
      判定: "合格 (35.4 ≧ 30)",
    },
    rawText:
      "コンクリート圧縮強度試験成績表\n試験日: 2024年7月13日\n打設日: 2024年6月15日...",
  },
  delivery: {
    documentType: "納入伝票",
    confidence: 0.88,
    fields: {
      伝票番号: "N-2024-0615-001",
      納入日: "2024-06-15",
      工場名: "△△生コン",
      配合記号: "30-18-20N",
      数量: "4.5 m³",
      出荷時刻: "08:30",
      到着時刻: "09:05",
      車両番号: "品川 100 あ 1234",
    },
    rawText: "納入伝票\n伝票番号: N-2024-0615-001\n納入日: 2024年6月15日...",
  },
  plan: {
    documentType: "配合計画書",
    confidence: 0.90,
    fields: {
      工場名: "△△生コン",
      配合記号: "30-18-20N",
      呼び強度: "33 N/mm²",
      スランプ: "18 cm",
      粗骨材最大寸法: "20 mm",
      セメント種類: "普通ポルトランドセメント",
      水セメント比: "48.5 %",
      単位水量: "170 kg/m³",
      単位セメント量: "351 kg/m³",
    },
    rawText: "コンクリート配合計画書\n工場名: △△生コン...",
  },
  photo: {
    documentType: "受入検査写真",
    confidence: 0.85,
    fields: {
      撮影日: "2024-06-15",
      工事名: "○○ビル新築工事",
      打設箇所: "2F スラブ",
      黒板記載_スランプ: "18.0 cm",
      黒板記載_空気量: "4.5 %",
      黒板記載_温度: "26.5 ℃",
    },
    rawText: "（写真から黒板テキストを読み取り）\nスランプ: 18.0 cm...",
  },
};

type OcrResult = {
  documentType: string;
  confidence: number;
  fields: Record<string, string>;
  rawText: string;
};

function detectDocTypeFromFilename(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes("フレッシュ") || lower.includes("fresh")) return "fresh";
  if (
    lower.includes("圧縮") ||
    lower.includes("強度") ||
    lower.includes("strength")
  )
    return "strength";
  if (lower.includes("納入") || lower.includes("伝票") || lower.includes("delivery"))
    return "delivery";
  if (lower.includes("配合") || lower.includes("haigo") || lower.includes("plan"))
    return "plan";
  if (lower.match(/\.(jpg|jpeg|png)$/i)) return "photo";
  return "fresh"; // default
}

async function callClaudeVisionAPI(
  base64Data: string,
  mimeType: string,
  filename: string
): Promise<OcrResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("NO_API_KEY");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType,
                data: base64Data,
              },
            },
            {
              type: "text",
              text: `この建設現場の生コンクリート関連書類から情報を抽出してください。

以下のJSON形式で返してください（日本語で）:
{
  "documentType": "書類の種類（フレッシュコンクリート試験成績表/コンクリート圧縮強度試験成績表/納入伝票/配合計画書/受入検査写真）",
  "confidence": 0.0〜1.0の信頼度,
  "fields": {
    "フィールド名": "値",
    ...
  },
  "rawText": "OCRで読み取った生テキスト全体"
}

フィールドは書類の種類に応じて適切なものを抽出してください。
数値には単位を含めてください（例: "18.0 cm", "35.4 N/mm²"）。
ファイル名: ${filename}`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const text =
    data.content?.[0]?.type === "text" ? data.content[0].text : "";

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse Claude response as JSON");
  }

  return JSON.parse(jsonMatch[0]) as OcrResult;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "ファイルが選択されていません" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "PDF, JPG, PNGのみ対応しています" },
        { status: 400 }
      );
    }

    // Try Claude Vision API first
    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const result = await callClaudeVisionAPI(base64, file.type, file.name);
      return Response.json({
        success: true,
        mode: "ai",
        result,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      // If no API key, fall back to mock
      if (errorMessage === "NO_API_KEY") {
        const docType = detectDocTypeFromFilename(file.name);
        const mockResult = MOCK_RESULTS[docType] || MOCK_RESULTS.fresh;
        return Response.json({
          success: true,
          mode: "demo",
          message:
            "デモモード: ANTHROPIC_API_KEY を設定すると実際のAI-OCRが使えます",
          result: mockResult,
        });
      }
      throw err;
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return Response.json(
      { error: `OCR処理エラー: ${errorMessage}` },
      { status: 500 }
    );
  }
}
