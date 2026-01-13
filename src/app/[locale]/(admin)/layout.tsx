import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
   return (
      <div className="min-h-screen bg-neutral-50">
         <div className="mx-auto w-full max-w-[1600px] px-3 py-4 lg:px-6">
            <div className="relative h-full rounded-[28px] border border-neutral-200/60 bg-white/90 p-2 shadow-sm backdrop-blur-md">
               <div className="h-full overflow-y-auto rounded-[22px] bg-white/90 p-4 sm:p-6">
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminLayout;
