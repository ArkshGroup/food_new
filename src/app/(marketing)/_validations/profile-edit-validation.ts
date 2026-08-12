import z from "zod";

// Helper function to check if the date is valid and in the past
const isValidDate = ({
  year,
  month,
  day,
}: {
  year: string;
  month: string;
  day: string;
}) => {
  const date = new Date(`${year}-${month}-${day}`);
  const isActualDate =
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day);
  const isPast = date < new Date();
  const isAfter1900 = date > new Date("1900-01-01");

  return isActualDate && isPast && isAfter1900;
};

// Updated schema – all fields optional
export const profileEditValidation = z
  .object({
    userName: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .optional(),
    country: z.string().min(1, "Country is required").optional(),
    zipCode: z
      .string()
      .min(4, "Zip Code must be at least 4 characters")
      .optional(),
    gender: z.string().optional(),
    dobYear: z
      .string()
      .min(4, "Year must be 4 digits")
      .max(4, "Year must be 4 digits")
      .optional(),
    dobMonth: z.string().min(1, "Month is required").max(2).optional(),
    dobDay: z.string().min(1, "Day is required").max(2).optional(),
    phoneNumber: z
      .string()
      .regex(/^[0-9]{7,15}$/, "Phone number must be 7–15 digits")
      .optional(),
  })
  .refine(
    (data) => {
      // Run date validation only if all parts exist
      if (!data.dobYear || !data.dobMonth || !data.dobDay) return true;
      return isValidDate({
        year: data.dobYear,
        month: data.dobMonth,
        day: data.dobDay,
      });
    },
    {
      message: "Invalid or future date. Please enter a valid past date.",
      path: ["dobDay"],
    }
  );
