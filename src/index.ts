// dns-lookup-lite: DNS lookup helper using node:dns/promises
import { promises as dns } from "node:dns";

export interface LookupResult {
  host: string;
  a: string[];
  aaaa: string[];
  mx: { exchange: string; priority: number }[];
  txt: string[][];
}

export async function lookupA(host: string): Promise<string[]> {
  try {
    return await dns.resolve4(host);
  } catch {
    return [];
  }
}

export async function lookupAAAA(host: string): Promise<string[]> {
  try {
    return await dns.resolve6(host);
  } catch {
    return [];
  }
}

export async function lookupMX(host: string): Promise<{ exchange: string; priority: number }[]> {
  try {
    const rs = await dns.resolveMx(host);
    return rs.sort((a, b) => a.priority - b.priority);
  } catch {
    return [];
  }
}

export async function lookupTXT(host: string): Promise<string[][]> {
  try {
    return await dns.resolveTxt(host);
  } catch {
    return [];
  }
}

export async function lookupAll(host: string): Promise<LookupResult> {
  const [a, aaaa, mx, txt] = await Promise.all([
    lookupA(host),
    lookupAAAA(host),
    lookupMX(host),
    lookupTXT(host),
  ]);
  return { host, a, aaaa, mx, txt };
}

export async function reverse(ip: string): Promise<string[]> {
  try {
    return await dns.reverse(ip);
  } catch {
    return [];
  }
}
