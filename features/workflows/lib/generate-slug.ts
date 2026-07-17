import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator";

/**
 * Generates a random hyphenated slug from an adjective and an animal,
 * e.g. "brave-otter", "happy-dolphin".
 */
export function generateSlug(): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    style: "lowerCase",
  });
}