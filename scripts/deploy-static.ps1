$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$deployRoot = Join-Path $projectRoot '.deploy'
$stage = Join-Path $deployRoot ("site-" + $stamp)
New-Item -ItemType Directory -Force -Path $stage | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $stage 'images') | Out-Null
$dist = Join-Path $projectRoot 'dist'
foreach ($name in @('index.html','robots.txt','sitemap.xml','favicon.svg','solux-logo-transparent.png')) {
  Copy-Item -LiteralPath (Join-Path $dist $name) -Destination (Join-Path $stage $name)
}
Copy-Item -LiteralPath (Join-Path $dist 'assets') -Destination (Join-Path $stage 'assets') -Recurse
Get-ChildItem -LiteralPath (Join-Path $dist 'images') -Filter '*.webp' | ForEach-Object { Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $stage 'images') }
$csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https://i.ytimg.com; frame-src https://www.youtube-nocookie.com https://www.youtube.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
$config = @{
  cleanUrls = $true
  headers = @(@{
    source = '/(.*)'
    headers = @(
      @{key='X-Content-Type-Options';value='nosniff'},
      @{key='Referrer-Policy';value='strict-origin-when-cross-origin'},
      @{key='X-Frame-Options';value='DENY'},
      @{key='Permissions-Policy';value='camera=(), microphone=(), geolocation=()'},
      @{key='Content-Security-Policy';value=$csp}
    )
  })
}
$config | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $stage 'vercel.json') -Encoding utf8
$archive = Join-Path $deployRoot ("solux-" + $stamp + '.tgz')
& tar.exe -czf $archive -C $stage .
if ($LASTEXITCODE -ne 0) { throw 'Falha ao empacotar os arquivos públicos.' }
$resultPath = Join-Path $deployRoot 'deployment-result.json'
& curl.exe --fail-with-body --silent --show-error --max-time 180 -X POST 'https://codex-deploy-skills.vercel.sh/api/deploy' -F "file=@$archive" -F 'framework=null' -o $resultPath
if ($LASTEXITCODE -ne 0) { throw "Falha de publicação. Resposta salva em $resultPath" }
$result = Get-Content -Raw -LiteralPath $resultPath | ConvertFrom-Json
if ($result.error) { throw $result.error }
if (-not $result.previewUrl) { throw 'O serviço não retornou um endereço de publicação.' }
[pscustomobject]@{previewUrl=$result.previewUrl;claimUrl=$result.claimUrl;deploymentId=$result.deploymentId;projectId=$result.projectId} | ConvertTo-Json
