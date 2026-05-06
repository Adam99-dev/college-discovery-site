import prisma from "../config/db.js";

export const saveCollege = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const { collegeId } = req.body;

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId,
        collegeId: Number(collegeId),
      },
    });

    res.status(201).json({
      success: true,
      savedCollege,
    });
  } catch (error) {
    // unique constraint handle
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "College already saved",
      });
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save college",
    });
  }
};

export const getSavedColleges = async (req, res) => {
  try {
    const userId = Number(req.user.id);

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId },
      select: {
        id: true,
        college: {
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
            campusArea: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: savedColleges.length,
      savedColleges,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch saved colleges",
    });
  }
};

export const removeSavedCollege = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const { collegeId } = req.body;

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId,
          collegeId: Number(collegeId),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "College removed from saved",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Saved college not found",
      });
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to remove saved college",
    });
  }
};