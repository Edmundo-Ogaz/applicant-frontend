import DateUtil from "@/utils/DateUtil";

async function findByMonth(companyId, createdAt) {
  try {
    const startDate = `${DateUtil.getYear()}-${DateUtil.getMonth()}-01`
    const endDate = DateUtil.format(new Date())
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants?company=${companyId}&createdAtBetween=${startDate}/${endDate}`,
      )
    const testsPostulants = await response.json();
    if (response?.ok === false) {
      throw new Error(testsPostulants?.error)
    }
    return testsPostulants.data
  } catch(e) {
    throw new Error(e.message);
  }
}

const TestPostulantService = { findByMonth }

export default TestPostulantService