import { NextRequest, NextResponse } from 'next/server'

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'

async function getAccessToken() {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.YOUTUBE_CLIENT_ID!,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET!,
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'token_error')
  return json.access_token as string
}

export async function POST(req: NextRequest) {
  const { title, items } = await req.json()
  if (!title || !Array.isArray(items)) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  const accessToken = await getAccessToken()

  const plRes = await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({ snippet: { title }, status: { privacyStatus: 'unlisted' } }),
  })
  const playlist = await plRes.json()
  const playlistId = playlist.id

  for (const it of items) {
    await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
      body: JSON.stringify({ snippet: { playlistId, resourceId: { kind: 'youtube#video', videoId: it.videoId } } }),
    })
  }

  return NextResponse.json({ url: `https://www.youtube.com/playlist?list=${playlistId}` })
}
