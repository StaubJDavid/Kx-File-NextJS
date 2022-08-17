import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const response = NextResponse.next();
    /*response.headers.set("Own-Header", "xdddd");
    req.headers.set("Own-Header", "xdddd");*/
    return response;
}