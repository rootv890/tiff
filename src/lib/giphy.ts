import { GiphyFetch } from "@giphy/js-fetch-api"
import "dotenv/config"
// IMPORTANT: Replace with your actual Giphy API key
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY // Or load from environment variables

if (!GIPHY_API_KEY) {
	console.warn("Giphy API key is not set. Please set it in lib/giphy.ts")
}

const gf = new GiphyFetch(GIPHY_API_KEY!)
console.log("Giphy API key: ", GIPHY_API_KEY)
export default gf
