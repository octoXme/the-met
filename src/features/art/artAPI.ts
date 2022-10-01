const API = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';

export async function fetchArtObjectById(objectId: string) {
  return await fetch(`${API}/${objectId}`);
}
