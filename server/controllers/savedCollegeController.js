import prisma from "../config/db.js";

export const saveCollege = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collegeId } = req.body;

    const alreadySaved = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: Number(userId),
          collegeId: Number(collegeId),
        },
      },
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "College already saved",
      });
    }

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: Number(userId),
        collegeId: Number(collegeId),
      },
    });

    res.status(201).json({
      success: true,
      savedCollege,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to save college",
    });
  }
};

export const getSavedColleges = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedColleges = await prisma.savedCollege.findMany({
      where: {
        userId: Number(userId),
      },

      select: {
        id: true,

        college: {
          select: {
            id: true,
            name: true,
            location: true,
            fees: true,
            rating: true,
            placementPercentage: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      count: savedColleges.length,
      savedColleges,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch saved colleges",
    });
  }
};

export const removeSavedCollege = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collegeId } = req.body;

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId: Number(userId),
          collegeId: Number(collegeId),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "College removed from saved",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to remove saved college",
    });
  }
};
