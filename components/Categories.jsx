import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl font-semibold border-b pb-4">Categories ({categories.length})</h3>
      <hr className="lg:w-[75%] md:w-[35%]"/>
      <hr className='w-[4em] border-l-fuchsia-800 border-[3px] -mt-[3.6px]'/>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span
            className={`cursor-pointer mt-8 block ${
              index === categories.length - 1 ? "border-b-0" : "border-b"
            } pb-3 mb-3`}
          >
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
