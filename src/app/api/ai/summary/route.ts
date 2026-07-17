import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { repoName, description, language, topics, fullName } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 503 });
    }

    // Fetch README from GitHub (public, no auth needed)
    let readmeContent = '';
    try {
      const readmeRes = await fetch(
        `https://api.github.com/repos/${fullName}/readme`,
        { headers: { Accept: 'application/vnd.github.raw+json' }, next: { revalidate: 3600 } }
      );
      if (readmeRes.ok) {
        const text = await readmeRes.text();
        // Trim to 3000 chars to fit context
        readmeContent = text.replace(/[#*`>\-]/g, '').replace(/\n{3,}/g, '\n\n').slice(0, 3000);
      }
    } catch { /* README is optional */ }

    const prompt = `You are a senior developer analyzing a GitHub repository. Based on the information below, return a concise structured JSON summary.

Repository: ${fullName}
Description: ${description || 'No description provided'}
Primary Language: ${language || 'Unknown'}
Topics/Tags: ${(topics ?? []).join(', ') || 'None'}
README excerpt:
${readmeContent || '(No README available)'}

Respond ONLY with valid JSON in this exact structure, no markdown, no extra text:
{
  "summary": "One clear sentence describing what this project does and its purpose",
  "technologies": ["list", "of", "main", "tech", "stacks", "libraries"],
  "complexity": "Simple",
  "features": ["Key feature 1", "Key feature 2", "Key feature 3", "Key feature 4"]
}

Rules:
- summary: max 15 words, plain language
- technologies: 3-7 items, just names (e.g. "Next.js", "PostgreSQL")
- complexity: must be exactly one of "Simple", "Medium", or "Complex"
- features: exactly 3-5 bullet-point style items`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error('Gemini error:', err);
      return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
    const parsed = JSON.parse(rawText);

    return NextResponse.json(parsed, {
      headers: { 'Cache-Control': 's-maxage=86400, stale-while-revalidate' },
    });
  } catch (err: any) {
    console.error('AI summary error:', err);
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 });
  }
}
