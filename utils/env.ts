const env = {
  SITE_NAME: process.env.SITE_NAME,
  SITE_URL: process.env.SITE_URL,
  STATIC_EXPORTS: process.env.STATIC_EXPORTS,
  OG_IMAGE_URL: process.env.OG_IMAGE_URL
}

console.log("\n===========[ENV]============")
for (let [key, value] of Object.entries(env)) {
  console.log(`${key}: ${value}`)
}
console.log("===========[ENV]============\n")

export { env }
