import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Product from "@/components/Product";
import { useStateContext } from "@/context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, category } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };
  return (
    <section>
      <div className="pt-10 place-items-center max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:place-items-center lg:py-20">
        <div>
          <div className="flex rounded-xl bg-gray-200 justify-center w-fit ">
            <img
              src={urlFor(image && image[index])}
              className="rounded-2xl border-purple-300 w-[400px] h-[400px] cursor-pointer"
            />
          </div>
          <div className="flex gap-4 mt-5 justify-center py-2">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index
                    ? "rounded-lg w-[70px] h-[70px] cursor-pointer bg-slate-900"
                    : "rounded-lg w-[70px] h-[70px] cursor-pointer "
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <article className="px-8 pb-10">
          <h2 className="bg-slate-100 py-1 px-2 text-purple-400 uppercase tracking-wide text-sm font-bold inline-block rounded shadow mb-10">
            {category}
          </h2>
          <h1 className="text-slate-900 mb-10 font-bold text-3xl lg:text-4xl">
            {name}
          </h1>
          <p className="text-slate-600 mb-10 leading-relaxed">{details}</p>

          <div className="flex flex-wrap items-center justify-between lg:flex-col lg:items-start lg:gap-2">
            <ul className="flex items-center gap-5">
              <li className="text-slate-900 font-bold text-2xl">R$ {price}</li>
              <li className="bg-purple-100 py-1 px-2 text-purple-400 tracking-wide text-sm font-bold inline-block rounded shadow">
                10%
              </li>
            </ul>

            <p className="text-slate-600 text-sm">
              <s>R$ {(price * (1 / 10)).toFixed(2)}</s>
            </p>
          </div>

          <div className="mt-10 lg:flex items-center justify-between gap-2">
            <ul className="flex items-center justify-between bg-slate-100 py-2 px-4 rounded shadow lg:flex-1">
              <li className="cursor-pointer">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
              </li>
              <li>{qty}</li>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </ul>

            <div className="lg:flex-1 ">
              <div className="m-1 p-2 ">
                <button
                  className="flex items-center justify-center gap-4 bg-purple-500 py-2 px-4 text-white font-bold rounded-lg shadow mt-5 w-full lg:mt-0 hover:bg-purple-600 transition-all duration-200"
                  onClick={() => onAdd(product, qty)}
                >
                  <AiOutlineShoppingCart /> Adicionar no carrinho
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="bg-white">
        <div className=" max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900">
            Pesquisas similiares
          </h2>

          <div className="flex  grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products?.map(
              (product, index) =>
                index < 3 && <Product key={product._id} product={product} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
