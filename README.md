# dns-lookup-lite

Helper mínimo sobre `node:dns/promises` para resolver A/AAAA/MX/TXT e reverse DNS.

## Instalação

```bash
npm install dns-lookup-lite
```

## Uso

```ts
import { lookupAll, lookupMX, reverse } from "dns-lookup-lite";

const info = await lookupAll("github.com");
console.log(info.a, info.mx);

await reverse("8.8.8.8");
```

## API

- `lookupA(host)` — registros A (IPv4)
- `lookupAAAA(host)` — registros AAAA (IPv6)
- `lookupMX(host)` — registros MX ordenados por prioridade
- `lookupTXT(host)` — registros TXT
- `lookupAll(host)` — todos em paralelo
- `reverse(ip)` — PTR

## Licença

MIT
