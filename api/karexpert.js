const UPSTREAM = "https://nirankarihealthcity.karexpert.com";

function buildTarget(requestUrl) {
  const incoming = new URL(requestUrl);
  let path = incoming.searchParams.get("path") || "";
  path = path.replace(/^\/+/, "");
  const target = new URL(path ? `/${path}` : "/", UPSTREAM);
  // Preserve original query except our routing param
  incoming.searchParams.forEach((value, key) => {
    if (key !== "path") target.searchParams.set(key, value);
  });
  return target;
}

function sanitizeHeaders(upstreamHeaders) {
  const headers = new Headers();
  upstreamHeaders.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (
      lower === "content-security-policy" ||
      lower === "x-frame-options" ||
      lower === "content-encoding" ||
      lower === "content-length" ||
      lower === "transfer-encoding"
    ) {
      return;
    }
    headers.set(key, value);
  });
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Content-Security-Policy", "frame-ancestors 'self'");
  return headers;
}

export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  const target = buildTarget(request.url);
  const upstreamHeaders = new Headers();
  const accept = request.headers.get("accept");
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  if (accept) upstreamHeaders.set("accept", accept);
  if (contentType) upstreamHeaders.set("content-type", contentType);
  if (cookie) upstreamHeaders.set("cookie", cookie);
  upstreamHeaders.set("user-agent", request.headers.get("user-agent") || "SNHC-Kiosk-Proxy");

  const init = {
    method: request.method,
    headers: upstreamHeaders,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  const upstream = await fetch(target, init);
  const headers = sanitizeHeaders(upstream.headers);
  const contentTypeOut = upstream.headers.get("content-type") || "";

  if (contentTypeOut.includes("text/html")) {
    let html = await upstream.text();
    html = html
      .replace(/<base\s+href=["']\/["']\s*>/i, '<base href="/karexpert/">')
      .replace(/<base\s+href=["']\/["']\s*\/>/i, '<base href="/karexpert/" />');

    // Keep absolute same-host API calls on our proxied host paths.
    // Absolute "/account-management/..." is handled by vercel rewrites.
    return new Response(html, {
      status: upstream.status,
      headers,
    });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}

export const config = {
  runtime: "edge",
};
