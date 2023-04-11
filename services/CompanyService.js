async function findById(companyId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies/${companyId}`,
      )
    const company = await response.json();
    if (response?.ok === false) {
      throw new Error(company?.error)
    }
    return company
  } catch(e) {
    throw new Error(e.message);
  }
}

const CompanyService = { findById }

export default CompanyService