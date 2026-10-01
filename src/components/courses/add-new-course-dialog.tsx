import { useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  PlusCircle,
  RotateCcw,
  X,
} from "lucide-react";
import { useEnrollmentStore } from "@/lib/enrollment-store";
import {
  createCourseFormSchema,
  type CourseFormValues,
} from "@/lib/schemas/course-schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
export function AddNewCourseDialog() {
  const courses = useEnrollmentStore(
    (state) => state.courses
  );
  const addCourse = useEnrollmentStore(
    (state) => state.addCourse
  );
  const [open, setOpen] = useState(false);
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(
      createCourseFormSchema(courses)
    ),
    mode: "onBlur",
    defaultValues: {
      courseId: "",
      courseTitle: "",
      program: undefined,
      semester: undefined,
      description: "",
      notifyByEmail: false,
      instructors: [
        {
          name: "",
          email: "",
        },
      ],
    },
  });
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "instructors",
  });
  const resetForm = () => {
    form.reset({
      courseId: "",
      courseTitle: "",
      program: undefined,
      semester: undefined,
      description: "",
      notifyByEmail: false,
      instructors: [
        {
          name: "",
          email: "",
        },
      ],
    });
  };
  const onSubmit = (
    values: CourseFormValues
  ) => {
    addCourse({
      courseId: values.courseId,
      courseTitle: values.courseTitle,
      instructors: values.instructors,
      program: values.program,
      semester: values.semester,
      description: values.description,
      notifyByEmail: values.notifyByEmail,
    });
    resetForm();
    setOpen(false);
  };
  const handleOpenChange = (
    value: boolean
  ) => {
    setOpen(value);
    if (!value) {
      resetForm();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger
        render={
          <Button>
            <PlusCircle className="h-4 w-4" />
            เพิ่มวิชา
          </Button>
        }
      />
      <DialogContent className="max-h-[95vh] !max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg">
            เพิ่มวิชาใหม่
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-h-[calc(95vh-130px)] flex-col"
        >
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="courseId"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }) => (
                  <Field
                    data-invalid={
                      fieldState.invalid
                    }
                  >
                    <FieldLabel htmlFor="courseId">
                      รหัสวิชา
                    </FieldLabel>
                    <Input
                      {...field}
                      id="courseId"
                      placeholder="เช่น 261305"
                      aria-invalid={
                        fieldState.invalid
                      }
                    />
                    {fieldState.error && (
                      <FieldError>
                        {
                          fieldState.error
                            .message
                        }
                      </FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="courseTitle"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }) => (
                  <Field
                    data-invalid={
                      fieldState.invalid
                    }
                  >
                    <FieldLabel htmlFor="courseTitle">
                      ชื่อวิชา
                    </FieldLabel>
                    <Input
                      {...field}
                      id="courseTitle"
                      placeholder="เช่น Mobile Application Development"
                      aria-invalid={
                        fieldState.invalid
                      }
                    />
                    {fieldState.error && (
                      <FieldError>
                        {
                          fieldState.error
                            .message
                        }
                      </FieldError>
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="program"
              control={form.control}
              render={({
                field,
                fieldState,
              }) => (
                <Field
                  data-invalid={
                    fieldState.invalid
                  }
                >
                  <FieldLabel>
                    หลักสูตร
                  </FieldLabel>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                      field.onChange(
                        value === ""
                          ? undefined
                          : value
                      );
                    }}
                  >
                    <SelectTrigger
                      aria-invalid={
                        fieldState.invalid
                      }
                    >
                      <SelectValue placeholder="เลือกหลักสูตร" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CPE">
                        CPE — วิศวกรรมคอมพิวเตอร์
                      </SelectItem>
                      <SelectItem value="ISNE">
                        ISNE — วิศวกรรมระบบสารสนเทศและเครือข่าย
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError>
                      {
                        fieldState.error
                          .message
                      }
                    </FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="semester"
              control={form.control}
              render={({
                field,
                fieldState,
              }) => (
                <Field
                  data-invalid={
                    fieldState.invalid
                  }
                >
                  <FieldLabel>
                    ภาคการศึกษา
                  </FieldLabel>

                  <RadioGroup
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                      field.onChange(
                        value === ""
                          ? undefined
                          : value
                      );
                    }}
                    className="flex flex-wrap gap-5"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="1"
                        id="semester-1"
                      />
                      <label
                        htmlFor="semester-1"
                        className="text-sm"
                      >
                        ภาคการศึกษาที่ 1
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="2"
                        id="semester-2"
                      />
                      <label
                        htmlFor="semester-2"
                        className="text-sm"
                      >
                        ภาคการศึกษาที่ 2
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="3"
                        id="semester-3"
                      />
                      <label
                        htmlFor="semester-3"
                        className="text-sm"
                      >
                        ภาคฤดูร้อน
                      </label>
                    </div>
                  </RadioGroup>
                  {fieldState.error && (
                    <FieldError>
                      {
                        fieldState.error
                          .message
                      }
                    </FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({
                field,
                fieldState,
              }) => {
                const length =
                  field.value?.length ?? 0;
                return (
                  <Field
                    data-invalid={
                      fieldState.invalid
                    }
                  >
                    <FieldLabel htmlFor="description">
                      รายละเอียด{" "}
                      <span className="text-muted-foreground">
                        (ไม่บังคับ)
                      </span>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="คำอธิบายรายวิชาสั้นๆ"
                      aria-invalid={
                        fieldState.invalid
                      }
                      className="min-h-16 resize-y"
                    />
                    <div
                      className={
                        length > 100
                          ? "text-sm text-red-500"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {length}/100 ตัวอักษร
                    </div>
                    {fieldState.error && (
                      <FieldError>
                        {
                          fieldState.error
                            .message
                        }
                      </FieldError>
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="instructors"
              control={form.control}
              render={({
                fieldState,
              }) => (
                <Field
                  data-invalid={
                    fieldState.invalid
                  }
                >
                  <FieldLabel>
                    ผู้สอน
                  </FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    {fields.length}/3 คน — กรอกชื่อผู้สอน
                    และอีเมล name@cmu.ac.th
                    (ห้ามซ้ำกัน)
                  </p>
                  <div className="mt-3 space-y-3">
                    {fields.map(
                      (item, index) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-2"
                        >
                          <span className="w-5 pt-2 text-sm">
                            {index + 1}.
                          </span>
                          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
                            <Controller
                              name={`instructors.${index}.name`}
                              control={
                                form.control
                              }
                              render={({
                                field,
                                fieldState,
                              }) => (
                                <Field
                                  data-invalid={
                                    fieldState.invalid
                                  }
                                >
                                  <Input
                                    {...field}
                                    placeholder="กรอกชื่อผู้สอน"
                                    aria-invalid={
                                      fieldState.invalid
                                    }
                                  />
                                  {fieldState.error && (
                                    <FieldError>
                                      {
                                        fieldState
                                          .error
                                          .message
                                      }
                                    </FieldError>
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name={`instructors.${index}.email`}
                              control={
                                form.control
                              }
                              render={({
                                field,
                                fieldState,
                              }) => (
                                <Field
                                  data-invalid={
                                    fieldState.invalid
                                  }
                                >
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="name@cmu.ac.th"
                                    aria-invalid={
                                      fieldState.invalid
                                    }
                                  />
                                  {fieldState.error && (
                                    <FieldError>
                                      {
                                        fieldState
                                          .error
                                          .message
                                      }
                                    </FieldError>
                                  )}
                                </Field>
                              )}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={
                              fields.length === 1
                            }
                            onClick={() =>
                              remove(index)
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                  {fieldState.error?.root
                    ?.message && (
                    <FieldError className="mt-2">
                      {
                        fieldState.error
                          .root.message
                      }
                    </FieldError>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={
                      fields.length === 3
                    }
                    onClick={() =>
                      append({
                        name: "",
                        email: "",
                      })
                    }
                    className="mt-2"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    เพิ่มผู้สอน
                  </Button>
                </Field>
              )}
            />
            <Controller
              name="notifyByEmail"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">
                      รับข่าวสารทางอีเมล
                    </p>
                    <p className="text-sm text-muted-foreground">
                      แจ้งเตือนผู้สอนเมื่อเปิดลงทะเบียน
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={
                      field.onChange
                    }
                  />
                </div>
              )}
            />
          </div>
          <div className="flex justify-end gap-2 border-t bg-muted/30 px-6 py-3">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              ล้างฟอร์ม
            </Button>
            <Button type="submit">
              บันทึก
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}