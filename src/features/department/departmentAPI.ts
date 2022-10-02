export async function fetchAllDepartments() {
  return await fetch(`${process.env.REACT_APP_API_URL}/departments`);
}
