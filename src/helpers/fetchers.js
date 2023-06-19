export async function getImageBlob(url) {
  const resp = await fetch(url)
  const imageBody = await resp.blob()
  return imageBody
}
