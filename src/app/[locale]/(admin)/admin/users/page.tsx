"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import UsersTable from "@/components/UsersTable";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RoleOption = "teacher" | "student" | "parent";

interface CreateUserPayload {
   name: string;
   email: string;
   password: string;
   role: RoleOption;
   phone?: string;
   country?: string;
   children_ids?: string[];
}

const createUser = async (payload: CreateUserPayload) => {
   const { role, children_ids, ...rest } = payload;
   const url =
      role === "teacher"
         ? apiClient.adminCreateTeacher(rest)
         : role === "student"
         ? apiClient.adminCreateStudent(rest)
         : apiClient.adminCreateParent({ ...rest, children_ids });
   return url;
};

const CreateUserForm = () => {
   const queryClient = useQueryClient();
   const [form, setForm] = useState<CreateUserPayload>({
      name: "",
      email: "",
      password: "",
      role: "teacher",
      phone: "",
      country: "",
      children_ids: [],
   });

   const { mutateAsync, isPending } = useMutation({
      mutationFn: createUser,
      onSuccess: () => {
         toast.success("User created");
         queryClient.invalidateQueries({ queryKey: ["users-by-admin"] });
         setForm({
            name: "",
            email: "",
            password: "",
            role: "teacher",
            phone: "",
            country: "",
            children_ids: [],
         });
      },
      onError: (err: any) => {
         toast.error(
            err?.response?.data?.detail ||
               "Failed to create user. Check inputs and role."
         );
      },
   });

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await mutateAsync({
         ...form,
         children_ids:
            form.role === "parent" && form.children_ids
               ? form.children_ids.filter(Boolean)
               : [],
      });
   };

   return (
      <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
         <h2 className="text-lg font-semibold text-slate-900">
            Create user (admin)
         </h2>
         <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-1">
               <label className="text-sm text-slate-700">Role</label>
               <select
                  className="w-full border rounded-md px-3 py-2 mt-1"
                  value={form.role}
                  onChange={(e) =>
                     setForm((f) => ({
                        ...f,
                        role: e.target.value as RoleOption,
                     }))
                  }
               >
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
               </select>
            </div>
            <div className="md:col-span-1">
               <label className="text-sm text-slate-700">Name</label>
               <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
               />
            </div>
            <div className="md:col-span-1">
               <label className="text-sm text-slate-700">Email</label>
               <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                     setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
               />
            </div>
            <div className="md:col-span-1">
               <label className="text-sm text-slate-700">Password</label>
               <Input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                     setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  required
               />
            </div>
            <div className="md:col-span-1">
               <label className="text-sm text-slate-700">Phone (optional)</label>
               <Input
                  value={form.phone}
                  onChange={(e) =>
                     setForm((f) => ({ ...f, phone: e.target.value }))
                  }
               />
            </div>
            <div className="md:col-span-1">
               <label className="text-sm text-slate-700">Country (optional)</label>
               <Input
                  value={form.country}
                  onChange={(e) =>
                     setForm((f) => ({ ...f, country: e.target.value }))
                  }
               />
            </div>
            {form.role === "parent" && (
               <div className="md:col-span-2">
                  <label className="text-sm text-slate-700">
                     Children IDs (comma-separated UUIDs)
                  </label>
                  <Input
                     value={form.children_ids?.join(",") || ""}
                     onChange={(e) =>
                        setForm((f) => ({
                           ...f,
                           children_ids: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                        }))
                     }
                  />
               </div>
            )}
            <div className="md:col-span-2 flex gap-2">
               <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create user"}
               </Button>
            </div>
         </form>
      </div>
   );
};

const AdminStudentsPage = () => {
   const queryClient = useQueryClient();
   const [bulkRows, setBulkRows] = useState<CreateUserPayload[]>([]);
   const [bulkErrors, setBulkErrors] = useState<string[]>([]);
   const [bulkLoading, setBulkLoading] = useState(false);
   const [manualRows, setManualRows] = useState<CreateUserPayload[]>([
      { name: "", email: "", password: "", role: "student", phone: "", country: "", children_ids: [] },
   ]);
   const [progress, setProgress] = useState<{ total: number; success: number; failed: number; running: boolean }>({
      total: 0,
      success: 0,
      failed: 0,
      running: false,
   });

   const addManualRow = () => {
      setManualRows((rows) => [
         ...rows,
         { name: "", email: "", password: "", role: "student", phone: "", country: "", children_ids: [] },
      ]);
   };

   const updateManualRow = (idx: number, field: keyof CreateUserPayload, value: any) => {
      setManualRows((rows) =>
         rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
      );
   };

   const removeManualRow = (idx: number) => {
      setManualRows((rows) => rows.filter((_, i) => i !== idx));
   };

   const handleManualSubmit = async () => {
      const valid = manualRows.filter((r) => r.email && r.name);
      if (!valid.length) {
         toast.error("Add at least one user with name and email.");
         return;
      }
      setBulkLoading(true);
      const { successCount, failures } = await submitInBatches(valid);
      setBulkLoading(false);
      toastMessage(successCount, failures);
      await queryClient.invalidateQueries({ queryKey: ["users-by-admin"] });
      await queryClient.refetchQueries({ queryKey: ["users-by-admin"] });
   };

   const parseCsv = (text: string) => {
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (!lines.length) return [];
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const rows: CreateUserPayload[] = [];
      for (let i = 1; i < lines.length; i++) {
         const parts = lines[i].split(",");
         const rowObj: any = {};
         headers.forEach((h, idx) => {
            rowObj[h] = (parts[idx] || "").trim();
         });
         const role = (rowObj.role || "").toLowerCase();
         const name = `${rowObj.first_name || ""} ${rowObj.last_name || ""}`.trim() || rowObj.name || "";
         rows.push({
            name,
            email: rowObj.email || "",
            password: "", // admin does not set; backend ignores
            role: role as RoleOption,
            phone: rowObj.phone || "",
            country: rowObj.country || "",
            children_ids: rowObj.children_ids ? rowObj.children_ids.split(";").map((s: string) => s.trim()) : [],
         });
      }
      return rows;
   };

   const validateRows = (rows: CreateUserPayload[]) => {
      const errors: string[] = [];
      const allowed = new Set(["student", "teacher", "parent"]);
      const seen = new Set<string>();
      const clean: CreateUserPayload[] = [];
      rows.forEach((r, idx) => {
         if (!r.email) {
            errors.push(`Row ${idx + 1}: missing email`);
            return;
         }
         if (!allowed.has(r.role)) {
            errors.push(`Row ${idx + 1}: invalid role ${r.role}`);
            return;
         }
         const key = r.email.toLowerCase();
         if (seen.has(key)) {
            errors.push(`Row ${idx + 1}: duplicate email ${r.email}`);
            return;
         }
         seen.add(key);
         clean.push(r);
      });
      return { errors, clean };
   };

   const submitInBatches = async (rows: CreateUserPayload[]) => {
      const limit = 5;
      let idx = 0;
      let successCount = 0;
      const failures: string[] = [];
      setProgress({ total: rows.length, success: 0, failed: 0, running: true });
      const worker = async () => {
         while (idx < rows.length) {
            const current = rows[idx++];
            try {
               await createUser(current);
               successCount += 1;
               setProgress((p) => ({ ...p, success: p.success + 1 }));
            } catch (err: any) {
               const msg =
                  err?.response?.data?.detail ||
                  err?.response?.data?.message ||
                  "Unknown error";
               failures.push(`${current.email}: ${msg}`);
               setProgress((p) => ({ ...p, failed: p.failed + 1 }));
            }
         }
      };
      const workers = Array.from({ length: limit }).map(() => worker());
      await Promise.all(workers);
      setProgress((p) => ({ ...p, running: false }));
      return { successCount, failures };
   };

   const handleCsvUpload = async (file: File) => {
      setBulkErrors([]);
      const text = await file.text();
      const rows = parseCsv(text);
      const { errors, clean } = validateRows(rows);
      setBulkErrors(errors);
      setBulkRows(clean);
   };

   const handleCsvSubmit = async () => {
      if (!bulkRows.length) {
         toast.error("No valid rows to submit.");
         return;
      }
      setBulkLoading(true);
      const { successCount, failures } = await submitInBatches(bulkRows);
      setBulkLoading(false);
      toastMessage(successCount, failures);
      await queryClient.invalidateQueries({ queryKey: ["users-by-admin"] });
      await queryClient.refetchQueries({ queryKey: ["users-by-admin"] });
   };

   const toastMessage = (successCount: number, failures: string[]) => {
      if (failures.length) {
         toast.error(
            `${successCount} users created successfully. ${failures.length} failed.`,
            { autoClose: 5000 }
         );
         failures.slice(0, 5).forEach((f) => toast.error(f, { autoClose: 3000 }));
      } else {
         toast.success(`${successCount} users created successfully.`);
      }
   };

   return (
      <div className="p-3 space-y-6">
         <DashboardNavbar title="Users" />

         <Card className="border-slate-200">
            <CardHeader>
               <CardTitle>Bulk create (CSV/Excel)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               {progress.total > 0 && (
                  <div className="text-sm text-slate-700">
                     Progress: {progress.success + progress.failed}/{progress.total} (success: {progress.success}, failed: {progress.failed})
                  </div>
               )}
               <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                     const f = e.target.files?.[0];
                     if (f) handleCsvUpload(f);
                  }}
               />
               {bulkErrors.length > 0 && (
                  <div className="text-sm text-red-600 space-y-1">
                     {bulkErrors.slice(0, 5).map((err) => (
                        <div key={err}>{err}</div>
                     ))}
                     {bulkErrors.length > 5 && (
                        <div>...and {bulkErrors.length - 5} more</div>
                     )}
                  </div>
               )}
               {bulkRows.length > 0 && (
                  <div className="text-sm text-slate-700">
                     {bulkRows.length} valid rows ready. Preview first 5:
                     <div className="mt-2 border border-slate-200 rounded-md overflow-auto">
                        <table className="min-w-full text-sm">
                           <thead className="bg-slate-50">
                              <tr>
                                 <th className="px-2 py-1 text-left">Name</th>
                                 <th className="px-2 py-1 text-left">Email</th>
                                 <th className="px-2 py-1 text-left">Role</th>
                              </tr>
                           </thead>
                           <tbody>
                              {bulkRows.slice(0, 5).map((r, i) => (
                                 <tr key={i} className="border-t">
                                    <td className="px-2 py-1">{r.name}</td>
                                    <td className="px-2 py-1">{r.email}</td>
                                    <td className="px-2 py-1 capitalize">{r.role}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               )}
               <Button onClick={handleCsvSubmit} disabled={bulkLoading}>
                  {bulkLoading ? "Creating..." : "Create users from CSV"}
               </Button>
            </CardContent>
         </Card>

         <Card className="border-slate-200">
            <CardHeader>
               <CardTitle>Manual multi-row entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="space-y-3">
                  {manualRows.map((row, idx) => (
                     <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-5 gap-2 border border-slate-200 rounded-md p-3"
                     >
                        <Input
                           placeholder="Name"
                           value={row.name}
                           onChange={(e) => updateManualRow(idx, "name", e.target.value)}
                        />
                        <Input
                           placeholder="Email"
                           value={row.email}
                           onChange={(e) => updateManualRow(idx, "email", e.target.value)}
                        />
                        <select
                           className="border rounded-md px-3 py-2"
                           value={row.role}
                           onChange={(e) =>
                              updateManualRow(idx, "role", e.target.value as RoleOption)
                           }
                        >
                           <option value="student">Student</option>
                           <option value="teacher">Teacher</option>
                           <option value="parent">Parent</option>
                        </select>
                        <Input
                           placeholder="Phone (optional)"
                           value={row.phone}
                           onChange={(e) => updateManualRow(idx, "phone", e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeManualRow(idx)}
                              disabled={manualRows.length === 1}
                           >
                              Remove
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" onClick={addManualRow}>
                     Add row
                  </Button>
                  <Button onClick={handleManualSubmit} disabled={bulkLoading}>
                     {bulkLoading ? "Creating..." : "Create users"}
                  </Button>
               </div>
            </CardContent>
         </Card>

         <UsersTable />
      </div>
   );
};

export default AdminStudentsPage;