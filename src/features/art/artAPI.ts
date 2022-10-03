export async function fetchArtObjectByIdAPI(objectId: number) {
  return await fetch(`${process.env.REACT_APP_API_URL}/objects/${objectId}`);
}
