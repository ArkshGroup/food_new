import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

interface SeedUsersParams {
  prisma: PrismaClient;
  count?: number;
}

export async function seedUsers({ prisma, count = 20 }: SeedUsersParams) {
  console.log("🌱 Seeding users...");

  // Hash password for all users
  const hashedPassword = await bcrypt.hash("11111111", 10);

  // Admin users
  const adminUsers = [
    {
      email: "dahalarjun404@gmail.com",
      password: hashedPassword,
      userName: "Admin User",
      country: "Nepal",
      zipCode: "44600",
      isVerified: true,
      termsAndConditionsAccepted: true,
      role: Role.ADMIN,
    },
    {
      email: "admin@arkshfood.com",
      password: hashedPassword,
      userName: "Admin User",
      country: "Nepal",
      zipCode: "44600",
      isVerified: true,
      termsAndConditionsAccepted: true,
      role: Role.ADMIN,
    },
  ];

  // Sample customer data
  const customerData = [
    { userName: "John Doe", country: "USA", zipCode: "10001" },
    { userName: "Jane Smith", country: "Canada", zipCode: "M5V 3L9" },
    { userName: "Ram Sharma", country: "Nepal", zipCode: "44600" },
    { userName: "Sita Poudel", country: "Nepal", zipCode: "33700" },
    { userName: "David Wilson", country: "UK", zipCode: "SW1A 1AA" },
    { userName: "Maria Garcia", country: "Spain", zipCode: "28001" },
    { userName: "Hiroshi Tanaka", country: "Japan", zipCode: "100-0001" },
    { userName: "Lisa Anderson", country: "Australia", zipCode: "2000" },
    { userName: "Pierre Dubois", country: "France", zipCode: "75001" },
    { userName: "Anna Mueller", country: "Germany", zipCode: "10115" },
    { userName: "Chen Wei", country: "China", zipCode: "100000" },
    { userName: "Priya Patel", country: "India", zipCode: "400001" },
    { userName: "Ahmed Hassan", country: "Egypt", zipCode: "11511" },
    { userName: "Sofia Rodriguez", country: "Mexico", zipCode: "06600" },
    { userName: "Lars Olsen", country: "Norway", zipCode: "0150" },
    { userName: "Isabella Rossi", country: "Italy", zipCode: "00100" },
    { userName: "Kwame Asante", country: "Ghana", zipCode: "GA-039-5028" },
    { userName: "Fatima Al-Zahra", country: "UAE", zipCode: "00000" },
  ];

  // Generate customer users
  const customerUsers = customerData
    .slice(0, count - 2)
    .map((customer, index) => ({
      email: `customer${index + 1}@example.com`,
      password: hashedPassword,
      userName: customer.userName,
      country: customer.country,
      zipCode: customer.zipCode,
      isVerified: Math.random() > 0.3, // 70% verified
      termsAndConditionsAccepted: true,
      role: Role.CUSTOMER,
    }));

  // Combine all users
  const allUsers = [...adminUsers];

  try {
    // Create users using createMany for better performance
    const result = await prisma.user.createMany({
      data: allUsers,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} users`);
    console.log(`   - ${adminUsers.length} admin users`);
    console.log(`   - ${customerUsers.length} customer users`);

    return {
      count: result.count,
      adminCount: adminUsers.length,
      customerCount: customerUsers.length,
    };
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
}
