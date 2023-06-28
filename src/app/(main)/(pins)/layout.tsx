import type { PropsWithChildren } from "react";

import Navbar from "@/components/Navbar";

export default function PinsLayout({ children }: PropsWithChildren) {
  return (
    <div className="px-2 md:px-5">
      <section className="bg-gray-50">
        <Navbar />
      </section>
      <section className="h-full">
        {children}
        {/* <Routes>
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreateAPin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes> */}
      </section>
    </div>
  );
}
