/**
 * Shiprocket Multi-Vendor Logistics Integration Service
 * Astadasapeetam Sacred Marketplace
 */

const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

let cachedToken = null;
let tokenExpiry = null;

/**
 * 1. Authenticate with Shiprocket API
 */
async function getAuthToken() {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  // Check if live credentials exist
  if (!email || !password) {
    return null; // Signals simulation / mock mode
  }

  // Return cached token if valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const res = await fetch(`${SHIPROCKET_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data && data.token) {
      cachedToken = data.token;
      tokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
      return cachedToken;
    }
  } catch (error) {
    console.warn('[Shiprocket API] Auth failed, falling back to mock mode:', error?.message);
  }

  return null;
}

/**
 * 2. Register Seller Pickup Address in Shiprocket
 */
async function registerVendorPickupLocation(vendor) {
  const token = await getAuthToken();
  const locationTag = vendor.shiprocketPickupLocation || `Loc_${vendor.shopName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20)}`;

  if (!token) {
    return {
      success: true,
      mode: 'mock',
      pickupLocationTag: locationTag,
      message: 'Simulated pickup location registration (Add live SHIPROCKET_EMAIL to .env to sync with Shiprocket servers)'
    };
  }

  try {
    const payload = {
      pickup_location: locationTag,
      name: vendor.contactPerson,
      email: vendor.email || 'care@astadasapeetam.com',
      phone: vendor.phone,
      address: vendor.pickupAddress.street,
      city: vendor.pickupAddress.city,
      state: vendor.pickupAddress.state,
      country: 'India',
      pin_code: vendor.pickupAddress.pincode
    };

    const res = await fetch(`${SHIPROCKET_BASE_URL}/settings/company/addpickup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    return {
      success: true,
      pickupLocationTag: locationTag,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || 'Pickup registration failed'
    };
  }
}

/**
 * 3. Create Shipment Order (Direct Doorstep Pickup from Vendor)
 */
async function createShipmentOrder(order, vendor) {
  const token = await getAuthToken();
  const pickupTag = vendor?.shiprocketPickupLocation || (vendor ? `Loc_${vendor.shopName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20)}` : 'Main_Sanctum');

  if (!token) {
    // Return high-fidelity mock AWB & courier data for instant testing
    const randomCourier = ['Delhivery Surface', 'Blue Dart Air', 'DTDC Express', 'India Post Speed Post'][Math.floor(Math.random() * 4)];
    const mockAWB = `SR${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    return {
      success: true,
      mode: 'mock',
      orderId: order.orderNumber,
      shipmentId: Math.floor(1000000 + Math.random() * 9000000),
      awbCode: mockAWB,
      courierName: randomCourier,
      pickupScheduledFrom: vendor?.shopName || 'Astadasapeetam Sanctum Center',
      pickupPincode: vendor?.pickupAddress?.pincode || '507002',
      deliveryPincode: order.customer?.address?.pincode || '500001',
      estimatedDeliveryDays: '3-4 Business Days',
      labelUrl: `https://apiv2.shiprocket.in/print/label/${mockAWB}`,
      trackingUrl: `https://shiprocket.co/tracking/${mockAWB}`
    };
  }

  try {
    const payload = {
      order_id: order.orderNumber,
      order_date: new Date().toISOString().slice(0, 10),
      pickup_location: pickupTag,
      billing_customer_name: order.customer.name,
      billing_last_name: '',
      billing_address: order.customer.address,
      billing_city: order.customer.address.city || 'Hyderabad',
      billing_pincode: order.customer.address.pincode,
      billing_state: order.customer.address.state || 'Telangana',
      billing_country: 'India',
      billing_email: order.customer.email || 'care@astadasapeetam.com',
      billing_phone: order.customer.phone,
      shipping_is_billing: true,
      order_items: order.items.map(i => ({
        name: i.name,
        sku: i.sku || `SKU-${i.productId}`,
        units: i.quantity || 1,
        selling_price: i.price
      })),
      payment_method: order.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
      sub_total: order.finalPayable,
      length: 15,
      breadth: 12,
      height: 10,
      weight: 0.5
    };

    const res = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const shipmentData = await res.json();

    return {
      success: true,
      orderId: order.orderNumber,
      shipmentId: shipmentData.shipment_id,
      awbCode: shipmentData.awb_code,
      courierName: shipmentData.courier_name,
      labelUrl: `https://apiv2.shiprocket.in/print/label/${shipmentData.awb_code}`,
      trackingUrl: `https://shiprocket.co/tracking/${shipmentData.awb_code}`
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || 'Shiprocket order creation failed'
    };
  }
}

/**
 * 4. Live Tracking by AWB Code
 */
async function trackShipment(awbCode) {
  const token = await getAuthToken();

  if (!token || awbCode.startsWith('SR')) {
    return {
      success: true,
      awbCode,
      status: 'In Transit',
      courier: 'Delhivery Surface',
      expectedDelivery: '3 Days from Pickup',
      currentLocation: 'Hub Khammam / Hyderabad Transit Center',
      history: [
        { activity: 'Pickup Scheduled from Vendor', time: 'Today 10:30 AM' },
        { activity: 'Sacred Package Verified & Dispatched', time: 'Today 02:45 PM' }
      ]
    };
  }

  try {
    const res = await fetch(`${SHIPROCKET_BASE_URL}/courier/track/awb/${awbCode}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || 'Tracking lookup failed'
    };
  }
}

module.exports = {
  getAuthToken,
  registerVendorPickupLocation,
  createShipmentOrder,
  trackShipment
};

