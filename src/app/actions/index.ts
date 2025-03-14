"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function getAuthUrl(provider: string) {
  return `/api/auth/signin/${provider}`;
}
