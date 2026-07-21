# Origin Vector Website

Official website for Origin Vector / 原点向量.

## Domain Status

Current canonical public domains:

- `https://ovops.com` is the official English brand domain.
- `https://www.ovops.com` is the official Chinese brand domain.
- ICP filing/access for the `ovops` brand domains has passed.
- Canonical, sitemap and structured data should continue to point at the `ovops` domains.

Legacy `roxychao` references are allowed only for redirect and adjacent-service protection:

- `https://roxychao.com` redirects to `https://ovops.com`.
- `https://www.roxychao.com` redirects to `https://www.ovops.com`.
- Do not point or rewrite `postiz.roxychao.com` to this website. That subdomain is reserved for the Postiz social publishing backend.

Do not use `roxychao.com` in new page copy, canonical metadata, sitemap output, structured data, portal links, or language switch links.

## Local Development

```bash
cd /Users/roxy/Documents/原点向量/origin-vector-site
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

This project is configured for static export with `output: "export"`.

```bash
npm run build
```

The static site is emitted to:

```text
out/
```

## Deployment Options

### Vercel

1. Push this folder to a Git repository.
2. Import the project in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output directory: `out`.
6. Add domains:
   - `ovops.com` for the English website.
   - `www.ovops.com` for the Chinese website.

### Static Server / Nginx

Build locally or on the server:

```bash
npm install
npm run build
```

Upload the locale-specific contents of `out/` to the corresponding web root for `ovops.com` or `www.ovops.com`.

Example Nginx server block:

```nginx
server {
    listen 80;
    server_name ovops.com www.ovops.com;
    root /var/www/origin-vector/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Add HTTPS with Certbot or your server provider's certificate manager.

### Two-server setup: Singapore + Guangzhou

Use locale-specific static `out/` artifacts on the two servers.

Recommended DNS / traffic pattern:

- Keep `postiz.roxychao.com` unchanged.
- Point `ovops.com` to the Singapore English website endpoint.
- Point `www.ovops.com` to the Guangzhou Chinese website endpoint.
- Keep `roxychao.com` and `www.roxychao.com` as legacy HTTP 301 redirect hosts only.
- If both Singapore and Guangzhou should serve the same locale later, use DNS provider routing, CDN origin failover, or a load balancer rather than different website code on each server.
- Keep one source repository and locale-specific build artifacts to avoid content drift.

The language switch links only between `ovops.com` and `www.ovops.com`.

### Current deployments

Repository:

- Source branch: `main`
- Static artifact branch: `deploy`
- GitHub repo: `https://github.com/Roxy-Chao/origin-vector-site`

Singapore server / English site:

- SSH host: `postiz-sg`
- Static web root: `/srv/origin-vector-site/current`
- Web server: Caddy
- Existing Postiz route stays unchanged: `postiz.roxychao.com -> 127.0.0.1:4007`

Guangzhou server / Chinese site:

- SSH host: `web-cn`
- Chinese static web root: `/srv/origin-vector-site-zh/current`
- Web server: Caddy

Current Singapore Caddy route for the English site:

```caddy
ovops.com {
    root * /srv/origin-vector-site/current
    encode zstd gzip
    try_files {path} {path}/index.html
    file_server
}

roxychao.com {
    redir https://ovops.com{uri} 301
}
```

Current Guangzhou Caddy route for the Chinese site:

```caddy
www.ovops.com {
    root * /srv/origin-vector-site-zh/current
    encode zstd gzip
    try_files {path} {path}/index.html
    file_server
}

www.roxychao.com {
    redir https://www.ovops.com{uri} 301
}
```

Keep the legacy direct Singapore IP route only for temporary diagnostics when needed:

```caddy
http://43.160.224.99 {
    root * /srv/origin-vector-site/current
    encode zstd gzip
    try_files {path} {path}/index.html
    file_server
}
```

Deploy the Chinese build to the Guangzhou server for `www.ovops.com`; keep the Singapore English deployment for `ovops.com`.

Caddy issues and renews Let's Encrypt certificates automatically for the configured hostnames.

## Public Compliance URLs

- `/privacy`
- `/data-deletion`
- `/terms`

These pages are designed to be publicly accessible for Meta / LinkedIn review workflows.
