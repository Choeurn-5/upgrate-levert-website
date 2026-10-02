export const runtime = 'nodejs';

export async function POST() {
  return new Response(
    JSON.stringify({ error: 'Upload disabled. Gallery images are static files committed to public/images/Gallery/.' }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function GET() {
  return new Response(
    JSON.stringify({ status: 'disabled', message: 'Upload endpoint is disabled.' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
