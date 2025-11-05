import { Request, Response, NextFunction } from 'express';

// Mock data - Lab Tests
const mockLabTests = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    slug: 'complete-blood-count-cbc',
    description: 'Comprehensive blood test to check overall health',
    category: 'Blood Tests',
    price: 299.0,
    parameters: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'MCV', 'MCH', 'MCHC'],
    preparation: 'No special preparation required',
    reportTime: 'Same day',
    isPopular: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Thyroid Profile',
    slug: 'thyroid-profile',
    description: 'Complete thyroid function test',
    category: 'Hormone Tests',
    price: 499.0,
    parameters: ['T3', 'T4', 'TSH'],
    preparation: 'Fasting not required',
    reportTime: '24 hours',
    isPopular: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Lipid Profile',
    slug: 'lipid-profile',
    description: 'Cholesterol and lipid levels test',
    category: 'Blood Tests',
    price: 399.0,
    parameters: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'VLDL'],
    preparation: 'Fasting required (8-12 hours)',
    reportTime: 'Same day',
    isPopular: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'HbA1c (Glycated Hemoglobin)',
    slug: 'hba1c-test',
    description: 'Diabetes monitoring - 3 month average blood sugar',
    category: 'Diabetes Tests',
    price: 450.0,
    parameters: ['HbA1c'],
    preparation: 'No fasting required',
    reportTime: '24 hours',
    isPopular: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Liver Function Test (LFT)',
    slug: 'liver-function-test',
    description: 'Complete liver health assessment',
    category: 'Blood Tests',
    price: 550.0,
    parameters: ['Bilirubin', 'SGOT', 'SGPT', 'Alkaline Phosphatase', 'Proteins'],
    preparation: 'Fasting preferred',
    reportTime: 'Same day',
    isPopular: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Get all lab tests
export const getAllLabTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    let filteredLabTests = [...mockLabTests];

    if (req.query.category) {
      filteredLabTests = filteredLabTests.filter(
        (t) => t.category === req.query.category
      );
    }

    const total = filteredLabTests.length;
    const labTests = filteredLabTests.slice(skip, skip + limit);

    res.json({
      success: true,
      data: labTests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get lab test by ID
export const getLabTestById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const labTest = mockLabTests.find((t) => t.id === id);

    if (!labTest) {
      return res.status(404).json({
        success: false,
        message: 'Lab test not found',
      });
    }

    res.json({
      success: true,
      data: labTest,
    });
  } catch (error) {
    next(error);
  }
};

// Create lab test
export const createLabTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const labTestData = req.body;
    const newLabTest = {
      id: String(mockLabTests.length + 1),
      ...labTestData,
      slug: labTestData.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    mockLabTests.push(newLabTest);

    res.status(201).json({
      success: true,
      data: newLabTest,
      message: 'Lab test created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update lab test
export const updateLabTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const index = mockLabTests.findIndex((t) => t.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Lab test not found',
      });
    }

    mockLabTests[index] = {
      ...mockLabTests[index],
      ...updateData,
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      data: mockLabTests[index],
      message: 'Lab test updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete lab test
export const deleteLabTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const index = mockLabTests.findIndex((t) => t.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Lab test not found',
      });
    }

    mockLabTests.splice(index, 1);

    res.json({
      success: true,
      message: 'Lab test deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Search lab tests
export const searchLabTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const searchLower = query.toLowerCase();
    const filteredLabTests = mockLabTests.filter(
      (t) =>
        t.name.toLowerCase().includes(searchLower) ||
        t.description?.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
    );

    const total = filteredLabTests.length;
    const labTests = filteredLabTests.slice(skip, skip + limit);

    res.json({
      success: true,
      data: labTests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get lab tests by category
export const getLabTestsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filteredLabTests = mockLabTests.filter((t) => t.category === category);

    const total = filteredLabTests.length;
    const labTests = filteredLabTests.slice(skip, skip + limit);

    res.json({
      success: true,
      data: labTests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};
