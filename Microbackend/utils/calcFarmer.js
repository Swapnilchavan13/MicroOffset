// ==========================================
// CONSTANTS
// ==========================================

const DAILY_PICKUP_LIMIT = 500; // 500 acres per day
const PICKUP_START_DATE = "2025-11-04"; // 4th November (change year if needed)

// Rates per Acre
const RATE_MAKKA_GINTHI = 250; // ₹250 / Acre (Anumanit)
const RATE_DHAN = 1000; // ₹1000 / Acre

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
// ADD DAYS TO DATE (YYYY-MM-DD)
// ==========================================
function addDays(dateStr, days) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ==========================================
// CALCULATE PICKUP DATE
// Rule: Threshing Date + 10 days
// Minimum start = 4th November
// Skip past dates
// Respect 500 acres daily limit
// ==========================================
async function calculatePickupDate({
  LocationFarmer,
  threshingDate,
  acres = 0,
  dailyLimit = DAILY_PICKUP_LIMIT,
}) {
  if (!threshingDate) return null;

  let candidate = addDays(threshingDate, 10);

  // Force minimum start date
  if (!candidate || candidate < PICKUP_START_DATE) {
    candidate = PICKUP_START_DATE;
  }

  const today = getTodayDateString();
  const acresNum = Number(acres) || 0;
  let safety = 0;

  while (safety < 60) {
    // Skip past dates
    if (candidate < today) {
      candidate = addDays(candidate, 1);
      safety++;
      continue;
    }

    const used = await getPickupAcresOnDate(LocationFarmer, candidate);

    if (used + acresNum <= dailyLimit) {
      return candidate;
    }

    // Move to next day
    candidate = addDays(candidate, 1);
    safety++;
  }

  return candidate;
}

// ==========================================
// GET TOTAL ACRES BOOKED ON A DATE
// ==========================================
async function getPickupAcresOnDate(LocationFarmer, dateStr) {
  if (!dateStr) return 0;

  const result = await LocationFarmer.aggregate([
    {
      $match: {
        pickupDate: dateStr,
      },
    },
    {
      $group: {
        _id: null,
        totalAcres: {
          $sum: {
            $sum: {
              $map: {
                input: { $ifNull: ["$biomassEntries", []] },
                as: "entry",
                in: { $ifNull: ["$$entry.acres", 0] },
              },
            },
          },
        },
      },
    },
  ]);

  return result[0]?.totalAcres || 0;
}

// ==========================================
// CHECK IF DATE IS AVAILABLE
// ==========================================
async function isPickupDateAvailable(
  LocationFarmer,
  dateStr,
  acres = 0,
  dailyLimit = DAILY_PICKUP_LIMIT
) {
  const used = await getPickupAcresOnDate(LocationFarmer, dateStr);
  return used + Number(acres) <= dailyLimit;
}

// ==========================================
// GET CAPACITY MAP (for frontend)
// ==========================================
async function getPickupCapacityMap(LocationFarmer, fromDate, toDate) {
  const rows = await LocationFarmer.aggregate([
    {
      $match: {
        pickupDate: { $gte: fromDate, $lte: toDate },
      },
    },
    {
      $group: {
        _id: "$pickupDate",
        totalAcres: {
          $sum: {
            $sum: {
              $map: {
                input: { $ifNull: ["$biomassEntries", []] },
                as: "entry",
                in: { $ifNull: ["$$entry.acres", 0] },
              },
            },
          },
        },
      },
    },
  ]);

  const counts = {};
  for (const r of rows) {
    counts[r._id] = r.totalAcres || 0;
  }
  return counts;
}

// ==========================================
// CALCULATE REVENUE (Acre based)
// ==========================================
function calcRevenue({ crop, biomassEntries = [] }) {
  const totalAcres = (biomassEntries || []).reduce(
    (sum, e) => sum + (Number(e.acres) || 0),
    0
  );

  let ratePerAcre = RATE_MAKKA_GINTHI; // default

  if (crop === "धान (Rice)" || crop === "धान") {
    ratePerAcre = RATE_DHAN;
  }

  const estimatedAmount = Math.round(ratePerAcre * totalAcres);

  return {
    totalAcres,
    ratePerAcre,
    estimatedAmount,
    baseAmount: estimatedAmount,
    distanceCost: 0,
  };
}

// ==========================================
// FIND NEAREST DROP POINT + DISTANCE
// ==========================================
function getAssignedDropPoint(farmerLat, farmerLng, dropPoints) {
  return findNearestDropPoint(farmerLat, farmerLng, dropPoints);
}

// ==========================================
// EXPORTS
// ==========================================
module.exports = {
  DAILY_PICKUP_LIMIT,
  PICKUP_START_DATE,
  RATE_MAKKA_GINTHI,
  RATE_DHAN,

  haversineKm,
  findNearestDropPoint,
  getAssignedDropPoint,
  addDays,
  getTodayDateString,

  calculatePickupDate,
  getPickupAcresOnDate,
  isPickupDateAvailable,
  getPickupCapacityMap,
  calcRevenue,
};