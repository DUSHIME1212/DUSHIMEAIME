import { client } from "~/sanity/lib/client"
import { sanityFetch } from "~/sanity/lib/live"

const query = `*[_type == "Experience"] {
  _id,
  title,
  "companyLogo": {
    "url": companyLogo.asset->url,
  },
  "slug": slug.current,
  description,
  startDate,
  endDate,
  isCurrentlyWorkingHere
}`


export async function fetchExperience() {
    const res = await client.fetch(query)
    return res
}