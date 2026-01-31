// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Product } from "../../../../typing";
// import { getAllProduct } from "../../../../Request/requests";
// import { ClipLoader } from "react-spinners";

// const LIMIT = 30;              // industry: batch size
// const CATEGORIES_PER_LOAD = 3;

// const AllProduct = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [skip, setSkip] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [visibleCategories, setVisibleCategories] = useState(3);

//   const observer = useRef<IntersectionObserver | null>(null);
//   const lastCategoryRef = useRef<HTMLDivElement | null>(null);

//   // fetch paginated products
//   const fetchProducts = async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     const newProducts = await getAllProduct(LIMIT, skip);

//     setProducts((prev) => [...prev, ...newProducts]);
//     setSkip((prev) => prev + LIMIT);

//     if (newProducts.length < LIMIT) {
//       setHasMore(false); // industry stop condition
//     }

//     setLoading(false);
//   };

//   // initial fetch
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // group by category
//   const categoryMap: Record<string, Product[]> = {};
//   products.forEach((p) => {
//     if (!categoryMap[p.category]) categoryMap[p.category] = [];
//     categoryMap[p.category].push(p);
//   });

//   const categories = Object.entries(categoryMap);

//   // observe LAST category (Amazon style)
//   useEffect(() => {
//     if (!lastCategoryRef.current) return;

//     if (observer.current) observer.current.disconnect();

//     observer.current = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setVisibleCategories((prev) => prev + CATEGORIES_PER_LOAD);
//         fetchProducts(); // prefetch next batch
//       }
//     });

//     observer.current.observe(lastCategoryRef.current);
//   }, [categories.length]);

//   return (
//     <section className="pt-20 pb-16">
//       <div className="container w-11/12 md:w-4/5 mx-auto space-y-16">
//         {categories.slice(0, visibleCategories).map(([category, items], index) => {
//           const isLast = index === visibleCategories - 1;

//           return (
//             <div key={category} ref={isLast ? lastCategoryRef : null}>
//               <CategorySection category={category}/>
//             </div>
//           );
//         })}

//         {loading && (
//           <div className="flex justify-center pt-6">
//             <ClipLoader size={30} />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AllProduct;
