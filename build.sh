#!/bin/sh

# https://developers.cloudflare.com/pages/framework-guides/deploy-a-blazor-site/

curl -sSL https://dot.net/v1/dotnet-install.sh > dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh -c 10.0 -InstallDir ./dotnet
./dotnet/dotnet workload update
./dotnet/dotnet workload install wasm-tools
./dotnet/dotnet publish -c Release src/

cd ./web
npm ci
npm run build
