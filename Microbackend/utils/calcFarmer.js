// ==========================================
// CONSTANTS
// ==========================================
const PRICE_PER_TON = 250;
const DAILY_PICKUP_LIMIT = 100;

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
  let baseAmount = 0;
  for (const entry of biomassEntries) {
    const weightPerAcre = WEIGHT_PER_ACRE[entry.type] || 0;
    baseAmount += PRICE_PER_TON * weightPerAcre * (Number(entry.acres) || 0);
  }

  // Distance cost only when WE NOT pick up
  let distanceCost = 0;
  if (transportType === "self") {
    if (distanceKm <= 25) distanceCost = 1200;
    else distanceCost = 2000;
  }

  const estimatedAmount = Math.round(baseAmount + distanceCost);

  return {
    baseAmount: Math.round(baseAmount),
    distanceCost,
    estimatedAmount,
  };
}

// ==========================================
// GET SLOT COUNT
// ==========================================
function getSlotCount(biomassEntries = []) {
  if (!Array.isArray(biomassEntries) || biomassEntries.length === 0) {
    return 1;
  }

  const totalAcres = biomassEntries.reduce(
    (sum, e) => sum + (Number(e.acres) || 0),
    0
  );

  return Math.max(1, Math.ceil(totalAcres / 5));
}

// ==========================================
// FIND AVAILABLE DROP DATE
// ==========================================
async function findAvailableDropDate({
  LocationFarmer,
  dropPointName,
  harvestDate,
  slotCount = 1,
  dailyLimit = 100,
}) {
  let candidate = calcDropDate(harvestDate);
  if (!candidate) {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    candidate = d.toISOString().slice(0, 10);
  }

  for (let i = 0; i < 30; i++) {
    const existing = await LocationFarmer.aggregate([
      {
        $match: {
          "assignedDropPoint.name": dropPointName,
          dropDate: candidate,
        },
      },
      {
        $group: {
          _id: null,
          totalSlots: { $sum: { $ifNull: ["$dailySlotCount", 1] } },
        },
      },
    ]);

    const usedSlots = existing[0]?.totalSlots || 0;

    if (usedSlots + slotCount <= dailyLimit) {
      return { dropDate: candidate };
    }

    const next = new Date(candidate);
    next.setDate(next.getDate() + 1);
    candidate = next.toISOString().slice(0, 10);
  }

  return { dropDate: candidate };
}

// ==========================================
// COUNT PICKUPS ON A DATE (ped + ginthi)
// 1 farmer counts as 1 pickup for capacity
// ==========================================
async function getPickupCountOnDate(LocationFarmer, dateStr) {
  if (!dateStr) return 0;

  const count = await LocationFarmer.countDocuments({
    $or: [{ pedPickupDate: dateStr }, { ginthiPickupDate: dateStr }],
  });

  return count;
}

/**
 * Returns true if date still has room (under daily limit)
 */
async function isPickupDateAvailable(
  LocationFarmer,
  dateStr,
  dailyLimit = DAILY_PICKUP_LIMIT
) {
  const used = await getPickupCountOnDate(LocationFarmer, dateStr);
  return used < dailyLimit;
}

/**
 * Capacity map for date range (for app date chips)
 * counts[date] = number of farmers who selected that date
 * as pedPickupDate OR ginthiPickupDate
 */
async function getPickupCapacityMap(LocationFarmer, fromDate, toDate) {
  const rows = await LocationFarmer.aggregate([
    {
      $match: {
        $or: [
          { pedPickupDate: { $gte: fromDate, $lte: toDate } },
          { ginthiPickupDate: { $gte: fromDate, $lte: toDate } },
        ],
      },
    },
    {
      $project: {
        dates: {
          $setUnion: [
            {
              $cond: [
                {
                  $and: [
                    { $ne: ["$pedPickupDate", null] },
                    { $ne: ["$pedPickupDate", ""] },
                  ],
                },
                ["$pedPickupDate"],
                [],
              ],
            },
            {
              $cond: [
                {
                  $and: [
                    { $ne: ["$ginthiPickupDate", null] },
                    { $ne: ["$ginthiPickupDate", ""] },
                  ],
                },
                ["$ginthiPickupDate"],
                [],
              ],
            },
          ],
        },
      },
    },
    { $unwind: "$dates" },
    {
      $match: {
        dates: { $gte: fromDate, $lte: toDate },
      },
    },
    {
      $group: {
        _id: "$dates",
        count: { $sum: 1 },
      },
    },
  ]);

  const counts = {};
  for (const r of rows) {
    counts[r._id] = r.count;
  }
  return counts;
}

// ==========================================
// EXPORTS
// ==========================================
module.exports = {
  PRICE_PER_TON,
  DAILY_PICKUP_LIMIT,
  WEIGHT_PER_ACRE,
  haversineKm,
  findNearestDropPoint,
  calcDropDate,
  calcRevenue,
  getSlotCount,
  findAvailableDropDate,
  getPickupCountOnDate,
  isPickupDateAvailable,
  getPickupCapacityMap,
};