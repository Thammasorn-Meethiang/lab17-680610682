  import { Trash2 } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { useEnrollmentStore } from "@/lib/enrollment-store";
  export function CourseTable() {
    const courses = useEnrollmentStore(
      (state) => state.courses
    );
    const removeCourse = useEnrollmentStore(
      (state) => state.removeCourse
    );
    return (
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table className="w-full table-fixed text-xs ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[90px]">
                รหัสวิชา
              </TableHead>
              <TableHead className="min-w-[300px]">
                ชื่อวิชา
              </TableHead>
              <TableHead className="w-[100px]">
                หลักสูตร
              </TableHead>
              <TableHead className="w-[160px]">
                ภาคการศึกษา
              </TableHead>
              <TableHead className="min-w-[180px]">
                รายละเอียด
              </TableHead>
              <TableHead className="min-w-[220px]">
                ผู้สอน
              </TableHead>
              <TableHead className="w-[170px]">
                รับข่าวสารทางอีเมล
              </TableHead>
              <TableHead className="w-[80px] text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground "
                >
                  ยังไม่มีวิชาเรียน
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell className="font-medium">
                    {course.courseId}
                  </TableCell>
                  <TableCell className="whitespace-normal break-words">
                    {course.courseTitle}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {course.program}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {course.semester === "1" && "ภาคการศึกษาที่ 1"}
                    {course.semester === "2" && "ภาคการศึกษาที่ 2"}
                    {course.semester === "3" && "ภาคฤดูร้อน"}
                    {!course.semester && "—"}
                  </TableCell>
                  <TableCell className="max-w-[250px] whitespace-normal break-words">
                    <span className="line-clamp-2">
                      {course.description || "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {course.instructors.map(
                        (instructor) => (
                          <div
                            key={instructor.email}
                            className="leading-tight"
                          >
                            <div className="font-medium">
                              {instructor.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {instructor.email}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        course.notifyByEmail
                          ? "default"
                          : "secondary"
                      }
                    >
                      {course.notifyByEmail
                        ? "รับ"
                        : "ไม่รับ"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            ลบวิชาเรียน
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            คุณต้องการลบวิชา{" "}
                            <span className="font-medium">
                              {course.courseId}{" "}
                              {course.courseTitle}
                            </span>{" "}
                            หรือไม่?
                            <br />
                            การกระทำนี้ไม่สามารถย้อนกลับได้
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            ยกเลิก
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              removeCourse(
                                course.courseId
                              )
                            }
                          >
                            ลบวิชา
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }