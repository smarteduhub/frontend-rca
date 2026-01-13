"use client";
import React, { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  useFetchUsers,
  useAdminActivateUser,
  useAdminDeactivateUser,
} from "@/hooks/useUsers";
import RoleFilter from "./RoleFilter";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  username?: string | null;
  is_active: boolean;
  created_at?: string;
}

const UsersTable = () => {
  const { data: userData } = useFetchUsers();
  const [selectedRole, setSelectedRole] = useState("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const activate = useAdminActivateUser();
  const deactivate = useAdminDeactivateUser();

  const filteredData = useMemo(() => {
    let data = userData || [];
    if (selectedRole !== "all") {
      data = data.filter((user) => user.role.toLowerCase() === selectedRole);
    }
    if (statusFilter !== "all") {
      data = data.filter((user) =>
        statusFilter === "active" ? user.is_active : !user.is_active
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
    }
    return data;
  }, [userData, selectedRole, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paged = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleToggle = useCallback(
    async (user: User) => {
      try {
        if (user.is_active) {
          await deactivate.mutateAsync(user.id);
          toast.success("User deactivated");
        } else {
          await activate.mutateAsync(user.id);
          toast.success("User activated");
        }
      } catch (err) {
        toast.error("Action failed. Try again.");
      }
    },
    [activate, deactivate]
  );

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "username", header: "Username" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
          const active = row.original.is_active;
          return (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                active
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {active ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => {
          const created = row.original.created_at;
          return (
            <span className="text-sm text-slate-700">
              {created ? new Date(created).toLocaleDateString() : "—"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggle(row.original)}
            >
              {row.original.is_active ? "Deactivate" : "Activate"}
            </Button>
          </div>
        ),
      },
    ],
    [handleToggle]
  );

  return (
    <div className="space-y-4 mt-10">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <RoleFilter
          selectedRole={selectedRole}
          onRoleChange={(val) => {
            setPage(1);
            setSelectedRole(val);
          }}
        />
        <div className="flex gap-2 items-center">
          <Select
            value={statusFilter}
            onValueChange={(val: any) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-56"
          />
        </div>
      </div>
      <DataTable columns={columns} data={paged} />
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Page {page} of {totalPages} — {filteredData.length} users
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
