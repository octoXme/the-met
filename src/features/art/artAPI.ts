export async function fetchArtObjectById(objectId: number) {
  return await fetch(`${process.env.REACT_APP_API_URL}/objects/${objectId}`);
}
