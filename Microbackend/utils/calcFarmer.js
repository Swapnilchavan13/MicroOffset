// ==========================================
// CONSTANTS
// ==========================================
const PRICE_PER_TON = 250;

const WEIGHT_PER_ACRE = {
  "मक्का का पूरा पौधा": 1.0,
  "मक्का का भुट्टा (Cob)": 0.5,
  "भुट्टा + पत्ते (मिक्स)": 0.5,
};

// ==========================================
// HAVERSINE DISTANCE (km)
// ==========================================
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ==========================================
// FIND NEAREST DROP POINT
// ==========================================
function findNearestDropPoint(farmerLat, farmerLng, dropPoints) {
  if (!dropPoints || dropPoints.length === 0) return null;

  let nearest = null;
  let minDist = Infinity;

  for (const dp of dropPoints) {
    const d = haversineKm(farmerLat, farmerLng, dp.latitude, dp.longitude);
    if (d < minDist) {
      minDist = d;
      nearest = dp;
    }
  }

  if (!nearest) return null;

  return {
    ...nearest,
    distanceKm: Number(minDist.toFixed(2)),
  };
}

// ==========================================
// CALCULATE DROP DATE (harvestDate + 5 days)
// ==========================================
function calcDropDate(harvestDate) {
  if (!harvestDate) return null;
  const d = new Date(harvestDate);
  if (isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + 5);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// ==========================================
// CALCULATE REVENUE
// ==========================================
function calcRevenue({
  biomassEntries = [],
  transportType = "self",
  distanceKm = 0,
}) {
  // Base amount
  let baseAmount = 0;
  for (const entry of biomassEntries) {
    const weightPerAcre = WEIGHT_PER_ACRE[entry.type] || 0;
    baseAmount += PRICE_PER_TON * weightPerAcre * (Number(entry.acres) || 0);
  }

  // Distance cost
  let distanceCost = 0;
  if (transportType === "pickup") {
    if (distanceKm <= 25) distanceCost = 1200;
    else distanceCost = 2000; // 25+ km
  }

  const estimatedAmount = Math.round(baseAmount + distanceCost);

  return {
    baseAmount: Math.round(baseAmount),
    distanceCost,
    estimatedAmount,
  };
}

module.exports = {
  PRICE_PER_TON,
  WEIGHT_PER_ACRE,
  haversineKm,
  findNearestDropPoint,
  calcDropDate,
  calcRevenue,
};