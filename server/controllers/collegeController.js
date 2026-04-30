import prisma from "../config/db.js";

// ======================
// 1. Register a new College
// ======================
export const registerCollege = async (req, res) => {
  try {
    const { name, location, fees, rating, placementPercentage, description } = req.body;

    // Basic validation
    if (!name || !location || !fees) {
      return res.status(400).json({
        success: false,
        message: "Name, location and fees are required fields",
      });
    }

    const college = await prisma.college.create({
      data: {
        name: name.trim(),
        location: location.trim(),
        fees: Number(fees),
        rating: Number(rating) || 0,
        placementPercentage: Number(placementPercentage) || 0,
        description: description?.trim() || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "College registered successfully",
      college,
    });
  } catch (error) {
    console.error("Error in registerCollege:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register college",
    });
  }
};

// ======================
// 2. Get All Colleges with Filters + Pagination + Search
// ======================
export const getAllColleges = async (req, res) => {
  try {
    const {
      search = "",
      location = "",
      minFees,
      maxFees,
      minRating,
      page = 1,
      limit = 12,
    } = req.query;

    const pageNumber = Math.max(1, Number(page));
    const take = Math.min(50, Math.max(1, Number(limit))); // limit between 1-50
    const skip = (pageNumber - 1) * take;

    const whereClause = {
      AND: [
        // Search by name (case insensitive)
        search
          ? {
              name: {
                contains: search.trim(),
                mode: "insensitive",
              },
            }
          : {},

        // Filter by location
        location
          ? {
              location: {
                contains: location.trim(),
                mode: "insensitive",
              },
            }
          : {},

        // Fees range filter
        minFees || maxFees
          ? {
              fees: {
                ...(minFees && { gte: Number(minFees) }),
                ...(maxFees && { lte: Number(maxFees) }),
              },
            }
          : {},

        // Rating filter (optional improvement)
        minRating
          ? {
              rating: {
                gte: Number(minRating),
              },
            }
          : {},
      ].filter(Boolean), // Remove empty objects
    };

    // If AND array is empty, remove it
    const finalWhere = whereClause.AND.length > 0 ? whereClause : {};

    const [colleges, totalColleges] = await Promise.all([
      prisma.college.findMany({
        where: finalWhere,
        select: {
          id: true,
          name: true,
          location: true,
          fees: true,
          rating: true,
          placementPercentage: true,
        },
        orderBy: [
          { rating: "desc" },
          { placementPercentage: "desc" },
        ],
        skip,
        take,
      }),

      prisma.college.count({
        where: finalWhere,
      }),
    ]);

    const totalPages = Math.ceil(totalColleges / take);

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages,
      totalColleges,
      limit: take,
      colleges,
    });
  } catch (error) {
    console.error("Error in getAllColleges:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges",
    });
  }
};

// ======================
// 3. Get Single College by ID
// ======================
export const getSingleCollege = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid college ID is required",
      });
    }

    const college = await prisma.college.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        location: true,
        fees: true,
        rating: true,
        placementPercentage: true,
        description: true,
      },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.status(200).json({
      success: true,
      college,
    });
  } catch (error) {
    console.error("Error in getSingleCollege:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college",
    });
  }
};