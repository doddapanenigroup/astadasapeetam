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
  console.log('--- 1. Testing Health Endpoint ---');
  const health = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET'
  });
  console.log('Health:', health.status, health.data);

  console.log('\n--- 2. Testing Login for 3 Roles ---');
  const roles = [
    { email: 'admin@astadasapeetam.com', password: 'Admin@12345', label: 'Admin' },
    { email: 'marketing@astadasapeetam.com', password: 'Market@12345', label: 'Digital Marketing' },
    { email: 'astrologer@astadasapeetam.com', password: 'Astro@12345', label: 'Astrologer' }
  ];

  const tokens = {};

  for (const r of roles) {
    const res = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      { email: r.email, password: r.password }
    );
    console.log(`[${r.label}] Login Status:`, res.status, 'User Role:', res.data?.user?.role);
    if (res.data?.token) {
      tokens[res.data.user.role] = res.data.token;
    } else {
      console.error(`Failed to get token for ${r.label}:`, res.data);
    }
  }

  console.log('\n--- 3. Testing RBAC Role Isolation ---');

  // Admin access to admin stats
  const adminStats = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/stats',
    method: 'GET',
    headers: { Authorization: `Bearer ${tokens['admin']}` }
  });
  console.log('Admin accessing /api/admin/stats:', adminStats.status, 'Success:', adminStats.data.success);

  // Marketing accessing admin stats (Should be 403 Forbidden)
  const marketOnAdmin = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/stats',
    method: 'GET',
    headers: { Authorization: `Bearer ${tokens['digital_marketing']}` }
  });
  console.log('Marketing accessing /api/admin/stats (Expect 403):', marketOnAdmin.status);

  // Marketing accessing marketing campaigns
  const marketCampaigns = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/marketing/campaigns',
    method: 'GET',
    headers: { Authorization: `Bearer ${tokens['digital_marketing']}` }
  });
  console.log('Marketing accessing /api/marketing/campaigns:', marketCampaigns.status, 'Campaigns count:', marketCampaigns.data?.count);

  // Astrologer accessing astrologer consultations
  const astroConsultations = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/astrologer/consultations',
    method: 'GET',
    headers: { Authorization: `Bearer ${tokens['astrologer']}` }
  });
  console.log('Astrologer accessing /api/astrologer/consultations:', astroConsultations.status, 'Success:', astroConsultations.data?.success);

  // Astrologer accessing marketing (Should be 403)
  const astroOnMarket = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/marketing/campaigns',
    method: 'GET',
    headers: { Authorization: `Bearer ${tokens['astrologer']}` }
  });
  console.log('Astrologer accessing /api/marketing/campaigns (Expect 403):', astroOnMarket.status);

  console.log('\n--- All Backend Auth & RBAC Checks Complete! ---');
}

runTests().catch(console.error);
