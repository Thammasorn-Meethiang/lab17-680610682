import { z } from "zod";
import type { Course } from "@/lib/types";

export const COURSE_TITLE_MAX = 100;

export const createCourseFormSchema = (courses: Course[]) =>
  z.object({
    courseId: z
      .string()
      .regex(/^\d{6}$/, "รหัสวิชาต้องเป็นตัวเลข 6 หลัก")
      .refine(
        (courseId) =>
          !courses.some(
            (course) => course.courseId === courseId
          ),
        {
          message: "รหัสวิชานี้มีอยู่แล้ว",
        }
      ),
    courseTitle: z
      .string()
      .trim()
      .min(1, "กรอกชื่อวิชา")
      .max(
        COURSE_TITLE_MAX,
        `ชื่อวิชายาวได้ไม่เกิน ${COURSE_TITLE_MAX} ตัวอักษร`
      ),
    program: z
      .enum(["CPE", "ISNE"])
      .optional()
      .refine((value) => value !== undefined, {
        message: "เลือกหลักสูตร",
      }),
    semester: z
      .enum(["1", "2", "3"])
      .optional()
      .refine((value) => value !== undefined, {
        message: "เลือกภาคการศึกษา",
      }),
    description: z
      .string()
      .max(
        100,
        "รายละเอียดต้องไม่เกิน 100 ตัวอักษร"
      ),
    instructors: z
      .array(
        z.object({
          name: z
            .string()
            .trim()
            .min(1, "กรอกชื่อผู้สอน"),
          email: z
            .string()
            .email("รูปแบบอีเมลไม่ถูกต้อง")
            .refine(
              (email) => email.endsWith("@cmu.ac.th"),
              {
                message: "ต้องเป็นอีเมล @cmu.ac.th",
              }
            ),
        })
      )
      .min(1, "ต้องมีผู้สอนอย่างน้อย 1 คน")
      .max(3, "มีผู้สอนได้ไม่เกิน 3 คน")
      .refine(
        (instructors) => {
          const emails = instructors.map(
            (instructor) => instructor.email
          );
          return (
            new Set(emails).size === emails.length
          );
        },
        {
          message: "อีเมลผู้สอนซ้ำกัน",
        }
      ),
    notifyByEmail: z.boolean(),
  });

export type CourseFormValues = z.infer<
  ReturnType<typeof createCourseFormSchema>
>;