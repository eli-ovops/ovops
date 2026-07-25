import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ status: 'ok', runtimeMode: process.env.OVOPS_RUNTIME_MODE ?? 'unknown' })
}
