import prisma from "../config/db.js";

// REGISTER COLLEGE
export const registerCollege = async (req, res) => {
  try {
    const {
      name,
      location,
      fees,
      rating,
      ranking,
      placementPercentage,
      averagePackage,
      highestPackage,
      totalStudents,
      facultyCount,
      establishedYear,
      campusArea,
      description,
      exams,
    } = req.body;

    if (!name || !location || !fees) {
      return res.status(400).json({
        success: false,
        message: "Name, location and fees are required",
      });
    }

    const college = await prisma.college.create({
      data: {
        name: name.trim(),
        location: location.trim(),
        fees: Number(fees),

        rating: rating ? Number(rating) : null,
        ranking: ranking ? Number(ranking) : null,
        placementPercentage: placementPercentage
          ? Number(placementPercentage)
          : null,

        averagePackage: averagePackage ? Number(averagePackage) : null,
        highestPackage: highestPackage ? Number(highestPackage) : null,
        totalStudents: totalStudents ? Number(totalStudents) : null,
        facultyCount: facultyCount ? Number(facultyCount) : null,
        establishedYear: establishedYear ? Number(establishedYear) : null,
        campusArea: campusArea ? Number(campusArea) : null,

        description: description?.trim() || null,
        exams: exams || [],
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

// GET ALL COLLEGES
export const getAllColleges = async (req, res) => {
  try {
    const {
      search = "",
      city = "",
      state = "",
      minFees,
      maxFees,
      minRating,
      minPackage,
      sortBy = "rating",
      order = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    const pageNumber = Math.max(1, Number(page));
    const take = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNumber - 1) * take;

    const where = {};

    // 🔑 Main Search Logic
    if (search?.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { city: { contains: searchTerm, mode: "insensitive" } },
        { state: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    // Filters
    if (city?.trim()) {
      where.city = { contains: city.trim(), mode: "insensitive" };
    }
    if (state?.trim()) {
      where.state = { contains: state.trim(), mode: "insensitive" };
    }
    if (minRating) {
      where.rating = { gte: Number(minRating) };
    }
    if (minPackage) {
      where.averagePackage = { gte: Number(minPackage) };
    }

    // Fees range filter
    if (minFees || maxFees) {
      where.AND = [
        minFees && { feesMax: { gte: Number(minFees) } },
        maxFees && { feesMin: { lte: Number(maxFees) } },
      ].filter(Boolean);
    }

    const orderBy = {
      [sortBy]: order.toLowerCase() === "asc" ? "asc" : "desc",
    };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where: Object.keys(where).length > 0 ? where : {},
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
          state: true,
          feesMin: true,
          feesMax: true,
          rating: true,
          placementPercentage: true,
          averagePackage: true,
          highestPackage: true,
          totalStudents: true,
          campusArea: true,
          image: true,
        },
        orderBy,
        skip,
        take,
      }),

      prisma.college.count({ where: Object.keys(where).length > 0 ? where : {} }),
    ]);

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / take),
      totalColleges: total,
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

export const getSingleCollege = async (req, res) => {
  try {
    // slug to hide ids
    const { slug } = req.params;

    const college = await prisma.college.findUnique({
      where: { slug },
      include: {
        courses: true,
        reviews: {
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
        },
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
