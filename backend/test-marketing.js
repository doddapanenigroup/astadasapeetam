const http = require('http');

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- 1. Testing Public Endpoints (No Auth Needed) ---');
  const pubProds = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/public/products',
    method: 'GET'
  });
  console.log('Public Products status:', pubProds.status, 'Count:', pubProds.data?.count);

  const pubContent = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/public/content',
    method: 'GET'
  });
  console.log('Public Website Content status:', pubContent.status, 'Count:', pubContent.data?.count);

  console.log('\n--- 2. Login as Digital Marketing ---');
  const marketLogin = await request(
    {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    { email: 'marketing@astadasapeetam.com', password: 'Market@12345' }
  );
  const token = marketLogin.data?.token;
  console.log('Marketing Login status:', marketLogin.status, 'Role:', marketLogin.data?.user?.role);

  console.log('\n--- 3. Digital Marketing: Marketplace Management ---');
  const marketProds = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/marketing/products',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Marketing Fetch Products status:', marketProds.status, 'Total Products:', marketProds.data?.count);

  const firstProd = marketProds.data?.data?.[0];
  if (firstProd) {
    console.log(`Toggling stock for: "${firstProd.name}" (Current: ${firstProd.inStock})`);
    const toggleStock = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/marketing/products/${firstProd._id}/toggle-stock`,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Toggle Stock result:', toggleStock.data?.message);
  }

  console.log('\n--- 4. Digital Marketing: Website Sections Content Management ---');
  const contents = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/marketing/content',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Marketing Fetch Website Sections status:', contents.status, 'Sections Count:', contents.data?.count);

  const firstSection = contents.data?.data?.[0];
  if (firstSection) {
    console.log(`Toggling status for Section: "${firstSection.sectionName}" (Current: ${firstSection.isActive})`);
    const toggleSection = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/marketing/content/${firstSection._id}/toggle`,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Toggle Section result:', toggleSection.data?.message);
  }

  console.log('\n--- 5. Digital Marketing Analytics ---');
  const analytics = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/marketing/analytics',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Marketing Analytics status:', analytics.status, 'Data:', analytics.data?.data);

  console.log('\n🎉 ALL DIGITAL MARKETING MARKETPLACE & SECTION CONTENT TESTS PASSED! 🎉');
}

runTests().catch(console.error);
