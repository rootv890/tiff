"use server"

import gf from "./giphy"

// trending
export const getTrendingGifs = async () => {
	const gifs = await gf.trending({ limit: 20 })
	return gifs.data
}
