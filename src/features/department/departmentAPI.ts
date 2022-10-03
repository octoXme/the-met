export async function fetchDepartmentsAPI() {
  return await fetch(`${process.env.REACT_APP_API_URL}/departments`);
}
