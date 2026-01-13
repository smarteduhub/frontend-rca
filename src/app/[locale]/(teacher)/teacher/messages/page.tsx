"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const TeacherMessagesPage = () => {
   return (
      <div className="space-y-6">
         <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
               <h1 className="text-2xl font-semibold text-slate-900">
                  Messages
               </h1>
               <p className="text-slate-600">
                  Send quick updates to classes and streams without digging.
               </p>
            </div>
            <Button className="gap-2">
               <MessageCircle className="h-4 w-4" />
               New message
            </Button>
         </div>

        <Card className="border-slate-200 bg-white p-5">
            <p className="text-slate-700">
               Pick a class to send an announcement or message. We’ll keep the
               language clear so families and students understand.
            </p>
         </Card>
      </div>
   );
};

export default TeacherMessagesPage;