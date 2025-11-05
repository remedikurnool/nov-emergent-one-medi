import { PrismaClient, ProductStatus, Role, UserStatus, Gender } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create demo users
  console.log('Creating users...');
  const user = await prisma.user.upsert({
    where: { email: 'user@onemedi.com' },
    update: {},
    create: {
      email: 'user@onemedi.com',
      phone: '9876543210',
      firstName: 'Demo',
      lastName: 'User',
      password: '$2a$10$HqF8xK6.8YKZEd8n8Q5bXu1qfP5xzQP5qF8xK6.8YKZEd8n8Q5bXu', // hashed: password123
      role: Role.USER,
      status: UserStatus.ACTIVE,
      gender: Gender.MALE,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@onemedi.com' },
    update: {},
    create: {
      email: 'admin@onemedi.com',
      phone: '9876543211',
      firstName: 'Admin',
      lastName: 'User',
      password: '$2a$10$HqF8xK6.8YKZEd8n8Q5bXu1qfP5xzQP5qF8xK6.8YKZEd8n8Q5bXu',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      gender: Gender.MALE,
    },
  });

  console.log('✅ Users created');

  // Create products (medicines)
  console.log('Creating products...');
  const products = [
    {
      name: 'Dolo 650 Tablet',
      slug: 'dolo-650-tablet',
      description: 'Paracetamol 650mg tablets for fever and pain relief',
      category: 'Medicines',
      brand: 'Micro Labs',
      manufacturer: 'Micro Labs Limited',
      composition: 'Paracetamol 650mg',
      price: 30.0,
      mrp: 35.0,
      discount: 14.29,
      stock: 500,
      unit: 'Strip of 15 tablets',
      requiresPrescription: false,
      images: ['/products/dolo-650.jpg'],
      status: ProductStatus.ACTIVE,
      tags: ['fever', 'pain relief', 'paracetamol'],
    },
    {
      name: 'Combiflam Tablet',
      slug: 'combiflam-tablet',
      description: 'Ibuprofen 400mg + Paracetamol 325mg for pain and inflammation',
      category: 'Medicines',
      brand: 'Sanofi',
      manufacturer: 'Sanofi India Limited',
      composition: 'Ibuprofen 400mg + Paracetamol 325mg',
      price: 42.5,
      mrp: 50.0,
      discount: 15.0,
      stock: 300,
      unit: 'Strip of 20 tablets',
      requiresPrescription: true,
      images: ['/products/combiflam.jpg'],
      status: ProductStatus.ACTIVE,
      tags: ['pain', 'inflammation', 'fever'],
    },
    {
      name: 'Volini Pain Relief Gel',
      slug: 'volini-pain-relief-gel',
      description: 'Topical analgesic for muscle and joint pain',
      category: 'Personal Care',
      brand: 'Volini',
      manufacturer: 'Ranbaxy Laboratories',
      composition: 'Diclofenac Diethylamine 1.16% w/w',
      price: 195.0,
      mrp: 220.0,
      discount: 11.36,
      stock: 200,
      unit: '75g Tube',
      requiresPrescription: false,
      images: ['/products/volini-gel.jpg'],
      status: ProductStatus.ACTIVE,
      tags: ['pain relief', 'topical', 'muscle pain'],
    },
    {
      name: 'Benadryl Cough Syrup',
      slug: 'benadryl-cough-syrup',
      description: 'Relief from cough and cold symptoms',
      category: 'Medicines',
      brand: 'Benadryl',
      manufacturer: 'Johnson & Johnson',
      composition: 'Diphenhydramine HCl',
      price: 121.0,
      mrp: 135.0,
      discount: 10.37,
      stock: 150,
      unit: '150ml Bottle',
      requiresPrescription: true,
      images: ['/products/benadryl.jpg'],
      status: ProductStatus.ACTIVE,
      tags: ['cough', 'cold', 'syrup'],
    },
    {
      name: 'Crocin Advance Tablet',
      slug: 'crocin-advance-tablet',
      description: 'Fast relief from fever and body pain',
      category: 'Medicines',
      brand: 'Crocin',
      manufacturer: 'GSK',
      composition: 'Paracetamol 500mg',
      price: 28.0,
      mrp: 32.0,
      discount: 12.5,
      stock: 400,
      unit: 'Strip of 15 tablets',
      requiresPrescription: false,
      images: ['/products/crocin.jpg'],
      status: ProductStatus.ACTIVE,
      tags: ['fever', 'pain', 'headache'],
    },
    {
      name: 'Accu-Chek Glucometer',
      slug: 'accu-chek-glucometer',
      description: 'Blood glucose monitoring system with 10 strips',
      category: 'Healthcare Devices',
      brand: 'Accu-Chek',
      manufacturer: 'Roche',
      composition: 'Electronic Device',
      price: 1299.0,
      mrp: 1625.0,
      discount: 20.06,
      stock: 50,
      unit: '1 Device + 10 strips',
      requiresPrescription: false,
      images: ['/products/glucometer.jpg'],
      status: ProductStatus.ACTIVE,
      tags: ['diabetes', 'blood sugar', 'monitoring'],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('✅ Products created');

  // Create lab tests
  console.log('Creating lab tests...');
  const labTests = [
    {
      name: 'Complete Blood Count (CBC)',
      slug: 'complete-blood-count-cbc',
      description: 'Comprehensive blood test to check overall health',
      category: 'Blood Tests',
      price: 299.0,
      parameters: [
        'Hemoglobin',
        'RBC Count',
        'WBC Count',
        'Platelet Count',
        'MCV',
        'MCH',
        'MCHC',
      ],
      preparation: 'No special preparation required',
      reportTime: 'Same day',
      isPopular: true,
    },
    {
      name: 'Thyroid Profile',
      slug: 'thyroid-profile',
      description: 'Complete thyroid function test',
      category: 'Hormone Tests',
      price: 499.0,
      parameters: ['T3', 'T4', 'TSH'],
      preparation: 'Fasting not required',
      reportTime: '24 hours',
      isPopular: true,
    },
    {
      name: 'Lipid Profile',
      slug: 'lipid-profile',
      description: 'Cholesterol and lipid levels test',
      category: 'Blood Tests',
      price: 399.0,
      parameters: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'VLDL'],
      preparation: 'Fasting required (8-12 hours)',
      reportTime: 'Same day',
      isPopular: false,
    },
    {
      name: 'HbA1c (Glycated Hemoglobin)',
      slug: 'hba1c-test',
      description: 'Diabetes monitoring - 3 month average blood sugar',
      category: 'Diabetes Tests',
      price: 450.0,
      parameters: ['HbA1c'],
      preparation: 'No fasting required',
      reportTime: '24 hours',
      isPopular: true,
    },
    {
      name: 'Liver Function Test (LFT)',
      slug: 'liver-function-test',
      description: 'Complete liver health assessment',
      category: 'Blood Tests',
      price: 550.0,
      parameters: ['Bilirubin', 'SGOT', 'SGPT', 'Alkaline Phosphatase', 'Proteins'],
      preparation: 'Fasting preferred',
      reportTime: 'Same day',
      isPopular: false,
    },
  ];

  for (const labTest of labTests) {
    await prisma.labTest.upsert({
      where: { slug: labTest.slug },
      update: labTest,
      create: labTest,
    });
  }

  console.log('✅ Lab tests created');

  // Create demo address
  console.log('Creating address...');
  await prisma.address.create({
    data: {
      userId: user.id,
      type: 'HOME',
      fullName: 'Demo User',
      phone: '9876543210',
      addressLine1: '123 Main Street',
      addressLine2: 'Near City Mall',
      city: 'Kurnool',
      state: 'Andhra Pradesh',
      pincode: '518001',
      isDefault: true,
    },
  });

  console.log('✅ Address created');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
