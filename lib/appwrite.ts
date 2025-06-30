"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

/**
 * Creates a session client for user session-based operations.
 */
export async function createSessionClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "685dadcd001f66032dba";
  const session = cookies().get("appwrite-session");

  if (!endpoint || !projectId) {
    throw new Error("Appwrite configuration is missing required public environment variables.");
  }

  if (!session || !session.value) {
    throw new Error("No session found. Please log in.");
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

/**
 * Creates an admin client with elevated permissions.
 */
export async function createAdminClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT  || "https://fra.cloud.appwrite.io/v1";
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "685dacbc001815d36ce4";
  const apiKey = process.env.NEXT_APPWRITE_API_KEY || "standard_796ee911291afe4f9b526c18d6ba22837c69426758bc9823c8368b6dd2dcdb276a68f1768b7d4eabeb30a854974a734b77c854fb482d2826ab07030ef35052315d1c0fd6f66c0d142eb5579a91a0024fd5e66b72c95a0c5ca7a308656259204e9c57d1606f363fb960adecb284b3e7a1c8d8cc40ea4fe41ce8c55779ca944a81";

  if (!endpoint || !projectId || !apiKey) {
    throw new Error("Appwrite configuration is missing required environment variables.");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    }
  };
}

/**
 * Fetches the currently logged-in user.
 */
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
}
