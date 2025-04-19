import { sanityClient } from "sanity:client";
import groq from "groq";
import type { Pizza } from "../../sanity.types";

export async function getPizzas(): Promise<Pizza[]> {
  return await sanityClient.fetch(
    groq`*[_type == "pizza"] | order(_createdAt desc)`
  );
}
